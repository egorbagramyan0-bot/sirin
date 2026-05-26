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
      className="footer select-none border-t border-white/[0.05] flex-shrink-0 overflow-hidden flex flex-col justify-between"
    >
      <div className="footer-inner">
        
        {/* Left Column (Brand bio) */}
        <div className="flex flex-col gap-6 justify-center">
          <div>
            <div className="mb-6 flex select-none">
              <img 
                src="/fullsvg.svg" 
                alt="SIRIN full logo" 
                className="h-8 md:h-12 object-contain invert" 
              />
            </div>
            <p className="footer-text">
              Студия веб-дизайна, которая помогает бизнесу выглядеть сильнее в интернете: продумываем структуру, визуал, адаптив и путь пользователя к заявке.
            </p>
            <ul className="footer-bullet-list">
              <li className="footer-bullet-item">
                <span className="footer-bullet-dot" />
                <span>Сайты для бизнеса</span>
              </li>
              <li className="footer-bullet-item">
                <span className="footer-bullet-dot" />
                <span>Визуальная упаковка</span>
              </li>
              <li className="footer-bullet-item">
                <span className="footer-bullet-dot" />
                <span>Запуск и поддержка</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Column 1 (Navigation) */}
        <div>
          <h3 className="footer-title">
            НАВИГАЦИЯ
          </h3>
          <ul className="flex flex-col gap-3">
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 1)} 
                className="footer-link"
              >
                О студии
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 2)} 
                className="footer-link"
              >
                Цены
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 3)} 
                className="footer-link"
              >
                Портфолио
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 4)} 
                className="footer-link"
              >
                Контакты
              </button>
            </li>
          </ul>
        </div>

        {/* Middle Column 2 (Services) */}
        <div>
          <h3 className="footer-title">
            УСЛУГИ
          </h3>
          <ul className="flex flex-col gap-3">
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 2)} 
                className="footer-link"
              >
                Лендинги
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 2)} 
                className="footer-link"
              >
                Многостраничные сайты
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 2)} 
                className="footer-link"
              >
                Яндекс Метрика
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={(e) => handleNav(e, 2)} 
                className="footer-link"
              >
                Техподдержка сайта
              </button>
            </li>
          </ul>
        </div>

        {/* Right Column (CTA) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="footer-title">
              ОБСУДИМ ПРОЕКТ?
            </h3>
            <p className="footer-cta-text">
              Расскажите, какой сайт нужен вашему бизнесу. Мы предложим структуру, стиль и понятный план запуска.
            </p>
          </div>

          <div className="footer-buttons">
            <a 
              href="#" 
              className="footer-button"
              aria-label="Связаться в Telegram"
            >
              Telegram
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a 
              href="#" 
              className="footer-button"
              aria-label="Связаться в WhatsApp"
            >
              WhatsApp
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <span>
          &copy; 2026 SIRIN. Студия веб-дизайна.
        </span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white transition-colors">Условия использования</a>
        </div>
      </div>
    </footer>
  );
}
