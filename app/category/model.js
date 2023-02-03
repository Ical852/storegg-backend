const mongoose = require('mongoose')
let categorySchema = mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Category Name Required !']
    }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)