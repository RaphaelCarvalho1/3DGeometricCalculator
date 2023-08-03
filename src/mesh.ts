import { vec3, mat4 } from 'gl-matrix';
import { HalfEdgeDS } from './half-edge';
import { Shader } from './shader';
import { Main } from './main';
import { pointLineVert } from './shaders/point-line-vert';
import { pointLineFrag } from './shaders/point-line-frag';

export abstract class Mesh {
    protected _model: mat4 = mat4.create();
    protected _vertShader?: WebGLShader;
    protected _fragShader?: WebGLShader;
    protected _program?: WebGLProgram;
    protected _position: vec3 = vec3.create();
    protected _scale: vec3 = vec3.create();
    protected _rotateAngles: vec3 = vec3.create();
    
    public set position(position: vec3) {
        this._position = position;
    }

    protected updateModelMatrix() {
        mat4.identity(this._model);

        mat4.translate(this._model, this._model, this.position);

        mat4.rotateZ(this._model, this._model, this._rotateAngles[2]);
        mat4.rotateY(this._model, this._model, this._rotateAngles[1]);
        mat4.rotateX(this._model, this._model, this._rotateAngles[0]);

        mat4.scale(this._model, this._model, this._scale);
    }

    protected abstract createVAO(): void;
    
    public abstract draw(): void;
}

abstract class IndexedMesh extends Mesh {
    protected _heds: HalfEdgeDS = new HalfEdgeDS();

    protected createVAO() {
        
    }

    public draw() {
        
    }
}

class SurfaceMesh extends IndexedMesh {
    public draw() {
        
    }
}

abstract class ArrayMesh extends Mesh {
    protected _coords: number[];
    protected vaoLoc?: WebGLVertexArrayObject | null;

    constructor(coords: number[]) {
        super();
        this._coords = coords;

        this._vertShader = Shader.createShader(Main._gl!.VERTEX_SHADER, pointLineVert);
        this._vertShader = Shader.createShader(Main._gl!.VERTEX_SHADER, pointLineFrag);

        this._program = Shader.createProgram(this._vertShader!, this._fragShader!);

        this.createVAO();
    }

    private createVAO() {
        const positionLoc = Main._gl!.getAttribLocation(this._program!, "position");
        const positionBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._coords));

        this.vaoLoc = Shader.createVAO({pos: positionLoc, buffer: positionBuffer});
    }
}


class CurveMesh extends ArrayMesh {

    constructor(coords: number[]){
        super(coords);
    }

    public draw() {
        Main._gl!.frontFace(Main._gl!.CCW);
    
        Main._gl!.enable(Main._gl!.CULL_FACE);
        Main._gl!.cullFace(Main._gl!.BACK);
    
        this.updateModelMatrix();
    
        const model = this.model;
        const view = cam.getView();
        const proj = cam.getProj();
    
        Main._gl!.useProgram(this.program);
        Main._gl!.uniformMatrix4fv(this.uModelLoc, false, model);
        Main._gl!.uniformMatrix4fv(this.uViewLoc, false, view);
        Main._gl!.uniformMatrix4fv(this.uProjectionLoc, false, proj);
    
        Main._gl!.drawArrays(Main._gl!.LINE_STRIP, 0, this._coords.length/4);
    
        Main._gl!.disable(Main._gl!.CULL_FACE);
    }
    
}

class PointMesh extends ArrayMesh {

    constructor(coords: number[]){
        super(coords);
    }

    public draw() {
        
    }
}