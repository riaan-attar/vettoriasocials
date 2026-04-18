"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Founders() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
       // Image Mask Reveal
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: "top 70%",
         animation: gsap.fromTo(maskRef.current, 
            { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power3.inOut" }
         )
       });

       // Image Parallax
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: "top bottom",
         end: "bottom top",
         scrub: true,
         animation: gsap.fromTo(imgRef.current, 
           { y: -50, scale: 1.1 }, 
           { y: 50, scale: 1, ease: "none" }
         )
       });

       // Text stagger fade up
       gsap.fromTo(".founder-text",
          { autoAlpha: 0, y: 30 },
          { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%"
            }
          }
       );

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="founders-bio" className="w-full bg-canvas py-32 px-5 md:px-10 lg:px-20 text-black border-t border-transparent">
       <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          {/* Parallax Image Left */}
          <div className="w-full md:w-[45%] aspect-[4/5] relative overflow-hidden bg-[#111]" ref={maskRef}>
             <div 
               ref={imgRef}
               className="w-full h-[120%] absolute top-[-10%] left-0"
               style={{ 
                 background: 'linear-gradient(135deg, #1a1815 0%, #2a2520 30%, #1a1815 50%, #111 100%)',
                 filter: "grayscale(100%) contrast(1.1)"
               }}
             >
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[60%] h-[70%] rounded-full bg-gradient-to-b from-[#333] to-[#1a1a1a] opacity-40" />
               </div>
             </div>
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />
          </div>

          {/* Bio Typography Right */}
          <div className="w-full md:w-[55%] flex flex-col justify-center" ref={textRef}>
             <span className="founder-text font-sans text-[12px] uppercase tracking-widest text-gold mb-6 font-bold block">
               The Creators
             </span>
             <h2 className="founder-text font-display text-[48px] md:text-[64px] font-bold leading-[1.1] mb-8 text-black">
               Led by <br />
               <span className="italic font-serif font-normal text-warm-gray">Visionaries.</span>
             </h2>

             <div className="flex flex-col gap-5">
                <p className="founder-text font-sans text-[17px] text-warm-gray leading-[1.7]">
                   Vettoria Socials was founded on a singular premise: the intersection of high-art cinematography and rigorous data science is where modern legacy brands are born.
                </p>
                <p className="founder-text font-sans text-[17px] text-warm-gray leading-[1.7]">
                   Our leadership brings 15+ years of combined expertise spanning independent film production, Fortune 500 digital marketing algorithms, and luxury brand architecture.
                </p>
                <p className="founder-text font-sans text-[17px] text-warm-gray leading-[1.7]">
                   We don&apos;t just build campaigns; we craft enduring digital empires.
                </p>
             </div>

             <div className="founder-text mt-12 pt-8 border-t border-beige-deep flex flex-col md:flex-row gap-8">
                <div>
                   <h4 className="font-serif text-[24px] text-black font-bold">Alexander Reed</h4>
                   <span className="font-sans text-[12px] uppercase text-warm-gray tracking-widest block mt-1">Co-Founder, CDO</span>
                </div>
                <div>
                   <h4 className="font-serif text-[24px] text-black font-bold">Valeria Cross</h4>
                   <span className="font-sans text-[12px] uppercase text-warm-gray tracking-widest block mt-1">Co-Founder, CMO</span>
                </div>
             </div>
          </div>

       </div>
    </section>
  );
}
