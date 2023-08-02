import { Polynomial, Cos, Exponential } from "./math-function";


class Main {
    private _canvas = document.querySelector("#glcanvas");
    public static _gl: WebGL2RenderingContext;

    private draw(): void {
        
    }
}

// f(x, y) = 2x² + x + 3y

const p = new Polynomial(0, [1, 2], [3]);

const cos = new Cos(p);

const exp = new Exponential(cos, 2);

console.log(exp.calculate(1, 2))