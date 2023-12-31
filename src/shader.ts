import { Main } from './main'

export class Shader {
    public static createBuffer(type: GLenum, data: Float32Array | Uint32Array): WebGLBuffer {
        if (data.length === 0) 
            throw new Error('Data is empty');
        

        if(!(data.buffer instanceof ArrayBuffer && data.byteLength)) 
            throw new Error(`Data isn't an ArrayBuffer instance`);
        

        const buffer = Main._gl!.createBuffer();
        Main._gl!.bindBuffer(type, buffer);
        Main._gl!.bufferData(type, data, Main._gl!.STATIC_DRAW);

        return buffer!;
    }

    public static createProgram(vert: WebGLShader, frag: WebGLShader): WebGLProgram {
        if(!(vert || frag)) 
            throw new Error('Invalid createProgram arguments');

        const program = Main._gl!.createProgram();

        if(!program) 
            throw new Error('Program creation failure');

        Main._gl!.attachShader(program, vert);
        Main._gl!.attachShader(program, frag);
        Main._gl!.linkProgram(program);

        if(!Main._gl!.getProgramParameter(program, Main._gl!.LINK_STATUS)) {
            const info = Main._gl!.getProgramInfoLog(program);

            Main._gl!.deleteProgram(program);
            console.warn('Loading Shader failure:' + info);
        }
        return program;
    }

    public static createVAO(...attributes: {pos: GLint, buffer: WebGLBuffer}[]): WebGLVertexArrayObject {
        const vao = Main._gl!.createVertexArray();

        if(!vao) 
            throw new Error('VAO creation failure');
        

        Main._gl!.bindVertexArray(vao);
        const size = 3;
        const type = Main._gl!.FLOAT; 

        for(let attribute of attributes) {
            Main._gl!.enableVertexAttribArray(attribute['pos']);
            Main._gl!.bindBuffer(Main._gl!.ARRAY_BUFFER, attribute['buffer']);
            Main._gl!.vertexAttribPointer(attribute['pos'], size, type, false, 0, 0);
        }

        return vao;
    }

    public static createShader(type: GLenum, source: string): WebGLShader {
        const shader = Main._gl!.createShader(type);

        if (!shader) 
            throw new Error('Shader creation failure');
        

        Main._gl!.shaderSource(shader, source);
        Main._gl!.compileShader(shader);

        if (!Main._gl!.getShaderParameter(shader, Main._gl!.COMPILE_STATUS)) {
            const info = Main._gl!.getShaderInfoLog(shader);
            
            Main._gl!.deleteShader(shader);
            console.warn('Loading Shader failure:' + info);
        }

        return shader;
    }
}