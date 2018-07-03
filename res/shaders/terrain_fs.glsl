precision highp float;

varying vec2 v_texCoords;
varying vec3 v_normal;

void main() {
    gl_FragColor.xyz = v_normal;
    gl_FragColor.w   = 1.;
}