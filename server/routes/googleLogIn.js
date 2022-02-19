'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

const getGoogleAccessToken = async (code) => {

    const data=`code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRETS}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`;

    try {
        const res = await axios.post('https://oauth2.googleapis.com/token', data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        
        return res.data;
    }
    catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
};

const getGoogleUser = async (access_token, id_token) => {
    try{
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `bearer ${id_token}`
            }
        });
        return res;
    }
    catch(err){
        //console.error(err);
        throw new Error(err.message);
    }
};

router.get('/google', (req, res) => {
    const url = getGoogleOAuthURL();
    res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
    const code = req.query.code;
    const {access_token, id_token} = await getGoogleAccessToken(code);
    const userData = await getGoogleUser(access_token, id_token);

   if(userData){
        // 유저 정보를 성공적으로 불러왔으면
        console.log(userData);
        const currentUser = {
            uid: userData.data['id'],
            id:userData.data['email'],
            username: userData.data['name']
        };

        const token = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn:3600});

        res.cookie(process.env.COOKIE_NAME, token);

        res.redirect(process.env.URL_HOST);

        return res.status(200).send({
            message:"구글 로그인에 성공하였습니다"
        });
    }

    else{
        return res.status(403).send({
            message: "구글 로그인 정보를 불러오는데 실패하였습니다."
        });
    } 
});

module.exports = router;