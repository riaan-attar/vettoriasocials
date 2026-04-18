"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user prefers reduced motion.
 * All GSAP and Framer Motion animations must check this hook and skip to final state instantly if true.
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryForReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQueryForReducedMotion.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener depending on browser support
    if (mediaQueryForReducedMotion.addEventListener) {
      mediaQueryForReducedMotion.addEventListener('change', handleMediaChange);
    } else {
      mediaQueryForReducedMotion.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQueryForReducedMotion.removeEventListener) {
        mediaQueryForReducedMotion.removeEventListener('change', handleMediaChange);
      } else {
        mediaQueryForReducedMotion.removeListener(handleMediaChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
