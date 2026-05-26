import React from 'react';
import { Target, Gem, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="about-section bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="about-inner">
        {/* Left Column - Content */}
        <div className="about-left flex flex-col justify-center">
          <span className="section-kicker font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-6 block">
            О СТУДИИ
          </span>
          <h2 className="about-title font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-brand-black leading-tight mb-8">
            Упаковываем бизнес в современный сайт.
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-gray leading-relaxed mb-12">
            SIRIN — студия, которая помогает бизнесу выглядеть сильнее в интернете. Мы проектируем сайты, где визуал, структура и техническая реализация работают на доверие и заявки.
          </p>

          <hr className="border-brand-silver/50 mb-10 w-24" />

          {/* List of Features */}
          <div className="flex flex-col gap-8">
            {/* Feature 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-silver/60 flex items-center justify-center text-brand-black">
                <Target className="w-5 h-5 stroke-[1.25]" />
              </div>
              <div>
                <h3 className="font-display font-medium text-xs md:text-sm tracking-[0.1em] text-brand-black mb-1.5 uppercase">
                  Дизайн от задачи
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-gray">
                  Сначала разбираем бизнес, аудиторию и цель сайта, а уже потом собираем визуал.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-silver/60 flex items-center justify-center text-brand-black">
                <Gem className="w-5 h-5 stroke-[1.25]" />
              </div>
              <div>
                <h3 className="font-display font-medium text-xs md:text-sm tracking-[0.1em] text-brand-black mb-1.5 uppercase">
                  Премиальная подача
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-gray">
                  Минимализм, чистая типографика, аккуратная сетка и визуал, который не устаревает через месяц.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-silver/60 flex items-center justify-center text-brand-black">
                <Zap className="w-5 h-5 stroke-[1.25]" />
              </div>
              <div>
                <h3 className="font-display font-medium text-xs md:text-sm tracking-[0.1em] text-brand-black mb-1.5 uppercase">
                  Сайт без лишнего шума
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-gray">
                  Быстрая загрузка, адаптив под телефон и понятная структура для пользователя.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="flex flex-col gap-6">
          <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase block">
            ПРИНЦИПЫ РАБОТЫ
          </span>
          <div className="about-right">
            {/* Card 1 */}
            <div className="about-card flex flex-col justify-between transition-all duration-300">
              <div className="about-card-number font-display">01</div>
              <div>
                <h4 className="about-card-title font-display">Структура до дизайна</h4>
                <p className="about-card-text font-sans">
                  Сначала собираем логику страницы: кто клиент, что ему важно и какое действие он должен совершить.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="about-card flex flex-col justify-between transition-all duration-300">
              <div className="about-card-number font-display">02</div>
              <div>
                <h4 className="about-card-title font-display">Визуал под бренд</h4>
                <p className="about-card-text font-sans">
                  Не используем случайные шаблоны. Подбираем подачу, типографику и ритм под конкретный бизнес.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="about-card flex flex-col justify-between transition-all duration-300">
              <div className="about-card-number font-display">03</div>
              <div>
                <h4 className="about-card-title font-display">Адаптив и скорость</h4>
                <p className="about-card-text font-sans">
                  Сайт должен одинаково хорошо выглядеть на телефоне, быстро загружаться и не мешать заявке.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="about-card flex flex-col justify-between transition-all duration-300">
              <div className="about-card-number font-display">04</div>
              <div>
                <h4 className="about-card-title font-display">Готовность к рекламе</h4>
                <p className="about-card-text font-sans">
                  Продумываем CTA, контакты, аналитику и структуру так, чтобы сайт можно было вести в трафик.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
