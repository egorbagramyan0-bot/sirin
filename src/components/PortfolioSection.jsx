import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Лидер Юг',
    category: 'Корпоративный сайт / строительство',
    desc: 'Сайт для компании в строительной сфере с чистой структурой, понятной подачей услуг и акцентом на доверие. Основная задача — быстро объяснить направление компании, показать надежность и привести пользователя к заявке.',
    url: 'https://lideryug.vercel.app/',
    previewImage: '/lider_preview.png',
  },
  {
    title: 'PRORAB',
    category: 'Салон отделочных материалов',
    desc: 'Сайт для салона керамогранита и внутренней отделки. Визуальная подача строится вокруг ассортимента, бренда и быстрых действий: посмотреть направления, связаться, построить маршрут и перейти к выбору материалов.',
    url: 'https://prorab-site.vercel.app/',
    previewImage: '/prorab_preview.png',
  },
  {
    title: 'GEV Barbershop',
    category: 'Локальный бизнес / услуги',
    desc: 'Атмосферный сайт для барбершопа с акцентом на стиль, доверие и быструю запись. Страница показывает услуги, мастеров, настроение заведения и помогает пользователю быстро принять решение.',
    url: 'https://gev-barber.vercel.app/',
    previewImage: '/barber_preview.png',
  },
];

function PortfolioCard({ project }) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef(null);
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.2);
  const [isMobile, setIsMobile] = useState(false);

  // Lazy-load iframe only when card is visible
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!wrapRef.current || isMobile) return;
    const updateScale = () => {
      const width = wrapRef.current.clientWidth;
      if (width > 0) {
        setScale(width / 1440);
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });
    resizeObserver.observe(wrapRef.current);

    return () => resizeObserver.disconnect();
  }, [isMobile]);

  return (
    <article ref={cardRef} className="portfolio-card">
      {/* Browser-frame preview */}
      <div className="portfolio-card-preview">
        {/* Browser dots */}
        <div className="portfolio-browser-bar">
          <span className="portfolio-browser-dot" />
          <span className="portfolio-browser-dot" />
          <span className="portfolio-browser-dot" />
          <span className="portfolio-browser-url font-sans">{new URL(project.url).hostname}</span>
        </div>
        <div ref={wrapRef} className="portfolio-iframe-wrap">
          {!isMobile && visible && (
            <iframe
              ref={iframeRef}
              src={project.url}
              title={project.title}
              loading="lazy"
              scrolling="no"
              onLoad={() => setLoaded(true)}
              className={`portfolio-iframe ${loaded ? 'is-loaded' : ''}`}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: '1440px',
                height: '900px',
              }}
            />
          )}
          {isMobile && (
            <img 
              src={project.previewImage} 
              alt={project.title} 
              className="portfolio-mobile-preview w-full h-full object-cover" 
              loading="lazy"
            />
          )}
          {!isMobile && (!visible || !loaded) && (
            <div className="portfolio-iframe-placeholder">
              <div className="portfolio-placeholder-spinner" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="portfolio-card-body">
        <span className="portfolio-card-category font-display">{project.category}</span>
        <h3 className="portfolio-card-title font-display">{project.title}</h3>
        <p className="portfolio-card-desc font-sans">{project.desc}</p>
      </div>

      {/* Footer */}
      <div className="portfolio-card-footer">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-card-button font-display"
        >
          Открыть сайт
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="portfolio-section relative w-full bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="portfolio-inner">
        {/* Header */}
        <div className="portfolio-header section-header">
          <span className="section-kicker font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-3 block">
            ПОРТФОЛИО
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[44px] font-light tracking-tight text-brand-black leading-tight mb-3">
            Сайты, которые мы собрали
          </h2>
          <p className="font-sans text-sm sm:text-base lg:text-[17px] text-brand-gray leading-relaxed max-w-2xl">
            Каждый проект — это не просто красивая страница, а понятная структура,
            визуальная подача и путь пользователя к заявке.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="portfolio-grid">
          {projects.map((project, idx) => (
            <PortfolioCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
