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
            if(err){
                done(err);
            }
            else{
                console.log(res.body);
            }
        });
    });

    it('2. 회원가입 실패 - 아이디와 비밀번호가 너무 짧음',(done)=>{
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
            if(err){
                done(err);
            }
            else{
                console.log(res.body);
            }
        });
    })
    
});