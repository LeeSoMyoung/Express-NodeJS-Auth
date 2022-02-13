'use strict';

const db = require('../../src/lib/db.js');

const express = require('express');
const router = express.Router();

const registerMiddleware = require('./middlewares/register.js');

router.post('/',registerMiddleware.validRegister,(req,res)=>{
    console.log(req);
});

module.exports = router;