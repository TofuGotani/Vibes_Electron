import * as PIXI from 'pixi.js';

const red = 0xff4040, green = 0x40ff40, blue = 0x4040ff, orange = 0xff8040, yellow = 0xffff40, purple = 0xff40ff, cyan = 0x40ffff, white = 0xffffff;

const trail = {
    red: PIXI.Texture.from('../assets/trail_red.png'),
    green: PIXI.Texture.from('../assets/trail_green.png'),
    blue: PIXI.Texture.from('../assets/trail_blue.png'),
    orange: PIXI.Texture.from('../assets/trail_orange.png'),
    yellow: PIXI.Texture.from('../assets/trail_yellow.png'),
    purple: PIXI.Texture.from('../assets/trail_purple.png'),
    cyan: PIXI.Texture.from('../assets/trail_cyan.png'),
    white: PIXI.Texture.from('../assets/trail_white.png'),
    default: PIXI.Texture.from('../assets/trail.png')
};

class Fire extends PIXI.Graphics {

    public vx: number;
    public vy: number;
    public isActive: boolean;
    public rope: PIXI.SimpleRope;
    private da: number;
    private points: PIXI.Point[];
    private ropeSize: number;
    private trailTexture: PIXI.Texture;

    constructor(vx: number, vy: number, color: number) {
        super();
        this.vx = vx;
        this.vy = vy;
        this.da = 0.01;
        this.isActive = true;
        this.points = [];
        this.ropeSize = 20;
        switch(color) {
            case red:
                this.trailTexture = trail.red;
                break;
            case green:
                this.trailTexture = trail.green;
                break;
            case blue:
                this.trailTexture = trail.blue;
                break;
            case orange:
                this.trailTexture = trail.orange;
                break;
            case yellow:
                this.trailTexture = trail.yellow;
                break;
            case purple:
                this.trailTexture = trail.purple;
                break;
            case cyan:
                this.trailTexture = trail.cyan;
                break;
            case white:
                this.trailTexture = trail.white;
                break;
            default:
                this.trailTexture = trail.default;
        }

        for(let i = 0; i < this.ropeSize; i++) this.points.push(new PIXI.Point(0, 0));

        this.rope = new PIXI.SimpleRope(this.trailTexture, this.points);
        this.rope.blendMode = PIXI.BLEND_MODES.SCREEN;
    }

    init() {
        for(let i = 0; i < this.ropeSize; i++) {
            const p = this.points[i];
            p.x = this.x;
            p.y = this.y;
        }
    }

    tick() {
        this.x += this.vx * 0.1;
        this.y += this.vy * 0.1;
        this.vy += 0.49;
        this.alpha -= this.da;
        this.rope.alpha -= this.da;
        this.da *= 1.01;

        this.points.pop();
        this.points.unshift(new PIXI.Point(this.x, this.y));

        if(this.alpha <= 0.0) this.isActive = false;
    }
}

const particleAnimation = (app: PIXI.Application): void => {
    const stage = app.stage, ticker = app.ticker;
    const width = app.screen.width, height = app.screen.height;
    const colors = [
        [red, red],
        [green, green],
        [blue, blue],
        [orange, orange],
        [yellow, yellow],
        [purple, purple],
        [cyan, cyan],
        [purple, orange],
        [red, blue],
        [orange, red],
        [red, yellow],
        [green, purple],
        [red, cyan],
    ];
    let fires: Fire[] = [];

    const size = Math.random() * 50 + 75;
    let x = (Math.random() * 0.6 + 0.2) * width, y = height;
    const fire = new Fire(0, -size, white);
    fire.x = x;
    fire.y = y; 
    fire.init();
    fires.push(fire);
    stage.addChild(fire.rope);

    let flag = false;
    let t = 0;

    const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

    const animation = () => {
        for(const fire of fires) {
            fire.tick();
        }

        fires = fires.filter((fire: Fire) => {
            if(!fire.isActive) {
                stage.removeChild(fire.rope);
                x = fire.x;
                y = fire.y;
                return false;
            }
            return true;
        });

        if(!flag && fires.length == 0 && t <= 20) t++;
        else if(!flag && fires.length == 0) {
            const cn = getRandomInt(0, colors.length);
            const c1 = colors[cn][0];
            const c2 = colors[cn][1];
            for(let i = 0; i < 32; i++) {
                const th = Math.random() * 2.0 * Math.PI, v = Math.random() * (10 + 0.1 * size) + 5;
                const vx = v * Math.cos(th), vy = v * Math.sin(th);
                const fire = new Fire(vx, vy, c1);
                fire.x = x;
                fire.y = y;
                fire.init();
                fires.push(fire);
                stage.addChild(fire.rope);
            }
            for(let i = 0; i < 48; i++) {
                const th = Math.random() * 2.0 * Math.PI, v = Math.random() * (10 + 0.1 * size) + (15 + 0.1 * size);
                const vx = v * Math.cos(th), vy = v * Math.sin(th);
                const fire = new Fire(vx, vy, c2);
                fire.x = x;
                fire.y = y;
                fire.init();
                fires.push(fire);
                stage.addChild(fire.rope);
            }

            flag = true;
        }
    };

    ticker.add(animation);

    setTimeout(() => {
        ticker.remove(animation);
        for(const fire of fires) {
            stage.removeChild(fire.rope);
        }
    }, 10000);
};

export default particleAnimation;