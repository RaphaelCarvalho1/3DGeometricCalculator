import { ArrayMesh } from './array-mesh';
import { Main } from './main';
import { mat4 } from 'gl-matrix';
import { camera } from './camera';

class PointMesh extends ArrayMesh {

    constructor(coords: number[]){
        super(coords);
    }

    public draw() {
        Main._gl!.frontFace(Main._gl!.CCW);
    
        Main._gl!.enable(Main._gl!.CULL_FACE);
        Main._gl!.cullFace(Main._gl!.BACK);
    
        this.updateModelMatrix();

        const mvpLoc = Main._gl!.getUniformLocation(this._program!, "MVP");

        const mvp = mat4.create();

        mat4.multiply(mvp, camera.viewProjection, this._model);
    
        Main._gl!.useProgram(this._program!);
        Main._gl!.uniformMatrix4fv(mvpLoc, false, mvp);
    
        Main._gl!.drawArrays(Main._gl!.POINTS, 0, this._coords.length/4);
    
        Main._gl!.disable(Main._gl!.CULL_FACE);
    }
}