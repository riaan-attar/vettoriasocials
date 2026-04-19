"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "Full-Fledged Video Production",
    desc: "End-to-end cinematic narratives for brands, events, and individual profiles.",
    tags: ["Events", "Concerts", "Individual"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
    )
  },
  {
    num: "02",
    title: "Drone & DSLR Cinematography",
    desc: "High-grade aerial establishing shots and pristine 4K ground footage.",
    tags: ["Drone", "DSLR", "Aerial"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
    )
  },
  {
    num: "03",
    title: "Professional Video Editing",
    desc: "Hollywood-style post-production, advanced colour grading, and immersive soundscapes.",
    tags: ["Colour Grading", "Motion", "Sound Design"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
    )
  },
  {
    num: "04",
    title: "Influencer Video Production",
    desc: "Authentic UGC campaigns and influencer collaborations that spark algorithmic reach.",
    tags: ["UGC", "Collab", "Social"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    )
  },
  {
    num: "05",
    title: "Café & F&B Marketing",
    desc: "Mouth-watering visual storytelling specifically engineered for restaurants and cafes.",
    tags: ["Lifestyle", "F&B", "Local"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
    )
  },
  {
    num: "06",
    title: "Reels Generation",
    desc: "High-retention short-form content designed to leverage fast-paced mobile consumption.",
    tags: ["Instagram", "TikTok", "Shorts"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
    )
  },
  {
    num: "07",
    title: "Ads Shoot",
    desc: "Conversion-optimized commercial videography for digital campaigns and TVC.",
    tags: ["Digital Ads", "TVC", "Campaign"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    )
  },
  {
    num: "08",
    title: "Website Development",
    desc: "Immersive web experiences pushing the boundaries of WebGL and creative development.",
    tags: ["UI/UX", "E-Commerce", "CMS"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    )
  },
  {
    num: "09",
    title: "Data Analytics",
    desc: "Rigorous tracking infrastructures to measure the direct output of our creative.",
    tags: ["Dashboards", "Tracking", "Insights"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
    )
  }
];

export default function ServicesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  return (
    <section id="services" className="w-full bg-cream py-32 px-5 md:px-10 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto min-h-[600px] flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full flex justify-between items-end mb-16 px-4 md:px-10 lg:px-20 z-10 relative">
          <h2 className="font-serif text-[48px] md:text-[64px] font-bold leading-none text-black">Our Services</h2>
          <span className="font-stats text-gold text-[24px] md:text-[32px] font-bold">09</span>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[1440px] h-[450px] flex justify-center items-center perspective-[1200px]">
          <AnimatePresence initial={false}>
            {SERVICES.map((s, idx) => {
              // Calculate offset, enabling wrap-around logic
              let diff = idx - activeIndex;
              if (diff > Math.floor(SERVICES.length / 2)) diff -= SERVICES.length;
              if (diff < -Math.floor(SERVICES.length / 2)) diff += SERVICES.length;
              
              const absDiff = Math.abs(diff);
              
              // Only render visible items
              if (absDiff > 3) return null;

              const isCenter = diff === 0;
              const direction = diff > 0 ? 1 : -1;
              const offsetX = direction * (absDiff * 95); // Increased from 50 to 95 for wider horizontal spread
              const scale = 1 - (absDiff * 0.15);
              const opacity = 1 - (absDiff * 0.35);
              const zIndex = 10 - absDiff;
              const blur = absDiff * 1.5;

              // Alternating "up and down" trench pattern
              const verticalOffset = absDiff % 2 === 1 ? -60 : 20; 

              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${offsetX}%)`,
                    y: `calc(-50% + ${verticalOffset}px)`,
                    scale,
                    opacity,
                    zIndex,
                    filter: `blur(${blur}px)`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute top-1/2 left-1/2 w-[300px] md:w-[380px] min-h-[380px] rounded-3xl p-8 flex flex-col justify-between shadow-2xl cursor-pointer
                    ${isCenter 
                      ? 'bg-[#E7DED0] border-transparent text-black' 
                      : 'bg-white border border-beige/40 text-black'}
                  `}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    transformOrigin: "center center",
                  }}
                >
                  {/* Decorative line for center card (like the screenshot) */}
                  {isCenter && (
                    <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-black/10 rounded-tr-lg" />
                  )}

                  {/* Top Area */}
                  <div className="z-10">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`font-sans text-[14px] font-bold ${isCenter ? 'text-black/60' : 'text-gold'}`}>
                        {s.num}
                      </span>
                      <div className="service-icon text-black">
                        {s.icon}
                      </div>
                    </div>
                    <h3 className="font-sans text-[26px] font-semibold mb-4 pr-4 leading-[1.2] text-black">
                      {s.title}
                    </h3>
                  </div>

                  {/* Middle / Tags Space */}
                  <div className="flex-1 mt-2 z-10 mb-6">
                    <p className="font-sans text-[16px] leading-[1.6] text-warm-gray">
                      {s.desc}
                    </p>
                  </div>

                  {/* Bottom / Tags */}
                  <div className={`flex flex-wrap gap-2 pt-4 z-10 ${!isCenter && 'border-t border-beige/50'}`}>
                    {s.tags.map((tag, tIdx) => (
                       <span 
                         key={tIdx} 
                         className={`font-sans text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full
                           ${isCenter ? 'bg-white text-black' : 'bg-beige/30 text-black'}
                         `}
                       >
                         {tag}
                       </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex gap-4 items-center justify-center mt-12 z-20">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-xl border border-warm-gray/30 bg-white flex items-center justify-center text-black hover:bg-beige transition-colors shadow-sm"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-xl border border-warm-gray/30 bg-white flex items-center justify-center text-black hover:bg-beige transition-colors shadow-sm"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}
