const User = require('../models/user')
const dotenv = require('dotenv').config()
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('test is working')
}

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check if name was entered
        if (!name){
            return res.json({
                error: 'name is required'
            })
        }
        // Check password
        if (!password || password.length < 6){
            return res.json({
                error: 'password is required should be at least 6 characters long'
            })
        }
        // Check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)
        // Create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});
        if (!user){
            return res.json({
                error: "No user found"
            })
        } 

        // Check password
        const matchPW = await comparePassword(password, user.password)
        if (!matchPW){
            res.json({
                error: 'password do not match'
            })
        } else { //
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true, // Ensure this is true in production
                    sameSite: 'strict', // Prevent CSRF attacks
                    path: '/', // Make the cookie available for all routes
                }).json(user);
            }); // sign the token with the credentials, then passed to profile
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => { // 
    const {token} = req.cookies
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
            if (err) throw err;
            const user = await User.findById(decoded.id).select('-password')
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const addRecycleHistory = async (userId, itemType, weight, pointsEarned) => {
    await User.findByIdAndUpdate(userId, {
        $push: {
            'history.recycleItems': {
                type: itemType,
                weight,
                pointsEarned,
            },
        },
        $inc: { points: pointsEarned },
    });
};

const addRedeemHistory = async (userId, itemType, price) => {
    await User.findByIdAndUpdate(userId, {
        $push: {
            'history.redeemItems': {
                type: itemType,
                price,
            },
        },
        $inc: { points: -price },
    });
};

const recycleAction = async (req, res) => {
    const { userId, type, weight, pointsEarned } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    pendingRecycle: {
                        type,
                        weight,
                        pointsEarned,
                    },
                },
            },
            { new: true } // Ensure updated user object is returned
        );

        res.json({ success: true, message: 'Recycling request submitted. Awaiting confirmation.' });
    } catch (error) {
        console.error('Error submitting recycling request: ', error);
        res.status(500).json({ success: false, error: 'Failed to submit recycling request' });
    }
}

// const confirmRecycle = async (req, res) => {
//     const { userId, requestId } = req.body;

//     try {
//         const user = await User.findById(userId);

//         // Find the pending request
//         const request = user.pendingRecycle.id(requestId);
//         if (!request) {
//             return res.status(404).json({ success: false, error: 'Request not found' });
//         }

//         // Move the request to recycle history
//         user.history.recycleItems.push({
//             type: request.type,
//             weight: request.weight,
//             pointsEarned: request.pointsEarned,
//             date: request.date,
//         });

//         // Award points
//         user.points += request.pointsEarned;

//         // Remove the request from pendingRecycle
//         user.pendingRecycle.id(requestId).remove();

//         await user.save();
  
//         res.json({ success: true, user });
//     } catch (error) {
//         console.error('Error confirming recycling request:', error);
//         res.status(500).json({ success: false, error: 'Failed to confirm recycling    request' });
//     }
// };

const confirmRecycle = async (req, res) => {
    const { userId, requestId } = req.body;

    try {
        const user = await User.findById(userId);

        // Find the index of the pending request
        const requestIndex = user.pendingRecycle.findIndex((req) => req._id.toString() === requestId);
        if (requestIndex === -1) {
            return res.status(404).json({ success: false, error: 'Request not found' });
        }

        const request = user.pendingRecycle[requestIndex];

        // Move the request to recycle history
        user.history.recycleItems.push({
            type: request.type,
            weight: request.weight,
            pointsEarned: request.pointsEarned,
            date: request.date,
        });

        // Award points
        user.points += request.pointsEarned;

        // Remove the request from pendingRecycle
        user.pendingRecycle.splice(requestIndex, 1);

        await user.save();

        res.json({ success: true, user });
    } catch (error) {
        console.error('Error confirming recycling request:', error);
        res.status(500).json({ success: false, error: 'Failed to confirm recycling request' });
    }
};

const redeemAction = async (req, res) => {
    const { userId, type, price } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              'history.redeemItems': {
                type,
                price,
              },
            },
            $inc: { points: -price }, // Deduct points
          },
          { new: true }
        );
    
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error redeeming item:', error);
        res.status(500).json({ success: false, error: 'Failed to redeem item' });
    }
}

const updateProfile = async (req, res) => {
    const { name, age, address } = req.body;
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { name, age, address },
        { new: true }
        ).select('-password'); // Exclude password from the response

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

const onLogOut = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully'})
}

const getPendingRecycles = async (req, res) => {
    try {
      const users = await User.find({ 'pendingRecycle.0': { $exists: true } }, 'name pendingRecycle');
      res.json({ success: true, users });
    } catch (error) {
      console.error('Error fetching pending recycling requests:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch pending recycling requests' });
    }
};

const adminMiddleware = async (req, res, next) => {
    console.log('Cookies:', req.cookies); // Log cookies for debugging
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    } catch (error) {
        console.error('Error in adminMiddleware:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    addRecycleHistory,
    addRedeemHistory,
    recycleAction,
    confirmRecycle,
    redeemAction,
    updateProfile,
    onLogOut,
    getPendingRecycles,
    adminMiddleware
}