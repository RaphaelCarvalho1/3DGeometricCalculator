import { vec3, mat4 } from 'gl-matrix';

export class Camera {
    private _eye: vec3 = vec3.create();
    private _lookAt: vec3 = vec3.create();
    private _up: vec3 = vec3.create();
    private _near: number;
    private _far: number;
    private _bottom: number;
    private _top: number;
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

    }

    private updateProjection(): void {

    }

    public zoom(): void {

    }
}