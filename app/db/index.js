/** 
 * Connect to MongoDB
 */
const chalk = require('chalk');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
if (process.env.env === 'DEV') {
    mongoose.connect(process.env.MONGODB_URI_DEV, {
        keepAlive: true
    });
} else {
    // production
    mongoose.connect(process.env.MONGODB_URI, {
        keepAlive: true
    });
}

mongoose.connection.on('connected', (success) => {
    console.log(chalk.green('✓ '), chalk.green('MongoDB connection was succesful.'));
});

mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log(chalk.red('✗ '), chalk.red('MongoDB connection error. Please make sure that MongoDB is running.'));
    process.exit();
});

module.exports.User = require("./models/user");
module.exports.Team = require('./models/team');
module.exports.Booking = require('./models/booking');
module.exports.Course = require('./models/Course');
module.exports.Court = require('./models/Court');
module.exports.Payment = require('./models/Payment');
module.exports.Price = require('./models/Price');
module.exports.Series = require('./models/Series');