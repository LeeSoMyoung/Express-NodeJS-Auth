'use strict';

import AbstactView from "./AbstactView.js";
import { onSignUpSubmit, onGithubSignUp, onGoogleSignUp } from "../../controllers/SignUpController.js";

export default class extends AbstactView {
    constructor() {
        super();
        this.setTitle('회원가입');
    }

    async getHtml() {
        return `
        <div class = "input__signUp">
            <input id = "input__sign-up__username" required
            placeholder="유저 이름">
            <input id="input__sign-up__id" required
            placeholder = "아이디">
            <input id = "input__sign-up__pw" required
            type="password" placeholder="비밀번호">
            <input id="input__sign-up__pw-repeat" required
            type="password" placeholder = "비밀번호 확인" >
        </div>
        <div class="div__btns">
            <button id="btn__signUp">회원가입</button>
            <button id="btn__GoogleSignUp">구글로 회원가입</button>
            <button id="btn__GithubSignUp">깃허브로 회원가입</button>
        </div>
        `;
    }

    attachEvent() {
        const signUp = document.querySelector('#btn__signUp');

        const username = document.querySelector('#input__sign-up__username');
        const id = document.querySelector('#input__sign-up__id');
        const pw = document.querySelector('#input__sign-up__pw');
        const pw_repeat = document.querySelector('#input__sign-up__pw-repeat');

        const btn__GoogleSignUp = document.querySelector('#btn__GoogleSignUp');
        const btn__GithubSignUp = document.querySelector('#btn__GithubSignUp');

        ///// 일반 회원가입 관련 이벤트 리스너
        signUp.addEventListener('click', (event) => {
            onSignUpSubmit(event, id.value, pw.value, pw_repeat.value, username.value);
        });

        //// oAuth 관련 회원가입 버튼 이벤트 리스너
        btn__GithubSignUp.addEventListener('click', onGithubSignUp);
        btn__GoogleSignUp.addEventListener('click', onGoogleSignUp);
    }
}