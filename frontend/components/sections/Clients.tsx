"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  "LAURENT", "VANGUARD", "EQUINOX", "LUMEA", 
  "ASTON MARTIN", "NOCTURNE", "VERDANT", "AURA",
  "ODYSSEY", "ZENITH", "MAISON BLANC", "CREDO"
];

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current,
        { autoAlpha: 0, y: 30 },
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: { grid: [3, 4], from: "center", amount: 1 }, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="clients" className="w-full bg-[#E5E0D8] py-32 px-5 md:px-10 lg:px-20 text-black">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
         
         <div className="w-full flex justify-between items-end mb-16 px-4">
            <h2 className="font-serif text-[40px] md:text-[56px] font-bold leading-none text-black">Selected Partners</h2>
            <p className="font-sans text-[16px] text-warm-gray hidden md:block w-1/3 text-right">
              We exclusively collaborate with organizations committed to industry disruption and aesthetic supremacy.
            </p>
         </div>

         <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] bg-white/20 border border-white/20">
            {CLIENTS.map((client, idx) => (
              <div 
                key={idx}
                ref={el => { itemsRef.current[idx] = el; }}
                className="bg-[#E5E0D8] h-[160px] flex items-center justify-center group cursor-pointer"
              >
                {/* Proxy Logos via bold Typography */}
                <span className="font-display text-[20px] md:text-[24px] uppercase tracking-[0.2em] font-bold text-[#b4afa7] transition-all duration-300 group-hover:text-black group-hover:scale-110">
                  {client}
                </span>
              </div>
            ))}
         </div>

      </div>
    </section>
  );
}
