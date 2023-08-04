import { Mesh } from './mesh';
import { HalfEdgeDS } from './half-edge';
import { Main } from './main';
import { Shader } from './shader';
import { mat4 } from 'gl-matrix'
import { camera } from './camera';

export abstract class IndexedMesh extends Mesh {
    protected _heds: HalfEdgeDS;
    protected _indicesLoc?: WebGLVertexArrayObject;

    constructor() {
        super();
        
        this._heds = new HalfEdgeDS();

        this.createVAO();
    }

    protected createVAO() {
        const VAOdata = [];

        const positionLoc = Main._gl!.getAttribLocation(this._program, "position");
        const positionBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._heds.coords));
        
        if(!positionLoc)
            throw new Error('Position atribute getter failure');
        
        VAOdata.push({pos: positionLoc, buffer: positionBuffer});

        const normalLoc = Main._gl?.getAttribLocation(this._program, "normal");
        const normalBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._heds.normals));
        
        if(!normalLoc)
            throw new Error('Normal atribute getter failure');

        VAOdata.push({pos: normalLoc, buffer: normalBuffer});

        this._vaoLoc = Shader.createVAO(...VAOdata);

        this._indicesLoc = Shader.createBuffer(Main._gl!.ELEMENT_ARRAY_BUFFER, new Uint32Array(this._heds.indices));
    }

    public draw() {
        Main._gl!.frontFace(Main._gl!.CCW);
    
        Main._gl!.enable(Main._gl!.DEPTH_TEST);
        Main._gl!.depthFunc(Main._gl!.LEQUAL);

        Main._gl!.enable(Main._gl!.CULL_FACE);
        Main._gl!.cullFace(Main._gl!.BACK);

        this.updateModelMatrix();

        const mvpLoc = Main._gl!.getUniformLocation(this._program, "MVP");

        const mvp = mat4.create();

        mat4.multiply(mvp, camera.viewProjection, this._model);
    
        Main._gl!.useProgram(this._program);
        Main._gl!.uniformMatrix4fv(mvpLoc, false, mvp);

        Main._gl!.bindVertexArray(this._vaoLoc!);
        Main._gl!.bindBuffer(Main._gl!.ELEMENT_ARRAY_BUFFER, this._indicesLoc!);

        Main._gl!.drawElements(Main._gl!.TRIANGLE_STRIP, this._heds.faces.length + 2, Main._gl!.UNSIGNED_INT, 0);

        Main._gl!.disable(Main._gl!.CULL_FACE);
        Main._gl!.disable(Main._gl!.DEPTH_TEST);
    }
}