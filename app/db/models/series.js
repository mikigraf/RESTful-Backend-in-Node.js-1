const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');

dotenv.load({
    path: '.env'
});

const seriesSchema = new mongoose.Schema({
    repeats: {
        type: String,
        enum: ['daily', 'weekly', 'monthly']
    },
    begins: {
        type: Date,
        required: true
    },
    ends: {
        type: Date,
        required: true
    },
    repetitions: Number,
    booked_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

const Series = mongoose.model("Series", seriesSchema);
module.exports = Series;