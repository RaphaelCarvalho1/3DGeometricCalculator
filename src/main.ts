import { Scene } from './scene'
import { Polynomial, Cos, Exponential } from './math-function';
import { Sum } from './operation'
import * as CONST from './constants';

export class Main {
    private _canvas: HTMLCanvasElement | null;
    private _scene: Scene;
    public static _gl: WebGL2RenderingContext | null;

    constructor() {
        this._canvas = document.querySelector('#glcanvas');
        Main._gl = this._canvas!.getContext('webgl2');
        this._scene = new Scene();
        this.setViewPort();
    }

    private setViewPort() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        Main._gl!.canvas.width = CONST.canvasWidth * devicePixelRatio;
        Main._gl!.canvas.height = CONST.canvasHeight * devicePixelRatio;

        Main._gl!.viewport(0, 0, Main._gl!.canvas.width, Main._gl!.canvas.height);
    }

    public draw(): void {
        Main._gl!.clearColor(...CONST.backgroundSceneColor);
        Main._gl!.clear(Main._gl!.COLOR_BUFFER_BIT | Main._gl!.DEPTH_BUFFER_BIT);

        this._scene.draw();
    }
}

window.onload = () => {
    const geometricCalculator = new Main();
    geometricCalculator.draw();
}


// f(x, y) = 2x² + x + 3y

const p = new Polynomial(0, [1, 2], [3]);

const cos = new Cos(p);

const exp = new Exponential(cos, 2);

const sum = new Sum(p, cos);

console.log(sum.calculate(1, 2))

type tipo = Sum | number;

const arrei: tipo[] = [sum, 1, new Sum(exp, p)];

console.log(arrei);