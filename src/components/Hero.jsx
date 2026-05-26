import { DottedSurface } from "@/components/ui/dotted-surface";
import { FlipWords } from "@/components/ui/flip-words";

const heroWords = [
  "выглядят дорого",
  "приводят клиентов",
  "вызывают доверие"
];

export default function Hero({ onPortfolioClick }) {
  return (
    <section 
      id="hero" 
      className="hero-section relative w-full min-h-screen flex flex-col justify-between px-8 md:px-16 py-12 bg-white overflow-hidden mono-grid select-none flex-shrink-0"
    >
      {/* Subtle Dotted Surface background effect */}
      <DottedSurface className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none" />

      {/* Background Architectural Geometry (Circles & Lines) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Large Concentric Circles */}
        <div className="w-[600px] h-[600px] rounded-full border border-brand-black/[0.03] flex items-center justify-center md:animate-[spin_120s_linear_infinite]">
          <div className="w-[450px] h-[450px] rounded-full border border-dashed border-brand-black/[0.04] flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full border border-brand-black/[0.03]"></div>
          </div>
        </div>
        {/* Vertical Axis line */}
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-black/[0.05] to-transparent"></div>
        {/* Horizontal Axis line */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-black/[0.05] to-transparent"></div>
      </div>

      {/* Grid Content */}
      <div className="hero-content">
        {/* Left: Text */}
        <div className="hero-copy flex flex-col justify-center">
          <div className="mobile-hero-brand" aria-hidden="true">
            <div className="mobile-hero-symbol-float">
              <img className="mobile-hero-symbol" src="/sir.svg" alt="" />
            </div>
            <img className="mobile-hero-wordmark" src="/textsvg.svg" alt="" />
          </div>
          <span className="hero-kicker font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-6 block">
            СТУДИЯ ВЕБ-ДИЗАЙНА
          </span>
          <h1 className="hero-title">
            <span className="hero-title-static">Создаем сайты, которые</span>
            <br />
            <span className="hero-flip-line">
              <FlipWords
                words={heroWords}
                duration={3000}
                className="hero-flip-words"
              />
            </span>
          </h1>
          <p className="hero-subtitle font-sans text-brand-gray tracking-wide">
            Продуманный сайт для вашего бизнеса от 25 000 ₽ и 7 дней.
          </p>
          <div className="hero-actions">
            <button 
              type="button"
              onClick={() => onPortfolioClick?.()}
              className="hero-button group inline-flex items-center gap-4 px-6 py-3 rounded-full bg-brand-black text-white hover:bg-brand-graphite transition-all duration-300 text-xs font-semibold tracking-widest shadow-lg shadow-black/10 cursor-pointer"
            >
              СМОТРЕТЬ РАБОТЫ
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

        {/* Right: Logo Area (intentionally empty for the fixed central logo) */}
        <div className="hero-logo-area" />
      </div>

      {/* Centered static wordmark container designed to align with the fixed background logo at scrollTop=0 */}
      <div className="hero-wordmark-container">
        <div className="hero-symbol-spacer" />
        <img className="central-wordmark" src="/textsvg.svg" alt="SIRIN" />
      </div>

      {/* Bottom Container with Scroll Indicator */}
      <div className="hero-scroll-indicator relative z-20 w-full text-center flex flex-col items-center justify-end pb-4">
        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <svg 
            viewBox="0 0 24 24" 
            className="w-5 h-5 text-brand-gray" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
