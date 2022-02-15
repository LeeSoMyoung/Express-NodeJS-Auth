'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();

const userMiddleware = require('./middlewares/users.js');

router.get('/', userMiddleware.isLoggedIn, (req, res) => {
    console.log(req.user);
});

module.exports = router;