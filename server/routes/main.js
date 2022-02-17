'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();

const userMiddleware = require('./middlewares/users.js');

router.get('/', userMiddleware.isLoggedIn);

router.get('/user-info', userMiddleware.isLoggedIn, (req,res) => {
    return res.status(200).send({
        id: req.id,
        uid: req.uid,
        username:req.username
    });
});

router.get('/log-out',userMiddleware.isLoggedIn, (req,res)=>{
    res.clearCookie('accessToken').status(200).send({
        message:"로그아웃 되었습니다."
    });
    res.redirect('http://localhost:5000/login');
});

module.exports = router;