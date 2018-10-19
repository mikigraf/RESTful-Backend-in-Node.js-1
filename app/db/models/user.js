const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

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
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, {
    timestamps: true
});

/**
 * Password hashing
 */
userSchema.pre('save', async (next) => {
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
userSchema.methods.comparePassword = async (candidatePassword, cb) => {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;