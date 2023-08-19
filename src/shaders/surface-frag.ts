export const surfaceFrag = 
    `#version 300 es
    precision highp float;

    uniform vec4 light_pos;

    uniform vec4 light_amb_c;
    uniform float light_amb_k;

    uniform vec4 light_dif_c;
    uniform float light_dif_k;

    uniform vec4 light_esp_c;
    uniform float light_esp_k;
    uniform float light_esp_p;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;

    in vec4 frag_position;
    in vec4 frag_color;
    in vec4 frag_normal;

    out vec4 out_color;

    void main() {
        mat4 model_view = view * model;
        
        vec4 view_position = model_view * frag_position;

        vec4 view_normal = normalize(transpose(inverse(model_view)) * frag_normal);

        vec4 view_light_pos = view * light_pos;

        vec4 light_dir = normalize(view_light_pos - view_position);

        vec4 camera_dir = normalize(-view_position);

        float dif_factor = max(0.0, dot(light_dir, view_normal));
        vec4 dif_light = dif_factor * light_dif_k * light_dif_c;

        vec4 half_vec = normalize(light_dir + camera_dir);
        float esp_factor = pow(max(0.0, dot(half_vec, view_normal)), light_esp_p);
        vec4 esp_light = esp_factor * light_esp_k * light_esp_c;
        
        vec4 amb_light = light_amb_k * light_amb_c;

        out_color = frag_color;
        //out_color = 0.40 * frag_color + 0.60 * (dif_light + esp_light + amb_light);
    }`