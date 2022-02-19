'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');

const db = require('../../src/lib/db.js');

// End point 2개
// /login/github
// /login/github/callback


async function getAccessToken(code){
    const data = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SERCRETS,
        code
    };
    const headers={
        'Content-Type':'application/json'
    };
    
    try{
        const res = await axios.post('https://github.com/login/oauth/access_token',data, {
            headers: headers
        });  
        const resData = res['data'];
        const params = new URLSearchParams(resData);
        return params.get('access_token');
    }
    catch(err){
        throw err;
        console.log(err);
    }
}

router.get('/github', (req, res) => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    res.redirect(githubAuthURL);
});

router.get('/github/callback', async (req, res) => {
    const code = req.query.code;
    const accessToken = await getAccessToken(code);
    console.log(accessToken);
});

module.exports = router;