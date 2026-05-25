import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'ИНТЕРЬЕРНЫЙ САЛОН',
    tags: 'Дизайн сайта, структура, разработка',
    heading: 'Премиальный сайт для салона отделочных материалов',
    desc: 'Каталог, преимущества, контакты и маршрут — все, что помогает клиенту быстрее принять решение.',
    image: '/lumen.png',
  },
  {
    title: 'САЙТ УСЛУГ',
    tags: 'Прототип, дизайн, разработка',
    heading: 'Понятная структура для заявок',
    desc: 'Упаковка услуги, доверие, преимущества, форма заявки и адаптивная версия.',
    image: '/nexus.png',
  },
  {
    title: 'РЕСТОРАН / БРЕНД',
    tags: 'Дизайн сайта, визуальная упаковка',
    heading: 'Сайт, который передает атмосферу',
    desc: 'Визуал, меню, залы, банкеты, отзывы и быстрый контакт с заведением.',
    image: '/aurora.png',
  },
];

export default function PortfolioCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section 
      id="portfolio" 
      className="relative w-full h-screen bg-white flex flex-col justify-center border-t border-brand-light-gray select-none flex-shrink-0 overflow-hidden"
    >
      {/* Intro Header */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 text-center mb-8">
        <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-4 block">
          ПОРТФОЛИО
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-brand-black leading-tight mb-4">
          Избранные проекты
        </h2>
        <p className="font-sans text-xs md:text-sm text-brand-gray tracking-wide max-w-2xl mx-auto">
          Несколько направлений, в которых мы можем упаковать бизнес: от локальных услуг до премиальных заведений и интерьерных проектов.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 relative">
        <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing embla" ref={emblaRef}>
          <div className="flex gap-6">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="flex-[0_0_85%] md:flex-[0_0_48%] lg:flex-[0_0_32.2%] min-w-0"
              >
                {/* Project Card */}
                <div className="group flex flex-col gap-4">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-light-gray border border-brand-silver/50 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Card Description Footer */}
                  <div className="flex justify-between items-start px-2">
                    <div className="flex-1 pr-4">
                      <h3 className="font-display font-medium text-xs md:text-sm tracking-[0.1em] text-brand-black uppercase">
                        {project.title}
                      </h3>
                      <p className="font-sans text-[10px] md:text-xs text-brand-gray mt-0.5">
                        {project.tags}
                      </p>
                      {project.heading && (
                        <p className="font-display font-medium text-[11px] md:text-xs text-brand-black mt-2 leading-snug">
                          {project.heading}
                        </p>
                      )}
                      {project.desc && (
                        <p className="font-sans text-[10px] md:text-[11px] text-brand-gray/80 mt-1 leading-relaxed">
                          {project.desc}
                        </p>
                      )}
                    </div>
                    <span className="text-brand-gray group-hover:text-brand-black group-hover:translate-x-1.5 transition-all duration-300 transform font-light text-base md:text-lg shrink-0 mt-0.5">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          {/* Prev Button */}
          <button 
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="w-12 h-12 rounded-full border border-brand-silver flex items-center justify-center text-brand-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-black hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Indicators / Pagination Dots */}
          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? 'w-6 bg-brand-black' : 'bg-brand-silver'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="w-12 h-12 rounded-full border border-brand-silver flex items-center justify-center text-brand-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-black hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
