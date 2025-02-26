#version 330 compatibility

uniform float opacity;
uniform sampler2D uColorUnit;

in vec2  vST;
in float vLightIntensity;

// const vec3 WHITE = vec3( 1., 1., 1. );
// const vec3 BLACK = vec3(0., 0., 0.);

// vec3 scaleColor = vec3(0.07, 0.01, 0.0);
// vec3 baseColor = vec3(0.8, 0.7, 0.5);
vec3 defaultColor = vec3(0.92, 0.06, 0.06);
void main( )
{

	

	vec4 texColor = texture(uColorUnit, vST);

	texColor.a = opacity; // alpha value multiplied by opacity
	texColor.rgb*vLightIntensity;
	gl_FragColor = texColor;

	if(vST.s > 0.5 && vST.t > 0.5){
				gl_FragColor = vec4(defaultColor*vLightIntensity, 1.0);
	}
	
}