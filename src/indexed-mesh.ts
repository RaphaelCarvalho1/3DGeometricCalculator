import { Mesh } from './mesh';
import { HalfEdgeDS } from './half-edge';
import { Main } from './main';
import { Shader } from './shader';

export abstract class IndexedMesh extends Mesh {
    protected _heds: HalfEdgeDS;
    protected _indicesLoc?: WebGLVertexArrayObject | null;

    constructor() {
        super();
        
        this._heds = new HalfEdgeDS();

        this.createVAO();
    }

    protected createVAO() {
        const data = [];

        const positionLoc = Main._gl!.getAttribLocation(this._program!, "position");
        const positionBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._heds.coords));
        
        if(!positionLoc)
            throw new Error('Position atribute getter failure');
        
        data.push({pos: positionLoc, buffer: positionBuffer});

        const normalLoc = Main._gl?.getAttribLocation(this._program!, "normal");
        const normalBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._heds.normals));
        
        if(!normalLoc)
            throw new Error('Normal atribute getter failure');

        data.push({pos: normalLoc, buffer: normalBuffer});
        
        this._vaoLoc = Shader.createVAO(...data);

        this._indicesLoc = Shader.createBuffer(Main._gl!.ELEMENT_ARRAY_BUFFER, new Uint32Array(this._heds.indices));
    }

    public draw() {
        
    }
}