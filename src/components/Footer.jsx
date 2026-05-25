import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleNav = (e, index) => {
    e.preventDefault();
    onNavigate?.(index);
  };

  return (
    <footer 
      id="footer" 
      className="relative w-full h-screen bg-brand-black text-white px-6 md:px-16 py-8 md:py-16 select-none border-t border-white/[0.05] flex-shrink-0 overflow-hidden flex flex-col justify-between"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-16 my-auto items-center">
        
        {/* Left Column (Brand bio) */}
        <div className="lg:col-span-4 flex flex-col gap-4 md:gap-8 justify-center">
          <div>
            <div className="mb-4 md:mb-6 flex select-none">
              <img 
                src="/sirin_full_logo.svg" 
                alt="SIRIN full logo" 
                className="h-8 md:h-12 object-contain invert" 
              />
            </div>
            <p className="font-sans text-[12px] md:text-[13px] text-brand-gray leading-relaxed max-w-xs hidden sm:block">
              Создаем современные сайты для бизнеса: от первого экрана до запуска на домене. Чистый дизайн, понятная структура и акцент на заявки.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-gray hover:text-white hover:border-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-gray hover:text-white hover:border-white transition-all duration-300"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-gray hover:text-white hover:border-white transition-all duration-300"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Center Grid (Navigation and Services) */}
        <div className="md:col-span-1 lg:col-span-4 grid grid-cols-2 gap-4 md:gap-8">
          {/* Navigation links */}
          <div>
            <h3 className="font-display font-semibold text-[9px] md:text-[10px] tracking-[0.25em] text-brand-gray uppercase mb-3 md:mb-6">
              НАВИГАЦИЯ
            </h3>
            <ul className="flex flex-col gap-2 md:gap-3.5">
              <li>
                <button type="button" onClick={(e) => handleNav(e, 3)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Портфолио
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 1)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Услуги
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 1)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  О студии
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 2)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Процесс
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 2)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Подход
                </button>
              </li>
            </ul>
          </div>

          {/* Services links */}
          <div className="hidden sm:block">
            <h3 className="font-display font-semibold text-[9px] md:text-[10px] tracking-[0.25em] text-brand-gray uppercase mb-3 md:mb-6">
              УСЛУГИ
            </h3>
            <ul className="flex flex-col gap-2 md:gap-3.5">
              <li>
                <button type="button" onClick={(e) => handleNav(e, 1)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Веб-дизайн
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 1)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Разработка сайтов
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 1)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Визуальная упаковка
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 1)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  UX/UI-дизайн
                </button>
              </li>
              <li>
                <button type="button" onClick={(e) => handleNav(e, 1)} className="font-sans text-[12px] md:text-[13px] text-brand-gray hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-left">
                  Оптимизация скорости
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column (CTA) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4 md:gap-8 lg:text-right lg:items-end">
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="font-display font-semibold text-[9px] md:text-[10px] tracking-[0.25em] text-brand-gray uppercase">
              ОБСУДИМ ПРОЕКТ?
            </h3>
            <p className="font-display text-xs md:text-sm font-light leading-relaxed text-brand-silver">
              Расскажите, какой сайт вам нужен.<br />Мы предложим структуру, стиль и понятный план запуска.
            </p>
          </div>

          <a 
            href="mailto:hello@sirin.studio" 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-white text-brand-black hover:bg-white/90 transition-all duration-300 text-[11px] md:text-xs font-semibold tracking-widest shadow-lg"
          >
            НАЧАТЬ ПРОЕКТ
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
          </a>

          <div className="flex flex-col gap-1 text-[12px] md:text-[13px] text-brand-gray">
            <a href="mailto:hello@sirin.studio" className="hover:text-white transition-colors">
              hello@sirin.studio
            </a>
            <a href="tel:+79991234567" className="hover:text-white transition-colors">
              +7 (999) 123-45-67
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-[11px] text-brand-gray">
        <span>
          &copy; 2026 SIRIN STUDIO. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
        </span>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-white transition-colors">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
          <a href="#" className="hover:text-white transition-colors">УСЛОВИЯ ИСПОЛЬЗОВАНИЯ</a>
        </div>
      </div>
    </footer>
  );
}
