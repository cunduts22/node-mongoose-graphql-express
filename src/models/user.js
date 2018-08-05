const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Book = require('./book')
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'name is required']
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                // +XX-XXX-XXX-XXXXX (ID) phone validator
                var valid = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;
                return valid.test(v)
            },
            message: '{VALUE} is not valid phone number'
        },
        required: [true, 'Phone number is required']
    },
     email: {
         type: String,
         unique: [true, 'Email is already exist'],
         validate: {
             validator: function (v) {
                 // user@user.com
                var valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;                 
                return valid.test(v)
             },
             message: '{VALUE} is not valid email address'
         },
         required: [true, 'Email address is required']
     },
     gender: {
         type: String,
         enum: ['male','female'],
         required: true
     },
     birthday: {
         type: Date
     },
     origin: {
         type: String,
         default: 'Indonesia'
     },
     Books: [{
        _bookId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Book' 
        },
        create_at: {
            type: Date,
            default: Date.now
        }
     }],
     created_at: {
         type: Date,
         default: Date.now
     }
})

module.exports = mongoose.model('User', userSchema)