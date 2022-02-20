'use strict';

require('dotenv').config();

const axios = require('axios');

module.exports = {
    getGoogleOAuthURL: () => {
        const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
        const options = {
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            client_id: process.env.GOOGLE_CLIENT_ID,
            accesss_type: 'offline',
            prompt: 'consent',
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ].join(" "),
            response_type: 'code'
        };

        const params = new URLSearchParams(options);

        return `${rootURL}?${params.toString()}`
    },

    getGoogleAccessToken: async (code)=>{
        const data=`code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRETS}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`;

        try {
            const res = await axios.post('https://oauth2.googleapis.com/token', data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            
            return res.data;
        }
        catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    },

    getGoogleUser: async(access_token, id_token) =>{
        try{
            const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
                headers: {
                    Authorization: `bearer ${id_token}`
                }
            });
            return res;
        }
        catch(err){
            console.error(err);
            throw new Error(err.message);
        }
    }
};