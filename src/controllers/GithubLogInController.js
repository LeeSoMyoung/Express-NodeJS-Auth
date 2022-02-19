'use strict';

const fetch = require('node-fetch');

async function getAccessToken(code){
    await fetch('https://github.com/login/oauth/access_token',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    })
    .then((res)=>{
        res.json();
        const params = new URLSearchParams(res);
        return params.get('access_token');
    })
    .catch((err)=>{
        throw err;
        return res.status(500).send({
            message: "access token 발급에 실패하였습니다."
        });
    });
}

module.exports=getAccessToken;