const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');

dotenv.load({
    path: '.env'
});

const courseSchema = new mongoose.Schema({
    max_participants: Number,
    participants: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    bookings: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;