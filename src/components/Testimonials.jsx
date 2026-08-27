import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../lib/data.js';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 z-main border-t border-[rgba(246,244,255,0.06)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-4">
            <Quote className="w-3.5 h-3.5 text-[#7c5cff]" />
            <span>Client Feedback</span>
          </div>
          <h2 className="type-h2 text-[#f6f4ff] mb-3">Trusted By Technical Founders & Executives</h2>
          <p className="type-lead text-[#a09cc4]">Direct endorsements from business leaders who rely on robust code, architectural clarity, and rapid execution.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Testimonial Slider */}
          <div
            className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-[rgba(246,244,255,0.025)] border border-[rgba(246,244,255,0.08)] backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group min-h-[340px]"
            aria-live="polite"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#7c5cff]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f7941e] text-[#f7941e]" />
                ))}
              </div>
              <blockquote className="font-display text-2xl sm:text-3xl text-[#f6f4ff] font-semibold leading-snug mb-8">
                "{current.quote}"
              </blockquote>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[rgba(246,244,255,0.06)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c5cff] to-[#4b3bd6] flex items-center justify-center font-display font-bold text-white shadow-lg shadow-purple-950/40">
                  {current.initials}
                </div>
                <div>
                  <div className="text-[17px] font-bold text-[#f6f4ff]">{current.author}</div>
                  <div className="text-[13px] text-[#a09cc4]">
                    {current.role}, <span className="text-[#7c5cff] font-medium">{current.company}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[rgba(246,244,255,0.04)] border border-[rgba(246,244,255,0.1)] flex items-center justify-center text-[#f6f4ff] hover:border-[#7c5cff] transition-colors" aria-label="Previous testimonial">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[12px] font-mono text-[#6f6a99] px-1">{currentIndex + 1} / {TESTIMONIALS.length}</span>
                <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[rgba(246,244,255,0.04)] border border-[rgba(246,244,255,0.1)] flex items-center justify-center text-[#f6f4ff] hover:border-[#7c5cff] transition-colors" aria-label="Next testimonial">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stat Tiles */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.07)] backdrop-blur-md">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#f6f4ff] mb-1">50+</div>
              <div className="text-[13px] font-medium text-[#a09cc4] uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="p-6 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.07)] backdrop-blur-md">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#7c5cff] mb-1">98%</div>
              <div className="text-[13px] font-medium text-[#a09cc4] uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div className="p-6 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.07)] backdrop-blur-md">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#f7941e] mb-1">100%</div>
              <div className="text-[13px] font-medium text-[#a09cc4] uppercase tracking-wider">Response Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
