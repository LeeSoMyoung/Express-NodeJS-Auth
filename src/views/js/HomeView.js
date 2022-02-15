'use strict';

import AbstactView from "./AbstactView.js";

export default class extends AbstactView{
    constructor(){
        super();
        this.setTitle('메인 화면');
    }

    async getHtml(){
        return `
            
        `;
    }

    attachEvent(){
        
    }
}