import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Лидер Юг',
    category: 'Корпоративный сайт / пассажирские перевозки',
    desc: 'Сайт для компании в сфере пассажирских перевозок с чистой структурой, понятной подачей услуг и акцентом на комфорт и безопасность. Основная задача — быстро донести доступные направления, показать удобство автопарка и привести пользователя к бронированию поездки.',
    url: 'https://www.lideryug.ru/',
    previewImage: '/lideryug.png',
  },
  {
    title: 'PRORAB',
    category: 'Салон отделочных материалов',
    desc: 'Сайт для салона керамогранита и внутренней отделки. Визуальная подача строится вокруг ассортимента, бренда и быстрых действий: посмотреть направления, связаться, построить маршрут и перейти к выбору материалов.',
    url: 'https://prorabsalon.ru/',
    previewImage: '/prorab.png',
  },
  {
    title: 'GEV Barbershop',
    category: 'Локальный бизнес / услуги',
    desc: 'Атмосферный сайт для барбершопа с акцентом на стиль, доверие и быструю запись. Страница показывает услуги, мастеров, настроение заведения и помогает пользователю быстро принять решение.',
    url: 'https://gev-barber.vercel.app/',
    previewImage: '/gev.png',
  },
];

function PortfolioCard({ project }) {
  return (
    <article className="portfolio-card">
      {/* Browser-frame preview */}
      <div className="portfolio-card-preview">
        {/* Browser dots */}
        <div className="portfolio-browser-bar">
          <span className="portfolio-browser-dot" />
          <span className="portfolio-browser-dot" />
          <span className="portfolio-browser-dot" />
          <span className="portfolio-browser-url font-sans">{new URL(project.url).hostname}</span>
        </div>
        <div className="portfolio-iframe-wrap">
          <img 
            src={project.previewImage} 
            alt={project.title} 
            className="w-full h-full object-cover object-top block" 
            loading="lazy"
          />
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
