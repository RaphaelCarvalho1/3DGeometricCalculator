import { vec3, mat4 } from 'gl-matrix';
import { prop } from './constants';

class Camera {

    public static instance: Camera = new Camera();

    private _eye: vec3 = vec3.fromValues(1.0, 1.0, 1.0);
    private _at: vec3 = vec3.fromValues(0.0, 0.0, 0.0);
    private _up: vec3 = vec3.fromValues(0.0, 1.0, 0.0);

    private _near: number = 5.0;
    private _far: number = -5.0;
    
    private _left: number = -5.0;
    private _right: number = 5.0;
    private _top: number = 5.0;
    private _bottom: number = -5.0;
    
    private _view: mat4 = mat4.create();
    private _projection: mat4 = mat4.create();
    private _viewProjection: mat4 = mat4.create();

    public get view(): mat4 {
        return this._view;
    }

    public get projection(): mat4 {
        return this._projection;
    }

    public get viewProjection(): mat4 {
        return this._viewProjection;
    }

    public get eye(): vec3 {
        return this._eye;
    }

    public set eye(eye: vec3) {
        this._eye = eye;
    }

    private updateView(): void {
        mat4.identity(this._view);
        mat4.lookAt(this._view, this._eye, this._at, this._up);
    }

    private updateProjection(): void {
        mat4.identity(this._projection);
        mat4.ortho(this._projection, this._left * prop, this._right * prop, this._bottom, this._top, this._near, this._far);
    }

    public update() {
        this.updateView();
        this.updateProjection();
    }

    public zoom(out: boolean): void {

    }
}

export let camera = (() => Camera.instance)();