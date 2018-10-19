const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
    User
} = require('../db/index');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password) => {}));