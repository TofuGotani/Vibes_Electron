import { install } from '@pixi/unsafe-eval';
import * as PIXI from 'pixi.js';
import fireworks from './fireworks';

export class Pixi {

    private app: PIXI.Application;

    constructor() {
        install(PIXI);

        this.app = new PIXI.Application({
            width: 0.95 * screen.width,
            height: 0.85 * screen.height,
            transparent: true,
            antialias: true,
        });

        const element = document.getElementById('app');
        if(element !== null) element.appendChild(this.app.view);
        else console.warn('lost main element');
    }

    fireworks(): void {
        fireworks(this.app);
    }
}