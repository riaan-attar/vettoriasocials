"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  { num: "I", title: "Creative Excellence", desc: "Producing industry-defining visual aesthetics that elevate brand perception instantly." },
  { num: "II", title: "Precision Execution", desc: "Zero-waste campaigns deployed through methodical, hyper-targeted digital architecture." },
  { num: "III", title: "Brand Partnership", desc: "We operate as an internalized extension of your leadership and marketing team." },
  { num: "IV", title: "Results First", desc: "Beautiful design is a vehicle for tangible, exponential revenue growth." },
  { num: "V", title: "Scale Mentality", desc: "Every system we build is designed to handle your company's next phase of growth." },
];

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          PRINCIPLES.forEach((_, i) => {
             const row = rowsRef.current[i];
             const num = numsRef.current[i];

             if (num) {
               gsap.fromTo(num, 
                  { scale: 0.8, opacity: 0 }, 
                  { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out", delay: i * 0.2 }
               );
             }

             if (row) {
                 gsap.fromTo(row,
                   { x: 80, opacity: 0 },
                   { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: (i * 0.2) + 0.1 }
                 );
             }
          });
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="founders" className="w-full bg-canvas py-32 px-5 md:px-10 lg:px-20 text-black">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-display text-[40px] md:text-[56px] font-bold mb-16 px-4">Who core principles.</h2>
        
        <div className="flex flex-col w-full">
           {PRINCIPLES.map((principle, index) => (
             <div 
               key={index}
               className="group relative flex flex-col md:flex-row items-start md:items-center py-8 px-4 transition-colors duration-300 hover:bg-cream"
             >
               {/* Roman Numeral */}
               <div className="w-[120px] md:w-[180px] shrink-0 mb-4 md:mb-0">
                 <div ref={el => { numsRef.current[index] = el; }} className="font-stats text-[60px] md:text-[100px] leading-none text-beige-deep/50 relative">
                   {principle.num}.
                 </div>
               </div>

               {/* Content */}
               <div ref={el => { rowsRef.current[index] = el; }} className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                 <h3 className="font-serif text-[24px] md:text-[28px] text-black transition-colors duration-200 group-hover:text-gold w-full md:w-[30%]">
                   {principle.title}
                 </h3>
                 <p className="font-sans text-[16px] text-warm-gray leading-[1.6] flex-1">
                   {principle.desc}
                 </p>
               </div>

               {/* Thin Separator Base */}
               <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-beige-deep" />
               {/* Hover Expanded Separator */}
               <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
