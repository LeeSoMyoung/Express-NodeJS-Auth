'use strict';

require('dotenv').config();

const should = require('should');
const supertest = require('supertest');

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

describe('회원가입 테스트================= ',()=>{
    it('1. 회원가입 성공의 경우',(done)=>{
        server
        .post('/sign-up')
        .send({
            "id": "so4644009",
            "pw": "a123456789",
            "pw_repeat": "a123456789",
            "username": "이소명"
        })
        .expect(201)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    });

    it('2. 회원가입 실패 - 비밀번호와 비밀번호 확인이 일치하지 않음',(done)=>{
        server
        .post('/sign-up')
        .send({
            "id": "jaslkgjklsdjflkjaskldfjklasjdf",
            "pw": "aff",
            "pw_repeat": "a",
            "username": "안알랴줌"
        })
        .expect(400)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    });

    it('3. 회원가입 실패 - 아이디가 너무 짧음',(done)=>{
        server
        .post('/sign-up')
        .send({
            "id": "j",
            "pw": "123456789",
            "pw_repeat": "123456789",
            "username": "안알랴줌"
        })
        .expect(400)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    });
    
    it('4. 회원가입 실패 - username이 입력되지 않음',(done)=>{
        server
        .post('/sign-up')
        .send({
            "id": "jaslkgjklsdjflkjaskldfjklasjdf",
            "pw": "123456789",
            "pw_repeat": "123456789",
            "username": ""
        })
        .expect(400)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    });

    it('5. 회원가입 성공',(done)=>{
        server
        .post('/sign-up')
        .send({
            "id": "jaslkgjklsdjflkjaskldfjklasjdf",
            "pw": "123456",
            "pw_repeat": "123456",
            "username": "안알랴줌"
        })
        .expect(201)
        .end((err,res)=>{
            console.log(res);
            done();
        });
    });

});