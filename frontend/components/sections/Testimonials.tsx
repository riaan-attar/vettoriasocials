"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    text: "Vittoria Socials completely redefined our market positioning. The visual aesthetic they delivered yielded a 300% increase in our primary conversion metrics.",
    author: "Elena Rostov",
    role: "CMO, Maison Blanc"
  },
  {
    text: "Working with them feels like an unfair advantage. Their cinematography and distribution strategies are unparalleled in the luxury hospitality space.",
    author: "Marcus Chen",
    role: "Director, Equinox Hotels"
  },
  {
    text: "A masterclass in digital storytelling. The brand identity they architected elevated our product line from premium to unapologetic luxury.",
    author: "Sarah Jenkins",
    role: "Founder, Lumea Jewelry"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || quotesRef.current.length === 0) return;

    let tl: gsap.core.Timeline;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(quotesRef.current, { autoAlpha: 0, y: 50 });
      gsap.set(quotesRef.current[0], { autoAlpha: 1, y: 0 });

      tl = gsap.timeline({ repeat: -1 });

      QUOTES.forEach((_, i) => {
        const nextIdx = (i + 1) % QUOTES.length;
        
        // Progress bar for 5 seconds
        tl.fromTo(lineRef.current, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 5, ease: "none", transformOrigin: "left center" }
        );

        // Transition out current quote
        tl.to(quotesRef.current[i], {
          autoAlpha: 0,
          y: -50,
          duration: 0.8,
          ease: "power2.inOut"
        });

        // Reset the old quote out of sight
        tl.set(quotesRef.current[i], { y: 50 });

        // Transition in next quote overlapping the fade-out
        tl.to(quotesRef.current[nextIdx], {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "<0.2");
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="testimonials" className="w-full bg-canvas py-32 px-5 md:px-10 lg:px-20 text-black relative">
      <div className="max-w-[1440px] mx-auto min-h-[400px] flex flex-col justify-center relative">
         
         <div className="w-full relative h-[300px] flex items-center">
            {QUOTES.map((quote, idx) => (
               <div 
                  key={idx} 
                  ref={el => { quotesRef.current[idx] = el; }}
                  className="absolute inset-0 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 invisible pt-10"
               >
                  {/* Quote Text */}
                  <div className="w-full lg:w-[65%]">
                     <p className="font-serif text-[32px] md:text-[40px] leading-[1.3] text-black">
                       &quot;{quote.text}&quot;
                     </p>
                  </div>
                  
                  {/* Author */}
                  <div className="w-full lg:w-[30%] flex flex-col lg:items-end text-left lg:text-right pt-2 border-t lg:border-t-0 border-beige-deep lg:mt-0 mt-8">
                     <h4 className="font-sans text-[20px] font-bold text-black mb-1">{quote.author}</h4>
                     <p className="font-sans text-[14px] uppercase tracking-widest text-warm-gray">{quote.role}</p>
                  </div>
               </div>
            ))}
         </div>
         
         {/* Timeline Bar */}
         <div className="absolute bottom-10 left-0 w-full h-[2px] bg-beige-deep overflow-hidden">
            <div ref={lineRef} className="w-full h-full bg-gold origin-left" />
         </div>
      </div>
    </section>
  );
}
