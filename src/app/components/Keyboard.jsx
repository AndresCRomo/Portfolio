import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect, forwardRef , useImperativeHandle } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

const Keyboard = forwardRef(({ onKeyClick, scale=0.9 }, ref) => {
const group = useRef();
const { scene, animations } = useGLTF("/models/Keyboard.glb");
const { actions } = useAnimations(animations, group);
const isHovering = useRef(true);
const { mouse } = useThree();
// Mapeo de teclas a nombres de animaciones
const keyMap = {
    HTMLKey: "HTMLKeyPress",
    CSSKey: "CSSKeyPress",
    GithubKey: "GithubKeyPress",
    JscriptKey: "JscriptKeyPress",
    TrheejsKey: "TrheejsKeyPress",
    NodejsKey: "NodejsKeyPress",
    Blenderkey: "BlenderkeyPress",
    FigmaKey: "FigmaKeyPress",
    GsapKey: "GsapKeyPress",
    ReactKey: "ReactKeyPress",
};



    useEffect(() => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        if (!isMobile) return;

        const handleOrientation = (e) => {
        if (!group.current) return;
        const x = THREE.MathUtils.degToRad(e.beta / 10);
        const y = THREE.MathUtils.degToRad(e.gamma / 10);
        gsap.to(group.current.rotation, {
            x,
            y,
            duration: 0.5,
            ease: "power2.out",
        });
        };

        // Manejo simple
        window.addEventListener("deviceorientation", handleOrientation, true);
        return () => window.removeEventListener("deviceorientation", handleOrientation);
    }, []);

    // Animación idle para móvil
    useEffect(() => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        if (isMobile && group.current) {
        gsap.to(group.current.rotation, {
            x: 0.05,
            y: -0.05,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
        });
        }
    }, []);

    // Cargar y reproducir con efectos suaves
    const playCreamySound = async () => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch("/keypressDown.wav");
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);
    
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
    
        // ⬇️ Control de pitch (1.0 = normal, <1 = más grave/suave)
        source.playbackRate.value = 0.95;
    
        // ⬇️ Ganancia (volumen)
        const gainNode = context.createGain();
        gainNode.gain.value = .15; // menos agresivo
    
        // ⬇️ Conexión
        source.connect(gainNode).connect(context.destination);
        source.start(0);
    };
// Función que ejecuta animación y callback
const handleClick = (keyName) => {
    const actionName = keyMap[keyName];
    const action = actions[actionName];
    
    if (action) {
    action.reset();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.play();
    playCreamySound(); // reproducir sonido al hacer clic
    }
    onKeyClick(keyName);
};

// Agregar eventos y cursor pointer a las teclas
useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
    if (child.isMesh && keyMap[child.name]) {
        child.cursor = "pointer";
        child.userData.interactive = true; // marca interactivo para raycaster
    }
    });
}, [scene]);



// Animacion de rotación suave al mover el mouse
useFrame(({mouse:m})=>{
    if (!isHovering.current || !group.current) return;

    gsap.to(group.current.rotation, {
        x: m.y * 0.3,
        y: m.x * 0.5,
        duration: 0.5,
        ease: "power2.out",
    });
});

    useImperativeHandle(ref, () => ({
    resetRotation: () => {
        isHovering.current = false; 
        gsap.killTweensOf(group.current.rotation); // detener animaciones previas

        gsap.to(group.current.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)", // 🎯 efecto resorte
            onComplete: () => {
                isHovering.current = true; // volver a permitir hover
            },
        });
        
    },
    }));


// Renderizamos el modelo con ref al group para animaciones
return (
    <primitive
    ref={group}
    object={scene}
    onPointerDown={(e) => {
        e.stopPropagation();
        const clickedName = e.object.name;
        if (keyMap[clickedName]) {
        handleClick(clickedName);
        }
    }}
    scale={scale}
    position={[0,-1,0]}
    />
);
});
export default Keyboard;
