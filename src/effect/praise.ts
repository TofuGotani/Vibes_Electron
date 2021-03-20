import * as PIXI from 'pixi.js';

const sprites = [
    PIXI.Sprite.from('../assets/cat1.png'),
    PIXI.Sprite.from('../assets/cat2.png'),
    PIXI.Sprite.from('../assets/cat3.png'),
];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const praiseAnimation = (app: PIXI.Application, praiseText: string): void => {
    const stage = app.stage, ticker = app.ticker;
    const width = app.screen.width, height = app.screen.height;

    const sprite = sprites[getRandomInt(0, 3)];
    sprite.x = width;
    sprite.y = 0.8 * height;
    sprite.anchor.set(0.5);
    sprite.scale.x = 0.4;
    sprite.scale.y = 0.4;

    stage.addChild(sprite);

    const serif = praiseText;

    const fukidasi = PIXI.Sprite.from('../assets/fukidasi.png');
    fukidasi.anchor.set(1);
    fukidasi.scale.x = serif.length * 0.03;
    fukidasi.scale.y = 0.2;

    const text = new PIXI.Text(serif, {fontFamily : 'Arial', fontSize: 18, fill : 0x080808, align : 'center'});
    text.anchor.set(0.5);

    let t = 0, dx = (0.15 * width + 266) / 20;

    const animation = () => {
        if(t < 20) {
            sprite.x -= dx;
            dx -= 2 - 0.1 * t;
        }
        else if(t < 25) {
            sprite.x += 0.1 * t - 2;
        }
        else if(t == 25) {
            fukidasi.x = sprite.x - 0.5 * sprite.scale.x * sprite.width;
            fukidasi.y = sprite.y - 0.5 * sprite.scale.y * sprite.height;
            text.x = fukidasi.x - 0.5 * fukidasi.width;
            text.y = fukidasi.y - 0.5 * fukidasi.height;
            stage.addChild(fukidasi);
            stage.addChild(text);
        }
        else if(t == 145) {
            stage.removeChild(fukidasi);
            stage.removeChild(text);
        }
        else if(150 < t) {
            sprite.x += dx;
            dx += 0.1 * t - 12;
        }
        else if(145 < t) {
            sprite.x -= 0.1 * t - 12;
        }
        else if(t >= 170) {
            stage.removeChild(sprite);
        }

        t++;
    };

    ticker.add(animation);

    setTimeout(() => {
        ticker.remove(animation);
        stage.removeChild(sprite);
        stage.removeChild(fukidasi);
        stage.removeChild(text);
    }, 3000);
};

export default praiseAnimation;