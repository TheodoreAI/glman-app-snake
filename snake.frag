#version 330 compatibility

uniform bool  uUseST;
uniform float uX, uY, uZ;
uniform float uDx, uDy, uDz;

//* timing */
uniform float Timer;
uniform float amplitude; //controls movement range
float PI = 3.1415; 

in vec2  vST;
in vec3  vXYZ;
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
		if(vST.s < 0.3){
			// head
			newColor = mix(RED, BLUE, tNorm);
		}else if(vST.s < 0.7){
			// Body 
			newColor = mix(BLUE, RED, tNorm);
		}else (vST > 0.7){
			// tail
			newColor = mix(newColor, vec3(0., 1., 0.), tNorm);
		}
	}
	else
	{
		//! I think I am going to use (S, T) coordinates
		if( uX-uDx <= vXYZ.x  &&  vXYZ.x <= uX+uDx  &&   uY-uDy <= vXYZ.y  &&  vXYZ.y <= uY+uDy  &&  uZ-uDz <= vXYZ.z  &&  vXYZ.z <= uZ+uDz ){
			//! old code newColor = RED;
			//? new code
			newColor = mix (RED, BLUE, tNorm);
		}
	}


	newColor *= vLightIntensity;
	gl_FragColor = vec4( newColor, 1. );
}