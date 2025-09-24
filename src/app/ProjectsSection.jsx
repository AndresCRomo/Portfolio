import React from 'react'
import { Space_Grotesk } from "next/font/google";
import "./globals.css"
import { useEffect } from 'react';
import { gsap } from "gsap";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});



function ProjectsSection() {
    {/* <h1 className={`${spaceGrotesk.className} lg:text-8xl md:text-6xl text-5xl `}>Proyectos</h1> */}
    useEffect(() => {
    document.addEventListener("DOMContentLoaded",()=>{
        const totalSlides = 4;
        let currentSlide = 1;
        let isAnimating = false;
        let scrollAllowed = true;
        let lastScrollTime = 0;
    
        const slideTitles =[
            "MIAA Web",
            "MIAA App Movil",
            "Threejs Shaders",
            "HSTL"
        ];
        const slideDescriptions =[
            "Desarrollo Web MIAA",
            "Desarrollo UX/UI App Movil",
            "Tecnicas y Shaders",
            "Branding HSTL"
        ]
        function createSlide (slideNumber, direction){
            const slide = document.createElement("div");
            slide.className= "slide"
    
            const slideBgImg = document.createElement("div");
            slideBgImg.className= "slide-bg-img"
    
            const img = document.createElement("img");
            img.src = `/Project-IMG-${slideNumber}.jpg`;
            img.alt = "";
            
            slideBgImg.appendChild(img);
            slide.appendChild(slideBgImg);
            
            if(direction === "down"){
                slideBgImg.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            } else {
                slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                
            }
            return slide;
        }
        function createMainImageWrapper(slideNumber, direction){
            const wrapper = document.createElement("div");
            wrapper.className = "slide-main-img-wrapper"
            
            const img = document.createElement("img");
            img.src = `/Project-IMG-${slideNumber}.jpg`;
            img.alt = "";
            
            wrapper.appendChild(img);
            
            if(direction === "down"){
                
                wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            } else {
                wrapper.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            }
            return wrapper;
            
        }
        function createTextElements(slideNumber, direction){
            const newTitle = document.createElement("h1");
            newTitle.textContent = slideTitles[slideNumber -1];
            gsap.set(newTitle,{
                y: direction === "down" ? 50 : -50,
            });

            const newDescription = document.createElement("p");
            newDescription.textContent = slideDescriptions[slideNumber -1];
            gsap.set(newDescription,{
                y: direction === "down" ? 20 : -20
            })

            const newCounter = document.createElement("p");
            newCounter.textContent = slideNumber;
            gsap.set(newCounter,{
                y: direction === "down" ? 18 : -18
            })
            return {newTitle, newDescription, newCounter}
        }
        function animateSlide ( direction){
            if(isAnimating || !scrollAllowed)return;

            isAnimating = true;
            scrollAllowed = false;
            const slider = document.querySelector(".slider");
            const currentSlideElement = slider.querySelector(".slide");
            const mainImageContainer = document.querySelector(".slide-main-img");
            const currentMainWrapper = mainImageContainer.querySelector(".slide-main-img-wrapper")
            const titleContainer = document.querySelector(".slide-title");
            const descriptionCountainer = document.querySelector(".slide-description");
            const counterContainer = document.querySelector(".count");
            const currentTitle = titleContainer.querySelector("h1");
            const currentDescription = descriptionCounter.querySelector("p");
            const currentCounter = counterContainer.querySelector("p")

            if(direction === "down"){
                currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
            } else {
                currentSlide  = currentSlide === 1 ? totalSlides : currentSlide -1;  
            }

            const newSlide = createSlide(currentSlide, direction);
            const newMainWrapper = createMainImageWrapper(currentSlide, direction);
            const {newTitle, newDescription, newCounter} = createTextElements(
                currentSlide,
                direction
            );
            slider.appendChild(newSlide);
            mainImageContainer.appendChild(newMainWrapper);
            titleContainer.appendChild(newTitle);
            descriptionCountainer.appendChild(newDescription);
            counterContainer.appendChild(newCounter);

            gsap.set(newMainWrapper.querySelector("img"),{
                y: direction === "down" ? "-50%" : "50%",
            })
            const tl = gsap.timeline({
                onComplete: ()=>{
                    [
                        currentSlideElement,
                        currentMainWrapper,
                        currentTitle,
                        currentDescription,
                        currentCounter
                    ].forEach((el)=> el?.remove());

                    isAnimating = false;
                    setTimeout(()=>{
                        scrollAllowed = true;
                        lastScrollTime = Date.now();
                    },100)
                }
            })
            tl.to(
                newSlide.querySelector(".slide-bg-img"),{
                    clipPath:
                    direction === "down"
                    ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
                    : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                newMainWrapper,
                {
                    clipPath:
                    direction === "down"
                    ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    : "polygon(0% 100%, 100% 100%, 100% 0% , 0% 0%)",
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                currentMainWrapper.querySelector("img"),
                {
                    y: direction === "down" ? "50%" : "-50%",
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            ).to(
                newMainWrapper.querySelector("img"),
                {
                    y: "0%",
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                currentTitle,
                {
                    y: direction === "down" ? -50: 50,
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                newTitle,
                {
                    y: 0,
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                currentDescription,
                {
                    y: direction === "down" ? -20 : 20,
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                newDescription,
                {
                    y: 0,
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                currentCounter,
                {
                    y:direction === "down" ? -18 : 18,
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            )
            .to(
                newCounter,
                {
                    y: 0,
                    duration: 1.25,
                    ease: CustomEase.create("",".87,0,.13,1")
                },
                0
            );
        }
        function handleScroll(direction){
            const now = Date.now();
            if(isAnimating || !scrollAllowed) return;
            if(now - lastScrollTime <1000) return;
            lastScrollTime = now;
            animateSlide(direction);
        }

        window.addEventListener("wheel", (e) =>{
            e.preventDefault();
            const direciton = e.deltaY > 0 ? "down" : "up";
            handleScroll(direciton);
        }, 
        {
            passive:false, 
        }
    );

        let touchStartY=0;
        let isTouchActive = false;

        window.addEventListener("touchstart", (e)=>{
            touchStartY = e.touches[0].clientY;
            isTouchActive = true;
        },
        {
            passive: false,        
        }
    );
        window.addEventListener("touchmove", (e) => {
            e.preventDefault();
            if(!isTouchActive || isAnimating || !scrollAllowed) return;
            const touchCurrentY = e.touches[0].clientY;
            const difference = touchStartY - touchCurrentY;
            if(Math.abs(difference) > 10){
                isTouchActive = false;
                const direction = difference > 0 ? "down" : "up";
                handleScroll(direction);
            }
        },
        {
            passive: false,
        }
    );
        window.addEventListener("touched", () => {
            isTouchActive = false;
        })
    })
    },[])
    return (
        <div div className='w-[100%] h-[100%]'>
            <div className='slider relative w-[100%] h-[100%] overflow-hidden'>
                <div className='slide absolute top-0 left-0 w-[100%] h-[100%]'>
                    <div 
                        className='slide-bg-img absolute top-0 left-0 w-[100%] h-[100%]'
                        style={{
                            clipPath : "polygon(0% 0%,  100% 0%, 100% 100%, 0% 100%)",
                            willChange: "clip-path",
                        }}
                        >
                        <img className='w-[100%] h-[100%] object-cover will-change-transform lg:opacity-100 opacity-80' src="/Project-IMG-1.jpg" alt=''/>
                    </div>
                </div>
            </div>
            <div 
                className="slide-main-img w-[65%] absolute top-[50%] left-[50%] lg:w-[30%] h-[10%] z-20"
                style={{
                    transform: "translate(-50% , 145%)"
                }}>
                <div 
                    className='slide-main-img-wrapper absolute top-0 left-0 w-[100%] h-[100%]'
                    style={{
                        clipPath : "polygon(0% 0%,  100% 0%, 100% 100%, 0% 100%)",
                        willChange: "clip-path",
                    }}>
                    <img className='w-[100%] h-[100%] object-cover will-change-transform lg:brightness-100 brightness-90' src="/Project-IMG-1.jpg" alt="" />
                </div>
            </div>

            <div 
            className="slide-copy absolute top-[73%] left-[50%] drop-shadow-2xl lg:top-[70%] lg:left-[30%] text-white z-20"
            style={{
                transform: "translate(-50% , -50%)"
            }}>
                <div 
                className="slide-title w-[500px] h-[50px] mb-3"
                style={{
                    clipPath : "polygon(0% 0%,  100% 0%, 100% 100%, 0% 150%)",
                }}>
                    <h1 
                    className={`${spaceGrotesk.className} text-6xl font-bold  text-white will-change-transform`}
                    style={{
                        transform: "translateY(0px)",
                        
                    }}
                    
                    >Field Unit</h1>
                </div>
                <div 
                className="slide-description relative w-[500px] h-[20px]"
                style={{
                    clipPath : "polygon(0% 0%,  100% 0%, 100% 100%, 0% 150%)",
                }}>
                    <p 
                    className='absolute text-white text-2xl will-change-transform '
                    style={{ transform: "translateY(0px)"}}>Content art:</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectsSection
