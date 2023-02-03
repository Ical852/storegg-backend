const mongoose = require('mongoose')
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName : { type: String, required: [true, 'Game Name is Required !']},
        category : { type: String, required: [true, 'Game Category is Required !']},
        thumbnail : { type: String },
        coinName : { type: String, required: [true, 'Coin Name is Required !']},
        coinQuantity : { type: String, required: [true, 'Coin Quantity is Required !']},
        price : { type: Number },
    },
    
    historyPayment : {
        name : { type: String, required: [true, 'Payment Name is Required !']},
        type : { type: String, required: [true, 'Payment Type is Required !']},
        bankName : { type: String, required: [true, 'Bank Name is Required !']},
        noRekening : { type: String, required: [true, 'Rek No. is Required !']},
    },

    name: {
        type: String,
        required: [true, 'Name is Required'],
        minlength: [3, "Name Length Must be Greater than 3 Char"],
        maxlength: [225, "Name Length Must be Lower than 225 Char"],
    },

    accountUser: {
        type: String,
        required: [true, 'Account Name is Required'],
        minlength: [3, "Account Name Length Must be Greater than 3 Char"],
        maxlength: [225, "Account Name Length Must be Lower than 225 Char"],
    },

    tax: {
        type: Number,
        default: 0
    },

    value: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },

    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },

    historyUser: {
        name: { type: String, required: [true, 'Player Name is Required !']},
        phoneNumber: {
            type: Number,
            required: [true, 'Phone Number is Required'],
            minlength: [12, "Name Length Must be Greater than 12 Char"],
            maxlength: [13, "Name Length Must be Lower than 13 Char"],
        },
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)