'use strict';

import { navigateTo } from '../router.js';

function onSignUpSubmit(event, id, pw, pw_repeat, username) {
    event.preventDefault();

    fetch('http://localhost:5000/sign-up', {
        method: "POST",
        body: JSON.stringify({
            "id": id,
            "pw": pw,
            "pw_repeat": pw_repeat,
            "username": username
        }),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then((res) => {
            if(res.ok && res.status ===201){
                // 회원가입에 성공했을 시
                navigateTo(location.origin+'/login');
            }
            else{
                // 회원가입 과정에서 오류가 존재할 시
                res.json().then((errMsg)=>{
                    alert(errMsg.message);
                    throw new Error(errMsg);
                });
            }
        })
        .catch((err) => {
            throw err;
            console.log(err);
        });
}

export { onSignUpSubmit };