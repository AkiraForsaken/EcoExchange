const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    points: {
        type: Number,
        default: 0,
    },
    age: {
        type: Number,
        default: null,
    },
    address: {
        type: String,
        default: '',
    },
    history: {
        recycleItems: [
            {
                type: String,
                weight: Number,
                pointsEarned: Number,
                date: { type: Date, default: Date.now },
            },
        ],
        redeemItems: [
            {
                type: String,
                price: Number,
                date: { type: Date, default: Date.now },
            },
        ],
    },
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;