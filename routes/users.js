const express = require('express');
const User = require('../model/User');
const router = express.Router();

//Create an account
router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json({message: 'Email exists. Try another one'});

    const user = new User(req.body);
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
})

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
            })
        })
})

module.exports = router;