"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FloatingImage({ src, x, y, onComplete }) {
const imgRef = useRef(null);

useEffect(() => {
    const el = imgRef.current;

    // Posicionamos en las coordenadas iniciales
    gsap.set(el, {
    x: x + 10,
    y: y + 20,
    scale: 0.8,
    opacity: 0,
    });

    // Animamos entrada
    gsap.to(el, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
    });

    // Animamos salida luego de unos segundos
    const tl = gsap.timeline({
    delay: 1.5, // cuánto tiempo permanece visible
    onComplete: onComplete, // se llama solo cuando la animación termina
    });

    tl.to(el, {
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    ease: "power2.inOut",
    });

    // Cleanup en caso de desmontaje
    return () => {
    tl.kill();
    };
}, [x, y, src, onComplete]);

return (
    <img
    ref={imgRef}
    src={src}
    alt="floating"
    className="pointer-events-none fixed w-32 h-32 object-cover rounded-xl z-50"
    />
);
}
