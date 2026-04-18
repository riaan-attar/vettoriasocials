"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ROW1 = ["Video Production", "Drone Shots", "Video Editing", "Influencer Content", "Café Marketing"];
const ROW2 = ["Reels & Shorts", "Ad Shoots", "Web Development", "Data Analytics"];

export default function ServiceMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const timeline1Ref = useRef<gsap.core.Timeline | null>(null);
  const timeline2Ref = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // IntersectionObserver via ScrollTrigger for opacity fade
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 95%",
        end: "bottom 5%",
        onEnter: () => gsap.to(sectionRef.current, { opacity: 1, duration: 0.8 }),
        onLeave: () => gsap.to(sectionRef.current, { opacity: 0, duration: 0.8 }),
        onEnterBack: () => gsap.to(sectionRef.current, { opacity: 1, duration: 0.8 }),
        onLeaveBack: () => gsap.to(sectionRef.current, { opacity: 0, duration: 0.8 }),
      });

      // Continuous loop logic
      // Row 1 scrolls Left (-50%)
      timeline1Ref.current = gsap.timeline({ repeat: -1 })
        .to('.marquee-row-1-track', { xPercent: -50, duration: 30, ease: "none" });

      // Row 2 scrolls Right (starts at -50% and moves to 0)
      timeline2Ref.current = gsap.timeline({ repeat: -1 })
        .fromTo('.marquee-row-2-track', { xPercent: -50 }, { xPercent: 0, duration: 25, ease: "none" });

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => {
    if (!timeline1Ref.current || !timeline2Ref.current || prefersReducedMotion) return;
    // Smoothens deceleration using timeScale
    // Target 150s is 5x slower (30s / 150s) = 0.2
    // Row 2 is 25->125s (125/25 = 5x slower) = 0.2
    gsap.to([timeline1Ref.current, timeline2Ref.current], { timeScale: 0.2, duration: 0.6, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!timeline1Ref.current || !timeline2Ref.current || prefersReducedMotion) return;
    // Accelerate back to normal speed smoothly
    gsap.to([timeline1Ref.current, timeline2Ref.current], { timeScale: 1, duration: 0.6, ease: "power2.in" });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-beige py-16 overflow-hidden opacity-0 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gold" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />

      {/* Row 1 (Left Scrolling) */}
      <div className="flex w-max marquee-row-1-track will-change-transform">
        {/* We output the array twice to ensure seamless continuous looping across 100% boundary */}
        <div className="flex items-center shrink-0 pr-[8vw] whitespace-nowrap">
          {ROW1.map((item, i) => (
            <h2 key={`r1a-${i}`} className="font-display text-[32px] md:text-[52px] uppercase">
              <span className={i % 2 === 0 ? "text-gold" : "text-black"}>{item}</span>
              <span className="text-warm-gray mx-8 md:mx-16 font-light">|</span>
            </h2>
          ))}
        </div>
        <div className="flex items-center shrink-0 pr-[8vw] whitespace-nowrap">
          {ROW1.map((item, i) => (
            <h2 key={`r1b-${i}`} className="font-display text-[32px] md:text-[52px] uppercase">
              <span className={i % 2 === 0 ? "text-gold" : "text-black"}>{item}</span>
              <span className="text-warm-gray mx-8 md:mx-16 font-light">|</span>
            </h2>
          ))}
        </div>
      </div>

      <div className="h-6 md:h-10" /> {/* Separator gap */}

      {/* Row 2 (Right Scrolling) */}
      <div className="flex w-max marquee-row-2-track will-change-transform">
        <div className="flex items-center shrink-0 pr-[8vw] whitespace-nowrap">
          {ROW2.map((item, i) => (
            <h2 key={`r2a-${i}`} className="font-display text-[32px] md:text-[52px] uppercase">
              <span className={i % 2 !== 0 ? "text-gold" : "text-black"}>{item}</span>
              <span className="text-warm-gray mx-8 md:mx-16 font-light">|</span>
            </h2>
          ))}
        </div>
        <div className="flex items-center shrink-0 pr-[8vw] whitespace-nowrap">
          {ROW2.map((item, i) => (
            <h2 key={`r2b-${i}`} className="font-display text-[32px] md:text-[52px] uppercase">
              <span className={i % 2 !== 0 ? "text-gold" : "text-black"}>{item}</span>
              <span className="text-warm-gray mx-8 md:mx-16 font-light">|</span>
            </h2>
          ))}
        </div>
      </div>

    </section>
  );
}
