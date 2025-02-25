#version 330 compatibility

out float vLightIntensity; 
out vec2  vST;
out vec3  vXYZ;

void main( ){
	
	vST  = gl_MultiTexCoord0.st;
	vXYZ = gl_Vertex.xyz;
	
    vec3 tnorm = normalize( gl_NormalMatrix * gl_Normal );
	vec3 LightPos = vec3( 5., 10., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    vLightIntensity  = abs( dot( normalize(LightPos - ECposition), tnorm ) );
	if( vLightIntensity < 0.2 ) vLightIntensity = 0.2;
		

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}