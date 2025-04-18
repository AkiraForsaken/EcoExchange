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
    isAdmin: {
        type: Boolean,
        default: false,
    },
    pendingRecycle: {
        type: [
            {
                _id: { type: Schema.Types.ObjectId, auto: true }, // Add this line
                type: { type: String }, // Type of recycled item
                weight: Number, // Weight of the recycled item
                pointsEarned: Number, // Points to be awarded
                date: { type: Date, default: Date.now }, // Date of request
            },
        ],
        default: [],
    },
    history: {
        recycleItems: {
            type: [
                {
                    type: { type: String },
                    weight: Number,
                    pointsEarned: Number,
                    date: { type: Date, default: Date.now },
                },
            ],
            default: [],
        },
        redeemItems: {
            type: [
                {
                    type: { type: String },
                    price: Number,
                    date: { type: Date, default: Date.now },
                },
            ],
            default: [],
        },
    },
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;