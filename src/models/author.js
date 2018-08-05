const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Book = require('./book')
const authorSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    history: {
        type: String,
        required: true
    },    
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Author', authorSchema)