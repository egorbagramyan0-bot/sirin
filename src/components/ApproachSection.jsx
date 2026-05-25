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
    scale(${state.scale})
    perspective(1200px)
    rotateY(${state.rotateY}deg)
    rotateX(${state.rotateX}deg)
    skewX(${state.skewX}deg)
    scaleX(${state.scaleX})
  `;
}

export default function ApproachSection({ isLogoVisible }) {
  const [svgContent, setSvgContent] = useState('');
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section 
      id="approach" 
      className="pricing-section relative w-full h-screen flex items-center justify-center px-8 md:px-16 bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Spacer for Floating Animated Logo */}
        <div className="flex lg:flex items-center justify-center h-[120px] lg:h-[500px] order-2 lg:order-1">
          {/* Logo lands here automatically via fixed position animation */}
        </div>

        {/* Right Column - Content */}
        <div className="pricing-content flex flex-col justify-center max-w-xl order-1 lg:order-2 ml-auto">
          <span className="section-kicker font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-3 block">
            ЦЕНЫ
          </span>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-brand-black leading-tight mb-3">
            Стоимость разработки сайта
          </h2>
          <p className="font-sans text-[11px] md:text-xs text-brand-gray leading-relaxed mb-6">
            Выберите формат под задачу: от быстрого лендинга до полноценного многостраничного сайта с аналитикой и подготовкой к рекламе.
          </p>

          <div className="pricing-cards flex flex-col gap-3.5 w-full">
            {/* Card 1 */}
            <article className="pricing-card border border-black/8 hover:border-black/15 rounded-[20px] p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-display font-medium text-xs md:text-sm text-brand-black tracking-wide uppercase">
                    Одностраничный лендинг
                  </h3>
                  <span className="font-display font-semibold text-xs md:text-sm text-brand-black flex-shrink-0">
                    от 35 000 ₽
                  </span>
                </div>
                <p className="font-sans text-[10px] md:text-[11px] text-brand-gray mt-1 leading-relaxed max-w-md">
                  Сайт для презентации услуги, продукта, студии или локального бизнеса. Подходит для рекламы, заявок и быстрого запуска.
                </p>
                <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[9px] text-brand-gray/80 font-sans mt-2">
                  {['структура страницы', 'адаптивный дизайн', 'верстка', 'базовая анимация', 'форма заявки / кнопки связи', 'подготовка к запуску'].map((feat, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-brand-gray/40"></span>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 w-full sm:w-auto text-right">
                <button className="w-full sm:w-auto px-4 py-2 rounded-full bg-brand-black text-white hover:bg-brand-graphite transition-all duration-300 text-[9px] font-semibold tracking-wider uppercase cursor-pointer">
                  Обсудить лендинг
                </button>
              </div>
            </article>

            {/* Card 2 */}
            <article className="pricing-card border border-black/8 hover:border-black/15 rounded-[20px] p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-display font-medium text-xs md:text-sm text-brand-black tracking-wide uppercase">
                    Многостраничный сайт
                  </h3>
                  <span className="font-display font-semibold text-xs md:text-sm text-brand-black flex-shrink-0">
                    от 70 000 ₽
                  </span>
                </div>
                <p className="font-sans text-[10px] md:text-[11px] text-brand-gray mt-1 leading-relaxed max-w-md">
                  Сайт для компании, студии или бизнеса с несколькими разделами: услуги, портфолио, о компании, контакты и дополнительные страницы.
                </p>
                <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[9px] text-brand-gray/80 font-sans mt-2">
                  {['проектирование структуры сайта', 'дизайн ключевых страниц', 'адаптивная верстка', 'базовая SEO-структура', 'формы заявок и контакты', 'подготовка к публикации'].map((feat, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-brand-gray/40"></span>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 w-full sm:w-auto text-right">
                <button className="w-full sm:w-auto px-4 py-2 rounded-full bg-brand-black text-white hover:bg-brand-graphite transition-all duration-300 text-[9px] font-semibold tracking-wider uppercase cursor-pointer">
                  Обсудить сайт
                </button>
              </div>
            </article>

            {/* Card 3 */}
            <article className="pricing-card border border-black/8 hover:border-black/15 rounded-[20px] p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-display font-medium text-xs md:text-sm text-brand-black tracking-wide uppercase">
                    Подключение Яндекс Метрики
                  </h3>
                  <span className="font-display font-semibold text-xs md:text-sm text-brand-black flex-shrink-0">
                    от 5 000 ₽
                  </span>
                </div>
                <p className="font-sans text-[10px] md:text-[11px] text-brand-gray mt-1 leading-relaxed max-w-md">
                  Настройка аналитики для отслеживания посещений, заявок, кликов по кнопкам и эффективности рекламы.
                </p>
                <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[9px] text-brand-gray/80 font-sans mt-2">
                  {['создание или подключение счетчика', 'установка кода на сайт', 'настройка целей', 'проверка корректной работы', 'базовая подготовка к рекламе'].map((feat, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-brand-gray/40"></span>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 w-full sm:w-auto text-right">
                <button className="w-full sm:w-auto px-4 py-2 rounded-full bg-brand-black text-white hover:bg-brand-graphite transition-all duration-300 text-[9px] font-semibold tracking-wider uppercase cursor-pointer">
                  Подключить Метрику
                </button>
              </div>
            </article>
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
            }}
          >
            <div className="sirin-logo-visual w-full h-full flex items-center justify-center">
              <div className="sirin-logo-float w-full h-full flex items-center justify-center">
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
