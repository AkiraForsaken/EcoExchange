const express = require('express');
const router = express.Router();
const cors = require('cors')
const {test, registerUser, loginUser, getProfile, recycleAction, redeemAction, updateProfile, onLogOut} = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

// endpoint using function
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile) 
router.post('/recycle', recycleAction)
router.post('redeem', redeemAction)
router.put('/profile', updateProfile)
router.post('/logout', onLogOut)

module.exports = router