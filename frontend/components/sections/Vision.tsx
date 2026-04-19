"use client";

import { useEffect, useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: "Creative Excellence",
    desc: "We engineer visually stunning, narrative-driven content customized to elevate brand perception.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
         <circle cx="12" cy="12" r="10"></circle>
         <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
         <line x1="9" y1="9" x2="9.01" y2="9"></line>
         <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    )
  },
  {
    title: "Precision Execution",
    desc: "Methodical distribution mapping and meticulous digital architectures to ensure zero-waste campaigns.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    )
  },
  {
    title: "Brand Partnership",
    desc: "We embed ourselves into your business metrics, operating as an internalized extension of your team.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    title: "Results First",
    desc: "Aesthetic mastery fused with relentless data optimization to output tangible exponential growth.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    )
  }
];

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const headline = "Built to Scale Every Brand We Touch.";
  const words = headline.split(" ");

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      tl.to('.vision-word-inner', {
        y: "0%",
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out"
      });

      tl.fromTo(bodyRef.current, 
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.4
      );

      tl.fromTo(cardsRef.current, 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        0.6
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, idx: number) => {
    if (prefersReducedMotion) return;
    const card = cardsRef.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out" 
    });
  };

  const handleMouseLeave = (idx: number) => {
     if (prefersReducedMotion) return;
     const card = cardsRef.current[idx];
     if (!card) return;
     
     gsap.to(card, {
       rotateX: 0,
       rotateY: 0,
       scale: 1,
       duration: 0.6,
       ease: "elastic.out(1, 0.5)"
     });
  };

  return (
    <section ref={sectionRef} id="vision" className="w-full bg-[#fcf9f5] py-32 px-5 md:px-10 lg:px-20 overflow-hidden text-black z-20 relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row justify-between mb-24 gap-12 lg:gap-0">
          <div className="w-full lg:w-[55%]">
            <h2 className="font-display text-[48px] md:text-[64px] font-bold leading-[1.1] text-black">
              {words.map((word, i) => (
                <span key={i} className="inline-block relative overflow-hidden mr-[0.25em]">
                  {/* The visible animated span */}
                  <span 
                    className="vision-word-inner inline-block translate-y-[100%]" 
                    style={{ clipPath: 'inset(0 0 100% 0)' }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          
          <div className="w-full lg:w-[40%] flex flex-col justify-end">
            <p ref={bodyRef} className="opacity-0 font-sans text-[18px] text-warm-gray leading-[1.6]">
              Vittoria Socials is a full-service creative engine. We craft premium digital presence, capture high-end cinematography, and distribute it directly through intelligent data channels.
            </p>
          </div>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {PILLARS.map((pillar, idx) => (
            <div 
              key={idx} 
              ref={el => { cardsRef.current[idx] = el; }}
              className="bg-white p-8 rounded-xl opacity-0 transform-gpu cursor-default group"
              style={{ boxShadow: '0 4px 24px rgba(10,10,10,0.06)' }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              <div className="text-gold mb-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#C9A96E]">
                {pillar.icon}
              </div>
              <h3 className="font-sans font-semibold text-[22px] mb-4 text-black">
                {pillar.title}
              </h3>
              <p className="font-sans text-[16px] text-warm-gray leading-[1.6]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
