"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Row by row stagger
      // Since it's a 3x3 grid, rows are [0,1,2], [3,4,5], [6,7,8]
      // We can just use a simple stagger where `stagger: { grid: [3,3], from: "start", amount: 1.5 }`
      // Or just a flat stagger of 0.12s
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.12, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleMouseEnter = (idx: number) => {
    if (prefersReducedMotion) return;
    const card = cardsRef.current[idx];
    if (!card) return;

    // Hover 3D: rotateX(6deg) rotateY(-6deg) translateZ(20px)
    // Box-shadow and border handled natively by Tailwind classes below
    const icon = card.querySelector('.service-icon');
    const tags = card.querySelectorAll('.service-tag');

    gsap.to(card, {
      rotateX: 6,
      rotateY: -6,
      z: 20,
      duration: 0.4,
      ease: "power2.out"
    });

    if (icon) {
      gsap.to(icon, { scale: 1.15, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    }
    
    if (tags.length) {
      gsap.to(tags, { y: -4, duration: 0.3, stagger: 0.05, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (idx: number) => {
    if (prefersReducedMotion) return;
    const card = cardsRef.current[idx];
    if (!card) return;

    const icon = card.querySelector('.service-icon');
    const tags = card.querySelectorAll('.service-tag');

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    if (icon) {
      gsap.to(icon, { scale: 1, duration: 0.4, ease: "power2.out" });
    }

    if (tags.length) {
      gsap.to(tags, { y: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleClick = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;

    // Active click state
    gsap.timeline()
      .to(card, { scale: 0.97, duration: 0.1, ease: "power1.inOut" })
      .to(card, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

    // We can also trigger a ripple or pulse effect (CSS handles this via active class easily too)
  };

  return (
    <section id="services" ref={sectionRef} className="w-full bg-cream py-32 px-5 md:px-10 lg:px-20 text-black">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16 px-4">
          <h2 className="font-serif text-[48px] md:text-[64px] font-bold leading-none">Our Services</h2>
          <span className="font-stats text-gold text-[24px] md:text-[32px] font-bold">09</span>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
          {SERVICES.map((s, idx) => (
            <div 
              key={idx}
              ref={el => { cardsRef.current[idx] = el; }}
              className="bg-white rounded-xl p-6 md:p-8 flex flex-col justify-between border border-beige-deep transition-all duration-250 hover:border-gold hover:shadow-[0_20px_60px_rgba(10,10,10,0.12)] shadow-[0_4px_16px_rgba(10,10,10,0.05)] opacity-0 transform-gpu cursor-pointer group"
              style={{ minHeight: '320px', transformStyle: 'preserve-3d' }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onClick={() => handleClick(idx)}
            >
              {/* Top Area */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-sans text-[12px] text-gold font-bold">{s.num}</span>
                  <div className="service-icon text-black">
                    {s.icon}
                  </div>
                </div>
                <h3 className="font-sans text-[22px] font-semibold text-black mb-3 pr-4 leading-[1.3]">
                  {s.title}
                </h3>
                <p className="font-sans text-[16px] text-warm-gray leading-[1.6]">
                  {s.desc}
                </p>
              </div>

              {/* Tags Area */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-beige">
                {s.tags.map((tag, tIdx) => (
                   <span 
                     key={tIdx} 
                     className="service-tag bg-beige text-black font-sans text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-md"
                   >
                     {tag}
                   </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
