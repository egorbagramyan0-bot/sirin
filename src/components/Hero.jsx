import { DottedSurface } from "@/components/ui/dotted-surface";

export default function Hero({ onPortfolioClick }) {
  return (
    <section 
      id="hero" 
      className="relative w-full h-screen flex flex-col justify-between px-8 md:px-16 py-12 bg-white overflow-hidden mono-grid select-none flex-shrink-0"
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

      {/* Wordmark - aligned precisely with the symbol center (centered) */}
      <div className="absolute top-[74%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <img 
          src="/sirin_wordmark_only.svg" 
          alt="SIRIN" 
          className="h-8 sm:h-11 md:h-14 lg:h-16 object-contain select-none pointer-events-auto" 
        />
      </div>

      {/* Hero Content Grid (Left Align - 2-zone Layout on desktop) */}
      <div className="relative z-20 flex-1 flex flex-col justify-center w-full md:w-[30vw] max-w-md mt-12">
        <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-6 block">
          СТУДИЯ ВЕБ-ДИЗАЙНА
        </span>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-light tracking-tight text-brand-black leading-[1.15] mb-6">
          Создаем сайты,<br />
          которые выглядят дорого<br />
          и приводят клиентов.
        </h1>
        <p className="font-sans text-xs md:text-sm text-brand-gray tracking-wide leading-relaxed mb-10">
          Продуманный сайт для вашего бизнеса от 25 000 ₽ и 7 дней.
        </p>
        <div>
          <button 
            type="button"
            onClick={() => onPortfolioClick?.()}
            className="group inline-flex items-center gap-4 px-6 py-3 rounded-full bg-brand-black text-white hover:bg-brand-graphite transition-all duration-300 text-xs font-semibold tracking-widest shadow-lg shadow-black/10 cursor-pointer"
          >
            СМОТРЕТЬ РАБОТЫ
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>

      {/* Bottom Container with Scroll Indicator */}
      <div className="relative z-20 w-full text-center flex flex-col items-center justify-end pb-4">
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
