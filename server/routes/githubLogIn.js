'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const githubLogInUtils = require('./utils/githubLogInUtils.js');

// End-point 2개
// 1. /login/github -> 깃허브 로그인 페이지로 리다이렉트
// 2. /login/github/callback -> 깃허브에서 발급한 토큰을 가지고 리다이렉트 되는 url

router.get('/github', (req, res) => {
    const githubAuthURL = githubLogInUtils.getGithubOAuthURL();
    res.redirect(githubAuthURL);
});

router.get('/github/callback', async (req, res) => {
    const code = req.query.code;
    const accessToken = await githubLogInUtils.getAccessToken(code);
    const githubUserData = await githubLogInUtils.getGithubUser(accessToken);

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