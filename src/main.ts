import { Scene } from './scene';
import * as CONST from './constants';
import { Parser } from './parser';

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

        requestAnimationFrame(this.draw.bind(this));
    }
}

window.onload = () => {
    const geometricCalculator = new Main();
    geometricCalculator.draw();
}

console.log(Parser.split("log_2(x)+y + z^2"))
