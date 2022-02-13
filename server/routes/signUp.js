'use strict';

require('dotenv').config();

const db = require('../../src/lib/db.js');

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const registerMiddleware = require('./middlewares/users.js');

router.post('/', registerMiddleware.validRegister, async (req, res) => {
    const { id, username } = req.body;

    db.query(`
        SELECT uid FROM USERS
        WHERE id = ${db.escape(id)}
    `,
        (err, result) => {
            if (err) {
                // DB 쿼리문에서 발생시
                throw err;
                return res.status(400).send({
                    message: err
                });
            }

            if (result.length!==0) {
                // 유저가 존재할때
                return res.status(400).send({
                    message: "이미 존재하는 아이디입니다."
                });
            }
            else {
                bcrypt.hash(req.body.pw, parseInt(process.env.BCRYPT_NUM),
                    (bErr, bRes) => {
                        if (bErr) {
                            // 비밀번호 해싱 과정에서 오류가 생겼다면
                            throw bErr;
                            return res.status(500).send({
                                message: bErr
                            });
                        }
                        else {
                            db.query(`
                        INSERT INTO USERS
                        (uid, id, pw, username)
                        VALUES
                        (${db.escape(uuid.v4())}, ${db.escape(id)}, ${db.escape(bRes)}, ${db.escape(username)})
                    `,
                                (insertErr, insertResult) => {
                                    if (insertErr) {
                                        // 삽입 이상
                                        throw insertErr;
                                        return res.status(500).send({
                                            message: insertErr
                                        });
                                    }
                                    else {
                                        return res.status(201).send({
                                            message: "회원가입이 되었습니다."
                                        });
                                    }
                                });
                        }
                    });
            }
        });
});

module.exports = router;