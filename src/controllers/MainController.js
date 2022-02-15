'use strict';

export default async function getUserName(){
    return await fetch('http://localhost:5000/user-info');
}