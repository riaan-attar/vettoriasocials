"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Vision', 'Services', 'Founders', 'Work', 'Contact'];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-smoothEnter border-b ${
          scrolled 
            ? 'bg-[#F5F0E8]/85 backdrop-blur-[20px] border-[#D4C5B0]/50 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center text-[22px] md:text-[26px]">
            <span className={`font-display font-bold transition-colors ${scrolled ? 'text-black' : 'text-gold'}`}>Vettoria</span>
            <span className={`font-display transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>&nbsp;Socials</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <div key={link} className="relative group overflow-hidden">
                <Link 
                  href={`#${link.toLowerCase()}`}
                  className={`text-[14px] font-medium transition-colors ${
                    scrolled ? 'text-black group-hover:text-gold' : 'text-white group-hover:text-gold'
                  }`}
                >
                  {link}
                </Link>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-smoothEnter group-hover:scale-x-100" />
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className={`hidden md:block px-6 py-2 border rounded-sm text-[14px] font-semibold transition-all duration-300 ${
              scrolled 
                ? 'bg-gold border-gold text-black hover:bg-transparent hover:text-gold' 
                : 'border-gold border-solid text-white hover:bg-gold hover:text-black'
            }`}>
              Get a Quote
            </button>

            {/* Mobile hamburger */}
            <button 
              className={`md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-[101] relative`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`absolute w-6 h-[2px] rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 bg-gold' : (scrolled ? '-translate-y-[6px] bg-black' : '-translate-y-[6px] bg-white')
              }`}></span>
              <span className={`absolute w-6 h-[2px] rounded-full transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : (scrolled ? 'bg-black' : 'bg-white')
              }`}></span>
              <span className={`absolute w-6 h-[2px] rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 bg-gold' : (scrolled ? 'translate-y-[6px] bg-black' : 'translate-y-[6px] bg-white')
              }`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99] bg-black flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link 
                    href={`#${link.toLowerCase()}`}
                    className="text-white text-3xl font-display hover:text-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: links.length * 0.08 }}
                className="mt-8 px-8 py-3 border border-gold text-gold text-lg rounded-sm"
              >
                Get a Quote
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
