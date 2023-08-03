import { vec3, vec4 } from 'gl-matrix';
import { Main } from './main';

class Light {

    private static _instance: Light =  new Light();

    public static get instance(){
        return Light._instance;
    }

    private _pos: vec4;
    private _amb_c: vec4;
    private _amb_k: number;
    private _dif_c: vec4;
    private _dif_k: number;
    private _esp_c: vec4;
    private _esp_k: number;
    private _esp_p: number; 
    
    constructor() {
        this._pos = vec4.fromValues(20.0, 20.0, 20.0, 1.0);

        this._amb_c = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
        this._amb_k = 0.2;

        this._dif_c = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
        this._dif_k = 0.5;

        this._esp_c = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
        this._esp_k = 0.3;
        this._esp_p = 10.0;
    }

    public set pos(position: vec3) {
        const pos = position as [number, number, number];
        this._pos = vec4.fromValues(...pos, 1.0);
    }
    
    public createUniforms(program: WebGLProgram) {
        const posLoc = Main._gl!.getUniformLocation(program, "light_pos");
        Main._gl!.uniform4fv(posLoc, this._pos);

        const ambCLoc = Main._gl!.getUniformLocation(program, "light_amb_c");
        Main._gl!.uniform4fv(ambCLoc, this._amb_c);
        const ambKLoc = Main._gl!.getUniformLocation(program, "light_amb_k")
        Main._gl!.uniform1f(ambKLoc, this._amb_k);

        const difCLoc = Main._gl!.getUniformLocation(program, "light_dif_c");
        Main._gl!.uniform4fv(difCLoc, this._dif_c);
        const difKLoc = Main._gl!.getUniformLocation(program, "light_dif_k")
        Main._gl!.uniform1f(difKLoc, this._dif_k);

        const espCLoc = Main._gl!.getUniformLocation(program, "light_esp_c");
        Main._gl!.uniform4fv(espCLoc, this._esp_c);
        const espKLoc = Main._gl!.getUniformLocation(program, "light_esp_k")
        Main._gl!.uniform1f(espKLoc, this._esp_k);
        const espPLoc = Main._gl!.getUniformLocation(program, "light_esp_p")
        Main._gl!.uniform1f(espPLoc, this._esp_p);
    }
}

export let light = (()=> Light.instance)()