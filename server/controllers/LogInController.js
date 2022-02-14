'use strict';

require('dotenv').config();

const axios = require('axios');

export default function onLogInSubmit(event, id, pw) {
    event.preventDefault();

    axios.post(`${process.env.URL_HOST}/login`,{
        "id": id,
        "pw": pw
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
}
