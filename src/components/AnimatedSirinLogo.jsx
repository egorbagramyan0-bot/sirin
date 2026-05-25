import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

const SECTION_LOGO_SIZE = "clamp(260px, 24vw, 460px)";
const SECTION_LOGO_SCALE = 0.62;
const SECTION_LOGO_ROTATE_X = 4;
const SECTION_LOGO_SCALE_X = 0.92;

export default function AnimatedSirinLogo({ activeIndex, isHandoffToStatic }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const prevHandoffRef = useRef(isHandoffToStatic);

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
        width: isMobile ? 'clamp(220px, 22vw, 420px)' : 'clamp(420px, 42vw, 760px)',
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        skewX: 0,
        scaleX: 1,
        autoAlpha: 1
      },
      about: {
        left: isMobile ? '80%' : '74%',
        top: isMobile ? '12%' : '50%',
        width: SECTION_LOGO_SIZE,
        scale: isMobile ? 0.32 : SECTION_LOGO_SCALE,
        rotateY: isMobile ? 0 : -32,
        rotateX: isMobile ? 0 : SECTION_LOGO_ROTATE_X,
        skewX: isMobile ? 0 : -2,
        scaleX: isMobile ? 1 : SECTION_LOGO_SCALE_X,
        autoAlpha: 1
      },
      approach: {
        left: isMobile ? '20%' : '24%',
        top: isMobile ? '12%' : '50%',
        width: SECTION_LOGO_SIZE,
        scale: isMobile ? 0.32 : SECTION_LOGO_SCALE,
        rotateY: isMobile ? 0 : 32,
        rotateX: isMobile ? 0 : SECTION_LOGO_ROTATE_X,
        skewX: isMobile ? 0 : 2,
        scaleX: isMobile ? 1 : SECTION_LOGO_SCALE_X,
        autoAlpha: 1
      }
    };

    // Cap logo visibility: after index 2 (Approach), fade logo out completely
    let state = logoStates.hero;
    if (activeIndex === 1) {
      state = logoStates.about;
    } else if (activeIndex >= 2) {
      state = logoStates.approach;
    }

    const prevHandoff = prevHandoffRef.current;
    prevHandoffRef.current = isHandoffToStatic;

    const isReverseHandoff = prevHandoff && !isHandoffToStatic;

    if (isReverseHandoff) {
      // 1. Поставить fixed logo в точное approach-состояние
      gsap.set(wrapper, {
        left: logoStates.approach.left,
        top: logoStates.approach.top,
        width: logoStates.approach.width,
        scale: logoStates.approach.scale,
        rotationY: logoStates.approach.rotateY,
        rotationX: logoStates.approach.rotationX,
        skewX: logoStates.approach.skewX,
        scaleX: logoStates.approach.scaleX,
        autoAlpha: 1
      });

      // 2. Плавно запустить перелет в новое целевое состояние (about/hero)
      gsap.to(wrapper, {
        left: state.left,
        top: state.top,
        width: state.width,
        scale: state.scale,
        rotationY: state.rotateY,
        rotationX: state.rotateX,
        skewX: state.skewX,
        scaleX: state.scaleX,
        autoAlpha: state.autoAlpha,
        duration: 1.1,
        ease: 'power3.inOut',
      });
    } else {
      // Regular transition
      const isHandoffChange = activeIndex === 2 && isHandoffToStatic;

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
    }
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
      }}
    >
      <div className="sirin-logo-visual w-full h-full flex items-center justify-center">
        <div className="sirin-logo-float w-full h-full flex items-center justify-center">
          {svgContent ? (
            <div 
              ref={containerRef}
              className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <img src="/sirin_symbol_animated_ready.svg" alt="SIRIN symbol" className="w-full h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)]" />
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(logoEl, document.body);
  }
  return logoEl;
}
