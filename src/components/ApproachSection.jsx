import React from 'react';

const cards = [
  {
    title: 'Стартовый лендинг',
    badge: 'Быстрый старт',
    price: 'от 30 000 ₽',
    desc: 'Одностраничный сайт для услуги, продукта или локального бизнеса. Подходит для запуска рекламы и проверки спроса.',
    features: [
      'Структура страницы',
      'Адаптивный дизайн',
      'Вёрстка',
      'Базовая анимация',
      'Форма заявки / кнопки связи',
    ],
    btnText: 'Обсудить лендинг',
    popular: false,
  },
  {
    title: 'Бизнес-сайт',
    badge: 'Популярно',
    price: 'от 50 000 ₽',
    desc: 'Многостраничный сайт для компании с разделами: услуги, о компании, портфолио, контакты и дополнительные страницы.',
    features: [
      'Структура сайта',
      'Дизайн ключевых страниц',
      'Адаптивная вёрстка',
      'Базовая SEO-структура',
      'Подготовка к публикации',
    ],
    btnText: 'Обсудить сайт',
    popular: true,
  },
  {
    title: 'Яндекс Метрика',
    badge: 'Аналитика',
    price: 'от 5 000 ₽',
    desc: 'Подключение аналитики для отслеживания заявок, кликов, переходов в мессенджеры и эффективности рекламы.',
    features: [
      'Установка счётчика',
      'Настройка целей',
      'Проверка событий',
      'Базовая подготовка к рекламе',
    ],
    btnText: 'Подключить',
    popular: false,
  },
  {
    title: 'Техподдержка сайта',
    badge: 'После запуска',
    price: 'от 3 000 ₽ / мес',
    desc: 'Поддержка сайта после публикации: помогаем обновлять информацию, менять цены, добавлять блоки, следить за корректной работой и быстро вносить небольшие правки.',
    features: [
      'обновление текстов и цен',
      'небольшие правки блоков',
      'контроль форм и кнопок связи',
      'помощь с доменом и хостингом',
      'базовый мониторинг работы сайта',
    ],
    btnText: 'Обсудить поддержку',
    popular: false,
  },
];

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="pricing-section relative w-full bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="pricing-inner">
        {/* Header */}
        <div className="pricing-header section-header">
          <span className="section-kicker font-display text-[10px] md:text-[11px] font-semibold tracking-[0.3em] text-brand-gray uppercase mb-3 block">
            ЦЕНЫ
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[44px] font-light tracking-tight text-brand-black leading-tight mb-3">
            Выберите формат под задачу
          </h2>
          <p className="font-sans text-sm sm:text-base lg:text-[17px] text-brand-gray leading-relaxed max-w-2xl">
            От быстрого лендинга до полноценного сайта с аналитикой, структурой и подготовкой к рекламе.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="pricing-grid">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className={`pricing-card${card.popular ? ' pricing-card--popular' : ''} pricing-card--${idx}`}
            >
              {/* Badge */}
              <span className="pricing-badge font-display">{card.badge}</span>

              {/* Title */}
              <h3 className="pricing-card-title font-display">{card.title}</h3>

              {/* Description */}
              <p className="pricing-card-description font-sans">{card.desc}</p>

              {/* Features */}
              <ul className="pricing-features">
                {card.features.map((feat, i) => (
                  <li key={i} className="font-sans">
                    <span className="pricing-feature-dot" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Footer: Price — pinned to bottom */}
              <div className="pricing-card-footer">
                <span className="pricing-price-label font-sans">Стоимость</span>
                <span className="pricing-price font-display">{card.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
