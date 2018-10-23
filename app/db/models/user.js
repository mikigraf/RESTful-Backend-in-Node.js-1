const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');
/** 
 * Load environmental variables from .env file, where API keys and passwords are configured
 */
dotenv.load({
    path: '.env'
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
        validate: [
            validate({
                validator: 'isEmail',
                message: 'Not a valid email'
            })
        ]
    },
    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    google: String,

    profile: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
    },

    status: {
        type: String,
        enum: ['member', 'guest', 'admin'],
        required: true,
        default: process.env.DEFAULT_STATUS_FOR_REGISTERED_USER
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
    },
    activated: {
        type: Boolean,
        default: process.env.ACTIVE_AFTER_SIGNUP
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
userSchema.methods.comparePassword = async function (candidatePassword, cb) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;