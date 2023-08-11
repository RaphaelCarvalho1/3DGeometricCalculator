import { Mesh } from './mesh';
import { HalfEdgeDS } from './half-edge';
import { Main } from './main';
import { Shader } from './shader';
import { camera } from './camera';
import { surfaceFrag } from './shaders/surface-frag';
import { surfaceVert } from './shaders/surface-vert';

export class SurfaceMesh extends Mesh {
    protected _heds: HalfEdgeDS;
    protected _indicesLoc?: WebGLVertexArrayObject;

    constructor() {
        super();

        this._vertShader = Shader.createShader(Main._gl!.VERTEX_SHADER, surfaceVert);
        this._fragShader = Shader.createShader(Main._gl!.FRAGMENT_SHADER, surfaceFrag);
        this._program = Shader.createProgram(this._vertShader!, this._fragShader!);
        
        this._heds = new HalfEdgeDS();

        //teste
        this._heds.build([-0.5, 0.5, 0.0,
                          0.5, 0.5, 0.0,
                          -0.5,  0.0, 0.0,
                           0.5, 0.0, 0.0],

                           [2, 3, 0,
                            0, 3, 1],
                            
                            [0.0, 0.0, 0.0,
                             0.0, 0.0, 0.0]);
        this._position = [0.0, 0.0, 0.0];
        this.color = [1.0,0.0,0.0];

        this.createVAO();
    }

    protected createVAO() {
        const VAOdata: {pos: GLint, buffer: WebGLBuffer}[] = [];

        const positionLoc = Main._gl!.getAttribLocation(this._program!, "position");
        const positionBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._heds.coords));
        
        if(positionLoc === -1)
            throw new Error('Position atribute getter failure');
        
        VAOdata.push({pos: positionLoc, buffer: positionBuffer});

        const normalLoc = Main._gl!.getAttribLocation(this._program!, "normal");
        const normalBuffer = Shader.createBuffer(Main._gl!.ARRAY_BUFFER, new Float32Array(this._heds.normals));
        
        if(normalLoc === -1)
            throw new Error('Normal atribute getter failure');

        VAOdata.push({pos: normalLoc, buffer: normalBuffer});

        this._vaoLoc = Shader.createVAO(...VAOdata);

        this._indicesLoc = Shader.createBuffer(Main._gl!.ELEMENT_ARRAY_BUFFER, new Uint32Array(this._heds.indices));
    }

    public draw() {
        Main._gl!.frontFace(Main._gl!.CCW);
    
        Main._gl!.enable(Main._gl!.DEPTH_TEST);
        Main._gl!.depthFunc(Main._gl!.LEQUAL);

        Main._gl!.enable(Main._gl!.CULL_FACE);
        Main._gl!.cullFace(Main._gl!.BACK);

        this.updateModelMatrix();

        Main._gl!.useProgram(this._program!);

        const modelLoc = Main._gl!.getUniformLocation(this._program!, "model");
        Main._gl!.uniformMatrix4fv(modelLoc, false, this._model);
        
        const viewLoc =  Main._gl!.getUniformLocation(this._program!, "view");
        Main._gl!.uniformMatrix4fv(viewLoc, false, camera.view);

        const projLoc =  Main._gl!.getUniformLocation(this._program!, "proj");
        Main._gl!.uniformMatrix4fv(projLoc, false, camera.projection);

        Main._gl!.bindVertexArray(this._vaoLoc!);
        Main._gl!.bindBuffer(Main._gl!.ELEMENT_ARRAY_BUFFER, this._indicesLoc!);

        Main._gl!.drawElements(Main._gl!.TRIANGLES, this._heds.faces.length * 3, Main._gl!.UNSIGNED_INT, 0);

        Main._gl!.disable(Main._gl!.CULL_FACE);
        Main._gl!.disable(Main._gl!.DEPTH_TEST);
    }
}