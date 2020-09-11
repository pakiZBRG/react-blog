const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, maxlength: 20 },
    email: { type: String, trim: true, unique: 1 },
    password: { type: String, minlength: 6 },
    lastname: { type: String, maxlength: 35 },
    role: { type: Number, default: 0 },
    token: { type: String },
    tokenExp: { type: Number }
});

module.exports = mongoose.model('User', userSchema);