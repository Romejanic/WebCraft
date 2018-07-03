precision highp float;

attribute vec3 vertex;

uniform mat4 shadowProj;
uniform mat4 shadowView;

void main() {
    gl_Position = shadowProj * shadowView * vec4(vertex, 1.);
}