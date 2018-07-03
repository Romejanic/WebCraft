precision highp float;

varying float height;

void main() {
    gl_FragColor.xyz = vec3(height);
    gl_FragColor.w   = 1.;
}