const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is Required !']
    },
    name: {
        type: String,
        required: [true, 'Name is Required !']
    },
    password: {
        type: String,
        required: [true, 'Password is Required !']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is Required !']
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)