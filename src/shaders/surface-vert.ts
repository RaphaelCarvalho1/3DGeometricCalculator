export const surfaceVert = 
    `#version 300 es
    precision highp float;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;

    uniform vec3 color;

    in vec3 position;
    in vec3 normal;

    out vec3 frag_position;
    out vec3 frag_color;
    out vec3 frag_normal;

    void main() {
        gl_Position = projection * view * model * vec4(position, 1.0);

        frag_position = position;
        frag_color = color;
        frag_normal = normal;
    }`