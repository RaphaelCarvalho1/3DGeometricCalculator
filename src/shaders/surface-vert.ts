export const surfaceVert = 
    `#version 300 es
    precision highp float;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;

    uniform vec3 color;

    in vec3 position;
    in vec3 normal;

    out vec4 frag_position;
    out vec4 frag_color;
    out vec4 frag_normal;

    void main(){
        mat4 MVP = model * view * projection;

        gl_Position = vec4(position, 1.0);
        //gl_Position = MVP * vec4(position, 1.0);

        frag_position = vec4(position, 1.0);
        frag_color = vec4(color, 1.0);
        frag_normal = vec4(normal, 1.0);
    }`