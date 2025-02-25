#version 330 compatibility

uniform float scaleFactor;
uniform float radius;

in vec2  vST;
in float vLightIntensity;

// const vec3 WHITE = vec3( 1., 1., 1. );
// const vec3 BLACK = vec3(0., 0., 0.);

vec3 scaleColor = vec3(0.07, 0.01, 0.0);
vec3 baseColor = vec3(0.8, 0.7, 0.5);
void main( )
{

	//* create a repeating pattern by multiplying the UV scaleFactor*/
	vec2 scaledST = fract(vST * scaleFactor);

	// center the coordinates
	vec2 centeredUV = scaledST - 0.5;

	float dist = length(centeredUV);

	//* picking colors */
	
	if(dist < radius){
		gl_FragColor = vec4(scaleColor*vLightIntensity, 1.0);
	}else{
		gl_FragColor = vec4(baseColor*vLightIntensity, 1.0);
	}
}