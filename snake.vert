#version 330 compatibility

uniform float Timer;       // passed in from your GLIB file or elsewhere
uniform float amplitude;   // how much up/down movement
uniform float speed;

out float vLightIntensity; 
out vec2  vST;
out vec3  vXYZ;

float PI = 3.1415;
float phaseShift = 2*PI;

void main() {
    // Pass along the texture coords and original vertex position
    vST  = gl_MultiTexCoord0.st;
    vXYZ = gl_Vertex.xyz;

    // Basic lighting calculation
    vec3 tnorm     = normalize(gl_NormalMatrix * gl_Normal);
    vec3 LightPos  = vec3(5., 10., 10.);
    vec3 ECposition= vec3(gl_ModelViewMatrix * gl_Vertex);
    vLightIntensity = abs(dot(normalize(LightPos - ECposition), tnorm));
    if(vLightIntensity < 0.2) {
        vLightIntensity = 0.2;
    }

    // Animate the object along Y using a sine function
    float wiggle = amplitude * sin(2*PI*Timer + phaseShift);
    // Replace the original vertex Y with an offset version
    vec4 animatedPos = vec4(gl_Vertex.x + wiggle * speed, gl_Vertex.y, gl_Vertex.z + wiggle, 1.0);

    // Compute final position
    gl_Position = gl_ModelViewProjectionMatrix * animatedPos;
}
