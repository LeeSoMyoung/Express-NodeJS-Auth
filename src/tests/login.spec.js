'use strict';

require('dotenv').config();

const supertest = require('supertest');

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

describe('로그인 테스트================= ',()=>{
    it('로그인 성공의 경우',(done)=>{
        server
        .post('/login')
        .send({
            "id": "abcdefg",
            "pw":"123456"
        })
        .expect(200)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    });

    it('로그인 실패 - 존재하지 않는 유저',(done)=>{
        server
        .post('/login')
        .send({
            "id": "jaslkgjklsdjflkjaskldfjklasjdf",
            "pw": "aff"
        })
        .expect(401)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    });

    it('로그인 실패 - 비밀번호가 틀림',(done)=>{
        server
        .post('/login')
        .send({
            "id": "abcdefg",
            "pw": "123"
        })
        .expect(403)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    })
    
});