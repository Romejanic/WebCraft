precision highp float;

attribute vec3 vertex;
attribute vec2 texCoords;
attribute vec3 data;

uniform mat4 shadowProj;
uniform mat4 shadowView;
uniform float time;

varying vec2 v_texCoords;

void main() {
    vec3 anim     = vec3(sin(time+vertex.x), cos(vertex.y-time)*0.5, sin(time*2.+vertex.z));
    vec4 worldPos = vec4(vertex + anim * data.z, 1.);
    gl_Position   = shadowProj * shadowView * worldPos;
    v_texCoords   = texCoords;
}