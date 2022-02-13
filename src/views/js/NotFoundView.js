'use strict';

import AbstactView from "./AbstactView.js";

export default class extends AbstactView{
    constructor(){
        super();
        this.setTitle('존재하지 않는 화면입니다.');
    }

    async getHtml(){
        return `
        <h1>
            존재하지 않는 화면입니다.
        </h1>
        `;
    }
}