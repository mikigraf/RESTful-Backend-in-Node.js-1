const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const dotenv = require('dotenv');
/** 
 * Load environmental variables from .env file, where API keys and passwords are configured
 */
dotenv.load({
    path: '.env'
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: false
    },
    username: {
        type: String,
        unique: true
    },

    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    google: String,

    profile: {
        firstName: String,
        lastName: String,
        address: String,
        birthday: Date,
    },

    status: {
        type: String,
        enum: ['member', 'guest']
    },

    cardsAmount: {
        type: Number,
        default: process.env.DEFAULT_AMOUNT_OF_CARDS
    },

    accountBalance: {
        type: Number,
        default: process.env.STARTING_BALANCE
    },

    settings: {
        emailNotifications: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});

/**
 * Password hashing
 */
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified("password")) {
            next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

/**
 * Compare password hashes
 */
userSchema.methods.comparePassword = async function (candidatePassword, cb) => {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;