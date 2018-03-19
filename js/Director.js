// 导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";

export class Director {

    // 实现单例模式
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    run() {
        const backgroundSprite = this.dataStore.get('background');
        backgroundSprite.draw();
    }

}