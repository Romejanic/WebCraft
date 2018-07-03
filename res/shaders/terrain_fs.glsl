precision highp float;

varying vec2 v_texCoords;
varying vec3 v_normal;

uniform sampler2D atlas;

const vec3 lightDirection = normalize(vec3(45.,30.,-45.));

void main() {
    vec3 normal = normalize(v_normal);
    float ndotl = max(dot(lightDirection, normal),.2);

    gl_FragColor = texture2D(atlas, v_texCoords);
    gl_FragColor.xyz *= ndotl;
}