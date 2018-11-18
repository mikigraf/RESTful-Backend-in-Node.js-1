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

router.get('/courses', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        // pagination
        var page = parseInt(req.query.page) || 0;
        var limit = parseInt(req.query.limit) || 100;

        if (Object.keys(req.query).length === 0) {
            // no query parameters. Find all users without any filtering.
            let courses = await Course.find({}).skip(page * limit).limit(limit);
            let count = await Course.find({}).countDocuments();
            if (!courses) {
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = courses.map(u => u._id);
            // return array containing ids of users
            res.status(200).json({
                'count': count,
                'courses': courses
            });
        } else {
            // query parameters specified
            let courses = await Course.find(req.query);
            if (!courses) {
                // no users have been found.
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = courses.map(u => u._id);
            // return array containing ids of users
            res.status(200).json(ids);
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

router.put('/courses', [passport.authenticate('jwt', {
    session: false
}), isAdmin], async (req, res, next) => {
    try {
        let courses = await Course.insertMany(req.courses);
        if (!courses) {
            res.status(500);
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/courses/:id', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        let courses = await Courses.findById(req.course.id);
        if (!courses) {
            res.status(500);
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/courses/:id', [passport.authenticate('jwt', {
    session: false
}), isAdmin], async (req, res, next) => {
    try {
        let course = await Course.findByIdAndUpdate(req.params.id, req.course, {
            new: true
        });
        if (!course) {
            res.status(500);
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/courses/:id', passport.authenticate('jwt', {
    session: false
}), async (req, res, next) => {
    try {
        let course = await Course.findById(id);
        if (req.user.status.localeCompare('admin') === 0 || course.provider.localeCompare(req.user.id) === 0) {
            let err = await Course.remove({
                _id: req.params.id
            });

            if (err) {
                res.status(401).send('Unauthorized');
            }

            res.status(200).send('Course has been deleted succesfully.');
        }
        res.status(401).send('Unauthorized');
    } catch (error) {
        res.status(500).json(error);
    }
});