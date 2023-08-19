import { Mesh } from './mesh';
import { Shader } from './shader';
import { Main } from './main';
import { pointLineVert } from './shaders/point-line-vert';
import { pointLineFrag } from './shaders/point-line-frag';

export abstract class ArrayMesh extends Mesh {
    protected _coords: number[];

    constructor(coords: number[]) {
        super();

        this._vertShader = Shader.createShader(Main._gl!.VERTEX_SHADER, pointLineVert);
        this._fragShader = Shader.createShader(Main._gl!.FRAGMENT_SHADER, pointLineFrag);
        this._program = Shader.createProgram(this._vertShader!, this._fragShader!);
        
        this._coords = coords;
        
        this.createVAO();
    }

    protected createVAO() {
        Main._gl!.useProgram(this._program!);

        const positionLoc = Main._gl!.getAttribLocation(this._program!, "position");
        const positionBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._coords));

        if(positionLoc === -1)
            throw new Error('Position atribute getter failure');

        this._vaoLoc = Shader.createVAO({pos: positionLoc, buffer: positionBuffer});
    }
}
