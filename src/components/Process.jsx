import React from 'react';
import { PROCESS_STEPS } from '../lib/data.js';
import { GitBranch, ArrowRight } from 'lucide-react';

export const Process = () => {
  return (
    <section id="process" className="relative py-24 sm:py-32 z-main border-t border-[rgba(246,244,255,0.06)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-4">
            <GitBranch className="w-3.5 h-3.5 text-[#7c5cff]" />
            <span>Methodology</span>
          </div>
          <h2 className="type-h2 text-[#f6f4ff] mb-4">Development Process</h2>
          <p className="type-lead text-[#a09cc4]">A proven 6-phase process that delivers on time, on budget, and beyond expectations.</p>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[23px] sm:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#7c5cff] via-[rgba(124,92,255,0.2)] to-[#f7941e] pointer-events-none" />
          <div className="flex flex-col gap-12 sm:gap-16">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={step.number} className={`relative flex flex-col sm:flex-row items-start sm:items-center ${isEven ? 'sm:flex-row-reverse' : ''} gap-6 sm:gap-12`}>
                  <div className="absolute left-[23px] sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#070516] border-2 border-[#7c5cff] flex items-center justify-center z-10 shadow-[0_0_12px_rgba(124,92,255,0.5)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f7941e]" />
                  </div>
                  <div className="w-[calc(100%-3.5rem)] sm:w-[calc(50%-3rem)] ml-14 sm:ml-0">
                    <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] hover:border-[rgba(124,92,255,0.3)] transition-all duration-300 backdrop-blur-md group">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="font-display text-sm font-extrabold text-[#7c5cff] tracking-wider uppercase">Phase {step.number}</span>
                        <span className="text-[12px] font-mono text-[#6f6a99]">0{idx + 1}/06</span>
                      </div>
                      <h3 className="type-h3 text-[#f6f4ff] mb-2 group-hover:text-[#7c5cff] transition-colors">{step.title}</h3>
                      <p className="text-[14px] sm:text-[15px] text-[#a09cc4] leading-relaxed mb-6">{step.description}</p>
                      <div className="pt-4 border-t border-[rgba(246,244,255,0.06)] flex flex-col gap-2">
                        {step.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2.5 text-[13px] text-[#d4d2e6]">
                            <ArrowRight className="w-3.5 h-3.5 text-[#7c5cff] flex-shrink-0" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
