import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="relative py-28 sm:py-36 z-main overflow-hidden border-t border-[rgba(246,244,255,0.06)]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c5cff]/5 to-[#070516] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#7c5cff]" />
            <span>Start A Conversation</span>
          </div>
          <h2 className="type-h2 text-[#f6f4ff] mb-4">Ready to build something great?</h2>
          <p className="type-lead text-[#a09cc4] max-w-xl mx-auto mb-10">
            Let's create something <span className="text-[#7c5cff] font-semibold">Amazing Together</span>. Transform your technical roadmap into high-performance reality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn-pill group" id="final-book-consultation">
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-ghost group" id="final-free-estimate">
              <span>Get a Free Estimate</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
