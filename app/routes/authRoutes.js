const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

/**
 * @api {post} /signup Register 
 * @apiName Signup new user with local strategy
 * @apiGroup Authentication
 * 
 * @apiSuccess {Object} user user object. 
 * 
 * @apiError UserNotFound The id of the User was not found.
 * @apiError SignupsOff Club has deactivated registration.
 */
router.post('/signup', passport.authenticate('signup', {
    session: false
}), async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

/**
 * @api {post} /login Login 
 * @apiName Login using local strategy
 * @apiGroup Authentication
 * 
 * @apiSuccess {String} String Json Web Token for use with Authorization/Bearer header.
 * 
 */
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occured');
                return next(error);
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) return next(error);

                const body = {
                    _id: user._id,
                    email: user.username
                };

                const token = jwt.sign({
                    user: body
                }, process.env.JWT_SECRET);
                return res.json({
                    token
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;