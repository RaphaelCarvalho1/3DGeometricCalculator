import { Camera } from './camera';
import { Mesh } from './mesh';
import { Light } from './light'

export class Scene {
    private _meshes: Mesh[];
    private _cam: Camera;
    private _light: Light;

    constructor() {
        //adicionar eixos e plano xy
        this._meshes = [];
        this._cam = new Camera();
        this._light = new Light();
    }

    public appendMesh(mesh: Mesh): void {
        this._meshes.push(mesh);
    }

    public draw(): void {
        this._cam.update();
        this._light.pos = this._cam.eye;

        for(let mesh of this._meshes) {
            mesh.draw();
        }
    }
}