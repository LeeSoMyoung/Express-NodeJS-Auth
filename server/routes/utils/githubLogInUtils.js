'use strict';

require('dotenv').config();

const axios = require('axios');

module.exports = {
    getGithubOAuthURL: ()=>{
        return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`;
    },
    getAccessToken : async(code)=>{
        const data = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SERCRETS,
            code
        };
        const headers = {
            'Content-Type': 'application/json'
        };
    
        try {
            const res = await axios.post('https://github.com/login/oauth/access_token', data, {
                headers: headers
            });
            const resData = res['data'];
            const params = new URLSearchParams(resData);
            return params.get('access_token');
        }
        catch (err) {
            throw err;
            console.log(err);
        }
    },

    getGithubUser: async (accessToken) =>{
        try {
            const req = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `bearer ${accessToken}`
                }
            });
            const data = await req['data'];
            return data;
        }
        catch(err){
            throw err;
            return res.status(403).message({
                message: "없는 계정이거나 올바르지 않은 계정입니다."
            });
        }
    }
};