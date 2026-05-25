import React, { useState, useEffect } from 'react';

const SECTION_LOGO_SIZE = "clamp(320px, 30vw, 560px)";
const SECTION_LOGO_SCALE = 0.94;
const SECTION_LOGO_ROTATE_X = 4;
const SECTION_LOGO_SCALE_X = 0.92;

const APPROACH_LOGO_STATE = {
  left: "20%",
  top: "50%",
  width: SECTION_LOGO_SIZE,
  scale: SECTION_LOGO_SCALE,
  rotateY: 32,
  rotateX: SECTION_LOGO_ROTATE_X,
  skewX: 2,
  scaleX: SECTION_LOGO_SCALE_X,
  opacity: 1
};

function buildLogoTransform(state) {
  return `
    translate(-50%, -50%)
    perspective(1200px)
    rotateY(${state.rotateY}deg)
    rotateX(${state.rotateX}deg)
    skewX(${state.skewX}deg)
    scaleX(${state.scaleX})
    scale(${state.scale})
  `;
}

export default function ApproachSection({ isLogoVisible }) {
  const [svgContent, setSvgContent] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    if (isLogoVisible) {
      const timer = setTimeout(() => {
        setIsFloating(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsFloating(false);
    }
  }, [isLogoVisible]);

  useEffect(() => {
    // Check mobile state dynamically
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);

    // Fetch the SVG file from public directory
    fetch('/sirin_symbol_animated_ready.svg')
      .then((res) => res.text())
      .then((data) => {
        setSvgContent(data);
      });

    return () => media.removeEventListener('change', listener);
  }, []);

  const cards = [
    {
      title: 'Одностраничный лендинг',
      badge: 'Быстрый старт',
      price: 'от 35 000 ₽',
      desc: 'Для рекламы, презентации услуги или быстрого запуска продукта.',
      features: [
        'Структура страницы',
        'Адаптивный дизайн',
        'Верстка и базовая анимация',
        'Форма заявки и кнопки связи'
      ],
      btnText: 'Обсудить лендинг'
    },
    {
      title: 'Многостраничный сайт',
      badge: 'Для бизнеса',
      price: 'от 70 000 ₽',
      desc: 'Для компании, студии или бизнеса с несколькими разделами и понятной структурой.',
      features: [
        'Проектирование структуры сайта',
        'Дизайн ключевых страниц',
        'Адаптивная верстка',
        'Базовая SEO-структура'
      ],
      btnText: 'Обсудить сайт'
    },
    {
      title: 'Подключение Яндекс Метрики',
      badge: 'Аналитика',
      price: 'от 5 000 ₽',
      desc: 'Настройка аналитики для заявок, кликов, рекламы и понимания поведения пользователей.',
      features: [
        'Установка счетчика на сайт',
        'Настройка целей',
        'Проверка корректной работы',
        'Базовая подготовка к рекламе'
      ],
      btnText: 'Подключить Метрику'
    }
  ];

  return (
    <section 
      id="approach" 
      className="pricing-section relative w-full h-screen flex items-center justify-center pt-[110px] pb-[70px] lg:pt-[125px] lg:pb-[75px] px-8 md:px-16 bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[32%_68%] gap-12 lg:gap-16 items-center h-full">
        {/* Left Column - Spacer for Floating Animated Logo */}
        <div className="flex lg:flex items-center justify-center h-[120px] lg:h-[500px] order-2 lg:order-1">
          {/* Logo lands here automatically via fixed position animation */}
        </div>

        {/* Right Column - Content */}
        <div className="pricing-content flex flex-col justify-center w-full max-w-3xl order-1 lg:order-2 ml-auto">
          <span className="section-kicker font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-3 block">
            ЦЕНЫ
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[44px] font-light tracking-tight text-brand-black leading-tight mb-2.5">
            Стоимость разработки сайта
          </h2>
          <p className="font-sans text-sm sm:text-base lg:text-[17px] text-brand-gray leading-relaxed mb-6 lg:mb-7 max-w-2xl">
            Выберите формат под задачу: от быстрого лендинга до полноценного многостраничного сайта с аналитикой и подготовкой к рекламе.
          </p>

          <div className="pricing-cards flex flex-col gap-4 w-full">
            {cards.map((card, idx) => (
              <article 
                key={idx} 
                className="pricing-card border border-black/10 rounded-[24px] p-5 lg:py-5.5 lg:px-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-black/30 bg-[#fafafa] flex flex-col md:flex-row justify-between items-start md:items-stretch gap-5.5"
              >
                {/* Left Side: Title, Badge, Description, Features */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center flex-wrap gap-2.5">
                      <h3 className="font-display font-medium text-base sm:text-lg lg:text-[19px] text-brand-black tracking-wide uppercase">
                        {card.title}
                      </h3>
                      <span className="text-[9px] uppercase font-medium tracking-wider px-2.5 py-0.5 border border-black/10 rounded-full text-brand-gray/80 bg-white">
                        {card.badge}
                      </span>
                    </div>
                    <p className="font-sans text-[13px] sm:text-sm lg:text-[14.5px] text-brand-gray mt-2 leading-[1.45] max-w-xl">
                      {card.desc}
                    </p>
                  </div>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] sm:text-sm lg:text-[14px] text-brand-gray mt-4 border-t border-black/5 pt-3">
                    {card.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-black/35 flex-shrink-0"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side: Price (top right) & Button (bottom right) */}
                <div className="flex-shrink-0 w-full md:w-44 flex flex-col justify-between items-start md:items-end gap-4 text-left md:text-right border-t md:border-t-0 border-black/5 pt-3.5 md:pt-0">
                  <div>
                    <span className="font-sans text-[10px] text-brand-gray uppercase tracking-wider block mb-0.5">Стоимость</span>
                    <span className="font-display font-semibold text-xl lg:text-[23px] text-brand-black whitespace-nowrap">
                      {card.price}
                    </span>
                  </div>
                  <button className="w-full md:w-auto px-5 py-2.5 rounded-full bg-brand-black text-white hover:bg-brand-graphite transition-all duration-300 text-[10px] sm:text-[10.5px] font-semibold tracking-wider uppercase cursor-pointer h-10 flex items-center justify-center">
                    {card.btnText}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Static logo for seamless handoff */}
      {(() => {
        const approachState = {
          ...APPROACH_LOGO_STATE,
          left: isMobile ? "20%" : APPROACH_LOGO_STATE.left,
          top: isMobile ? "12%" : APPROACH_LOGO_STATE.top,
          scale: isMobile ? 0.32 : APPROACH_LOGO_STATE.scale,
          rotateY: isMobile ? 0 : APPROACH_LOGO_STATE.rotateY,
          rotateX: isMobile ? 0 : APPROACH_LOGO_STATE.rotateX,
          skewX: isMobile ? 0 : APPROACH_LOGO_STATE.skewX,
          scaleX: isMobile ? 1 : APPROACH_LOGO_STATE.scaleX,
        };

        return (
          <div 
            className="approach-static-logo-wrap sirin-logo-wrapper absolute pointer-events-none z-40 flex items-center justify-center select-none"
            style={{
              left: approachState.left,
              top: approachState.top,
              width: approachState.width,
              height: 'auto',
              transform: buildLogoTransform(approachState),
              transformStyle: 'preserve-3d',
              opacity: isLogoVisible ? 1 : 0,
              visibility: isLogoVisible ? 'visible' : 'hidden',
              pointerEvents: 'none',
              transition: isLogoVisible ? 'none' : 'opacity 0.35s ease, visibility 0.35s ease',
            }}
          >
            <div className="sirin-logo-visual w-full h-full flex items-center justify-center">
              <div className={`sirin-logo-float w-full h-full flex items-center justify-center ${!isFloating ? 'no-float' : ''}`}>
                {svgContent ? (
                  <div 
                    className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  <img src="/sirin_symbol_animated_ready.svg" alt="SIRIN symbol" className="w-full h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)]" />
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
