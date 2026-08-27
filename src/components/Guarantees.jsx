import React from 'react';
import { GUARANTEES } from '../lib/data.js';
import { Shield, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const Guarantees = () => {
  return (
    <section id="guarantees" className="relative py-24 sm:py-32 z-main border-t border-[rgba(246,244,255,0.06)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-4">
              <Shield className="w-3.5 h-3.5 text-[#7c5cff]" />
              <span>Risk-Free Partnership</span>
            </div>
            <h2 className="type-h2 text-[#f6f4ff] mb-3">Transparent Pricing & Guarantees</h2>
            <p className="type-lead text-[#a09cc4] max-w-2xl mx-auto">Every project comes backed by industry-standard guarantees and rock-solid delivery terms designed to protect your investment.</p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[rgba(246,244,255,0.025)] border border-[rgba(246,244,255,0.08)] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7c5cff]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
              {GUARANTEES.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.05)] hover:border-[rgba(124,92,255,0.3)] transition-all duration-200 group">
                  <div className="w-8 h-8 rounded-full bg-[rgba(124,92,255,0.12)] border border-[rgba(124,92,255,0.3)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-[#7c5cff] group-hover:text-[#f7941e] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#f6f4ff] group-hover:text-[#7c5cff] transition-colors mb-1">{item.title}</h3>
                    <p className="text-[14px] text-[#a09cc4] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[rgba(246,244,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-3 text-[14px] text-[#a09cc4]">
                <Sparkles className="w-4 h-4 text-[#f7941e]" />
                <span>Custom fixed-scope or monthly retainer models available.</span>
              </div>
              <a href="#contact" className="btn-pill !h-11 !px-6 text-[14px] w-full sm:w-auto text-center">
                <span>Get a Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
