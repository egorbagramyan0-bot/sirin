import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CentralBrandLogo from './components/CentralBrandLogo';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [pendingScrollIndex, setPendingScrollIndex] = useState(null);

  const containerRef = useRef(null);
  const activeIndexRef = useRef(0);

  // Router popstate listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle pending scroll index on Home page load/navigation
  useEffect(() => {
    if (currentPath === '/' && pendingScrollIndex !== null) {
      const timer = setTimeout(() => {
        goToSection(pendingScrollIndex);
        setPendingScrollIndex(null);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [currentPath, pendingScrollIndex]);

  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Ensure scrollable
  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
  }, []);

  const goToSection = (index) => {
    if (index < 0 || index > 4) return;

    const sections = ['#hero', '#about', '#approach', '#portfolio', '#contacts'];
    const targetSelector = sections[index];
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (targetIndex) => {
    if (typeof targetIndex === 'string') {
      // Handle path navigation directly (e.g. from footer link)
      window.history.pushState({}, '', targetIndex);
      setCurrentPath(targetIndex);
      window.scrollTo(0, 0);
    } else {
      if (window.location.pathname !== '/') {
        setPendingScrollIndex(targetIndex);
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      } else {
        goToSection(targetIndex);
      }
    }
  };

  const handleLogoHomeClick = () => {
    if (window.location.pathname !== '/') {
      setPendingScrollIndex(0);
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    } else {
      goToSection(0);
    }
  };

  const handleNavigatePath = (path, targetIndex = null) => {
    if (path === '/') {
      if (targetIndex !== null) {
        setPendingScrollIndex(targetIndex);
      } else {
        setPendingScrollIndex(0);
      }
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handlePortfolioNavigation = () => {
    goToSection(3);
  };

  // ScrollTrigger for active section tracking
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sectionsToTrack = [
        { id: "#hero", index: 0 },
        { id: "#about", index: 1 },
        { id: "#approach", index: 2 },
        { id: "#portfolio", index: 3 },
        { id: "#contacts", index: 4 },
        { id: "#footer", index: 4 }
      ];

      sectionsToTrack.forEach(({ id, index }) => {
        ScrollTrigger.create({
          trigger: id,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
            }
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const sections = [
    { id: 'hero', label: 'Главная' },
    { id: 'about', label: 'О студии' },
    { id: 'approach', label: 'Цены' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'contacts', label: 'Контакты' },
  ];

  if (currentPath === '/privacy-policy') {
    return (
      <div id="app-container" className="relative w-full min-h-screen bg-white">
        <Header 
          onNavigate={handleNavClick} 
          onLogoClick={handleLogoHomeClick}
          activeIndex={-1}
        />
        <PrivacyPolicyPage onNavigate={handleNavigatePath} />
      </div>
    );
  }

  return (
    <div id="app-container" className="relative w-full min-h-screen bg-white">
      {/* fixed global layers */}
      <Header 
        onNavigate={handleNavClick} 
        onLogoClick={handleLogoHomeClick}
        activeIndex={activeIndex}
      />
      
      {/* Central Brand Logo fixed overlay */}
      <CentralBrandLogo />

      {/* Vertical Section Indicator (Right Side) */}
      <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-5 items-center select-none mix-blend-difference">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => goToSection(idx)}
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

      {/* Main content — single page, no routing */}
      <HomePage 
        containerRef={containerRef}
        handleNavClick={handleNavClick}
        handlePortfolioNavigation={handlePortfolioNavigation}
      />
    </div>
  );
}
