const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');

dotenv.load({
    path: '.env'
});

const paymentSchema = new mongoose.Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    },
    amount: Number,
    date: Date

}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;