const passport = require('passport');
const express = require('express');
const router = express.Router();
const {
    User
} = require('../db/index');
const isAdmin = require('../middlewares/isAdmin');

module.exports.getAllUsers = async (req, res, next) => {
    try {
        // pagination
        var page = parseInt(req.query.page) || 0;
        var limit = parseInt(req.query.limit) || 100;

        if (Object.keys(req.query).length === 0) {
            // no query parameters. Find all users without any filtering.
            let users = await User.find({}).skip(page * limit).limit(limit);
            let count = await User.find({}).countDocuments();
            if (!users) {
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = users.map(u => u._id);
            // return array containing ids of users
            res.status(200).json({
                'count': count,
                'users': ids
            });
        } else {
            // query parameters specified
            let users = await User.find(req.query);
            if (!users) {
                // no users have been found.
                res.status(404).send('It seems like there are no users.');
            }
            // extract id's
            const ids = users.map(u => u._id);
            // return array containing ids of users
            res.status(200).json(ids);
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

module.exports.getUserData = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}