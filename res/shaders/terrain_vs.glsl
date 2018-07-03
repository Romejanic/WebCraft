attribute vec3 vertex;

uniform mat4 projMat;
uniform mat4 viewMat;

void main() {
    gl_Position = projMat * viewMat * vec4(vertex, 1.);
}