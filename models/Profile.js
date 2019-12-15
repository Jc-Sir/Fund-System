const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creat userSchema
const UserSchema = new Schema({
    identity: {
        type: 'String',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = Profile = mongoose.model("profile", UserSchema)