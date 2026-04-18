"use client";

import { useEffect, useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { id: 1, title: "Aston Martin DB12 Launch", category: "Commercial Videography", gradient: "from-[#1a1a1a] to-[#0a0a0a]" },
  { id: 2, title: "Nocturne Coffee Roasters", category: "Lifestyle & Brand Story", gradient: "from-[#2a2520] to-[#12100d]" },
  { id: 3, title: "Lumea High Jewelry", category: "Social Influence Campaign", gradient: "from-[#1b1c20] to-[#0d0e12]" },
];

function VideoCard({ video, index }: { video: typeof VIDEOS[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!playButtonRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate distance from center of the card
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);
    
    // Move play button 30% towards the mouse for magnetic effect
    gsap.to(playButtonRef.current, {
       x: x * 0.3,
       y: y * 0.3,
       duration: 0.6,
       ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    if (!playButtonRef.current) return;
    // Snap back to center
    gsap.to(playButtonRef.current, {
       x: 0,
       y: 0,
       duration: 0.6,
       ease: "elastic.out(1, 0.3)"
    });
  };

  const handleMouseEnter = () => {
     if (!playButtonRef.current) return;
     gsap.to(playButtonRef.current, { scale: 1.1, duration: 0.3, backgroundColor: '#C9A96E' });
  };

  const handleMouseLeaveContainer = () => {
     handleMouseLeave();
     if (!playButtonRef.current) return;
     gsap.to(playButtonRef.current, { scale: 1, duration: 0.3, backgroundColor: 'rgba(255,255,255,1)' });
  };

  return (
    <div 
      className="shrink-0 w-[85vw] md:w-[70vw] h-[60vh] md:h-[75vh] flex items-center justify-center relative px-4 md:px-8"
    >
      <div 
        ref={cardRef}
        className={`w-full h-full rounded-2xl overflow-hidden relative cursor-pointer group bg-gradient-to-br ${video.gradient} border border-white/5 flex items-center justify-center`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveContainer}
      >
        {/* Placeholder Ambient Geometry */}
        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
            {index === 0 && <div className="w-[40vw] h-[40vw] rounded-full border border-gold/40 animate-[spin_60s_linear_infinite]" />}
            {index === 1 && <div className="w-[30vw] h-[30vw] rotate-45 border border-white/20" />}
            {index === 2 && <div className="w-[50vw] h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent rotate-12" />}
        </div>
        
        {/* Play Button */}
        <div 
           ref={playButtonRef} 
           className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center z-20 mix-blend-difference"
           style={{ transform: 'translate(0px, 0px)' }}
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 text-black translate-x-[2px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Video Tags */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
          <div>
             <span className="font-sans text-[12px] uppercase tracking-widest text-gold mb-2 block font-semibold">{video.category}</span>
             <h3 className="font-display text-[28px] md:text-[40px] text-white">{video.title}</h3>
          </div>
          <div className="hidden md:block font-stats text-white/50 text-[20px]">
             0{video.id}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollCoverRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Setup horizontal scroll with dynamic evaluation for responsiveness
      const getScrollAmount = () => {
         const trackWidth = trackRef.current?.scrollWidth || 0;
         return Math.max(0, trackWidth - window.innerWidth);
      };

      gsap.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: true, // Native 1:1 scrub with Lenis
          invalidateOnRefresh: true, // Recalculates dynamically on layout/resize
        }
      });

      // Initial unpin mask for dramatic entrance
      if (scrollCoverRef.current) {
        gsap.to(scrollCoverRef.current, {
          scaleY: 0,
          transformOrigin: "bottom center",
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top top",
            scrub: true
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section 
      ref={sectionRef} 
      id="showcase"
      className="h-screen w-full bg-black relative overflow-hidden text-white flex items-center"
    >
      <div 
        ref={scrollCoverRef} 
        className="absolute inset-0 bg-canvas z-50 pointer-events-none" 
      />

      <div className="absolute top-10 left-10 md:left-20 z-40 Mix-blend-difference">
         <h2 className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/60">Featured Showreel</h2>
      </div>

      <div ref={trackRef} className="flex flex-nowrap w-max items-center h-full pl-[5vw] md:pl-[15vw] pr-[50vw] md:pr-[20vw] will-change-transform">
         {VIDEOS.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
         ))}
      </div>
    </section>
  );
}
