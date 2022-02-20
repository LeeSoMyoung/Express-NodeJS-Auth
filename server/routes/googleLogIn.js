'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const googleLogInUtils = require('./utils/googleLogInUtils.js');

router.get('/google', (req, res) => {
    const url = googleLogInUtils.getGoogleOAuthURL();
    res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
    const code = req.query.code;
    const { access_token, id_token } = await googleLogInUtils.getGoogleAccessToken(code);
    const userData = await googleLogInUtils.getGoogleUser(access_token, id_token);

    if (userData) {
        // 유저 정보를 성공적으로 불러왔으면
        const currentUser = {
            uid: userData.data['id'],
            id: userData.data['email'],
            username: userData.data['name']
        };

        const token = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });

        res.cookie(process.env.COOKIE_NAME, token);

        res.redirect(process.env.URL_HOST);

        return res.status(200).send({
            message: "구글 로그인에 성공하였습니다"
        });
    }

    else {
        return res.status(403).send({
            message: "구글 로그인 정보를 불러오는데 실패하였습니다."
        });
    }
});

module.exports = router;