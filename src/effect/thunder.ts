import * as PIXI from 'pixi.js';

const thunderAnimation = (app: PIXI.Application): void => {
    const stage = app.stage, ticker = app.ticker;
    const width = app.screen.width, height = app.screen.height;

    const thunder = new PIXI.Container();
    stage.addChild(thunder);

    const dl = 20.0, dt = Math.PI / 4.0;
    let da = 0.1;
    let x = 0.0, y = 0.0;
    let th = (Math.random() - 0.5) * dt, lth = 0.0;
    let nx = dl * Math.sin(th), ny = dl * Math.cos(th);
    let count = 0;
    const n = Math.floor(Math.random() * 50) + 10;
    const thunderColor = 0xFFFFFF;
    const parts: PIXI.Graphics[] = [];

    while(y < height) {
        const part = new PIXI.Graphics();
        part.lineStyle(5, thunderColor).moveTo(x, y).lineTo(nx, ny);
        thunder.addChild(part);
        parts.push(part);

        x = nx;
        y = ny;
        lth = th;
        th = Math.max(-dt, Math.min(dt, (Math.random() - 0.5) * dt + lth));
        nx = x + dl * Math.sin(th);
        ny = y + dl * Math.cos(th);
        
        if(n == count) {
            subThunder(x, y, width, height, thunder);
        }
        count++;
    }

    thunder.x = (Math.random() * 0.6 + 0.2) * width;
    thunder.y = 0.0;

    const animation = () => {
        thunder.alpha -= da;
        da *= 0.9;
        if(thunder.alpha < 0) thunder.alpha = 0;
    };

    ticker.add(animation);

    setTimeout(() => {
        ticker.remove(animation);
        stage.removeChild(thunder);
    }, 500);
};

const subThunder = (x: number, y: number, width: number, height: number, thunder: PIXI.Container): void => {
    const dl = 20.0, dt = Math.PI / 4.0;
    let th = (Math.random() - 0.5) * dt, lth = 0.0;
    let nx = x + dl * Math.sin(th), ny = y + dl * Math.cos(th);

    while(y < height) {
        const part = new PIXI.Graphics();
        part.lineStyle(5, 0xFFFFFF).moveTo(x, y).lineTo(nx, ny);
        thunder.addChild(part);

        x = nx;
        y = ny;
        lth = th;
        th = Math.max(-dt, Math.min(dt, (Math.random() - 0.5) * dt + lth));
        nx = x + dl * Math.sin(th);
        ny = y + dl * Math.cos(th);
        
        if(Math.floor(Math.random() * 120) == 0) {
            subThunder(x, y, width, height, thunder);
        }
    }
};

export default thunderAnimation;