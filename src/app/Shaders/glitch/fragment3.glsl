varying vec3 vNormal;
varying vec2 vUv;
void main() {
    // Normalize the normal
    vec3 normal = normalize(vNormal);
    if (!gl_FrontFacing) 
        normal *= -1.0;

    
    
    
    gl_FragColor = vec4(vUv.x,1.0,1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
