'use strict';

async function getUserName() {
    return await fetch('http://localhost:5000/user-info');
}

function onSignOutClick(event){
    event.preventDefault();
    fetch('http://localhost:5000/log-out');
    location.reload();
}

export { getUserName, onSignOutClick };