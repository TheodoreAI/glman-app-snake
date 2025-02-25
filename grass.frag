#version 330 compatibility

in float vLightIntensity;
in vec2 vST;

uniform sampler2D uColorUnit;

void main( )
{
    vec3 texColor = texture(uColorUnit, vST).rgb;

	texColor *= vLightIntensity;
	gl_FragColor = vec4( texColor, 1. );
}