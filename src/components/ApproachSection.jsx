import React, { useState, useEffect } from 'react';

const SECTION_LOGO_SIZE = "clamp(320px, 30vw, 560px)";
const SECTION_LOGO_SCALE = 0.72;
const SECTION_LOGO_ROTATE_X = 4;
const SECTION_LOGO_SCALE_X = 0.92;

const APPROACH_LOGO_STATE = {
  left: "22%",
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

  const steps = [
    {
      num: '01',
      title: 'Разбор',
      desc: 'Изучаем бизнес, конкурентов, аудиторию, услуги и то, какое действие должен совершить клиент.',
    },
    {
      num: '02',
      title: 'Прототип и дизайн',
      desc: 'Собираем структуру страниц, продумываем блоки, визуальный стиль, акценты и путь пользователя.',
    },
    {
      num: '03',
      title: 'Разработка',
      desc: 'Верстаем адаптивный сайт, настраиваем анимации, формы, скорость и корректную работу на устройствах.',
    },
    {
      num: '04',
      title: 'Запуск',
      desc: 'Подключаем домен, хостинг, аналитику, проверяем сайт и готовим его к рекламе и трафику.',
    },
  ];

  return (
    <section 
      id="approach" 
      className="relative w-full h-screen flex items-center justify-center px-8 md:px-16 bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Spacer for Floating Animated Logo */}
        <div className="flex lg:flex items-center justify-center h-[120px] lg:h-[500px] order-2 lg:order-1">
          {/* Logo lands here automatically via fixed position animation */}
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col justify-center max-w-xl order-1 lg:order-2 ml-auto">
          <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-6 block">
            НАШ ПРОЦЕСС
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-brand-black leading-tight mb-8">
            Смысл. Дизайн.<br />Запуск.
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-gray leading-relaxed mb-12">
            Мы не просто рисуем красивый экран. Сначала собираем логику сайта, потом визуал, затем доводим проект до рабочей версии и запускаем.
          </p>

          <hr className="border-brand-silver/50 mb-10 w-24" />

          {/* Process Timeline Steps */}
          <div className="flex flex-col gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-silver/60 flex items-center justify-center text-brand-gray font-display text-xs font-semibold">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display font-medium text-xs md:text-sm tracking-[0.1em] text-brand-black mb-1.5 uppercase">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-brand-gray leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
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
            className="sirin-logo-wrapper absolute pointer-events-none z-40 flex items-center justify-center select-none"
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
