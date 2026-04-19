export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] pt-24 pb-10 px-5 md:px-10 lg:px-20 text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
        
        {/* Col 1: Identity */}
        <div className="flex flex-col">
          <h3 className="font-display text-[28px] text-white font-bold mb-6">Vittoria Socials</h3>
          <p className="font-sans text-[14px] leading-[1.6] text-warm-gray mb-8 max-w-[250px]">
            The definitive creative engine constructing modern legacy brands through high-art cinematography algorithms.
          </p>
        </div>

        {/* Col 2: Navigation */}
        <div className="flex flex-col">
          <h4 className="font-sans text-[12px] uppercase tracking-widest text-[#666] mb-6 font-bold">Navigation</h4>
          <ul className="flex flex-col gap-4 font-sans text-[15px] text-white/80">
            <li><a href="#hero" className="hover:text-gold transition-colors duration-200 cursor-pointer">Home</a></li>
            <li><a href="#vision" className="hover:text-gold transition-colors duration-200 cursor-pointer">Vision</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors duration-200 cursor-pointer">Services</a></li>
            <li><a href="#works" className="hover:text-gold transition-colors duration-200 cursor-pointer">Selected Works</a></li>
          </ul>
        </div>

        {/* Col 3: Services Summary */}
        <div className="flex flex-col">
          <h4 className="font-sans text-[12px] uppercase tracking-widest text-[#666] mb-6 font-bold">Expertise</h4>
          <ul className="flex flex-col gap-4 font-sans text-[15px] text-white/80">
            <li><a href="#services" className="hover:text-gold transition-colors duration-200 cursor-pointer">Cinematography</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors duration-200 cursor-pointer">Post-Production</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors duration-200 cursor-pointer">Digital Architecture</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors duration-200 cursor-pointer">Platform Strategy</a></li>
          </ul>
        </div>

        {/* Col 4: Reach */}
        <div className="flex flex-col">
          <h4 className="font-sans text-[12px] uppercase tracking-widest text-[#666] mb-6 font-bold">London</h4>
          <ul className="flex flex-col gap-2 font-sans text-[15px] text-white/80 mb-8">
             <li>Mayfair, London</li>
             <li>United Kingdom, W1J</li>
             <li>hello@vittoriasocials.com</li>
          </ul>
          <div className="flex gap-6">
             {/* Social Links */}
             <a href="#" className="text-white/60 hover:text-gold transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
             <a href="#" className="text-white/60 hover:text-gold transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
             <a href="#" className="text-white/60 hover:text-gold transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1440px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
         <p className="font-sans text-[13px] text-[#666]">
            &copy; {new Date().getFullYear()} Vittoria Socials. All rights reserved.
         </p>
         <div className="flex gap-6 font-sans text-[13px] text-[#666]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
         </div>
      </div>
    </footer>
  );
}
