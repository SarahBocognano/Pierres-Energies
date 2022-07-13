const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email adress']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minglenght: [8, 'Minimum password length must be at least 8 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = User = mongoose.model('user', UserSchema);