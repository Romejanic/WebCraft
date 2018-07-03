precision highp float;

varying vec2 v_texCoords;
varying vec3 v_normal;

uniform sampler2D atlas;

void main() {
    gl_FragColor = texture2D(atlas, v_texCoords);
}