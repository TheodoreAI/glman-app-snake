#version 330 compatibility

uniform bool  uUseST;
uniform bool uIsSnake;
uniform vec3 scaleColor;
uniform vec3 baseColor;


//* timing */
uniform float Timer;
uniform float amplitude; //controls movement range
float PI = 3.1415; 

in vec2  vST;
in vec4  vColor;
in float vLightIntensity;

const vec3 RED = vec3( 1., 0., 0. );
const vec3 BLUE = vec3(0., 0., 1.);
void main( )
{
	vec3 newColor = vColor.rgb;
	// smooth oscillator equation
	float t = sin(2.*PI*Timer);
	float tNorm = t * amplitude + amplitude;

	if( uUseST )
	{
		// if( uS-uDs <= vST.s  &&  vST.s <= uS+uDs  &&   uT-uDt <= vST.t  &&  vST.t <= uT+uDt ){
		// 		//! old code 
		// 		newColor = RED;
		// }
		if(uIsSnake){
			if(vST.s < 0.3){
				// head
				newColor = mix(RED, BLUE, tNorm);
			}else if(vST.s < 0.7){
				// Body 
				newColor = mix(BLUE, RED, tNorm);
			}else if (vST.s > 0.7){
				// tail
				newColor = mix(newColor, vec3(0., 1., 0.), tNorm);
			}
		}else{
			newColor = vec3(0.5, 0.5, 0.5);
		}
		
	}


	newColor *= vLightIntensity;
	gl_FragColor = vec4( newColor, 1. );
}