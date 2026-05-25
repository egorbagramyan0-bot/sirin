import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Header({ onNavigate, onLogoClick, onPortfolioFromHero, activeIndex }) {
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Animate header entry
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  const handleClick = (e, index) => {
    if (onNavigate) {
      e.preventDefault();
      if (index === 3 && activeIndex === 0 && onPortfolioFromHero) {
        onPortfolioFromHero();
      } else {
        onNavigate(index);
      }
    }
  };

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 h-[76px] grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-11 pointer-events-auto"
      >
        {/* Left: Brand Logo */}
        <button 
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (onLogoClick) {
              onLogoClick();
            } else if (onNavigate) {
              onNavigate(0);
            }
          }}
          className="header-logo-button justify-self-start select-none"
          aria-label="Вернуться на главный экран"
        >
          <img 
            src="/sirin_symbol_only.svg" 
            alt="SIRIN logo" 
            className={activeIndex === 4 ? "invert" : ""}
          />
        </button>

        {/* Center: Desktop Nav Pill (visible at >= 900px screen width) */}
        <nav className="nav justify-self-center desktop-nav-only flex items-center gap-1.5 p-1.5 bg-white/68 border border-black/8 rounded-full backdrop-blur-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <a 
            href="#about" 
            onClick={(e) => handleClick(e, 1)}
            className={`px-[18px] py-[10px] rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-250 hover:-translate-y-[1px] ${
              activeIndex === 1 
                ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                : 'text-black/62 hover:bg-black/5 hover:text-black'
            }`}
          >
            О студии
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => handleClick(e, 2)}
            className={`px-[18px] py-[10px] rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-250 hover:-translate-y-[1px] ${
              activeIndex === 2 
                ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                : 'text-black/62 hover:bg-black/5 hover:text-black'
            }`}
          >
            Цены
          </a>
          <a 
            href="#portfolio" 
            onClick={(e) => handleClick(e, 3)}
            className={`px-[18px] py-[10px] rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-250 hover:-translate-y-[1px] ${
              activeIndex === 3 
                ? 'bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
                : 'text-black/62 hover:bg-black/5 hover:text-black'
            }`}
          >
            Портфолио
          </a>
        </nav>

        {/* Right: CTA Button & Burger Menu */}
        <div className="cta justify-self-end flex items-center gap-4">
          <a 
            href="#footer" 
            onClick={(e) => handleClick(e, 4)}
            className="desktop-nav-only flex h-11 px-6 rounded-full bg-black text-white hover:-translate-y-[1px] hover:shadow-[0_14px_32px_rgba(0,0,0,0.16)] transition-all duration-300 text-xs font-bold tracking-[0.12em] items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.12)] cursor-pointer"
          >
            ОБСУДИТЬ ПРОЕКТ
          </a>

          {/* Burger Button (visible < 900px) */}
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
          <nav className="flex flex-col items-center gap-8">
            <a 
              href="#about" 
              onClick={(e) => { setIsMobileMenuOpen(false); handleClick(e, 1); }}
              className={`text-lg font-medium tracking-[0.2em] uppercase transition-colors ${
                activeIndex === 1 ? 'text-black font-bold' : 'text-black/60 hover:text-black'
              }`}
            >
              О студии
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => { setIsMobileMenuOpen(false); handleClick(e, 2); }}
              className={`text-lg font-medium tracking-[0.2em] uppercase transition-colors ${
                activeIndex === 2 ? 'text-black font-bold' : 'text-black/60 hover:text-black'
              }`}
            >
              Цены
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => { setIsMobileMenuOpen(false); handleClick(e, 3); }}
              className={`text-lg font-medium tracking-[0.2em] uppercase transition-colors ${
                activeIndex === 3 ? 'text-black font-bold' : 'text-black/60 hover:text-black'
              }`}
            >
              Портфолио
            </a>
          </nav>
          <a 
            href="#footer" 
            onClick={(e) => { setIsMobileMenuOpen(false); handleClick(e, 4); }}
            className="mt-4 px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-black/10 hover:bg-black/90 transition-colors"
          >
            Обсудить проект
          </a>
        </div>
      )}
    </>
  );
}
