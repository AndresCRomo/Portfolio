import { useState,useRef, useEffect } from "react";
import Keyboard from "./components/Keyboard";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import {motion, AnimatePresence} from "framer-motion";
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const skillDescriptions = {
    HTMLKey: {
        title: "HTML",
        description: "Construyo estructuras semánticas con HTML5, priorizando accesibilidad y buenas prácticas."
    },
    CSSKey: {
        title: "CSS",
        description: "Domino CSS moderno, diseño responsivo y frameworks como TailwindCSS para interfaces elegantes."
    },
    GithubKey: {
        title: "GitHub",
        description: "Uso Git y GitHub a diario para versionar, colaborar y automatizar despliegues con CI/CD."
    },
    JscriptKey: {
        title: "JavaScript",
        description: "JavaScript es el motor de mis proyectos dinámicos: manejo ES6+, asincronía, DOM y más."
    },
    TrheejsKey: {
        title: "Three.js",
        description: "Creo experiencias inmersivas en 3D usando Three.js y React Three Fiber optimizadas para web."
    },
    NodejsKey: {
        title: "Node.js",
        description: "Desarrollo APIs eficientes y seguras con Node.js, Express y manejo de lógica backend."
    },
    Blenderkey: {
        title: "Blender",
        description: "Modelo, texturizo y animo objetos 3D en Blender, listos para integrarlos en la web."
    },
    FigmaKey: {
        title: "Figma",
        description: "Diseño interfaces limpias y usables en Figma, enfocándome en UX y coherencia visual."
    },
    GsapKey: {
        title: "GSAP",
        description: "Con GSAP doy vida a mis interfaces con animaciones suaves, fluidas y responsivas."
    },
    ReactKey: {
        title: "React",
        description: "React es el núcleo de mis interfaces: componentes reutilizables, hooks y rendimiento óptimo."
    }

};

const skillBackgrounds = {
    HTMLKey: "linear-gradient(to bottom, #080915, #F16529)",
    CSSKey: "linear-gradient(to bottom, #080915, #2965F1)",
    GithubKey: "linear-gradient(to bottom, #080915, #24292E)",
    JscriptKey: "linear-gradient(to bottom, #080915, #E5C90C)",
    TrheejsKey: "linear-gradient(to bottom, #080915, #8e44ad)",
    NodejsKey: "linear-gradient(to bottom, #080915, #3C873A)",
    Blenderkey: "linear-gradient(to bottom, #080915, #FCAA4A)",
    FigmaKey: "linear-gradient(to bottom, #080915, #00B6FF, #A259FF)",
    GsapKey: "linear-gradient(to bottom, #080915, #5EAD09)",
    ReactKey: "linear-gradient(to bottom, #080915, #61DAFB)",
}

const skillLogoUrls = {
    HTMLKey: "/HTMLSVG1.svg",
    CSSKey: "/CSSSVG1.svg",
    GithubKey: "/GITHUBSVG1.svg",
    JscriptKey: "/JAVASCRIPTSVG1.svg",
    TrheejsKey: "/TRHEEJSSVG1.svg",
    NodejsKey: "/NODEJSSVG1.svg",
    Blenderkey: "/BLENDERSVG1.svg",
    FigmaKey: "/FIGMASVG1.svg",
    GsapKey: "/GSAPSVG1.svg",
    ReactKey: "/REACTSVG1.svg",
}

const defaultBg = "linear-gradient(to bottom, #080915, #080915)";

export default function SkillsSection() {
const [selectedSkill, setSelectedSkill] = useState(null);
const keyboardRef = useRef();
const width = typeof window !== "undefined" ? window.innerWidth : 1024;
const scale = width >= 1280 ? 1.2 : width >= 768 ? 0.9 : 0.8;

const containerRef = useRef(null);

useEffect(() => {
    if (!selectedSkill || !containerRef.current) return;
    const newBg = skillBackgrounds[selectedSkill];
    if( newBg ) {
        gsap.to(containerRef.current,{
            duration: 1.5,
            backgroundImage:newBg,
            ease: "power2.out",
        })
    }
    else {
        gsap.to(containerRef.current, {
            duration: 1.5,
            backgroundImage: defaultBg,
            ease: "power2.out",
        });
    }
}, [selectedSkill]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // Tailwind sm: breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
    }, []);

return (
    <div 
    ref={containerRef}
    className="flex flex-col items-center justify-center transition-colors duration-500 w-full h-screen mt-20 lg:mt-0 ">
        <h1 className={`${spaceGrotesk.className} text-5xl md:text-8xl lg:mb-8 -mb-10`}>
            Skills
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center  md:w-[80%]  w-full gap-0 lg:gap-8 p-8">
            {/* Descripción a la izquierda */}
            <AnimatePresence mode="wait">
                {selectedSkill && skillDescriptions[selectedSkill] ? (
                    <motion.div
                    key={selectedSkill}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: -30 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative flex flex-col items-center text-center md:items-start md:text-left"
                    >
                        <motion.img
                            key={selectedSkill + "-logo"}
                            src={skillLogoUrls[selectedSkill]}
                            alt={selectedSkill}
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-4"
                            initial={{ opacity: 0, x: isMobile? 0 : -200, y: isMobile? 300 : 50, scale: 0.7 }}
                            animate={{ opacity: 1, x: 0, y: isMobile? 260 : -20, scale: 1.8 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    <h2 className={`${spaceGrotesk.className} text-4xl md:text-7xl xl:text-9xl mb-4`}>
                        {skillDescriptions[selectedSkill].title}
                    </h2>
                    <p className={`${spaceGrotesk.className} md:text-3xl xl:text-5xl`}>
                        {skillDescriptions[selectedSkill].description}
                    </p>
                    </motion.div>
                ) : (
                    <p className={`${spaceGrotesk.className} text-3xl xl:text-5xl`}>
                    Haz clic en una tecla 👀!
                    </p>
                )}
            </AnimatePresence>
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
