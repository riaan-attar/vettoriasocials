"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  name: string;
  company: string;
  email: string;
  budget: string;
  message: string;
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
       gsap.fromTo(".contact-stagger",
         { autoAlpha: 0, y: 30 },
         { 
           autoAlpha: 1, 
           y: 0, 
           duration: 0.8, 
           stagger: 0.15, 
           ease: "power2.out",
           scrollTrigger: {
             trigger: sectionRef.current,
             start: "top 75%"
           }
         }
       );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="w-full bg-[#111] py-32 px-5 md:px-10 lg:px-20 text-white border-t border-transparent relative">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-16 lg:gap-24">
        
        {/* Left Side: Copy */}
        <div className="w-full md:w-[45%]">
           <h2 className="contact-stagger font-display text-[56px] md:text-[80px] font-bold leading-tight mb-8">
              Ready to <br />
              <span className="text-gold italic font-serif font-normal">scale?</span>
           </h2>
           <p className="contact-stagger font-sans text-[18px] text-warm-gray leading-[1.7] mb-8">
              Whether you&apos;re looking to redefine your aesthetic identity or inject rigorous data into your distribution, we&apos;re ready to architect your next phase of growth.
           </p>
           <div className="contact-stagger flex flex-col gap-3">
              <div>
                <span className="font-sans text-[12px] uppercase tracking-widest text-[#666] block mb-1">Company Inquiries</span>
                <a href="mailto:vittoriasocials@gmail.com" className="font-sans text-[18px] text-white hover:text-gold transition-colors duration-300">
                  vittoriasocials@gmail.com
                </a>
              </div>
              <div className="mt-2">
                <span className="font-sans text-[12px] uppercase tracking-widest text-[#666] block mb-1">Founder Direct</span>
                <a href="mailto:kamodsmit33@gmail.com" className="font-sans text-[18px] text-white hover:text-gold transition-colors duration-300">
                  kamodsmit33@gmail.com
                </a>
              </div>
              <div className="mt-2">
                <span className="font-sans text-[12px] uppercase tracking-widest text-[#666] block mb-1">Contact No</span>
                <a href="tel:8806861555" className="font-sans text-[18px] text-white hover:text-gold transition-colors duration-300">
                  +91 8806861555
                </a>
              </div>
           </div>
        </div>

        {/* Right Side: RHF Form */}
        <div className="w-full md:w-[55%] contact-stagger relative">
           {submitted ? (
             <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-2xl p-10 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="font-serif text-[32px] text-white mb-4">Request Received</h3>
                <p className="text-warm-gray font-sans text-[16px]">Our leadership team will review your details and correspond shortly.</p>
             </div>
           ) : (
             <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2 relative group">
                    <input 
                      {...register("name", { required: true })}
                      type="text" 
                      placeholder="Full Name *"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-white/30 font-sans text-[16px] focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                    {errors.name && <span className="absolute -bottom-5 left-0 text-[11px] text-red-500">Required field</span>}
                  </div>
                  <div className="w-full md:w-1/2 relative group">
                    <input 
                      {...register("company", { required: true })}
                      type="text" 
                      placeholder="Company Name *"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-white/30 font-sans text-[16px] focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                    {errors.company && <span className="absolute -bottom-5 left-0 text-[11px] text-red-500">Required field</span>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2 relative group">
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      type="email" 
                      placeholder="Email Address *"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-white/30 font-sans text-[16px] focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                    {errors.email && <span className="absolute -bottom-5 left-0 text-[11px] text-red-500">Valid email required</span>}
                  </div>
                  <div className="w-full md:w-1/2 relative group">
                    <select 
                      {...register("budget")}
                      defaultValue=""
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white/30 font-sans text-[16px] focus:outline-none focus:border-gold transition-colors duration-300 appearance-none rounded-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#111] text-white/30">Estimated Budget</option>
                      <option value="10k-25k" className="bg-[#111] text-white">£10,000 - £25,000</option>
                      <option value="25k-50k" className="bg-[#111] text-white">£25,000 - £50,000</option>
                      <option value="50k+" className="bg-[#111] text-white">£50,000+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="w-full relative group mt-4">
                  <textarea 
                    {...register("message", { required: true })}
                    placeholder="Tell us about your project trajectory *"
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-white/30 font-sans text-[16px] focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  />
                  {errors.message && <span className="absolute -bottom-5 left-0 text-[11px] text-red-500">Required field</span>}
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-end">
                   <button 
                     disabled={isSubmitting}
                     type="submit" 
                     className="px-10 py-4 bg-gold text-white font-sans text-[14px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors duration-400 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                   >
                     <span className="relative z-10">{isSubmitting ? "Transmitting..." : "Submit Inquiry"}</span>
                   </button>
                </div>
             </form>
           )}
        </div>
      </div>
    </section>
  );
}
