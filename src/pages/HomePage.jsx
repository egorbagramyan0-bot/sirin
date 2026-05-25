import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ApproachSection from '../components/ApproachSection';
import Footer from '../components/Footer';

export default function HomePage({ 
  containerRef, 
  isHandoffToStatic, 
  isLogoHidden, 
  handleNavClick, 
  handlePortfolioNavigation 
}) {
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex flex-col"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Hero onPortfolioClick={handlePortfolioNavigation} />
      <AboutSection />
      <ApproachSection isLogoVisible={isHandoffToStatic && !isLogoHidden} />
      <Footer onNavigate={handleNavClick} />
    </div>
  );
}
