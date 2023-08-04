import { vec3, vec4, mat4 } from 'gl-matrix';
import { Main } from './main';
import { Shader } from './shader';
import { pointLineVert } from './shaders/point-line-vert';
import { pointLineFrag } from './shaders/point-line-frag';

export abstract class Mesh {
    protected _model: mat4;
    protected _vertShader: WebGLShader;
    protected _fragShader: WebGLShader;
    protected _program: WebGLProgram;
    protected _position: vec3;
    protected _scale: vec3;
    protected _rotateAngles: vec3;
    protected _color: vec4;
    protected _vaoLoc?: WebGLVertexArrayObject;

    constructor() {
        this._model = mat4.create();
        this._vertShader = Shader.createShader(Main._gl!.VERTEX_SHADER, pointLineVert);
        this._fragShader = Shader.createShader(Main._gl!.VERTEX_SHADER, pointLineFrag);
        this._program = Shader.createProgram(this._vertShader!, this._fragShader!);
        this._position = vec3.create();
        this._scale = vec3.create();
        this._rotateAngles = vec3.create();
        this._color = vec4.create();
    }
    
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