const express = require('express');
const User = require("../models/user");
const auth = require('../middleware/auth');
const { update } = require('../models/user');
const { generate } = require('nth-check');

const router = new express.Router();

router.post('/register', async (req, res) => {
    // register user logic goes here

    try {
        const user = new User(req.body);

        // check if user already exist
        // Validate if user exist in our database
        const isOldUser = await User.findOne({ email: req.body.email });
        if (isOldUser) {
            return res.status(409).send('User already exist. Please Login!!')
        }
        // req.body.password =  bcrypt.hashSync(req.body.password, 8);
        await user.save();
        res.status(201).send({ user });
    } catch (e) {
        res.status(400).send(e);
    }
});


router.post("/login", async (req, res) => {
    // our login logic goes here
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        await User.findOneAndUpdate({ email: req.body.email }, { lastLogin: Date.now() });
        res.header("Authorization", token).json({
            error: null,
            user: user,
            token: token
        });
        // res.status(200).send(data);
    } catch (e) {
        return res.status(401).send({ error: "Invalid login credentials!!" });
    }
});


router.post("/logout", auth, async (req, res) => {
    try {
        await User.deleteAuthToken(req.body.token, (err, user) => {
            console.log(user);
            if (err) {
                return res.status(400).send(err);
            }
            res.status(200).json({
                error: null,
                user: user
            });
        });
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});


router.post("/updateProfile", async (req, res) => {

    try {
        const user =  await User.findById(req.user._id);

        if(user) {
            user.name = req.body.name;
            user.email =  req.body.email;
        }

        if(req.body.password) {
            user.password =  req.body.password;
        }

        const updatedUser =  await user.save();
        const token = await updatedUser.generateAuthToken();
        res.json({
            _id:updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
            token :  token
        })
        
    } catch (e) {
        return res.status(401).send({ error: "no user found credentials!!" });
    }
});

module.exports = router;