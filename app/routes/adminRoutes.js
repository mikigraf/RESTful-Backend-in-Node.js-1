const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const isAdmin = require('../middlewares/isAdmin');

router.post('/admin', isAdmin, async (req, res, next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const birthday = req.body.birthday;
    var status = req.body.status;

    try {
        const user = await User.create({
            'email': email,
            'username': username,
            'password': password,
            'profile.firstName': firstName,
            'profile.lastName': lastName,
            'profile.address': address,
            'profile.birthday': birthday,
            'status': status,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/users', isAdmin, async (req, res, next) => {
    try {
        let users = await User.find({});
        res.send(users);
    } catch (error) {
        next(error);
    }
})
module.exports = router;