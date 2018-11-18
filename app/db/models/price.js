const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');

dotenv.load({
    path: '.env'
});

const priceSchema = new mongoose.Schema({
    from_hour: Number,
    until_hour: Number,
    price: Number
}, {
    timestamps: true
});

const Price = mongoose.model("Price", priceSchema);
module.exports = Price;