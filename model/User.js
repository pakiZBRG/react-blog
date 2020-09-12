const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, maxlength: 20 },
    email: { type: String, trim: true, unique: 1 },
    password: { type: String, minlength: 6 },
    name: { type: String, maxlength: 35 },
    role: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);