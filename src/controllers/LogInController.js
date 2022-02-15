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
        })
    })
        .then((res) => {
            console.log(res.json());
            navigateTo(location.origin);
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