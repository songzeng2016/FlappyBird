// 导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

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
        this.moveSpeed = 2;
    }

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] =
                this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    // 判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom
            || bird.bottom < pencil.top
            || bird.right < pencil.left
            || bird.left > pencil.right) {
            s = true;
        }
        return !s;
    }

    // 判断小鸟是否撞击地饭和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');

        if (birds.birdsY[0] + birds.birdsHeight[0] > land.y) {
            this.isGameOver = true;
            return;
        }

        // 小鸟的模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.y[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到铅笔了');
                this.isGameOver = true;
                return;
            }
        }

    }


    run() {
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            // 铅笔走到左边移出屏幕则消除铅笔
            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0
                && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
            }

            // 第一组铅笔走到屏幕中央且只有一组的时候再创建一组铅笔
            if (pencils[0].x < (window.innerWidth - pencils[0].width) / 2
                && pencils.length === 2) {
                this.createPencil();
            }

            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }
    }

}