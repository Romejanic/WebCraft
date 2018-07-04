precision highp float;

attribute vec3 vertex;
attribute vec2 texCoords;
attribute vec3 data; // x - block id, y - face, z - wave amount

uniform mat4 projMat;
uniform mat4 viewMat;
uniform vec3 cameraPos;
uniform mat4 shadowProj;
uniform mat4 shadowView;
uniform float shadowDist;
uniform vec3 normals[6];

varying vec2 v_texCoords;
varying vec3 v_normal;
varying vec4 v_shadow;

const float shadowFade = 5.;

#define PI 3.14159265359
const float waveLength = 8.0;
const float waveAmplitude = 0.05;
uniform float time;
const float maxWaveDistance = 100.;

float generateOffset(float x, float z, float val1, float val2){
	float t = time * .25;
	float radiansX = ((mod(x+z*x*val1, waveLength)/waveLength) + t * mod(x * 0.8 + z, 1.5)) * 2.0 * PI;
	float radiansZ = ((mod(val2 * (z*x +x*z), waveLength)/waveLength) + t * 2.0 * mod(x , 2.0) ) * 2.0 * PI;
	return waveAmplitude * 0.5 * (sin(radiansZ) + cos(radiansX));
}

vec3 applyDistortion(vec3 vertex, float amount, float viewDist){
	if(viewDist > maxWaveDistance) {
		return vertex;
	}
	float xDistortion = generateOffset(vertex.x, vertex.z, 0.2, 0.1);
	float yDistortion = generateOffset(vertex.x, vertex.y, 0.15, 0.3);
	float zDistortion = generateOffset(vertex.y, vertex.z, 0.2, 0.1);
	return vertex + vec3(xDistortion, yDistortion, zDistortion) * .5 * amount;
}

void main() {
    vec4 worldPos = vec4(vertex, 1.);
    float camDist = length(cameraPos - vertex);
    if(data.z > 0.) {
        worldPos.xyz = applyDistortion(worldPos.xyz, data.z, camDist);
    }
    vec4 eyeSpace = viewMat * worldPos;
    gl_Position   = projMat * eyeSpace;
    v_texCoords   = texCoords;
    v_normal      = normals[int(data.y)];

    camDist = length(eyeSpace);
    vec4 shadowCoords = shadowProj * shadowView * worldPos;
    v_shadow   = (shadowCoords/shadowCoords.w) * 0.5 + 0.5;
    v_shadow.w = clamp((camDist-(shadowDist-shadowFade))/shadowFade,0.,1.);
}