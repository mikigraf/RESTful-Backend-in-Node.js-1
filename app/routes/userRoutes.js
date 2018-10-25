const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const isAdmin = require('../middlewares/isAdmin');

// return list of all users
router.get('/users');

// return user data with specified id
router.get('/users/:id');

// create users from given json array containing users data
router.post('/users');

// delete user with specified id
router.delete('/users/:id');