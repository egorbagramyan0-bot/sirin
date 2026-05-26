import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Header({ onNavigate, onLogoClick, activeIndex }) {
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Animate header entry
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (index === 0) {
      if (onLogoClick) onLogoClick();
      else if (onNavigate) onNavigate(0);
    } else {
      if (onNavigate) onNavigate(index);
    }
  };

  // Helper to determine active state class
  const getActiveClass = (btnIndex) => {
    const isActive = activeIndex === btnIndex;
    return isActive 
      ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
      : 'bg-transparent text-black/62 hover:bg-black/5 hover:text-black';
  };

  const getLogoActiveClass = () => {
    const isActive = activeIndex === 0;
    return isActive 
      ? 'bg-black shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
      : 'bg-transparent hover:bg-black/5';
  };

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 h-[76px] grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-11 pointer-events-auto"
      >
        {/* Left: Spacer */}
        <div />

        {/* Center: Desktop Nav Pill */}
        <nav className="nav justify-self-center desktop-nav-only flex items-center gap-1 p-1 bg-white/68 border border-black/8 rounded-full backdrop-blur-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          
          {/* Logo Button */}
          <button 
            onClick={(e) => handleLinkClick(e, 0)}
            className={`nav-logo-button border-none transition-all duration-250 cursor-pointer ${getLogoActiveClass()}`}
            aria-label="На главный экран"
          >
            <img 
              src="/sir.svg" 
              alt="SIRIN" 
              className={activeIndex === 0 ? "invert" : ""}
            />
          </button>

          <span className="nav-divider" />

          {/* Nav Links */}
          <button 
            onClick={(e) => handleLinkClick(e, 1)}
            className={`px-[18px] py-[10px] rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-250 hover:-translate-y-[1px] cursor-pointer border-none ${getActiveClass(1)}`}
          >
            О студии
          </button>
          <button 
            onClick={(e) => handleLinkClick(e, 2)}
            className={`px-[18px] py-[10px] rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-250 hover:-translate-y-[1px] cursor-pointer border-none ${getActiveClass(2)}`}
          >
            Цены
          </button>
          <button 
            onClick={(e) => handleLinkClick(e, 3)}
            className={`px-[18px] py-[10px] rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-250 hover:-translate-y-[1px] cursor-pointer border-none ${getActiveClass(3)}`}
          >
            Портфолио
          </button>
          <button 
            onClick={(e) => handleLinkClick(e, 4)}
            className={`px-[18px] py-[10px] rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-250 hover:-translate-y-[1px] cursor-pointer border-none ${getActiveClass(4)}`}
          >
            Контакты
          </button>
        </nav>

        {/* Right: CTA Button & Burger */}
        <div className="cta justify-self-end flex items-center gap-4">
          <button 
            onClick={(e) => handleLinkClick(e, 4)}
            className="desktop-nav-only flex h-11 px-6 rounded-full bg-black text-white hover:-translate-y-[1px] hover:shadow-[0_14px_32px_rgba(0,0,0,0.16)] transition-all duration-300 text-xs font-bold tracking-[0.12em] items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.12)] cursor-pointer border-none"
          >
            ОБСУДИТЬ ПРОЕКТ
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="flex flex-col justify-between w-6 h-4 z-50 mobile-nav-only bg-transparent border-none cursor-pointer focus:outline-none mix-blend-difference"
            aria-label="Toggle menu"
          >
            <span className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45 translate-y-[2px] translate-x-[2px]' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45 -translate-y-[2px] translate-x-[2px]' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 mobile-nav-only animate-fade-in">
          <nav className="flex flex-col items-center gap-5">
            <button 
              onClick={(e) => handleLinkClick(e, 0)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-250 cursor-pointer border-none ${
                activeIndex === 0 
                  ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                  : 'bg-transparent text-black/60 hover:bg-black/5 hover:text-black'
              }`}
            >
              Главная
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, 1)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-250 cursor-pointer border-none ${
                activeIndex === 1 
                  ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                  : 'bg-transparent text-black/60 hover:bg-black/5 hover:text-black'
              }`}
            >
              О студии
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, 2)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-250 cursor-pointer border-none ${
                activeIndex === 2 
                  ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                  : 'bg-transparent text-black/60 hover:bg-black/5 hover:text-black'
              }`}
            >
              Цены
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, 3)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-250 cursor-pointer border-none ${
                activeIndex === 3 
                  ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                  : 'bg-transparent text-black/60 hover:bg-black/5 hover:text-black'
              }`}
            >
              Портфолио
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, 4)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-250 cursor-pointer border-none ${
                activeIndex === 4 
                  ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                  : 'bg-transparent text-black/60 hover:bg-black/5 hover:text-black'
              }`}
            >
              Контакты
            </button>
          </nav>
          <button 
            onClick={(e) => handleLinkClick(e, 4)}
            className="mt-4 px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-black/10 hover:bg-black/90 transition-colors cursor-pointer border-none"
          >
            Обсудить проект
          </button>
        </div>
      )}
    </>
  );
}
