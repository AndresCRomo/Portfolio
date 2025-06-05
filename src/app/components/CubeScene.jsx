// components/CubeScene.jsx
"use client";
import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import glitchVertexShader from "../Shaders/glitch/vertex.glsl"
import glitchFragmentShader from "../Shaders/glitch/fragment.glsl"
import glitchFragmentShader2 from "../Shaders/glitch/fragment2.glsl"
import glitchFragmentShader3 from "../Shaders/glitch/fragment3.glsl"
import { gsap } from "gsap";
function SpinningCube({ position, color }) {
    const firstCube = useRef();
    const secondCube = useRef();
    const thirdCube = useRef();

    const initialRotation = useRef(
        new THREE.Euler(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        )
    )

    // Responsiveness
    function useBreakpoint(){
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    
    useEffect(() => {
        const updateSize = ()=> setIsSmallScreen(window.innerWidth <768);
        window.addEventListener("resize", updateSize);
        updateSize();
        return()=> window.removeEventListener("resize", updateSize);
    }, []);
    return isSmallScreen
    }
    
    const isSmallScreen = useBreakpoint();

    useEffect(()=>{
        gsap.to(firstCube.current.position,{
            x: isSmallScreen ? -1 : -1.5,
            y: isSmallScreen ? -4.3 : 0.5,
            z: isSmallScreen ? 1 : 3,
            duration: 1.5,
            ease: "power2.out",
        })
        
        
        gsap.to(secondCube.current.position,{
            x: isSmallScreen ? -0.2 : -1,
            y: isSmallScreen ? 1 : 1,
            z: isSmallScreen ? 0 : 0,
            duration: 1.5,
            ease: "power2.out",
        })
        gsap.to(thirdCube.current.position,{
            x: isSmallScreen ? 0.4 : 0.1,
            y: isSmallScreen ? 0.2 : 0.2,
            z: isSmallScreen ? 2 : 0,
            duration: 1.5,
            ease: "power2.out",
        })
        
        
    },[isSmallScreen])
    // Material de glitch
    const glitchMaterial = new THREE.ShaderMaterial({
        vertexShader: glitchVertexShader,
        fragmentShader: glitchFragmentShader,
        uniforms:{
            uTime:{value:0.9},
            uGlitchIntensity:{value:0.35},
            
        },
        
        
    })
    const glitchMaterial2 = new THREE.ShaderMaterial({
        vertexShader: glitchVertexShader,
        fragmentShader: glitchFragmentShader2,
        uniforms:
        {
            uTime: { value: 0.9 },
            uGlitchIntensity: { value: 0.35 },
            

        }
    })

    const glitchMaterial3 = new THREE.ShaderMaterial({
        vertexShader: glitchVertexShader,
        fragmentShader: glitchFragmentShader3,
        uniforms:
        {
            uTime: { value: 0.9 },
            uGlitchIntensity: { value: 0.35 },
            

        }
    })
    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        
        glitchMaterial.uniforms.uTime.value = elapsedTime * 0.5;
        glitchMaterial2.uniforms.uTime.value = elapsedTime * 0.2;
        glitchMaterial3.uniforms.uTime.value = elapsedTime;
    });

    return (
        <>
        <mesh  ref={firstCube} material={glitchMaterial} rotation={[0.0,1.3,3]}>
        <boxGeometry args={[0.3, 0.3, 0.3, 34, 34, 34]} />
        </mesh>
        <mesh  ref={secondCube}  material={glitchMaterial2} rotation={[0.2,1,2.3]}>
        <boxGeometry args={[0.3, 0.3, 0.3, 34, 34, 34]} />
        </mesh>
        <mesh  ref={thirdCube}  material={glitchMaterial3} rotation={[-0,-0.3,1]}>
        <boxGeometry args={[0.3, 0.3, 0.3, 34, 34, 34]} />
        </mesh>
        </>
    );
}


export default function CubeScene() {
return (
    <div className="fixed md:-top-1/7 -top-1/6  left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, -5], fov: 75, near: 0.1, far: 1000 }} resize={{scroll:true}}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        {/* Agrega varios cubos */}
        <SpinningCube  color="hotpink" />
        
        </Canvas>
    </div>
);
}
