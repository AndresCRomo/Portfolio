import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Keyboard({ onKeyClick }) {
const group = useRef();
const { scene, animations } = useGLTF("/models/keyboard.glb");
const { actions, mixer } = useAnimations(animations, group);

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

// Función que ejecuta animación y callback
const handleClick = (keyName) => {
    const actionName = keyMap[keyName];
    const action = actions[actionName];
    if (action) {
    action.reset();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.play();
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
    />
);
}
