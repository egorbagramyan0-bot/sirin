import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && 
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
       window.matchMedia('(max-width: 768px)').matches);

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.1, // Snappy scroll feedback
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isMobile, // Disable on mobile to prevent laggy double-smoothing
      wheelMultiplier: 1,
      smoothTouch: false, // Let mobile touch screens use hardware native scrolling
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    // Update ScrollTrigger on scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Integrate with GSAP ticker
    const updatePhysics = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);

    // Disable lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(updatePhysics);
    };
  }, []);
}
