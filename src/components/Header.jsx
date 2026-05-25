import React from 'react';

export default function Header({ onNavigate }) {
  const handleClick = (e, index) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(index);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-16 md:py-6 flex items-center justify-between pointer-events-auto mix-blend-difference">
      {/* Brand Logo */}
      <a 
        href="#" 
        onClick={(e) => handleClick(e, 0)}
        className="flex items-center select-none"
      >
        <img 
          src="/sirin_symbol_only.svg" 
          alt="SIRIN logo" 
          className="h-6 md:h-8 object-contain invert" 
        />
      </a>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-12">
        <a 
          href="#portfolio" 
          onClick={(e) => handleClick(e, 3)}
          className="text-white/80 hover:text-white transition-colors text-xs font-medium tracking-[0.25em]"
        >
          ПОРТФОЛИО
        </a>
        <a 
          href="#about" 
          onClick={(e) => handleClick(e, 1)}
          className="text-white/80 hover:text-white transition-colors text-xs font-medium tracking-[0.25em]"
        >
          УСЛУГИ
        </a>
        <a 
          href="#about" 
          onClick={(e) => handleClick(e, 1)}
          className="text-white/80 hover:text-white transition-colors text-xs font-medium tracking-[0.25em]"
        >
          О СТУДИИ
        </a>
        <a 
          href="#approach" 
          onClick={(e) => handleClick(e, 2)}
          className="text-white/80 hover:text-white transition-colors text-xs font-medium tracking-[0.25em]"
        >
          ПРОЦЕСС
        </a>
        <a 
          href="#footer" 
          onClick={(e) => handleClick(e, 4)}
          className="text-white/80 hover:text-white transition-colors text-xs font-medium tracking-[0.25em]"
        >
          ПОДХОД
        </a>
      </nav>

      {/* CTA Button */}
      <a 
        href="#footer" 
        onClick={(e) => handleClick(e, 4)}
        className="px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-white/20 bg-white text-brand-black hover:bg-transparent hover:text-white transition-all duration-300 text-[10px] md:text-xs font-medium tracking-[0.1em] flex items-center gap-2"
      >
        ОБСУДИТЬ ПРОЕКТ
      </a>
    </header>
  );
}
