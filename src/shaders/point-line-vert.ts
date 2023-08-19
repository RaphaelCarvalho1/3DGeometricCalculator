export const pointLineVert = 
    `#version 300 es
    precision highp float;

    uniform mat4 MVP;

    uniform vec3 color;

    in vec3 position;

    out vec4 frag_color;

    void main(){
        gl_Position = vec4(position, 1.0);
        //gl_Position = MVP * vec4(position, 1.0);

        frag_color = vec4(color, 1.0);
    }`