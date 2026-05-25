import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

const SECTION_LOGO_SIZE = "clamp(320px, 30vw, 560px)";
const SECTION_LOGO_SCALE = 0.94;
const SECTION_LOGO_ROTATE_X = 4;
const SECTION_LOGO_SCALE_X = 0.92;

const APPROACH_LOGO_STATE = {
  left: "20%",
  top: "50%",
  width: SECTION_LOGO_SIZE,
  scale: SECTION_LOGO_SCALE,
  rotateY: 32,
  rotateX: SECTION_LOGO_ROTATE_X,
  skewX: 2,
  scaleX: SECTION_LOGO_SCALE_X,
  opacity: 1
};

function buildLogoTransform(state) {
  return `
    translate(-50%, -50%)
    scale(${state.scale})
    perspective(1200px)
    rotateY(${state.rotateY}deg)
    rotateX(${state.rotateX}deg)
    skewX(${state.skewX}deg)
    scaleX(${state.scaleX})
  `;
}

export default function AnimatedSirinLogo({ activeIndex, isHandoffToStatic, isDirectPortfolioJump }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const prevHandoffRef = useRef(isHandoffToStatic);

  // Refs to track current transform state across renders
  const currentScaleRef = useRef(1);
  const currentRotateYRef = useRef(0);
  const currentRotateXRef = useRef(0);
  const currentSkewXRef = useRef(0);
  const currentScaleXRef = useRef(1);

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

    if (isDirectPortfolioJump) {
      gsap.to(wrapper, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.45,
        ease: 'power2.out',
      });
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Resolve approach state dynamically
    const approachState = {
      ...APPROACH_LOGO_STATE,
      left: isMobile ? "20%" : APPROACH_LOGO_STATE.left,
      top: isMobile ? "12%" : APPROACH_LOGO_STATE.top,
      scale: isMobile ? 0.32 : APPROACH_LOGO_STATE.scale,
      rotateY: isMobile ? 0 : APPROACH_LOGO_STATE.rotateY,
      rotateX: isMobile ? 0 : APPROACH_LOGO_STATE.rotateX,
      skewX: isMobile ? 0 : APPROACH_LOGO_STATE.skewX,
      scaleX: isMobile ? 1 : APPROACH_LOGO_STATE.scaleX,
    };

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
        left: isMobile ? '80%' : '78%',
        top: isMobile ? '12%' : '50%',
        width: SECTION_LOGO_SIZE,
        scale: isMobile ? 0.32 : SECTION_LOGO_SCALE,
        rotateY: isMobile ? 0 : -32,
        rotateX: isMobile ? 0 : SECTION_LOGO_ROTATE_X,
        skewX: isMobile ? 0 : -2,
        scaleX: isMobile ? 1 : SECTION_LOGO_SCALE_X,
        autoAlpha: 1
      },
      approach: approachState
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

    const isHandoffChange = activeIndex === 2 && isHandoffToStatic;
    const duration = isHandoffChange ? 0 : (isReverseHandoff ? 1.1 : 1.3);

    if (isReverseHandoff) {
      // 1. Поставить fixed logo в точное approach-состояние
      gsap.set(wrapper, {
        left: approachState.left,
        top: approachState.top,
        width: approachState.width,
        autoAlpha: 1
      });

      wrapper.style.transform = buildLogoTransform(approachState);

      // Sync refs to match approach state
      currentScaleRef.current = approachState.scale;
      currentRotateYRef.current = approachState.rotateY;
      currentRotateXRef.current = approachState.rotateX;
      currentSkewXRef.current = approachState.skewX;
      currentScaleXRef.current = approachState.scaleX;
    }

    // 2. Анимируем layout свойства на wrapper
    gsap.to(wrapper, {
      left: state.left,
      top: state.top,
      width: state.width,
      autoAlpha: isHandoffToStatic ? 0 : state.autoAlpha,
      duration: duration,
      ease: 'power3.inOut',
    });

    // 3. Анимируем 3D свойства на animObject
    const animObject = {
      scale: currentScaleRef.current,
      rotateY: currentRotateYRef.current,
      rotateX: currentRotateXRef.current,
      skewX: currentSkewXRef.current,
      scaleX: currentScaleXRef.current,
    };

    gsap.to(animObject, {
      scale: state.scale,
      rotateY: state.rotateY,
      rotateX: state.rotateX,
      skewX: state.skewX,
      scaleX: state.scaleX,
      duration: duration,
      ease: 'power3.inOut',
      onUpdate: () => {
        currentScaleRef.current = animObject.scale;
        currentRotateYRef.current = animObject.rotateY;
        currentRotateXRef.current = animObject.rotateX;
        currentSkewXRef.current = animObject.skewX;
        currentScaleXRef.current = animObject.scaleX;
        wrapper.style.transform = buildLogoTransform(animObject);
      }
    });

  }, [activeIndex, svgContent, isHandoffToStatic, isDirectPortfolioJump]);

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
