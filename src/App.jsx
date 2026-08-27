import React from 'react';
import { useRig } from './lib/useRig.js';
import { BackgroundCanvas } from './components/BackgroundCanvas.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { Services } from './components/Services.jsx';
import { Process } from './components/Process.jsx';
import { Work } from './components/Work.jsx';
import { TechStack } from './components/TechStack.jsx';
import { Testimonials } from './components/Testimonials.jsx';
import { Guarantees } from './components/Guarantees.jsx';
import { Contact } from './components/Contact.jsx';
import { FinalCTA } from './components/FinalCTA.jsx';
import { Footer } from './components/Footer.jsx';
import { PERSONAL_INFO } from './lib/data.js';

export const App = () => {
  const { scrollY, smoothScroll } = useRig();

  return (
    <div className="relative min-h-screen bg-[#070516] text-[#f6f4ff] selection:bg-[#7c5cff]/30 selection:text-white">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Procedural 3D Background */}
      <BackgroundCanvas />

      {/* Fixed Sticky Header */}
      <Header scrollY={scrollY} />

      {/* Main Content */}
      <main id="main-content" className="relative z-main">
        <Hero smoothScroll={smoothScroll} />
        <Services />
        <Process />
        <Work />
        <TechStack />
        <Testimonials />
        <Guarantees />
        <Contact />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating CTA Bar */}
      <div className="mobile-cta-bar">
        <a href="#contact" className="w-full btn-pill !h-11 !text-[13px] !rounded-xl text-center">
          Book Consultation
        </a>
      </div>
    </div>
  );
};

export default App;
