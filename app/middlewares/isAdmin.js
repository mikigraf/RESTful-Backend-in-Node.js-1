const User = require('../db/models/user');
const jwt = require('jsonwebtoken');

async function isAdmin(req, res, next) {
    try {
        if (req.user.status === 'admin') {
            return next();
        }
    } catch (error) {
        res.status(500);
        return next(error);
    }
    res.status(401).send('Unathorized');
}

module.exports = isAdmin;