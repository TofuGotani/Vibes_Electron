import * as PIXI from 'pixi.js';

const originalSprites = [
    '../assets/cat1.png',
    '../assets/cat2.png',
    '../assets/cat3.png',
];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

class Sprites {

    public list: PIXI.Sprite[];
    private app: PIXI.Application;
    private dx: number;
    private num: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    
    constructor(app: PIXI.Application, num: number) {
        this.app = app;
        const width = app.screen.width, height = app.screen.height, stage = app.stage;

        this.list = [];
        this.num = num;

        for(let i = num - 1; i >= 0; i--) {
            const sprite = PIXI.Sprite.from(originalSprites[getRandomInt(0, 3)]);
            sprite.x = width + 0.05 * width * i;
            sprite.y = 0.8 * height - 0.05 * width * i;
            sprite.anchor.set(0.5);
            sprite.height *= 0.15 * width / sprite.width;
            sprite.width = 0.15 * width;
            this.list.push(sprite);
            stage.addChild(sprite);
        }

        this.x = this.list[num - 1].x;
        this.y = this.list[num - 1].y;
        this.width = this.list[num - 1].width;
        this.height = this.list[num - 1].height;

        this.dx = (0.15 * width + 266) / 20;
    }

    tick(t: number) {
        if(t < 20) {
            for(let i = 0; i < this.num; i++) this.list[i].x -= this.dx;
            this.dx -= 2 - 0.1 * t;
        }
        else if(t < 30) {
            for(let i = 0; i < this.num; i++) this.list[i].x += 0.1 * t - 2;
        }
        else if(150 < t) {
            for(let i = 0; i < this.num; i++) this.list[i].x += this.dx;
            this.dx += 0.1 * t - 15;
        }
        else if(140 < t) {
            for(let i = 0; i < this.num; i++) this.list[i].x -= 15 - 0.1 * t;
        }
        else if(t >= 170) {
            for(let i = 0; i < this.num; i++) this.app.stage.removeChild(this.list[i]);
        }

        this.x = this.list[this.num - 1].x;
        this.y = this.list[this.num - 1].y;
    }
}

const praiseAnimation = (app: PIXI.Application, praiseText: string, num: number): void => {
    const stage = app.stage, ticker = app.ticker;

    const sprite = new Sprites(app, num);

    const serif = praiseText;

    const fukidasi = PIXI.Sprite.from('../assets/fukidasi.png');
    fukidasi.anchor.set(1);
    fukidasi.scale.x = serif.length * 0.03;
    fukidasi.scale.y = 0.2;

    const text = new PIXI.Text(serif, {fontFamily : 'Arial', fontSize: 18, fill : 0x080808, align : 'center'});
    text.anchor.set(0.5);

    let t = 0;

    const animation = () => {
        if(t == 30) {
            fukidasi.x = sprite.x - 0.25 * sprite.width;
            fukidasi.y = sprite.y - 0.25 * sprite.height;
            text.x = fukidasi.x - 0.5 * fukidasi.width;
            text.y = fukidasi.y - 0.5 * fukidasi.height;
            stage.addChild(fukidasi);
            stage.addChild(text);
        }
        else if(t == 140) {
            stage.removeChild(fukidasi);
            stage.removeChild(text);
        }

        sprite.tick(t);

        t++;
    };

    ticker.add(animation);

    setTimeout(() => {
        ticker.remove(animation);
        stage.removeChild(fukidasi);
        stage.removeChild(text);
        for(let i = 0; i < num; i++) stage.removeChild(sprite.list[i]);
    }, 3000);
};

export default praiseAnimation;