'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();

const db = require('../../src/lib/db.js');

router.get('/github',(req,res)=>{
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    res.redirect(githubAuthURL);
});

module.exports=router;