const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const validate = require('mongoose-validator');

dotenv.load({
    path: '.env'
});

const teamSchema = new mongoose.Schema({
    leaders: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {
    timestamps: true
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;