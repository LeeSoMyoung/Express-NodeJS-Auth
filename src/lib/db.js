'use strict';

require('dotenv').config();

const mysql = require('mysql');

const db = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.connect((err,res)=>{
    if(err){
        // 에러가 존재한다면
        console.log(err);
    }
    else{
        console.log('MySQL is connected...');
    }
});

module.exports = db;