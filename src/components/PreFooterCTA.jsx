import React from 'react';

export default function PreFooterCTA() {
  return (
    <section id="contacts" className="prefooter-cta-section">
      <div className="prefooter-cta-card">
        <span className="section-kicker">ГОТОВЫ НАЧАТЬ?</span>

        <h2 className="font-display">Обсудим ваш проект?</h2>

        <p className="font-sans">
          Кратко опишите задачу — мы предложим структуру, стиль и понятный план запуска.
        </p>

        <div className="prefooter-cta-actions">
          <a 
            className="prefooter-cta-button font-display" 
            href="https://t.me/websirin" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Telegram
            <span>↗</span>
          </a>
        </div>

        <div className="prefooter-cta-note font-sans">
          Ответим с планом и примерной стоимостью
        </div>
      </div>
    </section>
  );
}
