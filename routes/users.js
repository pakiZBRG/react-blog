const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/check-auth');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

//Create an account
router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json({message: 'Email exists. Try another one'});

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        ...req.body,
        password: hashPassword
    });
    user.save()
        .then(user => {
            res.status(201).json({
                message: 'User Created',
                url: `${req.protocol}://${req.get('host')}/api/users/${user.id}`
            });
        })
        .catch(err => res.status(500).json({ 
            message: "Creation Failed", 
            error: err 
        }));
});

//Login an user
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({
        login: false,
        message: 'No user with given email'
    });
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({
        login: false,
        message: 'Invalid password'
    });

    const token = jwt.sign(user._id.toHexString(), 'secret');
    res.cookie('X_AUTH', token).status(200).json({
        message: `${user.username} is logged in`,
    })
});

//Logout
router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, doc) => {
        if(err) 
            return res.status(400).json({
                logout: false,
                message: "There was problem with logging out"
            })
        return res.cookie('X_AUTH', '').status(200).json({
            logout: true,
            message: "User logged out"
        })
    })
})

// Get info about user
router.get('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role,
                token: user.token
            })
        })
});

module.exports = router;