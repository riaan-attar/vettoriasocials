"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  { id: 1, client: "Aura Boutique", type: "Reels / TikTok", aspect: "aspect-[3/4]" },
  { id: 2, client: "Maison Blanc", type: "Web & Photography", aspect: "aspect-[4/3]" },
  { id: 3, client: "Hyperion Gym", type: "Ad Campaign", aspect: "aspect-[1/1]" },
  { id: 4, client: "Starlight Coffee", type: "Social Strategy", aspect: "aspect-[3/4]" },
  { id: 5, client: "Equinox Hotels", type: "Cinematography", aspect: "aspect-[16/9]" },
  { id: 6, client: "Verdant Skin", type: "UGC Program", aspect: "aspect-[3/4]" },
];

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Assign individual scroll triggers to unmask each image on scroll reveal
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        const mask = item.querySelector('.portfolio-mask');
        const imgProx = item.querySelector('.portfolio-img-proxy');
        
        if (mask && imgProx) {
          gsap.fromTo(mask, 
            { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }, 
            { 
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
              duration: 1.2, 
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              }
            }
          );
          
          // Slight parallax pull down inside mask while clipping
          gsap.fromTo(imgProx,
             { scale: 1.15, y: -20 },
             {
               scale: 1, 
               y: 0,
               duration: 1.6,
               ease: "power2.out",
               scrollTrigger: {
                 trigger: item,
                 start: "top 85%",
               }
             }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Hover Interaction
  const handleMouseEnter = (idx: number) => {
     if (prefersReducedMotion) return;
     const item = itemsRef.current[idx];
     if (!item) return;
     
     const imgProx = item.querySelector('.portfolio-img-proxy');
     const title = item.querySelector('.portfolio-title');

     if (imgProx) {
       gsap.to(imgProx, { scale: 1.05, duration: 0.6, ease: "power2.out" });
     }
     if (title) {
       gsap.to(title, { x: 10, duration: 0.4, ease: "power2.out" });
     }
  };

  const handleMouseLeave = (idx: number) => {
     if (prefersReducedMotion) return;
     const item = itemsRef.current[idx];
     if (!item) return;

     const imgProx = item.querySelector('.portfolio-img-proxy');
     const title = item.querySelector('.portfolio-title');

     if (imgProx) {
       gsap.to(imgProx, { scale: 1, duration: 0.6, ease: "power2.out" });
     }
     if (title) {
       gsap.to(title, { x: 0, duration: 0.4, ease: "power2.out" });
     }
  };

  return (
    <section ref={sectionRef} id="works" className="w-full bg-black py-32 px-5 md:px-10 lg:px-20 text-white border-t border-transparent relative">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="mb-24 md:w-2/3">
          <h2 className="font-display text-[56px] md:text-[80px] font-bold leading-tight mb-6 text-white">
            Transformative <br />
            <span className="text-warm-gray italic font-serif font-normal">output.</span>
          </h2>
          <p className="font-sans text-[18px] text-warm-gray leading-[1.6] max-w-[600px]">
            A meticulously curated selection of our finest multi-platform deployments spanning luxury hospitality, E-Commerce, and high-stakes lifestyle brands.
          </p>
        </div>

        {/* 2-Column CSS Columns Masonry */}
        <div className="columns-1 md:columns-2 gap-8 md:gap-12 space-y-12">
          {WORKS.map((work, index) => (
            <div 
              key={work.id}
              ref={el => { itemsRef.current[index] = el; }}
              className="break-inside-avoid group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div 
                className={`portfolio-mask w-full ${work.aspect} relative overflow-hidden bg-[#111]`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                {/* Proxy Image Background */}
                <div 
                  className="portfolio-img-proxy w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.6)), radial-gradient(circle at center, #222, #050505)`,
                    backgroundSize: '150% 150%'
                  }}
                >
                  {/* Subtle gradient grain effect */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08), transparent 60%)' }} />
                </div>
                
                {/* Internal Hover Badge */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/70 flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 border border-white/10">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
              </div>

              <div className="mt-5 flex justify-between items-end border-b border-white/10 pb-4">
                 <div>
                   <h3 className="portfolio-title font-sans text-[22px] font-semibold text-white tracking-wide">{work.client}</h3>
                   <span className="font-sans text-[12px] uppercase text-warm-gray tracking-widest block mt-2">{work.type}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-24 flex justify-center">
            <button className="px-10 py-4 border border-white/20 rounded-full text-white font-sans text-[14px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-400">
              View Complete Archive
            </button>
        </div>

      </div>
    </section>
  );
}
