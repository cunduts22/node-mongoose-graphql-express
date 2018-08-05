const mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'name is required']
    },
    address: {
        type: String,
        required: true
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
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },    
    origin: {
        type: String,
        default: 'Indonesia'
    },    
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Admin', adminSchema)