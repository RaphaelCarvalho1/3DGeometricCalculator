import { Mesh } from './mesh';
import { camera } from './camera';
import { light } from './light'

export class Scene {
    private _meshes: Mesh[];
    public _cam = camera;
    private _light = light;

    constructor() {
        //adicionar eixos e plano xy
        this._meshes = [];
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