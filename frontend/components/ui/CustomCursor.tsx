"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function CustomCursor() {
  const cursorSmallRef = useRef<HTMLDivElement>(null);
  const cursorLargeRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    if (isTouch || prefersReducedMotion) return;

    const cursorSmall = cursorSmallRef.current;
    const cursorLarge = cursorLargeRef.current;

    if (!cursorSmall || !cursorLarge) return;

    // Use GSAP quickTo for performance — these create cached tweens
    const xMoveSmall = gsap.quickTo(cursorSmall, "x", { duration: 0, ease: "none" });
    const yMoveSmall = gsap.quickTo(cursorSmall, "y", { duration: 0, ease: "none" });
    const xMoveLarge = gsap.quickTo(cursorLarge, "x", { duration: 0.15, ease: "power3" });
    const yMoveLarge = gsap.quickTo(cursorLarge, "y", { duration: 0.15, ease: "power3" });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        gsap.set([cursorSmall, cursorLarge], { opacity: 1 });
        hasMoved = true;
      }
      xMoveSmall(e.clientX);
      yMoveSmall(e.clientY);
      xMoveLarge(e.clientX);
      yMoveLarge(e.clientY);
    };

    // Use event delegation with a single click-path check instead of mouseover/mouseout
    // which fires hundreds of times per second during scroll
    let isHovering = false;

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button');
      if (isInteractive && !isHovering) {
        isHovering = true;
        gsap.to(cursorLarge, { scale: 1.8, opacity: 0.5, duration: 0.3 });
        gsap.to(cursorSmall, { scale: 0.5, duration: 0.3 });
      } else if (!isInteractive && isHovering) {
        isHovering = false;
        gsap.to(cursorLarge, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(cursorSmall, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      <div 
        ref={cursorSmallRef} 
        className="fixed top-0 left-0 border border-gold rounded-full pointer-events-none z-[10000] will-change-transform"
        style={{ width: '10px', height: '10px', marginTop: '-5px', marginLeft: '-5px', opacity: 0 }}
      />
      <div 
        ref={cursorLargeRef} 
        className="fixed top-0 left-0 border border-warm-gray rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ width: '32px', height: '32px', marginTop: '-16px', marginLeft: '-16px', opacity: 0 }}
      />
    </>
  );
}
