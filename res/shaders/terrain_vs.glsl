precision highp float;

attribute vec3 vertex;
attribute vec2 texCoords;
attribute vec3 data; // x - block id, y - face, z - wave amount

uniform mat4 projMat;
uniform mat4 viewMat;
uniform mat4 shadowProj;
uniform mat4 shadowView;
uniform float shadowDist;
uniform vec3 normals[6];

varying vec2 v_texCoords;
varying vec3 v_normal;
varying vec4 v_shadow;

const float shadowFade = 5.;

void main() {
    vec4 eyeSpace = viewMat * vec4(vertex, 1.);
    gl_Position   = projMat * eyeSpace;
    v_texCoords   = texCoords;
    v_normal      = normals[int(data.y)];

    float camDist = length(eyeSpace);
    vec4 shadowCoords = shadowProj * shadowView * vec4(vertex, 1.);
    v_shadow   = (shadowCoords/shadowCoords.w) * 0.5 + 0.5;
    v_shadow.w = clamp((camDist-(shadowDist-shadowFade))/shadowFade,0.,1.);
}