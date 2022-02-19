'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const res = require('express/lib/response');

const getGoogleOAuthURL = () => {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        client_id: process.env.GOOGLE_CLIENT_ID,
        accesss_type: 'offline',
        prompt: 'consent',
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" "),
        response_type: 'code'
    };

    const params = new URLSearchParams(options);

    return `${rootURL}?${params.toString()}`
}

const getGoogleAccessToken = async (code)=>{
    const data = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRETS,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try{
        const res = await axios.post('https://oauth2.googleapis.com/token', data, {
            headers: headers
        });
        console.log('res',res);
        return res.data;
    }
    catch(err){
        throw err;
        console.log(err.message);
    }
};

const getGoogleUser = async (googleAccessToken)=>{

};

router.get('/google', (req, res) => {
    res.redirect(getGoogleOAuthURL());
});

router.get('/google/callback',(req,res)=>{
    const code = req.query.code;
    const accessToken = getGoogleAccessToken(code);
});

module.exports = router;