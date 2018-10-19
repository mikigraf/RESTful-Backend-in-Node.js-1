/** 
 * Connect to MongoDB
 */
const chalk = require('chalk');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: true
});

mongoose.connection.on('connected', (success) => {
    console.log(chalk.green('✓ '), chalk.green('MongoDB connection was succesful.'));
});

mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log(chalk.red('✗ '), chalk.red('MongoDB connection error. Please make sure that MongoDB is running.'));
    process.exit();
});

module.exports.User = require("./models/user");