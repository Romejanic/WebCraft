precision highp float;

attribute vec3 vertex;
attribute vec2 texCoords;
attribute vec3 data; // x - block id, y - face, z - wave amount

uniform mat4 projMat;
uniform mat4 viewMat;
uniform mat4 shadowProj;
uniform mat4 shadowView;
uniform vec3 normals[6];

varying vec2 v_texCoords;
varying vec3 v_normal;
varying vec4 v_shadow;

void main() {
    gl_Position = projMat * viewMat * vec4(vertex, 1.);
    v_texCoords = texCoords;
    v_normal    = normals[int(data.y)];
    
    v_shadow    = shadowProj * shadowView * vec4(vertex, 1.);
    v_shadow    = (v_shadow / v_shadow.w) * 0.5 + 0.5;
}