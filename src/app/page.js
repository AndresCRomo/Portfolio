"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
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
      }).to(
        ".text-2",
        {
          yPercent: -100,
          opacity: 1,
          duration: 1,
        },
        "<"
      );
    }
  }, []);

  return (
    <div id="smooth-wrapper" className="bg-[#080915]">
      <div id="smooth-content">
        <section className="mask w-full h-screen flex items-center justify-center text-center relative overflow-hidden">
          <h1
            className={`${spaceGrotesk.className} split text-4xl text-white text-1`}
          >
            Hola, soy Andrés Calderón Romo
          </h1>
          <h1
            className={`${spaceGrotesk.className} split text-4xl text-white text-2 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0`}
          >
            Soy un Desarrollador web y diseñador UX/UI.
          </h1>
        </section>

        <section className="h-[200vh] flex items-center justify-center text-white text-3xl">
          Aquí empieza tu portafolio...
        </section>
      </div>
    </div>
  );
}
