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

    // Determine if this is a reverse handoff (leaving section 2 to go to section < 2)
    const isReverseHandoff = from === 2 && index < 2;

    if (isReverseHandoff) {
      // 1. Freeze the float animation of the static logo at its current phase
      const staticFloat = document.querySelector('.approach-static-logo-wrap .sirin-logo-float');
      if (staticFloat) {
        staticFloat.classList.add('is-handoff');
      }

      // 2. Prepare the fixed logo at approach position and pause it
      const fixedWrapper = document.querySelector('.sirin-logo-wrapper.fixed');
      const fixedVisual = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-visual');
      const fixedFloat = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-float');
      const staticVisual = document.querySelector('.approach-static-logo-wrap .sirin-logo-visual');
      const staticWrapper = document.querySelector('.approach-static-logo-wrap');

      if (fixedWrapper && fixedVisual && staticVisual && staticWrapper && staticFloat) {
        if (fixedFloat) {
          fixedFloat.classList.add('is-handoff');
        }

        // Set fixed logo wrapper to the approach coordinates, and make visible but opacity 0 (so we can measure it)
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        gsap.killTweensOf(fixedWrapper);
        gsap.set(fixedWrapper, {
          left: isMobile ? '20%' : '24%',
          top: isMobile ? '12%' : '50%',
          width: 'clamp(320px, 30vw, 560px)',
          opacity: 0,
          visibility: 'visible'
        });

        // Measure actual float containers (which include translateY translation)
        const staticRect = staticFloat.getBoundingClientRect();
        const fixedRect = fixedFloat.getBoundingClientRect();

        const deltaX = staticRect.left - fixedRect.left;
        const deltaY = staticRect.top - fixedRect.top;

        // Apply compensation to fixed logo visual
        gsap.set(fixedVisual, {
          x: deltaX,
          y: deltaY
        });

        // Show fixed logo wrapper (opacity 1) and hide static logo wrapper in the same frame
        gsap.set(fixedWrapper, {
          opacity: 1,
          visibility: 'visible'
        });
        gsap.set(staticWrapper, {
          opacity: 0,
          visibility: 'hidden'
        });

        // Switch the handoff state to false (shows fixed, hides static in React)
        setIsHandoffToStatic(false);

        // Animate compensation away on the fixed logo visual
        if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
          gsap.to(fixedVisual, {
            x: 0,
            y: 0,
            duration: 0.18,
            ease: "power2.out",
            onComplete: () => {
              if (fixedFloat) {
                fixedFloat.classList.remove('is-handoff');
              }
            }
          });
        } else {
          gsap.set(fixedVisual, { x: 0, y: 0 });
          requestAnimationFrame(() => {
            if (fixedFloat) {
              fixedFloat.classList.remove('is-handoff');
            }
          });
        }
      } else {
        setIsHandoffToStatic(false);
      }
    } else {
      // Normal handoff logic (non-adjacent and adjacent jumps)
      if (index >= 3) {
        setIsHandoffToStatic(true);
      } else if (index <= 1 && from >= 2) {
        setIsHandoffToStatic(false);
      } else if (from === 2 && index === 1) {
        setIsHandoffToStatic(false);
      }
    }

    gsap.to(containerRef.current, {
      y: -index * 100 + 'vh',
      duration: 1.3,
      ease: 'power3.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
        
        // Handoff to static: when we arrive at Approach (2) from above
        if (index === 2) {
          // FLIP Handoff (Forward)
          const fixedVisual = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-visual');
          const staticVisual = document.querySelector('.approach-static-logo-wrap .sirin-logo-visual');
          const fixedWrapper = document.querySelector('.sirin-logo-wrapper.fixed');
          const fixedFloat = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-float');
          const staticFloat = document.querySelector('.approach-static-logo-wrap .sirin-logo-float');
          const staticWrapper = document.querySelector('.approach-static-logo-wrap');

          if (fixedFloat) {
            fixedFloat.classList.add('is-handoff');
          }
          if (staticFloat) {
            staticFloat.classList.add('is-handoff');
          }

          if (fixedVisual && staticVisual && fixedWrapper && staticWrapper && fixedFloat && staticFloat) {
            // First, make static logo wrapper visible but opacity 0 to layout it correctly for client rects
            gsap.set(staticWrapper, {
              visibility: 'visible',
              opacity: 0
            });

            // Measure actual float containers (which include translateY translation)
            const fixedRect = fixedFloat.getBoundingClientRect();
            const staticRect = staticFloat.getBoundingClientRect();

            const deltaX = fixedRect.left - staticRect.left;
            const deltaY = fixedRect.top - staticRect.top;

            // Compensate static logo visual
            gsap.set(staticVisual, {
              x: deltaX,
              y: deltaY
            });

            // Show static logo wrapper, hide fixed logo wrapper in the same frame
            gsap.set(staticWrapper, {
              opacity: 1,
              visibility: 'visible'
            });
            gsap.set(fixedWrapper, {
              opacity: 0,
              visibility: 'hidden'
            });

            // Toggle handoff state to true (shows static logo in React)
            setIsHandoffToStatic(true);

            // Animate compensation away on static logo visual
            if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
              gsap.to(staticVisual, {
                x: 0,
                y: 0,
                duration: 0.18,
                ease: "power2.out",
                onComplete: () => {
                  if (fixedFloat) {
                    fixedFloat.classList.remove('is-handoff');
                  }
                  if (staticFloat) {
                    staticFloat.classList.remove('is-handoff');
                  }
                }
              });
            } else {
              gsap.set(staticVisual, { x: 0, y: 0 });
              requestAnimationFrame(() => {
                if (fixedFloat) {
                  fixedFloat.classList.remove('is-handoff');
                }
                if (staticFloat) {
                  staticFloat.classList.remove('is-handoff');
                }
              });
            }
          } else {
            setIsHandoffToStatic(true);
          }
        }
      },
    });

    setActiveIndex(index);
    activeIndexRef.current = index;
  };

  const goFromBelowPricingToAbout = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // 1. Prepare fixed logo wrapper exactly at pricing anchor coordinates synchronously in DOM
    const fixedWrapper = document.querySelector('.sirin-logo-wrapper.fixed');
    const fixedVisual = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-visual');
    const fixedFloat = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-float');
    const staticWrapper = document.querySelector('.approach-static-logo-wrap');

    if (fixedWrapper && fixedVisual) {
      if (fixedFloat) {
        fixedFloat.classList.add('is-handoff');
      }

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      gsap.killTweensOf(fixedWrapper);
      
      gsap.set(fixedWrapper, {
        left: isMobile ? '20%' : '24%',
        top: isMobile ? '12%' : '50%',
        width: 'clamp(320px, 30vw, 560px)',
        opacity: 1,
        visibility: 'visible'
      });

      gsap.set(fixedVisual, { x: 0, y: 0 });

      const pricingScale = isMobile ? 0.32 : 0.94;
      const pricingRotateY = isMobile ? 0 : 32;
      const pricingRotateX = isMobile ? 0 : 4;
      const pricingSkewX = isMobile ? 0 : 2;
      const pricingScaleX = isMobile ? 1 : 0.92;

      fixedWrapper.style.transform = `
        translate(-50%, -50%)
        perspective(1200px)
        rotateY(${pricingRotateY}deg)
        rotateX(${pricingRotateX}deg)
        skewX(${pricingSkewX}deg)
        scaleX(${pricingScaleX})
        scale(${pricingScale})
      `;
    }

    if (staticWrapper) {
      gsap.set(staticWrapper, {
        opacity: 0,
        visibility: 'hidden'
      });
    }

    setIsHandoffToStatic(false);

    // 2. Start container page slide transition to About (1)
    gsap.to(containerRef.current, {
      y: -1 * 100 + 'vh',
      duration: 1.3,
      ease: 'power3.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
        if (fixedFloat) {
          fixedFloat.classList.remove('is-handoff');
        }
      }
    });

    setActiveIndex(1);
    activeIndexRef.current = 1;
  };

  const goFromBelowPricingToHero = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // 1. Prepare fixed logo wrapper exactly at pricing anchor coordinates synchronously in DOM
    const fixedWrapper = document.querySelector('.sirin-logo-wrapper.fixed');
    const fixedVisual = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-visual');
    const fixedFloat = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-float');
    const staticWrapper = document.querySelector('.approach-static-logo-wrap');

    if (fixedWrapper && fixedVisual) {
      if (fixedFloat) {
        fixedFloat.classList.add('is-handoff');
      }

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      gsap.killTweensOf(fixedWrapper);
      
      gsap.set(fixedWrapper, {
        left: isMobile ? '20%' : '24%',
        top: isMobile ? '12%' : '50%',
        width: 'clamp(320px, 30vw, 560px)',
        opacity: 1,
        visibility: 'visible'
      });

      gsap.set(fixedVisual, { x: 0, y: 0 });

      const pricingScale = isMobile ? 0.32 : 0.94;
      const pricingRotateY = isMobile ? 0 : 32;
      const pricingRotateX = isMobile ? 0 : 4;
      const pricingSkewX = isMobile ? 0 : 2;
      const pricingScaleX = isMobile ? 1 : 0.92;

      fixedWrapper.style.transform = `
        translate(-50%, -50%)
        perspective(1200px)
        rotateY(${pricingRotateY}deg)
        rotateX(${pricingRotateX}deg)
        skewX(${pricingSkewX}deg)
        scaleX(${pricingScaleX})
        scale(${pricingScale})
      `;
    }

    if (staticWrapper) {
      gsap.set(staticWrapper, {
        opacity: 0,
        visibility: 'hidden'
      });
    }

    setIsHandoffToStatic(false);

    // 2. Start container page slide transition to Hero (0)
    gsap.to(containerRef.current, {
      y: 0,
      duration: 1.3,
      ease: 'power3.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
        if (fixedFloat) {
          fixedFloat.classList.remove('is-handoff');
        }
      }
    });

    setActiveIndex(0);
    activeIndexRef.current = 0;
  };

  const handleNavClick = (targetIndex) => {
    if (isAnimatingRef.current) return;

    const isBelowPricing = activeIndexRef.current >= 3;

    // Из Portfolio / Contacts наверх в About
    if (isBelowPricing && targetIndex === 1) {
      goFromBelowPricingToAbout();
      return;
    }

    // Из Portfolio / Contacts наверх в Hero
    if (isBelowPricing && targetIndex === 0) {
      goFromBelowPricingToHero();
      return;
    }

    if (targetIndex === 3) {
      goToPortfolio();
    } else if (targetIndex === 4) {
      goToContacts();
    } else {
      goToSection(targetIndex, { source: 'nav' });
    }
  };

  const handleLogoHomeClick = () => {
    if (activeIndexRef.current >= 3) {
      goFromBelowPricingToHero();
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
