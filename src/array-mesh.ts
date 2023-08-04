import { Mesh } from './mesh';
import { Shader } from './shader';
import { Main } from './main';

export abstract class ArrayMesh extends Mesh {
    protected _coords: number[];

    constructor(coords: number[]) {
        super();
        this._coords = coords;

        this.createVAO();
    }

    protected createVAO() {
        const positionLoc = Main._gl!.getAttribLocation(this._program, "position");
        const positionBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._coords));

        this._vaoLoc = Shader.createVAO({pos: positionLoc, buffer: positionBuffer});
    }
}
