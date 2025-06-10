"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import { Space_Grotesk } from "next/font/google";
import FloatingImage from "./FloatingImage";
import { TextPlugin } from "gsap/TextPlugin";
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
  const ageRef = useRef();
  const paragraphRef = useRef(null);
  const paragraphRef2 = useRef(null);
  const paragraphRef3 = useRef(null);
  const zoomTextRef = useRef(null);

  

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, TextPlugin);

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
        

      const finalValue = "26";
      const duration = 4; // segundos
      let scrambleInterval;
      let timeout;

      function scrambleText(length) {
        const chars = "0123456789";
        let scrambled = "";
        for (let i = 0; i < length; i++) {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
        return scrambled;
      }

      const startScramble = () => {
        scrambleInterval = setInterval(() => {
          if (ageRef.current) {
            ageRef.current.textContent = scrambleText(finalValue.length);
          }
        }, 100);

        timeout = setTimeout(() => {
          stopScramble();
        }, duration * 1000);
      };

      const stopScramble = () => {
        clearInterval(scrambleInterval);
        if (ageRef.current) {
          ageRef.current.textContent = finalValue;
        }
      };



     

      // 👉 Animación cuando el párrafo entra a la vista
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            startScramble();
          },
        },
      });

      tl1.to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });

      tl1.to(paragraphRef2.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, "<");

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphRef3.current,
          start: "top 70%",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          once: true,
        },
      });

      tl2.to(paragraphRef3.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
      tl2.to(zoomTextRef.current, {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "purple",
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
      return () => {
        clearInterval(scrambleInterval);
        clearTimeout(timeout);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };



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
          <section className="mask w-full h-[70vh] flex items-center justify-center  relative overflow-hidden">
            <h1
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              className={`${spaceGrotesk.className}  text-center split text-4xl text-white text-1`}
            >
              Hola, soy Andrés Calderón Romo
            </h1>

            
            <h1
              className={`${spaceGrotesk.className}  text-center lg:text-nowrap  px-5  split text-4xl text-white text-2 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0`}
            >
              Desarrollador web y Diseñador UX/UI.
              <div className="line xl:bg-purple-500 w-[105px] opacity-0 h-1 absolute lg:right-5"></div>
              <div className="line xl:bg-purple-500 w-[310px] opacity-0 h-1 absolute  lg:left-5"></div>
            </h1>
            
          </section>
          <div className="fixed md:-top-1/4 -top-1/4  left-0 w-full h-full -z-10">
            <CubeScene />
          </div>

          <section className="h-full w-full  flex items-start justify-center text-white md:text-3xl mb-20">
            <div className="w-[70%] md:w-1/2 flex flex-col items-center gap-4  justify-center ">
              <p
                ref={paragraphRef}
                className={`${spaceGrotesk.className}  text-justify opacity-0`}
              >
                Soy un joven desarrollador de{" "}
                <span ref={ageRef} className="text-white inline-block w-[2ch]">
                  26
                </span>{" "}
                años, apacionado por la tecnología y el diseño.
              </p>
              <p
                ref={paragraphRef2}
                className={`${spaceGrotesk.className} opacity-0  text-justify`}
              >
                Siempre listo para “Echar la casa por la ventana” cuando se
                trata de diseñar interfaces y crear páginas web. Mi objetivo es
                simple:
              </p>
              <p
                ref={paragraphRef3}
                className={`${spaceGrotesk.className} opacity-0  mt-10 md:text-5xl text-2xl  text-justify`}
              >
                “Alcanzar la{" "}
                <span
                  ref={zoomTextRef}
                  className="font-sans underline-offset-4 opacity-0"
                >
                  Excelencia
                </span>{" "}
                y entregarla en bandeja de plata a mis clientes”
              </p>
            </div>
          </section>
          <section className=" h-[100vh]  flex items-start justify-center"></section>
        </div>
      </div>
    </>
  );
}
