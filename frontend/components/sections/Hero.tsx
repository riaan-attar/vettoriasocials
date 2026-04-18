"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import HeroCanvas from "../three/HeroCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const labelRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const tagline1Ref = useRef<HTMLParagraphElement>(null);
  const tagline2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Parallax layers
  const layer1Ref = useRef<HTMLDivElement>(null); // bg canvas
  const layer2Ref = useRef<HTMLDivElement>(null); // label + line
  const layer3Ref = useRef<HTMLDivElement>(null); // headline

  const nameText = "Vettoria Socials";
  
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Sequence
      const tl = gsap.timeline();

      // Label fades in
      tl.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" });

      // Typewriter effect
      tl.to('.hero-char', { opacity: 1, duration: 0.05, stagger: 0.05 }, "+=0.2");
      // Blinking cursor
      tl.fromTo('.hero-cursor', { opacity: 0 }, { opacity: 1, repeat: 4, yoyo: true, duration: 0.25 }, "<");
      tl.to('.hero-cursor', { opacity: 0, duration: 0.5 });

      // Taglines slide up
      tl.fromTo(tagline1Ref.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 
        1.4 // Absolute delay
      );
      
      tl.fromTo(tagline2Ref.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 
        "-=0.3" // Stagger 400ms manually (0.7 - 0.3 = 0.4s later)
      );

      // CTA spring in
      tl.fromTo(ctaRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }, 
        2.0
      );

      // Indicator pules
      gsap.to(indicatorRef.current, { 
        y: 10, 
        opacity: 0, 
        duration: 1.5, 
        repeat: -1, 
        ease: "power1.inOut" 
      });

      // 2. Mouse Parallax effect
      const xLayer1 = gsap.quickTo(layer1Ref.current, "x", { duration: 0.4, ease: "power3" });
      const yLayer1 = gsap.quickTo(layer1Ref.current, "y", { duration: 0.4, ease: "power3" });
      const xLayer2 = gsap.quickTo(layer2Ref.current, "x", { duration: 0.3, ease: "power3" });
      const yLayer2 = gsap.quickTo(layer2Ref.current, "y", { duration: 0.3, ease: "power3" });
      const xLayer3 = gsap.quickTo(layer3Ref.current, "x", { duration: 0.2, ease: "power3" });
      const yLayer3 = gsap.quickTo(layer3Ref.current, "y", { duration: 0.2, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5);
        const yPos = (e.clientY / window.innerHeight - 0.5);

        xLayer1(xPos * 40); // ±20px (40 / 2)
        yLayer1(yPos * 40);
        xLayer2(xPos * 20); // ±10px
        yLayer2(yPos * 20);
        xLayer3(xPos * 10); // ±5px
        yLayer3(yPos * 10);
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 3. Scroll Exit Animation (Fade only, no pin)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400px",
        scrub: true,
        animation: gsap.to(containerRef.current, { 
          scale: 1.06, 
          opacity: 0, 
          ease: "none" 
        })
      });

      // Canvas fade out & GPU Pause
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200px",
        scrub: true,
        animation: gsap.to(".hero-canvas-wrapper", { opacity: 0, ease: "none" }),
        onLeave: () => {
          const el = document.getElementById('hero-canvas-container');
          if (el) el.style.display = 'none';
        },
        onEnterBack: () => {
          const el = document.getElementById('hero-canvas-container');
          if (el) el.style.display = 'block';
        }
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="hero" ref={sectionRef} className="w-full h-screen bg-black relative flex items-center justify-center overflow-hidden">
      
      {/* Parallax Layer 1: Three.js Canvas */}
      <div ref={layer1Ref} className="absolute inset-0 w-full h-full z-0">
        <HeroCanvas />
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-[1200px] px-5 md:px-10 flex flex-col items-center text-center">
        
        {/* Parallax Layer 2: Label */}
        <div ref={layer2Ref} className="mb-6 flex flex-col items-center">
          <p ref={labelRef} className="opacity-0 text-gold text-[12px] md:text-[14px] uppercase tracking-[0.15em] font-bold">
            Full-Service Creative & Digital Agency
          </p>
        </div>

        {/* Parallax Layer 3: Headline & Body */}
        <div ref={layer3Ref} className="flex flex-col items-center">
          <h1 ref={nameRef} className="text-white font-display text-[56px] md:text-[88px] lg:text-[120px] font-bold leading-[1.1] mb-6 flex items-center justify-center flex-wrap">
            {nameText.split('').map((char, i) => (
              <span key={i} className="hero-char opacity-0 inline-block">{char}</span>
            ))}
            <span className="hero-cursor opacity-0 w-[4px] md:w-[6px] bg-white h-[40px] md:h-[70px] lg:h-[90px] ml-2 inline-block"></span>
          </h1>

          <div className="flex flex-col gap-2 relative">
            <p ref={tagline1Ref} className="text-warm-gray font-serif text-[28px] md:text-[32px] opacity-0">
              Want to scale your business?
            </p>
            <p ref={tagline2Ref} className="text-gold font-serif text-[28px] md:text-[36px] font-bold opacity-0">
              We got you covered up.
            </p>
          </div>
        </div>

        {/* CTA Elements */}
        <div ref={ctaRef} className="opacity-0 mt-12 flex flex-col sm:flex-row items-center gap-6">
          <button className="px-8 py-4 border border-gold rounded-sm text-white font-medium hover:bg-gold/10 transition-colors relative group overflow-hidden">
            <span className="relative z-10">Explore Services</span>
          </button>
          <a href="#founders" className="text-white text-[15px] font-medium group relative">
            Meet the Founders →
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div ref={indicatorRef} className="absolute top-0 left-0 w-full h-1/2 bg-white/80" />
        </div>
      </div>
    </section>
  );
}
