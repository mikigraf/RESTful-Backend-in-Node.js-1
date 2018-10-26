const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const toBoolean = require('to-boolean');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pswgen = require('generate-password');
const emailTransporter = require('./nodemailerConfig');

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
        if (toBoolean(process.env.ACCEPTING_SIGNUPS)) {
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const address = req.body.address;
            const birthday = req.body.birthday;
            var status = req.body.status;

            try {
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

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails']
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({
                'facebook': profile.id
            });

            // user has been found
            if (user) {
                return done(null, user);
            } else {
                //user does not exist yet
                if (toBoolean(process.env.ACCEPTING_SIGNUPS)) {
                    const email = profile.emails[0].value;
                    const firstName = profile.displayName.split(' ')[0];
                    const lastName = profile.displayName.split(' ')[1];
                    const username = profile.displayName;
                    const password = pswgen.generate({
                        length: 10,
                        numbers: true
                    });

                    try {
                        const user = await User.create({
                            'email': email,
                            'username': username,
                            'password': password,
                            'profile.firstName': firstName,
                            'profile.lastName': lastName,
                            'status': process.env.DEFAULT_STATUS_FOR_REGISTERED_USER,
                            'facebook': profile.id
                        });

                        const mailOptions = {
                            from: process.env.CLIENT_EMAIL_ADDRESS,
                            to: email,
                            subject: 'Welcome to WSIT!',
                            text: 'Welcome to WSIT! Your can login with Facebook or login using your username: ' + username + ' and password: ' + password
                        };
                        emailTransporter.sendMail(mailOptions);
                        return done(null, user);
                    } catch (error) {
                        return done(error);
                    }
                } else {
                    return done(null, false);
                }
            }
        } catch (error) {
            return done(error);
        }

    }));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/api/auth/google/callback",
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({
                'google': profile.id
            });

            if (user) {
                return done(null, user);
            } else {
                if (toBoolean(process.env.ACCEPTING_SIGNUPS)) {
                    const email = profile.emails[0].value;
                    const firstName = profile.name.givenName;
                    const lastName = profile.name.familyName;
                    const username = profile.displayName;
                    const password = pswgen.generate({
                        length: 10,
                        numbers: true
                    });

                    try {
                        const user = await User.create({
                            'email': email,
                            'username': username,
                            'password': password,
                            'profile.firstName': firstName,
                            'profile.lastName': lastName,
                            'status': process.env.DEFAULT_STATUS_FOR_REGISTERED_USER,
                            'google': profile.id
                        });

                        const mailOptions = {
                            from: process.env.CLIENT_EMAIL_ADDRESS,
                            to: email,
                            subject: 'Welcome to WSIT!',
                            text: 'Welcome to WSIT! Your can login with Google or login using your username: ' + username + ' and password: ' + password
                        };
                        emailTransporter.sendMail(mailOptions);

                        return done(null, user);
                    } catch (error) {
                        return done(error);
                    }
                } else {
                    return done(null, false);
                }
            }
        } catch (error) {
            return done(error);
        }
    }));

    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            let err, user = await User.findOne({
                id: jwt_payload.sub
            });

            if (err) return done(err, false);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }));
}