#version 330 compatibility

in vec4  vColor;
in float vLightIntensity;


void main( )
{
	vec3 newColor = vColor.rgb;

    // Grass color
    vec3 greenGrass = vec3(0.1, 0.8, 0.1);

    newColor = greenGrass;
	newColor *= vLightIntensity;
	gl_FragColor = vec4( newColor, 1. );
}