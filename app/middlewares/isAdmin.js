const User = require('../db/models/user');
const jwt = require('jsonwebtoken');

async function isAdmin(req, res, next) {
    const raw = req.headers.authorization;
    const token = raw.replace('Bearer ', '');
    const decoded_token = jwt.decode(token, process.env.JWT_SECRET);
    console.log(decoded_token);
    try {
        let user = await User.findById(decoded_token.user._id);
        if (user.status === 'admin') {
            return next();
        }
    } catch (error) {
        next(error);
    }
    res.redirect('/');
}

module.exports = isAdmin;