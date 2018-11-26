const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');

dotenv.load({
    path: '.env'
});

const bookingSchema = new mongoose.Schema({
    booked_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    description: String,
    players: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    type: {
        type: String,
        enum: ['single, abo, series, course']
    },
    series: {
        type: Schema.Types.ObjectId,
        ref: 'Series'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    court: {
        type: Schema.Types.ObjectId,
        ref: 'Court'
    },
    price: Number,
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }

}, {
    timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;