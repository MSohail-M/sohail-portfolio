import React from 'react';
import { TECH_STACK, ALSO_WORKING_WITH } from '../lib/data.js';
import { Code2, Cpu } from 'lucide-react';

export const TechStack = () => {
  return (
    <section id="tech" className="relative py-24 sm:py-32 z-main border-t border-[rgba(246,244,255,0.06)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#7c5cff]" />
            <span>Core Ecosystem</span>
          </div>
          <h2 className="type-h2 text-[#f6f4ff] mb-3">Technologies & Platforms We Work With</h2>
          <p className="type-lead text-[#a09cc4]">A carefully curated tech stack for building modern, scalable digital products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TECH_STACK.map((group) => (
            <div key={group.category} className="p-6 sm:p-8 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.07)] hover:border-[rgba(124,92,255,0.3)] transition-all duration-300 backdrop-blur-md group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-[rgba(246,244,255,0.06)]">
                  <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#7c5cff]">{group.category}</h3>
                  <Code2 className="w-4 h-4 text-[#6f6a99] group-hover:text-[#7c5cff] transition-colors" />
                </div>
                <div className="flex flex-col gap-3">
                  {group.items.map((tech) => (
                    <div key={tech} className="flex items-center justify-between p-3 rounded-xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.04)] hover:bg-[rgba(124,92,255,0.08)] hover:border-[rgba(124,92,255,0.25)] transition-all duration-200">
                      <span className="text-[15px] font-medium text-[#d4d2e6]">{tech}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6f6a99] group-hover:bg-[#7c5cff]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(246,244,255,0.015)] border border-[rgba(246,244,255,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="text-[13px] font-semibold uppercase tracking-widest text-[#6f6a99] whitespace-nowrap">Also Working With:</span>
            <div className="flex flex-wrap gap-2.5">
              {ALSO_WORKING_WITH.map((item) => (
                <span key={item} className="text-[13px] font-medium text-[#a09cc4] bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] px-3.5 py-1.5 rounded-full hover:border-[#7c5cff] hover:text-[#f6f4ff] transition-colors">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
