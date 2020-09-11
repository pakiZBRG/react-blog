const express = require('express');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
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

// Get info about user
router.get('/:id', (req, res) => {
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
    User.token = token;
    user.save();
    res.cookie('X_AUTH', User.token).status(200).json({
        message: `${user.username} is logged in`,
        token: token
    })
});

router.get('/auth', (req, res) => {
    
})

module.exports = router;