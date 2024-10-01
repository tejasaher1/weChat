const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Firstname : {
        type: String,
        required: true
    },
    Lastname : {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },   
},
{
    timestamps: true,
 }
)


const User = mongoose.model('User', UserSchema);

module.exports = User;