export const surfaceFrag = 
    `#version 300 es
    precision highp float;

    uniform vec3 light_pos;

    uniform vec3 light_amb_c;
    uniform float light_amb_k;

    uniform vec3 light_dif_c;
    uniform float light_dif_k;

    uniform vec3 light_esp_c;
    uniform float light_esp_k;
    uniform float light_esp_p;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;

    in vec3 frag_position;
    in vec3 frag_color;
    in vec3 frag_normal;

    out vec4 out_color;

    void main() {
        mat4 model_view = view * model;
        
        vec4 view_position = model_view * vec4(frag_position, 1.0);

        vec4 view_normal = normalize(transpose(inverse(model_view)) * vec4(frag_normal, 0.0));

        vec4 view_light_pos = view * vec4(light_pos, 1.0);

        vec4 light_dir = normalize(view_light_pos - view_position);

        vec4 camera_dir = normalize(-view_position);

        float dif_factor = max(dot(light_dir, view_normal), 0.0);
        vec3 dif_light = dif_factor * light_dif_k * light_dif_c;

        vec4 half_vec = normalize(light_dir + camera_dir);
        float esp_factor = pow(max(dot(view_normal, half_vec), 0.0), light_esp_p);
        vec3 esp_light = esp_factor * light_esp_k * light_esp_c;
        
        vec3 amb_light = light_amb_k * light_amb_c;

        vec3 color = 0.40 * frag_color + 0.60 * (dif_light + max(esp_light, 0.0) + amb_light);
        out_color = vec4(color, 1.0);
    }`