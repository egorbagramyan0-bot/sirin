import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CentralBrandLogo() {
  const symbolWrapRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions;

      if (isDesktop) {
        const trigger = ScrollTrigger.create({
          trigger: document.body,
          start: "160px top",
          onEnter: () => {
            gsap.killTweensOf(symbolWrapRef.current);
            gsap.to(symbolWrapRef.current, {
              opacity: 0.12,
              filter: "blur(3px) drop-shadow(0 26px 44px rgba(0, 0, 0, 0.06))",
              scale: 1.04,
              y: 50,
              duration: 0.55,
              ease: "power2.out",
              overwrite: true
            });
          },
          onLeaveBack: () => {
            gsap.killTweensOf(symbolWrapRef.current);
            gsap.to(symbolWrapRef.current, {
              opacity: 1,
              filter: "blur(0px) drop-shadow(0 26px 44px rgba(0, 0, 0, 0.10))",
              scale: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              overwrite: true
            });
          }
        });

        return () => {
          trigger.kill();
        };
      }

      if (isMobile) {
        const t1 = gsap.to(".mobile-hero-symbol", {
          scrollTrigger: {
            trigger: ".hero-section",
            start: "80px top",
            end: "bottom top",
            scrub: 0.8
          },
          y: 150,
          opacity: 0.10,
          filter: "blur(2px)",
          scale: 1.08,
          ease: "none"
        });

        const t2 = gsap.to(".mobile-hero-wordmark", {
          scrollTrigger: {
            trigger: ".hero-section",
            start: "80px top",
            end: "bottom top",
            scrub: 0.8
          },
          y: 150,
          opacity: 0.12,
          ease: "none"
        });

        return () => {
          t1.scrollTrigger?.kill();
          t2.scrollTrigger?.kill();
        };
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="central-brand">
      <div ref={symbolWrapRef} className="central-symbol-wrap">
        <div className="central-symbol-float">
          <img className="central-symbol" src="/sir.svg" alt="SIRIN" />
        </div>
      </div>
    </div>
  );
}
