import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Лидер Юг',
    url: 'https://lideryug.vercel.app/',
    category: 'Корпоративный сайт / Перевозки',
    description: 'Сайт для компании в сфере пассажирских перевозок с чистой структурой, понятной подачей услуг и акцентом на надежность. Основная задача — быстро объяснить направления рейсов, показать автопарк и привести пользователя к оформлению билета или заявке.'
  },
  {
    id: 2,
    title: 'PRORAB',
    url: 'https://prorab-site.vercel.app/',
    category: 'Салон отделочных материалов',
    description: 'Сайт для салона керамогранита и внутренней отделки. Визуальная подача строится вокруг ассортимента, бренда и быстрых действий: посмотреть направления, связаться, построить маршрут и перейти к выбору материалов.'
  },
  {
    id: 3,
    title: 'GEV Barbershop',
    url: 'https://gev-barber.vercel.app/',
    category: 'Локальный бизнес / услуги',
    description: 'Атмосферный сайт для барбершопа с акцентом на стиль, доверие и быструю запись. Страница показывает услуги, мастеров, настроение заведения и помогает пользователю быстро принять решение.'
  }
];

function BrowserFrame({ url, title }) {
  return (
    <div className="w-full h-[260px] overflow-hidden rounded-[22px] bg-[#f4f4f4] border border-black/5 relative group/browser flex flex-col select-none">
      {/* Top Browser Bar */}
      <div className="h-8 bg-[#eaeaea] px-4 flex items-center gap-1.5 flex-shrink-0 border-b border-black/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
        {/* URL Display */}
        <div className="mx-auto bg-white/60 text-[9px] text-zinc-500 px-4 py-0.5 rounded-md w-1/2 max-w-[200px] truncate text-center font-mono">
          {url.replace('https://', '')}
        </div>
      </div>
      {/* Iframe Viewport Container */}
      <div className="flex-1 w-full overflow-hidden relative">
        <iframe 
          src={url}
          title={title}
          className="absolute top-0 left-0 border-none select-none pointer-events-none"
          style={{
            width: '182%',
            height: '182%',
            transform: 'scale(0.55)',
            transformOrigin: 'top left',
            pointerEvents: 'none'
          }}
          loading="lazy"
        />
        {/* Transparent overlay block to guarantee no mouse interactions with iframe */}
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>
    </div>
  );
}

export default function PortfolioPage({ onTransitionToHomeSection }) {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onTransitionToHomeSection) {
      onTransitionToHomeSection(3);
    } else {
      window.location.href = '/#contacts';
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#fafafa] text-black pt-[120px] pb-24 px-6 md:px-16 overflow-x-hidden font-sans select-none">
      
      {/* Background large blurred logo Symbol */}
      <div className="portfolio-bg-logo">
        <img src="/sirin_symbol_animated_ready.svg" alt="" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        
        {/* Header Title Section */}
        <div className="flex flex-col max-w-2xl gap-4 md:gap-6">
          <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-zinc-400 uppercase">
            ПОРТФОЛИО
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-900 leading-[1.1]">
            Сайты, которые мы собрали
          </h1>
          <p className="font-sans text-sm md:text-base text-zinc-500 tracking-wide leading-relaxed">
            Каждый проект — это не просто красивая страница, а понятная структура, визуальная подача и путь пользователя к заявке.
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="group flex flex-col rounded-[28px] border border-black/8 bg-white/72 backdrop-blur-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-black/16 hover:shadow-[0_25px_45px_rgba(0,0,0,0.08)]"
            >
              {/* Preview image via Browser Mockup */}
              <div className="p-4 bg-transparent">
                <BrowserFrame url={project.url} title={project.title} />
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col px-6 pb-6 md:px-8 md:pb-8 flex-1 justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-display text-[9px] md:text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-semibold">
                    {project.category}
                  </span>
                  <h3 className="font-display text-lg font-light tracking-tight text-zinc-900">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-zinc-500 leading-relaxed font-light mt-1">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-black hover:text-zinc-600 transition-colors uppercase cursor-pointer"
                  >
                    Открыть сайт
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Block */}
        <div className="mt-8 md:mt-12 p-8 md:p-12 rounded-[28px] border border-black/5 bg-white/40 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-2.5 max-w-xl">
            <h3 className="font-display text-lg md:text-xl font-light tracking-tight text-zinc-900">
              Хотите сайт в таком же уровне?
            </h3>
            <p className="font-sans text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
              Обсудим задачу, подберем структуру и покажем, как ваш бизнес может выглядеть в интернете.
            </p>
          </div>
          <button 
            onClick={handleCtaClick}
            className="flex-shrink-0 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 transition-all duration-300 text-xs font-bold tracking-widest uppercase cursor-pointer shadow-lg shadow-black/10 border-none"
          >
            Обсудить проект
          </button>
        </div>

      </div>
    </div>
  );
}
