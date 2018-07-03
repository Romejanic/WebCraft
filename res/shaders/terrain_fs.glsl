precision highp float;

varying vec2 v_texCoords;
varying vec3 v_normal;

void main() {
    gl_FragColor.xyz = vec3(v_texCoords, 0.);
    gl_FragColor.w   = 1.;
}