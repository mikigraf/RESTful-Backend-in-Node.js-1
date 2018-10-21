const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const toBoolean = require('to-boolean');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const {
    User
} = require('../db/index');



module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    passport.use('signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        console.log("sign");
        if (toBoolean(process.env.ACCEPTING_SIGNUPS)) {
            console.log("if");
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const address = req.body.address;
            const birthday = req.body.birthday;
            var status = 'guest';
            if (req.body.status === 'member' || req.body.status === 'guest' && toBoolean(process.env.GUESTS_ALLOWED)) {
                status = req.body.status;
            }


            try {
                console.log("create user");
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

                done(user);
            } catch (error) {
                done(error);
            }
        } else {
            done();
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({
                'username': username
            });

            // User wasn't found
            if (!user) {
                return done(null, false, {
                    message: 'Wrong username or password.'
                });
            }

            // Password compare passwords
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, {
                    message: 'Wrong username or password.'
                });
            }

            // If everything went ok, send user information to the next middleware
            return done(null, user, {
                message: 'Logged in successfully'
            });
        } catch (error) {
            done(error);
        }
    }));

    passport.use(new JwtStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (token, done) => {
        try {
            return done(null, token.user)
        } catch (error) {
            done(error);
        }
    }));
}