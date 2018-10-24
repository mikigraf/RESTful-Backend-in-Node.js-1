const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: process.env.CLIENT_EMAIL_ADDRESS,
        pass: process.env.CLIENT_EMAIL_PASSWORD
    }
});

module.exports = transporter;