'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const db = require('../../src/lib/db.js');
const jwt = require('jsonwebtoken');


module.exports = router;