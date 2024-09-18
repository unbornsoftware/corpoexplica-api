const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String,},
    email: {type: String, unique: true},
    password: {type: String,},
    birthdate: {type: Date},    
    profilePicture: {type: String},
    roles: [{type: mongoose.Schema.Types.ObjectId, ref:'Role'}],
    addresses: [{type: mongoose.Schema.Types.ObjectId, ref:'Address'}],
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref:'Contact'}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const User = mongoose.model('User', userSchema);
module.exports = User;

