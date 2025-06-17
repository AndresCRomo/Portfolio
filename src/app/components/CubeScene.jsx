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


function useIsSafari() {
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
    const ua = navigator.userAgent;
    const safari = /^((?!chrome|android).)*safari/i.test(ua);
    setIsSafari(safari);
    }, []);

    return isSafari;
}

function useBreakpoints() {
    const [breakpoint, setBreakpoint] = useState("desktop");

    useEffect(() => {
    const updateSize = () => {
        const width = window.innerWidth;
        if (width < 786) setBreakpoint("mobile");
        else if (width < 1280) setBreakpoint("tablet");
        else setBreakpoint("desktop");
    };

    if (typeof window !== "undefined") {
        window.addEventListener("resize", updateSize);
        updateSize();
    }

    return () => {
        if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateSize);
        }
    };
    }, []);

    return breakpoint;
}

function SpinningCube() {
    const firstCube = useRef();
    const secondCube = useRef();
    const thirdCube = useRef();

    const isSafari = useIsSafari();
    const breakpoint = useBreakpoints();

    useEffect(() => {
    let firstPos = {}, secondPos = {}, thirdPos = {};

    if (breakpoint === "mobile") {
        if (isSafari) {
        firstPos = { x: 0.23, y: 0.45, z: 1 };
        secondPos = { x: 0.6, y: 2, z: 0 };
        thirdPos = { x: 0.76, y: 1, z: 2 };
        } else {
        firstPos = { x: 0.2, y: 0.4, z: 1 };
        secondPos = { x: 0.5, y: 1.8, z: 0 };
        thirdPos = { x: 0.7, y: 0.9, z: 1.8 };
        }
    } else if (breakpoint === "tablet") {
        if (isSafari) {
        firstPos = { x: 0.5, y: 0.5, z: 1 };
        secondPos = { x: 0.5, y: 3, z: 0 };
        thirdPos = { x: 0.9, y: 1, z: 1.6 };
        } else {
        firstPos = { x: 0.6, y: 0.6, z: 1 };
        secondPos = { x: 0.4, y: 2.9, z: 0 };
        thirdPos = { x: 0.9, y: 0.9, z: 1.4 };
        }
    } else {
        // desktop
        if (isSafari) {
        firstPos = { x: 0.5, y: 0.6, z: 1 };
        secondPos = { x: 0.2, y: 3.8, z: 0 };
        thirdPos = { x: 0.5, y: 1.1, z: 1.4 };
        } else {
        firstPos = { x: 0.9, y: 0.5, z: 1 };
        secondPos = { x: 0.25, y: 3.5, z: 0 };
        thirdPos = { x: 0.5, y: 0.7, z: 1.3 };
        }
    }

    gsap.to(firstCube.current.position, { ...firstPos, duration: 1.5, ease: "power2.out" });
    gsap.to(secondCube.current.position, { ...secondPos, duration: 1.5, ease: "power2.out" });
    gsap.to(thirdCube.current.position, { ...thirdPos, duration: 1.5, ease: "power2.out" });
    }, [breakpoint, isSafari]);
  

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
            uGlitchIntensity: { value: 0.15 },
            

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
        
        glitchMaterial.uniforms.uTime.value = elapsedTime;
        glitchMaterial2.uniforms.uTime.value = elapsedTime;
        glitchMaterial3.uniforms.uTime.value = elapsedTime;
    });

    return (
        <>
        <mesh  ref={firstCube} material={glitchMaterial} rotation={[0,0,0.1]}>
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
    <div className="fixed lg:-top-[14%]  -top-1/6 md:-top-[22%]  left-0 w-full h-full -z-10">
        <Canvas camera={{ position: [0, 0, -5], fov: 75, near: 0.1, far: 1000 }} resize={{scroll:true}}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        {/* Agrega varios cubos */}
        <SpinningCube  color="hotpink" />
        
        </Canvas>
    </div>
);
}
