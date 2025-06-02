"use client";
import { use, useEffect } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { Space_Grotesk } from "next/font/google";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"], // Puedes incluir más si necesitas
});

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(SplitText);

      const split = new SplitText(".split", { type: "words", mask: "lines", linesClass: "line"});
      gsap.from(split.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.1, 
        duration: 0.6,
      });

      

    }
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-[#080915]">
      <section className="w-full flex items-center justify-center text-center">
        <h1 className={`${spaceGrotesk.className} split text-4xl`}>
          Hola mi nombre es Andrés Caldrón Romo
        </h1>
      </section>
      <section>
        <p className={`${spaceGrotesk.className} text-lg mt-4`}>
          Soy un desarrollador web y diseñador UX/UI.
        </p>
      </section>
    </div>
  );
}
