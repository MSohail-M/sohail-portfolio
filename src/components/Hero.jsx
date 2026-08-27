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

            {/* Social Links */}
            <div className="flex items-center flex-wrap gap-2">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[rgba(246,244,255,0.04)] border border-[rgba(246,244,255,0.1)] text-[12px] sm:text-[13px] text-[#a09cc4] hover:text-[#f6f4ff] hover:border-[#7c5cff] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[rgba(246,244,255,0.04)] border border-[rgba(246,244,255,0.1)] text-[12px] sm:text-[13px] text-[#a09cc4] hover:text-emerald-400 hover:border-emerald-400 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
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
