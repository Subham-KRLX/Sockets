// routes.js - Express router for /users

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateUser } = require('./middleware');

// GET /users - returns list of users
router.get('/', controller.getUsers);

// POST /users - create a new user (uses validateUser middleware)
router.post('/', validateUser, controller.createUser);

module.exports = router;
