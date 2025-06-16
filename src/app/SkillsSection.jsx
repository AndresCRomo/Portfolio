import { useState,useRef } from "react";
import Keyboard from "./components/Keyboard";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import * as THREE from "three";
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const skillDescriptions = {
    HTMLKey: {
        title: "HTML",
        description: "Tengo experiencia construyendo estructuras semánticas con HTML5 y accesibilidad web."
    },
    CSSKey: {
        title: "CSS",
        description: "Me especializo en CSS moderno, diseño responsivo y uso de herramientas como TailwindCSS."
    },
    GithubKey: {
        title: "GitHub",
        description: "Utilizo GitHub a diario para control de versiones, colaboración y CI/CD."
    },
    JscriptKey: {
        title: "JavaScript",
        description: "JavaScript es el núcleo de mis proyectos interactivos. Manejo ES6+, asincronía, y más..."
    },
    TrheejsKey: {
        title: "Three.js",
        description: "Uso Three.js y React Three Fiber para crear experiencias 3D interactivas."
    },
    NodejsKey: {
        title: "Node.js",
        description: "He trabajado con Node.js para crear APIs REST y manejar lógica de backend."
    },
    Blenderkey: {
        title: "Blender",
        description: "Uso Blender para crear y animar modelos 3D optimizados para la web."
    },
    FigmaKey: {
        title: "Figma",
        description: "Diseño interfaces limpias y funcionales en Figma con un enfoque UX/UI."
    },
    GsapKey: {
        title: "GSAP",
        description: "Con GSAP creo animaciones fluidas, responsivas y sincronizadas con scroll."
    },
    ReactKey: {
        title: "React",
        description: "React es mi herramienta principal para construir interfaces escalables y modernas."
    }

};

export default function SkillsSection() {
const [selectedSkill, setSelectedSkill] = useState(null);
const keyboardRef = useRef();
const width = typeof window !== "undefined" ? window.innerWidth : 1024;
const scale = width >= 1280 ? 1.2 : width >= 768 ? 0.9 : 0.8;

return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
        <h1 className={`${spaceGrotesk.className} text-5xl md:text-8xl mb-8`}>
            Skills
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center  md:w-[80%]  w-full gap-8 p-8">
            {/* Descripción a la izquierda */}
            <div className="md:w-1/2 flex flex-col justify-center text-center md:h-[200px]  md:text-left">
            {selectedSkill && skillDescriptions[selectedSkill] ? (
                <>
                <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl xl:text-6xl mb-4`}>
                    {skillDescriptions[selectedSkill].title}
                </h2>
                <p className={`${spaceGrotesk.className} md:text-3xl xl:text-5xl`}>
                    {skillDescriptions[selectedSkill].description}
                </p>
                </>
            ) : (
                <p className={`${spaceGrotesk.className} text-3xl xl:text-5xl`}>
                Haz clic en una tecla 👀!
                </p>
            )}
            </div>

            {/* Teclado en Canvas */}
            <div className="md:w-1/2  h-[500px] w-full">
            <Canvas 
            camera={{
                position: [0.5, 3, 1.7], 
                fov: 75    
            }}
            
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                outputEncoding: THREE.SRGBColorSpace,
            }}
            onCreated={({gl})=>{
                gl.toneMappingExposure = 1.1;
            }}

            onPointerLeave = {()=>{
                if (keyboardRef.current){
                    console.log("Mouse left the canvas");
                    keyboardRef.current.resetRotation();
                }
            }}
            onMouseLeave={()=>{
                if (keyboardRef.current){
                    keyboardRef.current?.resetRotation();
                }
            }}

            >

                
                {/* <ambientLight intensity={1.8} /> */}
                <Environment preset="warehouse" />
                <Suspense fallback={null}>    
                    <Keyboard ref={keyboardRef} onKeyClick={(key) => setSelectedSkill(key)} scale={scale}  />
                </Suspense>
            </Canvas>
            </div>
        </div>
    </div>
);
}
