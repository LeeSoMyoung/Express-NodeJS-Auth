'use strict';

import AbstactView from "./AbstactView.js";
import { getUserName, onSignOutClick } from '../../controllers/MainController.js';

export default class extends AbstactView {
    constructor() {
        super();
        this.setTitle('로그인 성공 후 메인 화면');
    }

    async getHtml() {
        return `
        <div class ="user-data">
            <h1 id="greeting"></h1>
            <h3 id="h3__showID"></h3>
        </div>
        <div class="div__btns">
            <button id="logout">로그아웃</button>
        </div>
        `;
    }

    async attachEvent() {
        const h1__greeting = document.querySelector('#greeting');
        const h3__showID = document.querySelector('#h3__showID');
        const signOut = document.querySelector('#logout');

        let userData = await getUserName();

        let data = await userData.json();

        const username = data.username;
        const id = data.id;

        signOut.addEventListener('click', onSignOutClick);

        h1__greeting.innerText = `${username}님, 반갑습니다.`;
        h3__showID.innerText = `${username}의 ID는 ${id}입니다.`;
    }
}