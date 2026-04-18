"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    // Use GSAP animation instead of direct DOM manipulation on every scroll tick
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        // Use transform (GPU-accelerated) instead of width (causes layout recalculation)
        line.style.transform = `scaleX(${self.progress})`;
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div 
      ref={lineRef} 
      className="scroll-progress-line" 
      style={{ width: '100%', transformOrigin: 'left center', transform: 'scaleX(0)' }}
    />
  );
}
