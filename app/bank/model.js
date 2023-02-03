const mongoose = require('mongoose')
let bankSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required !']
    },
    bankName: {
        type: String,
        required: [true, 'Bank Name is Required !']
    },
    noRekening: {
        type: String,
        required: [true, 'Rek No. is Required !']
    },
}, { timestamps: true })

module.exports = mongoose.model('Bank', bankSchema)