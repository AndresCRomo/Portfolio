// glitch_vertex.glsl
uniform float uTime;          // Time variable to animate the glitch
uniform float uGlitchIntensity;  // Intensity of the glitch effect
varying vec3 vPosition;       // Position of the vertex
varying vec3 vNormal;         // Normal of the vertex
varying vec2 vUv;             // UV of the vertex


float random2D(vec2 value)
{
    return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // Calculate the model position of the vertex
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Calculate the glitch effect based on the time and the position of the vertex
    float glitchTime = uTime - modelPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
    glitchStrength /= 3.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= uGlitchIntensity;
    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

    vUv=uv;
    vNormal = normal.xyz;
    vPosition = modelPosition.xyz;

    // Standard projection and model view matrix transformation
    gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
}
