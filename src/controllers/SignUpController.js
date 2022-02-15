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
        }
    })
        .then((res) => {
            console.log(res.json());
            navigateTo(location.origin+'login');
        })
        .catch((err) => {
            throw err;
            console.log(err);
        });
}

export { onSignUpSubmit };