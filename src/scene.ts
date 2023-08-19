import { Mesh } from './mesh';
import { camera } from './camera';
import { light } from './light'
import { CurveMesh } from './curve-mesh';
import { SurfaceMesh } from './surface-mesh';

export class Scene {
    private _meshes: Mesh[];
    public _cam = camera;
    private _light = light;

    constructor() {
        //adicionar eixos e plano xy
        //teste
        this._meshes = [/*new CurveMesh([-0.5, 0.0, 0.0,
                                       0.2, 0.0, 0.0,
                                       0.5, 0.0 ,0.0]),*/
                        new SurfaceMesh()];
        this._meshes[0].position = [0.0, 0.0 ,0.0];
        this._meshes[0].color = [3.0, 0.0, 0.0];
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