'use strict';

import AbstractView from './AbstactView.js';

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('로그인하기');
    }

    async getHtml(){
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
                    <button id="btn__signUp">회원가입</button>
                    <button id="btn__naver__signUp">네이버로 회원가입</button>
                    <button id="btn__github__signUp">깃허브로 회원가입</button>
                    <button id="btn__google__signUp">구글로 회원가입</button>
                </div>
            </div>
        `;
    }

    attachEvent(){

    }
}