import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

export default function AnimatedSirinLogo({ activeIndex, isHandoffToStatic }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');

  // Fetch the SVG file from public directory
  useEffect(() => {
    fetch('/sirin_symbol_animated_ready.svg')
      .then((res) => res.text())
      .then((data) => {
        setSvgContent(data);
      });
  }, []);

  useEffect(() => {
    if (!svgContent) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Explicit states configuration
    const logoStates = {
      hero: {
        left: '50%',
        top: isMobile ? '43%' : '42%',
        width: isMobile ? 'clamp(220px, 22vw, 420px)' : 'clamp(420px, 38vw, 760px)',
        scale: isMobile ? 1.05 : 1,
        rotateY: 0,
        rotateX: 0,
        skewX: 0,
        scaleX: 1,
        autoAlpha: 1
      },
      about: {
        left: isMobile ? '80%' : '74%',
        top: isMobile ? '12%' : '50%',
        width: 'clamp(220px, 22vw, 420px)',
        scale: 1,
        rotateY: isMobile ? 0 : -32,
        rotateX: isMobile ? 0 : 4,
        skewX: isMobile ? 0 : -2,
        scaleX: isMobile ? 1 : 0.92,
        autoAlpha: isMobile ? 0.7 : 1
      },
      approach: {
        left: isMobile ? '20%' : '24%',
        top: isMobile ? '12%' : '50%',
        width: 'clamp(220px, 22vw, 420px)',
        scale: isMobile ? 0.32 : 0.62,
        rotateY: isMobile ? 0 : 32,
        rotateX: isMobile ? 0 : 4,
        skewX: isMobile ? 0 : 2,
        scaleX: isMobile ? 1 : 0.92,
        autoAlpha: isMobile ? 0.7 : 1
      }
    };

    // Cap logo visibility: after index 2 (Approach), fade logo out completely
    let state = logoStates.hero;
    if (activeIndex === 1) {
      state = logoStates.about;
    } else if (activeIndex >= 2) {
      state = logoStates.approach;
    }

    const isHandoffChange = activeIndex === 2 && isHandoffToStatic;

    // Transition the logo to its target state
    gsap.to(wrapper, {
      left: state.left,
      top: state.top,
      width: state.width,
      scale: state.scale,
      rotationY: state.rotateY,
      rotationX: state.rotateX,
      skewX: state.skewX,
      scaleX: state.scaleX,
      autoAlpha: isHandoffToStatic ? 0 : state.autoAlpha,
      duration: isHandoffChange ? 0 : 1.3,
      ease: 'power3.inOut',
    });
  }, [activeIndex, svgContent, isHandoffToStatic]);

  // Independent eye blinking loop
  useEffect(() => {
    if (!svgContent) return;
    const container = containerRef.current;
    if (!container) return;

    const leftEye = container.querySelector('#left-eye');
    const rightEye = container.querySelector('#right-eye');

    if (leftEye && rightEye) {
      gsap.set([leftEye, rightEye], { transformOrigin: '50% 50%' });
    }

    let blinkTimeout;
    const playBlink = () => {
      if (!leftEye || !rightEye) return;
      const blinkTimeline = gsap.timeline({
        onComplete: () => {
          const delay = gsap.utils.random(3.5, 6.5);
          blinkTimeout = setTimeout(playBlink, delay * 1000);
        }
      });
      blinkTimeline
        .to([leftEye, rightEye], {
          scaleY: 0.05,
          duration: 0.1,
          ease: 'power2.inOut',
        })
        .to([leftEye, rightEye], {
          scaleY: 1,
          duration: 0.15,
          ease: 'power2.inOut',
          delay: 0.07,
        });
    };

    const startDelay = gsap.utils.random(2, 4);
    blinkTimeout = setTimeout(playBlink, startDelay * 1000);

    return () => {
      clearTimeout(blinkTimeout);
    };
  }, [svgContent]);

  const isMobileInitial = typeof window !== 'undefined' && window.innerWidth <= 768;

  const logoEl = (
    <div
      ref={wrapperRef}
      className="sirin-logo-wrapper fixed pointer-events-none z-40 flex items-center justify-center select-none"
      style={{
        left: '50%',
        top: isMobileInitial ? '43%' : '42%',
        width: isMobileInitial ? 'clamp(220px, 22vw, 420px)' : 'clamp(420px, 38vw, 760px)',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        perspective: 1200,
        transformStyle: 'preserve-3d',
        opacity: svgContent ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <div className="sirin-logo-float">
        <div 
          ref={containerRef}
          className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(logoEl, document.body);
  }
  return logoEl;
}
