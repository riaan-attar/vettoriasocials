"use client";

import { useEffect } from 'react';
import Spline from '@splinetool/react-spline/next';

export default function Hero() {
  useEffect(() => {
    const interval = setInterval(() => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          logo.remove();
          console.log("Logo removed!");
          clearInterval(interval);
        }
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="w-full h-screen relative bg-black">
      <Spline
        scene="https://prod.spline.design/0PyydItsyPZZXBTo/scene.splinecode" 
      />
    </section>
  );
}
