precision highp float;

attribute vec3 vertex;
attribute vec2 texCoords;

uniform mat4 shadowProj;
uniform mat4 shadowView;

varying vec2 v_texCoords;

void main() {
    gl_Position = shadowProj * shadowView * vec4(vertex, 1.);
    v_texCoords = texCoords;
}