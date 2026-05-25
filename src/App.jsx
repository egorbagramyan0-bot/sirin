import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import Header from './components/Header';
import AnimatedSirinLogo from './components/AnimatedSirinLogo';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ApproachSection from './components/ApproachSection';
import PortfolioCarousel from './components/PortfolioCarousel';
import Footer from './components/Footer';

gsap.registerPlugin(Observer);

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHandoffToStatic, setIsHandoffToStatic] = useState(false);
  const [isDirectPortfolioJump, setIsDirectPortfolioJump] = useState(false);
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goToPortfolio = () => {
    if (isAnimatingRef.current) return;
    if (activeIndexRef.current === 3) return;
    isAnimatingRef.current = true;

    const startTransition = () => {
      gsap.to(containerRef.current, {
        y: -3 * 100 + 'vh',
        duration: 1.3,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsHandoffToStatic(true);
        },
      });

      setActiveIndex(3);
      activeIndexRef.current = 3;
    };

    if (isLogoHidden) {
      startTransition();
    } else {
      setIsLogoHidden(true);
      setTimeout(startTransition, 350);
    }
  };

  const goToContacts = () => {
    if (isAnimatingRef.current) return;
    if (activeIndexRef.current === 4) return;
    isAnimatingRef.current = true;

    const startTransition = () => {
      gsap.to(containerRef.current, {
        y: -4 * 100 + 'vh',
        duration: 1.3,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsHandoffToStatic(true);
        },
      });

      setActiveIndex(4);
      activeIndexRef.current = 4;
    };

    if (isLogoHidden) {
      startTransition();
    } else {
      setIsLogoHidden(true);
      setTimeout(startTransition, 350);
    }
  };

  const goToSection = (index, options = { source: 'scroll' }) => {
    if (index < 0 || index > 4) return;
    if (index === activeIndexRef.current) return;
    if (isAnimatingRef.current) return;

    if (index === 3 && options.source !== 'scroll') {
      goToPortfolio();
      return;
    }
    if (index === 4 && options.source !== 'scroll') {
      goToContacts();
      return;
    }

    isAnimatingRef.current = true;
    const from = activeIndexRef.current;

    if (index < 3) {
      setIsLogoHidden(false);
    } else {
      if (options.source !== 'scroll') {
        setIsLogoHidden(true);
      }
    }

    // Handoff logic for non-adjacent and adjacent jumps
    if (index >= 3) {
      setIsHandoffToStatic(true);
    } else if (index <= 1 && from >= 2) {
      setIsHandoffToStatic(false);
    } else if (from === 2 && index === 1) {
      setIsHandoffToStatic(false);
    }

    gsap.to(containerRef.current, {
      y: -index * 100 + 'vh',
      duration: 1.3,
      ease: 'power3.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
        
        // Handoff to static: when we arrive at Approach (2) from above
        if (index === 2) {
          setIsHandoffToStatic(true);
        }
      },
    });

    setActiveIndex(index);
    activeIndexRef.current = index;
  };

  const handleNavClick = (targetIndex) => {
    if (activeIndexRef.current >= 3 && targetIndex === 1) {
      setIsLogoHidden(false);
      goToSection(1, { source: 'nav' });
    } else if (activeIndexRef.current >= 3 && targetIndex === 0) {
      setIsLogoHidden(false);
      goToSection(0, { source: 'nav' });
    } else if (targetIndex === 3) {
      goToPortfolio();
    } else if (targetIndex === 4) {
      goToContacts();
    } else {
      goToSection(targetIndex, { source: 'nav' });
    }
  };

  const handleLogoHomeClick = () => {
    if (activeIndexRef.current >= 3) {
      setIsLogoHidden(false);
      goToSection(0, { source: 'nav' });
    } else {
      goToSection(0, { source: 'nav' });
    }
  };

  const goToPortfolioFromHero = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsDirectPortfolioJump(true);

    gsap.to(containerRef.current, {
      y: -3 * 100 + 'vh',
      duration: 1.3,
      ease: 'power3.inOut',
      onComplete: () => {
        setTimeout(() => {
          setIsHandoffToStatic(true);
          setIsDirectPortfolioJump(false);
          isAnimatingRef.current = false;
        }, 250);
      },
    });

    setActiveIndex(3);
    activeIndexRef.current = 3;
  };

  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: 'wheel,touch,pointer',
      wheelSpeed: 1,
      tolerance: 10,
      preventDefault: true,
      exclude: 'a, button, .sirin-logo-wrapper, .sirin-logo-wrapper *, .embla, .embla *',
      onUp: () => {
        if (isAnimatingRef.current) return;
        if (activeIndexRef.current > 0) {
          goToSection(activeIndexRef.current - 1, { source: 'scroll' });
        }
      },
      onDown: () => {
        if (isAnimatingRef.current) return;
        if (activeIndexRef.current < 4) {
          goToSection(activeIndexRef.current + 1, { source: 'scroll' });
        }
      },
    });

    return () => observer.kill();
  }, []);

  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'about', label: 'О студии' },
    { id: 'approach', label: 'Цены' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'footer', label: 'Контакты' },
  ];

  return (
    <div id="app-container" className="relative w-full h-screen overflow-hidden bg-white">
      {/* fixed global layers */}
      <Header 
        onNavigate={handleNavClick} 
        onLogoClick={handleLogoHomeClick}
        onPortfolioFromHero={goToPortfolioFromHero}
        activeIndex={activeIndex}
      />
      <AnimatedSirinLogo 
        activeIndex={activeIndex} 
        isHandoffToStatic={isHandoffToStatic} 
        isDirectPortfolioJump={isDirectPortfolioJump}
        isLogoHidden={isLogoHidden}
      />

      {/* Vertical Section Indicator (Right Side) */}
      <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-5 items-center select-none mix-blend-difference">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => goToSection(idx, { source: 'nav' })}
            className="group flex items-center justify-end gap-3 relative cursor-pointer bg-transparent border-none p-0"
            aria-label={`Scroll to ${sec.label}`}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] tracking-[0.2em] font-medium text-white uppercase pr-1">
              {sec.label}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'bg-white w-4'
                  : 'bg-white/40 group-hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>

      {/* snap container */}
      <div 
        ref={containerRef} 
        className="w-full h-full flex flex-col"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Hero onPortfolioClick={goToPortfolioFromHero} />
        <AboutSection />
        <ApproachSection isLogoVisible={isHandoffToStatic && !isLogoHidden} />
        <PortfolioCarousel />
        <Footer onNavigate={handleNavClick} />
      </div>
    </div>
  );
}
