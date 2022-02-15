'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../../src/lib/db.js');

router.post('/', (req, res) => {

    const id = req.body.id;

    db.query(`
        SELECT * FROM USERS
        WHERE id = ${db.escape(id)}
    `,
        (dbErr, dbRes) => {
            if (dbErr) {
                // 쿼리문에서 에러가 발생했다면
                throw dbErr;
                return res.status(500).send({
                    message: dbErr
                });
            }
            if (dbRes.length === 0) {
                return res.status(401).send({
                    message: "존재하지 않는 유저입니다."
                });
            }
            else {
                bcrypt.compare(req.body.pw, dbRes[0]['pw'], (bErr, bRes) => {
                    if (bErr) {
                        // 비밀번호 확인 과정에서 bcrypt에서 에러가 났을 시
                        throw bErr;
                        return res.status(500).send({
                            message: bErr
                        });
                    }
                    if (bRes) {
                        // 비밀번호가 일치하면
                        const currentUser = {
                            uid: dbRes[0]['uid'],
                            id: dbRes[0]['id'],
                            username: dbRes[0]['username']
                        };

                        const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

                        res.cookie('accessToken', accessToken); // accessToken을 쿠키로 전달하여 브라우저에 저장한다.

                        return res.status(200).send({
                            message: "로그인 성공",
                            accessToken
                        });
                    }
                    else {
                        // 비밀번호가 일치하지 않으면
                        return res.status(403).send({
                            message: "아이디나 비밀번호가 일치하지 않습니다."
                        });
                    }
                });
            }
        });
});

module.exports = router;