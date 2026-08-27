import React from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../lib/data.js';

export const Hero = ({ smoothScroll }) => {
  // Reduced scroll effect
  const introFactor = Math.min(Math.max((smoothScroll - 80) / 700, 0), 1);
  const heroTranslateY = -introFactor * 60;
  const heroOpacity = Math.max(1 - introFactor * 1.1, 0);
  const heroScale = 1 - introFactor * 0.03;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-10 sm:pt-32 sm:pb-14 overflow-hidden z-main"
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div
          className="flex flex-col lg:flex-row lg:items-center lg:gap-16 will-change-transform"
          style={{
            transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
            opacity: heroOpacity,
            transition: 'transform 0.06s linear, opacity 0.06s linear',
          }}
        >
          {/* Left: Text */}
          <div className="flex-1 min-w-0">
            {/* Eyebrow */}
            <div className="inline-flex flex-wrap items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-[rgba(246,244,255,0.04)] border border-[rgba(246,244,255,0.12)] backdrop-blur-md">
              <span className="text-[11px] sm:text-[12px] text-[#7c5cff] font-semibold flex items-center gap-1.5 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7c5cff]" />
                Full-Stack Dev Partner
              </span>
              <span className="w-1 h-1 rounded-full bg-[#6f6a99]" />
              <span className="text-[11px] sm:text-[12px] text-[#a09cc4] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Replies within 2 hours
              </span>
            </div>

            {/* H1 */}
            <h1 className="type-h1-hero text-[#f6f4ff] tracking-tight mb-5">
              Transforming Ideas Into{' '}
              <span className="accent-span">
                Profitable Digital
                <svg className="accent-underline" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2,8 C50,2 150,11 198,4" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Products
            </h1>

            {/* Subtitle */}
            <p className="text-[15px] sm:text-[17px] lg:text-[19px] max-w-xl mb-3 text-[#c0bdd4] leading-relaxed">
              Full-Stack Development Partner for growing businesses, from concept to production-grade deployment.
            </p>

            <p className="text-[14px] sm:text-[16px] text-[#7c5cff] font-medium mb-7 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#f7941e] flex-shrink-0" />
              Your Technical Co-Founder for Growing Businesses
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <a href="#contact" className="btn-pill group" id="hero-book-consultation">
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="btn-ghost group" id="hero-free-estimate">
                <span>Get a Free Estimate</span>
              </a>
            </div>
          </div>

          {/* Right: Profile Photo - hidden on very small screens, shown from sm+ */}
          <div className="mt-8 lg:mt-0 flex-shrink-0 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#7c5cff]/30 to-[#f7941e]/20 blur-2xl opacity-60" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7c5cff]/40 to-transparent" />
              <div className="relative w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] lg:w-[280px] lg:h-[280px] rounded-full overflow-hidden border-2 border-[rgba(124,92,255,0.4)] shadow-2xl">
                <img
                  src="/sohail.jpg"
                  alt="Sohail Masood, Full-Stack Development Partner"
                  className="w-full h-full object-cover scale-[1.2] translate-y-[8%]"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0a22] border border-[rgba(52,211,153,0.4)] text-[11px] sm:text-[12px] font-semibold text-emerald-400 whitespace-nowrap shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for projects
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 mt-8 sm:mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-[rgba(246,244,255,0.08)]">
          {PERSONAL_INFO.stats.map((stat) => (
            <div key={stat.label} className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.05)] hover:border-[rgba(124,92,255,0.25)] transition-all duration-300 group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display text-xl sm:text-2xl lg:text-4xl font-extrabold text-[#f6f4ff] group-hover:text-[#7c5cff] transition-colors">
                  {stat.value}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cff]/40 group-hover:bg-[#f7941e] transition-colors" />
              </div>
              <div className="text-[10px] sm:text-[12px] font-medium text-[#a09cc4] uppercase tracking-wider leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
