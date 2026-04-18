"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 9, label: "Core Services", suffix: "+" },
  { value: 360, label: "Coverage", suffix: "°" },
  { value: "∞", label: "Scale Potential", suffix: "" },
  { value: 1, label: "Unified Team", suffix: "" }
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const ruleRef = useRef<HTMLDivElement>(null);
  // Arrays of refs for the numbers to animate
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Create ScrollTrigger to fire when section enters viewport
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          // Bottom sweeping rule
          if (ruleRef.current) {
             gsap.fromTo(ruleRef.current, 
               { scaleX: 0 }, 
               { scaleX: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "left center" }
             );
          }

          // Counter Animations
          numberRefs.current.forEach((element, index) => {
            if (!element) return;
            const stat = STATS[index];
            
            if (typeof stat.value === "number") {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: stat.value,
                duration: 2.0,
                delay: index * 0.15,
                ease: "power2.out",
                onUpdate: () => {
                  element.innerText = Math.floor(obj.val).toString() + stat.suffix;
                }
              });
            } else if (stat.value === "∞") {
               // SVG infinity animation handles itself via CSS, just fade in the container
               gsap.fromTo(element, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay: index * 0.15, ease: "back.out(1.5)" });
            }
          });

          // Vertical Separators
          gsap.fromTo('.stat-separator', 
            { scaleY: 0 }, 
            { scaleY: 1, duration: 0.6, stagger: 0.2, ease: "power2.out", transformOrigin: "top center" }
          );
        },
        once: true // Only plays once
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Hover animations using GSAP quickTo or simple Framer components. Using simple GSAP listeners here.
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const num = (e.currentTarget.querySelector('.stat-number') as HTMLElement);
    const label = (e.currentTarget.querySelector('.stat-label') as HTMLElement);
    
    gsap.to(num, { scale: 1.06, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    gsap.to(label, { y: -4, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const num = (e.currentTarget.querySelector('.stat-number') as HTMLElement);
    const label = (e.currentTarget.querySelector('.stat-label') as HTMLElement);
    
    gsap.to(num, { scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(label, { y: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} className="w-full bg-beige relative border-t border-transparent h-auto min-h-[180px] py-10 md:py-0">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 h-full">
        <div className="flex flex-col md:flex-row items-center h-full justify-between gap-10 md:gap-0">
          
          {STATS.map((stat, index) => (
            <div key={index} className="flex-1 flex flex-row items-center w-full justify-between md:justify-center relative group">
              <div 
                className="flex flex-col items-center justify-center w-full cursor-default"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="stat-number font-stats text-[60px] md:text-[80px] font-bold text-black leading-none flex items-center justify-center min-h-[100px]">
                  {stat.value === "∞" ? (
                    <span ref={el => { numberRefs.current[index] = el; }}>
                      {/* SVG Infinity Path Draw */}
                      <svg width="84" height="42" viewBox="0 0 84 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="infinity-svg">
                        <path 
                          className="path-infinity"
                          d="M21 40C32.598 40 42 21 42 21C42 21 51.402 2 63 2C73.4934 2 82 10.5066 82 21C82 31.4934 73.4934 40 63 40C51.402 40 42 21 42 21C42 21 32.598 2 21 2C10.5066 2 2 10.5066 2 21C2 31.4934 10.5066 40 21 40Z" 
                          stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
                        />
                      </svg>
                    </span>
                  ) : (
                    <span ref={el => { numberRefs.current[index] = el; }}>0</span>
                  )}
                </div>
                <span className="stat-label font-sans text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-warm-gray font-bold transition-colors group-hover:text-gold mt-2">
                  {stat.label}
                </span>
              </div>
              
              {/* Vertical Separator */}
              {index !== STATS.length - 1 && (
                <div className="hidden md:block stat-separator absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gold origin-top" />
              )}
            </div>
          ))}

        </div>
      </div>
      
      {/* Bottom Gold Rule with shimmer gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
        <div ref={ruleRef} className="w-full h-full bg-gold origin-left">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <style>{`
        .path-infinity {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: drawInfinity 2s cubic-bezier(0.8, 0, 0.2, 1) forwards;
          animation-delay: 0.5s;
        }
        @keyframes drawInfinity {
          to { stroke-dashoffset: 0; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
