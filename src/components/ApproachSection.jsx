import React, { useState, useEffect } from 'react';

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
      <div 
        className="sirin-logo-visual"
        style={{
          position: 'absolute',
          left: isMobile ? '20%' : '24%',
          top: isMobile ? '12%' : '50%',
          width: 'clamp(220px, 22vw, 420px)',
          transform: `translate(-50%, -50%) perspective(1200px) scale(${isMobile ? 0.32 : 0.62}) rotateY(${isMobile ? 0 : 32}deg) rotateX(${isMobile ? 0 : 4}deg) skewX(${isMobile ? 0 : 2}deg) scaleX(${isMobile ? 1 : 0.92})`,
          opacity: isLogoVisible ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 40,
        }}
      >
        <div className="sirin-logo-float">
          {svgContent ? (
            <div 
              className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <img src="/sirin_symbol_animated_ready.svg" alt="SIRIN symbol" />
          )}
        </div>
      </div>
    </section>
  );
}
