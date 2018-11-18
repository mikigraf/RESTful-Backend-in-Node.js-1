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

router.get('/series', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        // pagination
        var page = parseInt(req.query.page) || 0;
        var limit = parseInt(req.query.limit) || 100;

        if (Object.keys(req.query).length === 0) {
            // no query parameters. Find all users without any filtering.
            let series = await Series.find({}).skip(page * limit).limit(limit);
            let count = await Series.find({}).countDocuments();
            if (!series) {
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = series.map(u => u._id);
            // return array containing ids of users
            res.status(200).json({
                'count': count,
                'courses': series
            });
        } else {
            // query parameters specified
            let series = await Series.find(req.query);
            if (!series) {
                // no users have been found.
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = series.map(u => u._id);
            // return array containing ids of users
            res.status(200).json(ids);
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

router.put('/series', [passport.authenticate('jwt', {
    session: false
}), isAdmin], async (req, res, next) => {
    try {
        let series = await Series.insertMany(req.series);
        if (!Series) {
            res.status(500);
        }

        res.status(200).json(series);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/series/:id', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        let series = await Series.findById(req.series.id);
        if (!series) {
            res.status(500);
        }

        res.status(200).json(series);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/series/:id', [passport.authenticate('jwt', {
    session: false
}), isAdmin], async (req, res, next) => {
    try {
        let series = await Series.findByIdAndUpdate(req.params.id, req.series, {
            new: true
        });
        if (!series) {
            res.status(500);
        }

        res.status(200).json(series);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/series/:id', passport.authenticate('jwt', {
    session: false
}), async (req, res, next) => {
    try {
        let series = await Series.findById(id);
        if (req.user.status.localeCompare('admin') === 0) {
            let err = await Series.remove({
                _id: req.params.id
            });

            if (err) {
                res.status(401).send('Unauthorized');
            }

            res.status(200).send('Series has been deleted succesfully.');
        }
        res.status(401).send('Unauthorized');
    } catch (error) {
        res.status(500).json(error);
    }
});