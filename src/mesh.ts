import { vec3, mat4 } from 'gl-matrix';

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