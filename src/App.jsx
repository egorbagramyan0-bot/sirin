import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import Header from './components/Header';
import AnimatedSirinLogo from './components/AnimatedSirinLogo';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';

gsap.registerPlugin(Observer);

function PageTransitionOverlay({ overlayRef, logoRef, lineRef }) {
  return (
    <div 
      ref={overlayRef} 
      className="page-transition"
    >
      <div className="page-transition-grid" />
      <div className="page-transition-logo-wrap">
        <img ref={logoRef} src="/sirin_symbol_only.svg" alt="SIRIN" />
        <div ref={lineRef} className="page-transition-line" />
      </div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHandoffToStatic, setIsHandoffToStatic] = useState(false);
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  const overlayRef = useRef(null);
  const transitionLogoRef = useRef(null);
  const transitionLineRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const isAtPortfolio = location.pathname === '/portfolio';

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Adjust scrollable settings on html/body for portfolio vs homepage
  useEffect(() => {
    if (isAtPortfolio) {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      document.documentElement.style.height = 'auto';
      document.body.style.height = 'auto';
      
      // Set state to Footer/below pricing index so logo transition knows where to start when returning
      setActiveIndex(3);
      setIsHandoffToStatic(true);
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      
      // Reset scroll position when returning to homepage
      window.scrollTo(0, 0);
    }
  }, [isAtPortfolio]);

  // Handle hash changes / redirects from portfolio page
  useEffect(() => {
    if (location.pathname === '/') {
      const hash = location.hash;
      if (hash) {
        let targetIndex = -1;
        if (hash === '#hero') targetIndex = 0;
        else if (hash === '#about') targetIndex = 1;
        else if (hash === '#pricing') targetIndex = 2;
        else if (hash === '#contacts') targetIndex = 3;

        if (targetIndex !== -1) {
          // Temporarily ensure logo is unhidden if we navigate back to top sections
          if (targetIndex < 2) {
            setIsLogoHidden(false);
            setIsHandoffToStatic(false);
          } else {
            setIsHandoffToStatic(true);
          }
          
          setTimeout(() => {
            goToSection(targetIndex, { source: 'route-hash', instant: true });
            window.history.replaceState(null, '', window.location.pathname);
          }, 150);
        }
      }
    }
  }, [location.pathname, location.hash]);

  const playTransitionIn = () => {
    return new Promise((resolve) => {
      // Lock scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const tl = gsap.timeline({ onComplete: resolve });
      tl.set(overlayRef.current, { visibility: 'visible', pointerEvents: 'auto' })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out'
        })
        .fromTo(transitionLogoRef.current, 
          { y: 15, scale: 0.94 },
          { y: 0, scale: 1, duration: 0.45, ease: 'power2.out' },
          0
        )
        .fromTo(transitionLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: 'power2.out' },
          0
        );
    });
  };

  const playTransitionOut = () => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: 'hidden', pointerEvents: 'none' });
          // Restore scroll only if not on homepage
          if (location.pathname === '/portfolio') {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
          } else {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
          }
          resolve();
        }
      });
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.55,
        ease: 'power2.inOut'
      })
      .to(transitionLogoRef.current, {
        y: -12,
        scale: 1.04,
        duration: 0.55,
        ease: 'power2.inOut'
      }, 0)
      .to(transitionLineRef.current, {
        scaleX: 0,
        duration: 0.55,
        ease: 'power2.inOut'
      }, 0);
    });
  };

  const transitionToRoute = async (path) => {
    if (isPageTransitioning) return;
    setIsPageTransitioning(true);
    await playTransitionIn();
    navigate(path);
    // Delay to let the page mount/render
    await new Promise(r => setTimeout(r, 450));
    await playTransitionOut();
    setIsPageTransitioning(false);
  };

  const transitionToHomeSection = async (sectionIndex) => {
    if (isPageTransitioning) return;
    setIsPageTransitioning(true);
    await playTransitionIn();
    
    const hashMap = {
      0: "#hero",
      1: "#about",
      2: "#pricing",
      3: "#contacts"
    };
    
    navigate("/" + hashMap[sectionIndex]);
    
    // Delay to let the page mount/render
    await new Promise(r => setTimeout(r, 500));
    await playTransitionOut();
    setIsPageTransitioning(false);
  };

  const goToSection = (index, options = { source: 'scroll' }) => {
    if (index < 0 || index > 3) return;
    if (options.source === 'route-hash') {
      isAnimatingRef.current = false;
    }
    if (index === activeIndexRef.current && options.source !== 'route-hash') return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const from = activeIndexRef.current;

    if (index < 2) {
      setIsLogoHidden(false);
    }

    // Determine if this is a reverse handoff (leaving pricing/footer to go to about/hero)
    const isReverseHandoff = from >= 2 && index < 2;

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

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        gsap.killTweensOf(fixedWrapper);
        gsap.set(fixedWrapper, {
          left: isMobile ? '20%' : '24%',
          top: isMobile ? '12%' : '50%',
          width: 'clamp(320px, 30vw, 560px)',
          opacity: 0,
          visibility: 'visible'
        });

        // Measure actual float containers
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

        // Switch the handoff state to false
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
      // Normal handoff logic
      // For forward handoff About→Pricing (from < 2 to exactly index 2):
      // Do NOT set isHandoffToStatic here — keep fixed logo visible during scroll animation.
      // The FLIP handoff will happen in onComplete after the scroll finishes.
      const isForwardHandoff = from < 2 && index === 2;
      if (!isForwardHandoff) {
        if (index >= 2) {
          setIsHandoffToStatic(true);
        } else {
          setIsHandoffToStatic(false);
        }
      }
      // For forward handoff to Pricing, isHandoffToStatic stays false so the fixed logo 
      // keeps animating to pricing position via AnimatedSirinLogo.
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: -index * 100 + 'vh',
        duration: options.instant ? 0 : 1.3,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimatingRef.current = false;
          
          // Handoff to static: when we arrive at Pricing (2) from About or Hero
          if (index === 2 && from < 2) {
            const fixedVisual = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-visual');
            const staticVisual = document.querySelector('.approach-static-logo-wrap .sirin-logo-visual');
            const fixedWrapper = document.querySelector('.sirin-logo-wrapper.fixed');
            const fixedFloat = document.querySelector('.sirin-logo-wrapper.fixed .sirin-logo-float');
            const staticFloat = document.querySelector('.approach-static-logo-wrap .sirin-logo-float');
            const staticWrapper = document.querySelector('.approach-static-logo-wrap');

            if (fixedVisual && staticVisual && fixedWrapper && staticWrapper && fixedFloat && staticFloat) {
              // 1. Kill any ongoing GSAP animations on the fixed logo so it stops exactly where it is
              gsap.killTweensOf(fixedWrapper);

              // 2. Pause float CSS animations for precise measurements
              fixedFloat.classList.add('is-handoff');
              staticFloat.classList.add('is-handoff');

              // 3. Force-snap fixed logo to its exact final pricing position
              //    This eliminates timing drift between scroll and logo animations
              const isMobile = window.matchMedia('(max-width: 768px)').matches;
              const finalLeft = isMobile ? '20%' : '24%';
              const finalTop = isMobile ? '12%' : '50%';
              const finalScale = isMobile ? 0.32 : 0.94;
              const finalRotateY = isMobile ? 0 : 32;
              const finalRotateX = isMobile ? 0 : 4;
              const finalSkewX = isMobile ? 0 : 2;
              const finalScaleX = isMobile ? 1 : 0.92;

              gsap.set(fixedWrapper, {
                left: finalLeft,
                top: finalTop,
                width: 'clamp(320px, 30vw, 560px)',
                autoAlpha: 1
              });
              fixedWrapper.style.transform = `
                translate(-50%, -50%)
                perspective(1200px)
                rotateY(${finalRotateY}deg)
                rotateX(${finalRotateX}deg)
                skewX(${finalSkewX}deg)
                scaleX(${finalScaleX})
                scale(${finalScale})
              `;

              // 4. Make static wrapper visible for measurement
              gsap.set(staticWrapper, {
                visibility: 'visible',
                opacity: 1
              });

              // 5. Measure both logos' actual screen positions (synchronous — no rAF delay)
              const fixedRect = fixedFloat.getBoundingClientRect();
              const staticRect = staticFloat.getBoundingClientRect();

              const deltaX = fixedRect.left - staticRect.left;
              const deltaY = fixedRect.top - staticRect.top;

              // 6. Apply delta to static logo so it appears exactly where fixed logo is
              gsap.set(staticVisual, {
                x: deltaX,
                y: deltaY
              });

              // 7. Swap: show static, hide fixed (instant, same paint frame)
              gsap.set(fixedWrapper, {
                autoAlpha: 0
              });

              // 8. Mark handoff complete
              setIsHandoffToStatic(true);

              // 9. Animate delta compensation away for smooth settle
              if (options.instant) {
                gsap.set(staticVisual, { x: 0, y: 0 });
                fixedFloat.classList.remove('is-handoff');
                staticFloat.classList.remove('is-handoff');
              } else if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
                gsap.to(staticVisual, {
                  x: 0,
                  y: 0,
                  duration: 0.25,
                  ease: 'power2.out',
                  onComplete: () => {
                    fixedFloat.classList.remove('is-handoff');
                    staticFloat.classList.remove('is-handoff');
                  }
                });
              } else {
                gsap.set(staticVisual, { x: 0, y: 0 });
                fixedFloat.classList.remove('is-handoff');
                staticFloat.classList.remove('is-handoff');
              }
            } else {
              setIsHandoffToStatic(true);
            }
          }
        },
      });
    }

    setActiveIndex(index);
    activeIndexRef.current = index;
  };

  const handleNavClick = (targetIndex) => {
    if (activeIndexRef.current === 3 && targetIndex === 1) {
      setIsLogoHidden(false);
      goToSection(1, { source: 'nav' });
    } else if (activeIndexRef.current === 3 && targetIndex === 0) {
      setIsLogoHidden(false);
      goToSection(0, { source: 'nav' });
    } else {
      goToSection(targetIndex, { source: 'nav' });
    }
  };

  const handleLogoHomeClick = () => {
    if (activeIndexRef.current === 3) {
      setIsLogoHidden(false);
      goToSection(0, { source: 'nav' });
    } else {
      goToSection(0, { source: 'nav' });
    }
  };

  const handlePortfolioNavigation = () => {
    transitionToRoute('/portfolio');
  };

  useEffect(() => {
    if (isAtPortfolio) return;

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
        if (activeIndexRef.current < 3) {
          goToSection(activeIndexRef.current + 1, { source: 'scroll' });
        }
      },
    });

    return () => observer.kill();
  }, [isAtPortfolio]);

  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'about', label: 'О студии' },
    { id: 'approach', label: 'Цены' },
    { id: 'footer', label: 'Контакты' },
  ];

  return (
    <div id="app-container" className="relative w-full h-screen overflow-hidden bg-white">
      {/* fixed global layers */}
      <Header 
        onNavigate={handleNavClick} 
        onLogoClick={handleLogoHomeClick}
        activeIndex={activeIndex}
        onTransitionToRoute={transitionToRoute}
        onTransitionToHomeSection={transitionToHomeSection}
      />
      
      <AnimatedSirinLogo 
        activeIndex={activeIndex} 
        isHandoffToStatic={isHandoffToStatic} 
        isLogoHidden={isLogoHidden || isAtPortfolio}
      />

      <PageTransitionOverlay 
        overlayRef={overlayRef}
        logoRef={transitionLogoRef}
        lineRef={transitionLineRef}
      />

      {/* Vertical Section Indicator (Right Side) */}
      {!isAtPortfolio && (
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
      )}

      {/* routing views */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              containerRef={containerRef}
              isHandoffToStatic={isHandoffToStatic}
              isLogoHidden={isLogoHidden}
              handleNavClick={handleNavClick}
              handlePortfolioNavigation={handlePortfolioNavigation}
            />
          } 
        />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </div>
  );
}
