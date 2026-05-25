import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'LUMEN',
    tags: 'Web Design, Development',
    image: '/lumen.png',
  },
  {
    title: 'NEXUS',
    tags: 'Web Design, Branding, Development',
    image: '/nexus.png',
  },
  {
    title: 'AURORA',
    tags: 'Web Design, Development',
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
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 text-center mb-16">
        <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-6 block">
          FEATURED WORK
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-brand-black leading-tight mb-4">
          Selected projects
        </h2>
        <p className="font-sans text-xs md:text-sm text-brand-gray tracking-wide max-w-md mx-auto">
          A selection of websites and digital experiences we're proud to have crafted.
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
                    <div>
                      <h3 className="font-display font-medium text-sm md:text-base tracking-[0.1em] text-brand-black uppercase">
                        {project.title}
                      </h3>
                      <p className="font-sans text-[11px] md:text-xs text-brand-gray mt-1">
                        {project.tags}
                      </p>
                    </div>
                    <span className="text-brand-gray group-hover:text-brand-black group-hover:translate-x-1.5 transition-all duration-300 transform font-light text-base md:text-lg">
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
