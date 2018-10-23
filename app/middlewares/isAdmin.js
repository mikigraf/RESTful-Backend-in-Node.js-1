const User = require('../db/models/user');
const jwt = require('jsonwebtoken');

async function isAdmin(req, res, next) {
    try {
        if (req.user.status === 'admin') {
            return next();
        }
    } catch (error) {
        next(error);
    }
    res.send(403);
}

module.exports = isAdmin;