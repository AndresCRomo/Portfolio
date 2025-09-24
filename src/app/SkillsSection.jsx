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
    HTMLKey: ["#f14a29", "#F16529","#f18d29"],
    CSSKey: ["#1b49b5", "#2965F1","#299af1"],
    GithubKey: ["#2f3030", "#24292E","#50565c"],
    JscriptKey: ["#ffdd00", "#E5C90C","#e5af0c"],
    TrheejsKey: ["#a764c4", "#8e44ad","#6a44ad"],
    NodejsKey: ["#335c32", "#3C873A","#4c873a"],
    Blenderkey: ["#e8b479", "#FCAA4A","#fc824a"],
    FigmaKey: ["#FF3737", "#00B6FF", "#A259FF"],
    GsapKey: ["#abe36f", "#5EAD09","#69ad09"],
    ReactKey: ["#226f85", "#61DAFB","#6192fb"],
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


export default function SkillsSection() {
const [selectedSkill, setSelectedSkill] = useState(null);
const keyboardRef = useRef();
const width = typeof window !== "undefined" ? window.innerWidth : 1024;
const scale = width >= 1280 ? 1 : width >= 768 ? 0.9 : 0.8;


const circle1Ref = useRef(null);
const circle2Ref = useRef(null);
const circle3Ref = useRef(null);

useEffect(() => {
    if (!selectedSkill) return;
    const colors = skillBackgrounds[selectedSkill] || ["#333", "#666" , "#777"];

    gsap.to(circle1Ref.current, {
        backgroundColor: colors[0],
        duration: 1.2,
        ease: "power2.out",
        opacity: 0.4,
    });

    gsap.to(circle2Ref.current, {
        backgroundColor: colors[1],
        duration: 1.2,
        ease: "power2.out",
        opacity: 0.5
    });
    gsap.to(circle3Ref.current, {
        backgroundColor: colors[2],
        duration: 1.2,
        ease: "power2.out",
        opacity: 0.5
    });
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
    className="flex flex-col items-center justify-center transition-colors duration-500 w-full h-screen mt-20 lg:mt-0 relative ">
        <h1 className={`${spaceGrotesk.className} text-5xl md:text-8xl lg:mb-8 -mb-10`}>
            Skills
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center  w-full gap-0 lg:gap-8 p-8">
            {/* Descripción a la izquierda */}
            <AnimatePresence mode="wait">
                {selectedSkill && skillDescriptions[selectedSkill] ? (
                    <motion.div
                    key={selectedSkill}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: -30 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative flex flex-col items-center text-center md:items-start md:text-left md:w-[50%] "
                    >
                        <motion.img
                            key={selectedSkill + "-logo"}
                            src={skillLogoUrls[selectedSkill]}
                            alt={selectedSkill}
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-4 z-20"
                            initial={{ opacity: 0, x: isMobile? 0 : -200, y: isMobile? 300 : 50, scale: 0.7 }}
                            animate={{ opacity: 1, x: 0, y: isMobile? 250 : -20, scale: 1.8 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    <h2 className={`${spaceGrotesk.className} text-4xl md:text-6xl xl:text-7xl mb-4 z-10 `}>
                        {skillDescriptions[selectedSkill].title}
                    </h2>
                    <p className={`${spaceGrotesk.className} md:text-3xl xl:text-4xl `}>
                        {skillDescriptions[selectedSkill].description}
                    </p>
                    </motion.div>
                ) : (
                    <p className={`${spaceGrotesk.className} text-3xl xl:text-5xl md:w-[40%]`}>
                    Haz clic en una tecla 👀!
                    </p>
                )}
            </AnimatePresence>
            {/* Teclado en Canvas */}
            <div className="md:w-1/2  h-[500px] w-full z-10">
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
                    keyboardRef.current.resetRotation();
                }
            }}
            onMouseLeave={()=>{
                if (keyboardRef.current){
                    keyboardRef.current.resetRotation();
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
        {/* Background Elements */}
        <div ref={circle1Ref} className=" animate-balls3 absolute top-[27%] right-1/3 md:w-64 md:h-64 w-34 h-34 rounded-full blur-3xl z-0"></div>
        <div ref={circle2Ref} className=" animate-balls absolute bottom-1/4 right-10 md:w-80 md:h-80 w-60 h-60 rounded-full blur-3xl z-0"></div>
        <div ref={circle3Ref} className=" animate-balls2 absolute bottom-10 right-1/3 md:w-46 md:h-46 w-34 h-34 rounded-full blur-3xl z-0"></div>
    </div>
);
}
