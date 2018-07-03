precision highp float;

attribute vec3 vertex;

uniform mat4 projMat;
uniform mat4 viewMat;

varying float height;

void main() {
    gl_Position = projMat * viewMat * vec4(vertex, 1.);
    height = vertex.y / 256.;
}