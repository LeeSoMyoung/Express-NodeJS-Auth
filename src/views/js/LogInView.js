'use strict';

import AbstractView from './AbstactView.js';
import { onLogInBtnClick, onSignUpBtnClick, onGithubLogInClick, onGoogleLogInClick } from '../../controllers/LogInController.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('로그인하기');
    }

    async getHtml() {
        return `
            <div class="login-container">
                <form>
                    <input id="input__id" placeholder="아이디를 입력하세요"
                    required>
                    <input id="input__pw" placeholder="비밀번호를 입력하세요"
                    required type="password">
                </form>
                <div class="div__btns">
                    <button id="btn__signIn">로그인</button>
                    <button id="btn__GoogleSignIn">구글로 로그인</button>
                    <button id="btn__GithubSignIn">깃허브로 로그인</button>
                </div>
                <div class="div__btns">
                    <button id="btn__signUp">회원가입</button>
                </div>
            </div>
        `;
    }

    attachEvent() {
        const user_id = document.querySelector('#input__id');
        const user_pw = document.querySelector('#input__pw');

        const form__signIn = document.querySelector('form');
        
        const btn__signIn = document.querySelector('#btn__signIn');
        const btn__signUp = document.querySelector('#btn__signUp');
        const btn__GithubSignIn = document.querySelector('#btn__GithubSignIn');
        const btn__GoogleSignIn = document.querySelector('#btn__GoogleSignIn');

        //// 일반 로그인 폼 제출 관련 이벤트 리스너
        form__signIn.addEventListener('submit', (event)=>{
            onLogInBtnClick(event, user_id.value, user_pw.value)
        });
        btn__signIn.addEventListener('click', (event)=>{
            onLogInBtnClick(event, user_id.value, user_pw.value)
        });

        /////// 회원가입 및 oAuth 로그인 관련 이벤트 리스너

        btn__signUp.addEventListener('click', onSignUpBtnClick);
        btn__GithubSignIn.addEventListener('click', onGithubLogInClick);
        btn__GoogleSignIn.addEventListener('click', onGoogleLogInClick);

    }
}