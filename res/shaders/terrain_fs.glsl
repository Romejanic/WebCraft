precision highp float;

varying vec2 v_texCoords;
varying vec3 v_normal;
varying vec4 v_shadow;

uniform sampler2D atlas;
uniform sampler2D shadowmap;

const vec3 lightDirection = normalize(vec3(45.,30.,-45.));

void main() {
    float shadow = 1.;
    if(texture2D(shadowmap, v_shadow.xy).r < (v_shadow.z - .0005)) {
        shadow = v_shadow.w;
    }

    vec3 normal = normalize(v_normal);
    float ndotl = max(dot(lightDirection, normal) * shadow,.2);

    gl_FragColor = texture2D(atlas, v_texCoords);
    gl_FragColor.xyz *= ndotl;

    // gl_FragColor.xyz = vec3(v_shadow.xy,0.);
}