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

router.get('/courts', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        let courts = await Court.find({});
        if (!courts) {
            res.status(500).send('No courts found');
        }

        res.status(200).json(courts);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/courts', [passport.authenticate('jwt', {
    session: false
}), isAdmin], async (req, res, next) => {
    try {
        let courts = await Court.insertMany();
        if (!courts) {
            res.status(500);
        }

        res.status(200).json(courts);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/courts/:id', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        let court = await Court.findById(req.court.id);
        if (!court) {
            res.status(500);
        }

        res.status(200).json(court);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/courts/:id', [passport.authenticate('jwt', {
    session: false
}), isAdmin], async (req, res, next) => {
    try {
        let court = await Court.findByIdAndUpdate(req.params.id, req.court, {
            new: true
        });
        if (!court) {
            res.status(500);
        }

        res.status(200).json(court);
    } catch (error) {
        res.status(500).send(error);
    }
});