const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {
    User,
    Team,
    Booking,
    Course,
    Court,
    Payment,
    Price,
    Series
} = require('../db/index');
const pswgen = require('generate-password');
const emailTransporter = require('../config/nodemailerConfig');
const isAdmin = require("../middlewares/isAdmin");

router.get('/bookings', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        // pagination
        var page = parseInt(req.query.page) || 0;
        var limit = parseInt(req.query.limit) || 100;

        if (Object.keys(req.query).length === 0) {
            // no query parameters. Find all users without any filtering.
            let bookings = await Booking.find({}).skip(page * limit).limit(limit);
            let count = await Booking.find({}).countDocuments();
            if (!bookings) {
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = bookings.map(u => u._id);
            // return array containing ids of users
            res.status(200).json({
                'count': count,
                'bookings': bookings
            });
        } else {
            // query parameters specified
            let bookings = await Booking.find(req.query);
            if (!bookings) {
                // no users have been found.
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = bookings.map(u => u._id);
            // return array containing ids of users
            res.status(200).json(ids);
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});