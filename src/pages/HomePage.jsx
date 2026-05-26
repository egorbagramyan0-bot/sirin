import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ApproachSection from '../components/ApproachSection';
import PortfolioSection from '../components/PortfolioSection';
import Footer from '../components/Footer';

export default function HomePage({ 
  containerRef, 
  handleNavClick,
  handlePortfolioNavigation 
}) {
  return (
    <div 
      ref={containerRef} 
      className="w-full flex flex-col"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Hero onPortfolioClick={handlePortfolioNavigation} />
      <AboutSection />
      <ApproachSection />
      <PortfolioSection />
      <Footer onNavigate={handleNavClick} />
    </div>
  );
}
