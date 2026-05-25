import React from 'react';
import { Target, Gem, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative w-full h-screen flex items-center justify-center px-8 md:px-16 bg-white border-t border-brand-light-gray flex-shrink-0 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center max-w-xl">
          <span className="font-display text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-gray uppercase mb-6 block">
            ABOUT SIRIN
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-brand-black leading-tight mb-8">
            Designing the future<br />of the web.
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-gray leading-relaxed mb-12">
            SIRIN is a premium web design studio focused on building digital experiences that blend strategy, aesthetics, and technology.
          </p>

          <hr className="border-brand-silver/50 mb-10 w-24" />

          {/* List of Features */}
          <div className="flex flex-col gap-8">
            {/* Feature 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-silver/60 flex items-center justify-center text-brand-black">
                <Target className="w-5 h-5 stroke-[1.25]" />
              </div>
              <div>
                <h3 className="font-display font-medium text-sm md:text-base tracking-[0.1em] text-brand-black mb-1.5 uppercase">
                  Strategy-led design
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-gray">
                  We align business goals with user needs.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-silver/60 flex items-center justify-center text-brand-black">
                <Gem className="w-5 h-5 stroke-[1.25]" />
              </div>
              <div>
                <h3 className="font-display font-medium text-sm md:text-base tracking-[0.1em] text-brand-black mb-1.5 uppercase">
                  Refined aesthetics
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-gray">
                  Minimal, Timeless, Purposeful.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-silver/60 flex items-center justify-center text-brand-black">
                <Zap className="w-5 h-5 stroke-[1.25]" />
              </div>
              <div>
                <h3 className="font-display font-medium text-sm md:text-base tracking-[0.1em] text-brand-black mb-1.5 uppercase">
                  Performance focused
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-gray">
                  Fast, accessible, and built to scale.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Spacer for Floating Animated Logo */}
        <div className="flex lg:flex items-center justify-center h-[120px] lg:h-[500px]">
          {/* Logo lands here automatically via fixed position animation */}
        </div>
      </div>
    </section>
  );
}
