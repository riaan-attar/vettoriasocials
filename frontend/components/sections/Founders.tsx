"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
          <div className="w-full md:w-[45%] aspect-[4/5] relative overflow-hidden bg-black rounded-lg" ref={maskRef}>
             <div 
               ref={imgRef}
               className="w-full h-[120%] absolute top-[-10%] left-0"
             >
               <Image 
                 src="/images/founder.jpg" 
                 alt="Smit Kamod" 
                 fill
                 className="object-cover"
               />
             </div>
             {/* Subtle Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
          </div>

          {/* Bio Typography Right */}
          <div className="w-full md:w-[55%] flex flex-col justify-center" ref={textRef}>
             <span className="founder-text font-sans text-[12px] uppercase tracking-widest text-gold mb-6 font-bold block">
               Meet the Founder
             </span>
             <h2 className="founder-text font-display text-[48px] md:text-[64px] font-bold leading-[1.1] mb-8 text-black">
               Smit <br />
               <span className="italic font-serif font-normal text-warm-gray">Kamod.</span>
             </h2>

             <div className="flex flex-col gap-5">
                <p className="founder-text font-sans text-[22px] text-black font-medium leading-[1.5] italic border-l-2 border-gold pl-4">
                   &quot;My vision is to provide the highest quality content — no compromises, no shortcuts.&quot;
                </p>
                <p className="founder-text font-sans text-[17px] text-warm-gray leading-[1.7] mt-2">
                   Currently pursuing a B.Tech in Artificial Intelligence & Data Science, I&apos;m deeply passionate about data science and data analytics. I thrive on creative challenges, blending technical precision with imaginative thinking to build work that actually means something.
                </p>
                <p className="founder-text font-sans text-[17px] text-warm-gray leading-[1.7]">
                   When I&apos;m not building or analyzing, I&apos;m out running — because discipline in sport and discipline in work are the same thing.
                </p>
             </div>

             <div className="founder-text mt-8 flex flex-wrap gap-2">
                 {['Data Science', 'Data Analytics', 'AI & ML', 'Creative Strategy', 'Content Creation', 'Runner & Fitness'].map(tag => (
                   <span key={tag} className="bg-beige/40 text-black px-4 py-2 text-[11px] uppercase tracking-wider font-semibold rounded-full border border-beige-deep">
                     {tag}
                   </span>
                 ))}
             </div>

             <div className="founder-text mt-10 pt-8 border-t border-beige-deep flex flex-col md:flex-row gap-8">
                <div>
                   <h4 className="font-serif text-[24px] text-black font-bold">Founder & CD</h4>
                   <span className="font-sans text-[12px] uppercase text-warm-gray tracking-widest block mt-1">Agency founded 2025</span>
                </div>
                <div>
                   <h4 className="font-serif text-[24px] text-black font-bold">B.Tech AI & DS</h4>
                   <span className="font-sans text-[12px] uppercase text-warm-gray tracking-widest block mt-1">Class of 2025</span>
                </div>
             </div>
          </div>

       </div>
    </section>
  );
}
