precision highp float;

varying vec2 v_texCoords;
uniform sampler2D diffuse;

void main() {
    float alpha = texture2D(diffuse, v_texCoords).a;
    if(alpha < 0.5) {
        discard;
    }
    gl_FragColor = vec4(1.);
}