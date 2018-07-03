attribute vec3 vertex;

uniform mat4 projMat;
uniform mat4 viewMat;
uniform mat4 modelMat;

void main() {
    gl_Position = projMat * viewMat * modelMat * vec4(vertex, 1.);
}