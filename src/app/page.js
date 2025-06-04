"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import { Space_Grotesk } from "next/font/google";
import FloatingImage from "./FloatingImage";
import { Scroll, ScrollControls } from "@react-three/drei";
import CubeScene from "./components/CubeScene";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  function SpinningCube({ position, color }) {
    const meshRef = useRef();

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.01;
      }
    });

    return (
      <mesh position={position} ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }

  const [floatingImages, setFloatingImages] = useState([]);
  const images = [
    "/Aimg1.jpeg",
    "/Aimg2.jpeg",
    "/Aimg3.jpeg",
    "/Aimg4.jpeg",
    "/Aimg5.jpeg",
    "/Aimg6.jpeg",
    "/Aimg7.jpeg",
    "/Aimg8.jpeg",
    "/Aimg9.jpeg",
  ];

  const handleMouseEnter = () => {
    document.body.style.cursor = "none";
  };

  const handleMouseLeave = () => {
    document.body.style.cursor = "default";
  };

  const lastImageTimeRef = useRef(0);

  const handleMouseMove = (e) => {
    const now = Date.now();
    const cooldown = 150;

    if (now - lastImageTimeRef.current < cooldown) return;
    lastImageTimeRef.current = now;

    const x = e.pageX;
    const y = e.pageY;
    const randomImage = images[Math.floor(Math.random() * images.length)];

    setFloatingImages((prev) => [
      ...prev,
      { id: Date.now(), src: randomImage, x, y },
    ]);
  };

  const handleComplete = (id) => {
    setFloatingImages((prev) => prev.filter((img) => img.id !== id));
  };

  const smootherRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

      if (!smootherRef.current) {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
          normalizeScroll: true,
          smoothTouch: 0.1,
        });
      }

      const split = new SplitText(".split", {
        type: "words",
        mask: "lines",
        linesClass: "line",
      });

      gsap.from(split.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.1,
        duration: 0.6,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mask",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      tl.to(".text-1", {
        yPercent: -100,
        opacity: 0,
        duration: 1,
      })
        .to(
          ".text-2",
          {
            yPercent: -100,
            opacity: 1,
            duration: 1,
          },
          "<"
        )
        .to(".line", {
          opacity: 1,
          duration: 0.5,
        });
    }
  }, []);

  return (
    <>
      {floatingImages.map((img) => (
        <FloatingImage
          key={img.id}
          src={img.src}
          x={img.x}
          y={img.y}
          onComplete={() => handleComplete(img.id)}
        />
      ))}
      <div id="smooth-wrapper" className="bg-[#080915]">
        <div id="smooth-content">
          <section className="mask w-full h-screen flex items-center justify-center  relative overflow-hidden">
            <h1
              /* onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove} */
              className={`${spaceGrotesk.className}  text-center split text-4xl text-white text-1`}
            >
              Hola, soy Andrés Calderón Romo
            </h1>

            <h1
              className={`${spaceGrotesk.className}  text-center split text-4xl text-white text-2 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0`}
            >
              Desarrollador web y diseñador UX/UI.
              <div className="line xl:bg-white w-[105px] opacity-0 h-1 absolute lg:right-0"></div>
              <div className="line xl:bg-white w-[310px] opacity-0 h-1 absolute  lg:left-0"></div>
            </h1>
          </section>

          <section className="h-[100vh] bg-amber-300 flex items-center justify-center text-white text-3xl">
            siguiente seccion...
          </section>
          <CubeScene />
        </div>
      </div>
    </>
  );
}
