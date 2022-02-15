'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    return res.clearCookie('accessToken').status(200).send({
        message:"로그아웃 되었습니다."
    });
});

module.exports = router;