varying vec3 vNormal;
varying vec2 vUv;
void main() {
    // Normalize the normal
    vec3 normal = normalize(vNormal);
    if (!gl_FrontFacing) 
        normal *= -1.0;

    vec3 colorStart = vec3(0.2, 0.0, 0.6); // Darker purple
    vec3 colorEnd = vec3(0.9, 0.4, 1.0);   // Lighter purple

    // Blend between the two colors based on vUv.y
    vec3 gradientColor = mix(colorStart, colorEnd, vUv.y);

    gl_FragColor = vec4(gradientColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
