'use strict';

import { navigateTo } from '../router.js';

function onLogInBtnClick(event, id, pw) {
    event.preventDefault();

    fetch('http://localhost:5000/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": id,
            "pw": pw
        }),
        credentials: 'include'
    })
        .then((res) => {
            if (res.ok && res.status === 200) {
                navigateTo('http://localhost:5000');
            }
            else{
                return res.json().then((message)=>{
                    alert(message.message);
                    throw new Error(message);
                })
            }
        })
        .catch((err) => {
            throw err;
            console.log(err);
        });

}

function onSignUpBtnClick(event) {
    event.preventDefault();
    navigateTo(location.origin + '/sign-up');
}

export { onLogInBtnClick, onSignUpBtnClick };