import React from 'react';
import { Target, Gem, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative w-full h-screen flex items-center justify-center px-8 md:px-16 bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center max-w-xl">
          <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-6 block">
            О СТУДИИ
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-brand-black leading-tight mb-8">
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

        {/* Right Column - Spacer for Floating Animated Logo */}
        <div className="flex lg:flex items-center justify-center h-[120px] lg:h-[500px]">
          {/* Logo lands here automatically via fixed position animation */}
        </div>
      </div>
    </section>
  );
}
