const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const readline = require('readline') // For interactive terminal input
const User = require('./models/user') // Import the User model
const app = express()

// database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => {
        console.error('Database not connected', err);
        process.exit(1); // Exit the process
    });

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use('/', require('./routes/authRoutes'))

const port = 8000
app.listen(port, ()=>console.log(`Server is running on port ${port}`))

// Interactive terminal for confirming recycling requests
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
const checkPendingRecycles = async () => {
    try {
        const users = await User.find({ 'pendingRecycle.0': { $exists: true } }, 'name pendingRecycle');
        if (users.length === 0) {
            console.log('No pending recycling requests.');
            return;
        }

        console.log('\nPending Recycling Requests:');
        users.forEach((user, userIndex) => {
            console.log(`\nUser: ${user.name}`);
            user.pendingRecycle.forEach((request, requestIndex) => {
            console.log(
                `  [${userIndex}-${requestIndex}] Type: ${request.type}, Weight: ${request.weight}g, Points: ${request.pointsEarned}`
            );
            });
      });
  
      rl.question('\nEnter the request ID to confirm (e.g., 0-1) or type "exit" to quit: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
            rl.close();
            return;
        }
  
        const [userIndex, requestIndex] = input.split('-').map(Number);
        if (
            isNaN(userIndex) ||
            isNaN(requestIndex) ||
            userIndex < 0 ||
            userIndex >= users.length ||
            requestIndex < 0 ||
            requestIndex >= users[userIndex].pendingRecycle.length
        ) {
            console.log('Invalid request ID. Please try again.');
            return checkPendingRecycles();
        }
  
        const user = users[userIndex];
        const request = user.pendingRecycle[requestIndex];

        // Ensure history.recycleItems is initialized
        if (!user.history) {
            user.history = { recycleItems: [], redeemItems: [] };
        }
        if (!user.history.recycleItems) {
            user.history.recycleItems = [];
        }

        if (isNaN(user.points) || typeof user.points !== 'number') {
            user.points = 0; // Default to 0 if points is invalid
        }
        
        // Ensure request.pointsEarned is a valid number
        const pointsEarned = !isNaN(request.pointsEarned) && typeof request.pointsEarned === 'number' ? request.pointsEarned : 0;
  
        // Move the request to recycle history and award points
        user.history.recycleItems.push({
            type: request.type,
            weight: request.weight,
            pointsEarned: request.pointsEarned,
            date: request.date,
        });
        user.points += pointsEarned;
        // user.pendingRecycle.id(request._id).remove();
        // Remove the request from pendingRecycle using splice
        user.pendingRecycle.splice(requestIndex, 1);
  
        await user.save();
        console.log(`Confirmed recycling request for ${user.name}: ${request.type}, ${request.weight}g, ${request.pointsEarned} points.`);
        return checkPendingRecycles();
      });
    } catch (error) {
      console.error('Error checking pending recycling requests:', error);
    }
};
  
// Periodically check for pending recycling requests
setInterval(checkPendingRecycles, 30000); // Check every 30 seconds

// const initializeHistoryFields = async () => {
//     try {
//       await User.updateMany(
//         { $or: [{ 'history.recycleItems': { $exists: false } }, { 'history.redeemItems': { $exists: false } }] },
//         {
//           $set: {
//             'history.recycleItems': [],
//             'history.redeemItems': [],
//           },
//         }
//       );
//       console.log('Initialized history fields for all users.');
//     } catch (error) {
//       console.error('Error initializing history fields:', error);
//     }
// };

// initializeHistoryFields();

  