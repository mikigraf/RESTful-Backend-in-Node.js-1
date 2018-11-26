const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');

dotenv.load({
    path: '.env'
});

const courtSchema = new mongoose.Schema({
    name: String,
    opens_at: Number,
    closes_at: Number,
    prices: [{
        type: Schema.Types.ObjectId,
        ref: 'Price'
    }],
    booking_horizont: Number,
    possible_booking_period: {
        type: String,
        enum: ['30', '60']
    },
    required_cards_for_booking: {
        type: Number,
        default: 0
    },
    booking_rules: [{
        players: Number,
        booking_period: String
    }],
    min_players: {
        type: Number,
        default: 0
    },
    concurrent_reservations: {
        type: Number,
        default: 1
    }

}, {
    timestamps: true
});

const Court = mongoose.model("Court", courtSchema);
module.exports = Court;