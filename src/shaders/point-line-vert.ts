export const pointLineVert = `
    #version 300 es
    precision highp float;

    uniform mat4 MVP;

    uniform vec4 color;

    in vec4 position;

    out out_color;

    void main(){
        gl_Position = MVP * position;

        out_color = color;
    }
`