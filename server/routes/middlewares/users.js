'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = {
    validRegister: (req, res, next) => {

        const id = req.body.id;
        const username = req.body.username;

        if (!id || id.length < 3) {
            return res.status(400).send({
                message: "아이디가 너무 짧거나 입력되지 않았습니다."
            });
        }

        if (!req.body.pw || req.body.pw.length < 3) {
            return res.status(400).send({
                message: "비밀번호가 너무 짧거나 입력되지 않았습니다."
            });
        }

        if (!req.body.pw_repeat || req.body.pw_repeat !== req.body.pw) {
            return res.status(400).send({
                message: "비밀번호 확인란이 입력되지 않았거나 너무 짧습니다."
            });
        }

        if (!username) {
            return res.status(400).send({
                message: "사용자 이름이 입력되지 않았습니다."
            });
        }

        next();
    },

    isLoggedIn: (req, res, next) => {
        
        const accessToken = req.cookies[process.env.COOKIE_NAME]; // 쿠키에 토큰이 있는지 체크

        if(!accessToken){
            res.redirect('http://localhost:5000/login');
        }
        else{
            // 토큰이 존재할 때
            try{
                const isValid = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                req.username = isValid.username;
                req.id = isValid.id;
                req.uid = isValid.uid;
                next();
            }
            catch(err){
                throw err;
                return res.send(403).send({
                    message:"아이디나 비밀번호가 일치하지 않습니다."
                });
            }
        }
    }
};