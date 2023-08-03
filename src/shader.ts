import { Main } from './main'

export class Shader {
    public static createBuffer(type: GLenum, data: Float32Array): WebGLBuffer | null {
        if (data.length === 0) {
            console.warn('Data is empty');
            return null;
        }

        if(!(data.buffer instanceof ArrayBuffer && data.byteLength)) {
            console.warn(`Data isn't an ArrayBuffer instance`);
            return null;
        }

        const buffer = Main._gl!.createBuffer();
        Main._gl!.bindBuffer(type, buffer);
        Main._gl!.bufferData(type, data, Main._gl!.STATIC_DRAW);

        return buffer;
    }

    public static createProgram(vert: WebGLShader, frag: WebGLShader): WebGLProgram | null {
        if(!(vert || frag)) {
            console.warn('Invalid createProgram arguments');
        }

        const program = Main._gl!.createProgram();

        if(!program) {
            console.warn('Program creation failure');
            return null;
        }

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

    public static createVAO(...attributes: {pos: GLint, buffer: WebGLBuffer}[]): WebGLVertexArrayObject | null {
        const vao = Main._gl!.createVertexArray();

        if(!vao) {
            console.warn('VAO creation failure');
            return null;
        }

        Main._gl!.bindVertexArray(vao);
        const size = 4;
        const type = Main._gl!.FLOAT;

        for(let attribute of attributes) {
            Main._gl!.enableVertexAttribArray(attribute['pos']);
            Main._gl!.bindBuffer(Main._gl!.ARRAY_BUFFER, attribute['buffer']);
            Main._gl!.vertexAttribPointer(attribute['pos'], size, type, false, 0, 0);
        }

        return vao;
    }

    public static createShader(type: GLenum, source: string): WebGLShader | null {
        const shader = Main._gl!.createShader(type);

        if (!shader) {
            console.warn('Shader creation failure');
            return null;
        }

        Main._gl!.shaderSource(shader, source);
        Main._gl!.compileShader(shader);

        if (!Main._gl!.getShaderParameter(shader, Main._gl!.LINK_STATUS)) {
            const info = Main._gl!.getProgramInfoLog(shader);
            
            Main._gl!.deleteShader(shader);
            console.warn('Loading Shader failure:' + info);
        }

        return shader;
    }
}