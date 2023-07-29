import { vec3, mat4 } from 'gl-matrix';
import { HalfEdgeDS } from './half-edge';

abstract class Mesh {
    protected _model: mat4 = mat4.create();
    protected _vertShader: WebGLShader;
    protected _fragShader: WebGLShader;
    protected _program: WebGLProgram;
    protected _position: vec3 = vec3.create();
    protected _scale: vec3 = vec3.create();
    protected _rotateAngles: vec3 = vec3.create();

    public get model(): mat4 {
        return this._model;
    }

    public get program(): WebGLProgram {
        return this._program;
    }
    
    public set position(position: vec3) {
        this._position = position;
    }

    protected updateModelMatrix() {

    }

    protected abstract createVAO(): void;
    
    public abstract draw(): void;
}

abstract class IndexedMesh extends Mesh {
    protected _heds: HalfEdgeDS = new HalfEdgeDS();

    protected createVAO() {

    }

public draw(): void {
        
    }
}

class SurfaceMesh extends IndexedMesh {
    public draw(): void {
        
    }
}

class CurveMesh extends IndexedMesh {
    public draw(): void {
        
    }
    
}

abstract class ArrayMesh extends Mesh {
    protected createVAO() {

    }
}

class PointMesh extends ArrayMesh {
    public draw(): void {
        
    }
}