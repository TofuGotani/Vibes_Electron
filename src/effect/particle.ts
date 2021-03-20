import * as PIXI from 'pixi.js';

class Particle extends PIXI.Graphics {

    public vx: number;
    public vy: number;
    private da: number;
    public isActive: boolean;

    constructor(vx: number, vy: number) {
        super();
        this.vx = vx;
        this.vy = vy;
        this.da = 0.01;
        this.isActive = true;
    }

    tick() {
        this.x += this.vx * 0.1;
        this.y += this.vy * 0.1;
        this.vy += 0.98;
        this.alpha -= this.da;
        this.da *= 1.01;

        if(this.alpha <= 0.0) this.isActive = false;
    }
}

// processingのmap関数がjsに見当たらないので自分で実装
const map = (value: number, min1: number, max1: number, min2: number, max2: number) => (max2 - min2) * (value - min1) / (max1 - min1) + min2;

const particleAnimation = (app: PIXI.Application): void => {
    const stage = app.stage, ticker = app.ticker;
    const width = app.screen.width, height = app.screen.height;
    let particles: Particle[] = [];

    let t = 0;
    const animation = () => {
        for(const particle of particles) {
            particle.tick();
        }

        particles = particles.filter((particle: Particle) => {
            if(!particle.isActive) {
                stage.removeChild(particle);
                return false;
            }
            return true;
        });

        if(t < 10) {
            for(let i = 0; i < 2; i++) {
                const r = Math.round(Math.random() * 0xbf + 0x40), g = Math.round(Math.random() * 0xbf + 0x40), b = Math.round(Math.random() * 0xbf + 0x40);
                const color = 0x010000 * r + 0x000100 * g + 0x000001 * b;
                const vx = 50 * Math.cos(Math.random() * 2 * Math.PI), vy = Math.random() * 100 - 150;
                const pn = 5;
                for(let i = 1; i <= pn; i++) {
                    const particle = new Particle(vx, vy);
                    particle.beginFill(color, map(i, 1, pn, 1, 0.5)).drawCircle(0, 0, 2 * i).endFill();
                    particle.blendMode = PIXI.BLEND_MODES.SCREEN;
                    particle.x = 0.5 * width;
                    particle.y = height; 
                    particles.push(particle);
                    stage.addChild(particle);
                }
            }
        }
        t++;
    };

    ticker.add(animation);

    setTimeout(() => {
        ticker.remove(animation);
        for(const particle of particles) stage.removeChild(particle);
    }, 10000);
};

export default particleAnimation;