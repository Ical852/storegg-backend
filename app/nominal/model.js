const mongoose = require('mongoose')
let nominalSchema = mongoose.Schema({
    coinQuantity: {
        type: Number,
        default: 0
    },
    coinName: {
        type: String,
        required: [true, 'Coin Name is Required !']
    },
    price: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Nominal', nominalSchema)