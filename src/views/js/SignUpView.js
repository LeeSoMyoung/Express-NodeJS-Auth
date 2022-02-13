'use strict';

import AbstactView from "./AbstactView.js";

export default class extends AbstactView{
    constructor(){
        super();
        this.setTitle('회원가입');
    }

    async getHtml(){
        return ``;
    }

    attachEvent(){

    }
}