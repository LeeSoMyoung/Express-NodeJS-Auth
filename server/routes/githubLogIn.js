'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// End point 2개
// /login/github
// /login/github/callback

const getAccessToken = async (code) => {
    const data = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SERCRETS,
        code
    };
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const res = await axios.post('https://github.com/login/oauth/access_token', data, {
            headers: headers
        });
        const resData = res['data'];
        const params = new URLSearchParams(resData);
        return params.get('access_token');
    }
    catch (err) {
        throw err;
        console.log(err);
    }
}

const getGithubUser = async (accessToken) => {
    try {
        const req = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `bearer ${accessToken}`
            }
        });
        const data = await req['data'];
        return data;
    }
    catch(err){
        throw err;
        return res.status(403).message({
            message: "없는 계정이거나 올바르지 않은 계정입니다."
        });
    }
}

router.get('/github', (req, res) => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    res.redirect(githubAuthURL);
});

router.get('/github/callback', async (req, res) => {
    const code = req.query.code;
    const accessToken = await getAccessToken(code);
    const githubUserData = await getGithubUser(accessToken);

    if(!githubUserData){
        return res.status(500).send({
            message: "깃허브 유저 데이터를 불러오는데 실패하였습니다."
        });
    }
    else{
        // github 유저 데이터를 불러왔을 시

        const currentUser = {
            uid: githubUserData['id'],
            id: githubUserData['login'],
            username: githubUserData['name']
        };

        const token = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

        res.cookie(process.env.COOKIE_NAME, token);
        
        res.redirect(`http://localhost:${process.env.PORT}`);

        return res.status(200).send({
            message: "로그인 성공",
            accessToken: token
        });
    }
});

module.exports = router;