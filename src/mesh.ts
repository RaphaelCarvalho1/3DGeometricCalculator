import { vec3, mat4 } from 'gl-matrix';
import { Main } from './main';

export abstract class Mesh {
    protected _model: mat4;
    protected _vertShader?: WebGLShader;
    protected _fragShader?: WebGLShader;
    protected _program?: WebGLProgram;
    protected _position: vec3;
    protected _scale: vec3;
    protected _rotateAngles: vec3;
    protected _color: vec3;
    protected _vaoLoc?: WebGLVertexArrayObject;

    constructor() {
        this._model = mat4.create();
        this._position = vec3.create();
        this._scale = vec3.create();
        this._rotateAngles = vec3.create();
        this._color = vec3.create();
    }

    public set color(color: [number, number, number]) {
        this._color = vec3.fromValues(...color);

        const colorLoc = Main._gl!.getUniformLocation(this._program!, "color");
        if(!colorLoc)
            throw new Error('Color location getter failure');

        Main._gl!.useProgram(this._program!);
        Main._gl!.uniform3fv(colorLoc, this._color);
    }
    
    public set position(position: [number, number, number]) {
        this._position = vec3.fromValues(...position);
    }

    protected updateModelMatrix() {
        mat4.identity(this._model);

        mat4.translate(this._model, this._model, this._position);

        // mat4.rotateZ(this._model, this._model, this._rotateAngles[2]);
        // mat4.rotateY(this._model, this._model, this._rotateAngles[1]);
        // mat4.rotateX(this._model, this._model, this._rotateAngles[0]);

        // mat4.scale(this._model, this._model, this._scale);
    }

    protected abstract createVAO(): void;
    
    public abstract draw(): void;
}