import React, { useState } from 'react';
import { SERVICES } from '../lib/data.js';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

export const Services = () => {
  const [expandedId, setExpandedId] = useState(SERVICES[0].id);

  return (
    <section id="services" className="relative py-24 sm:py-32 z-main border-t border-[rgba(246,244,255,0.06)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5 text-[#7c5cff]" />
            <span>Capabilities</span>
          </div>
          <h2 className="type-h2 text-[#f6f4ff] mb-4">Solutions That Drive Growth</h2>
          <p className="type-lead text-[#a09cc4]">Architected for scalability, performance, and real business results. From conception to production-grade deployment.</p>
        </div>

        <div className="flex flex-col divide-y divide-[rgba(246,244,255,0.08)] border-y border-[rgba(246,244,255,0.08)]">
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={service.id}
                style={{ scrollMarginTop: '110px' }}
                onClick={() => setExpandedId(isExpanded ? '' : service.id)}
                className={`group py-8 sm:py-10 transition-all duration-300 cursor-pointer px-4 sm:px-6 rounded-2xl ${
                  isExpanded ? 'bg-[rgba(246,244,255,0.03)] border-l-2 border-l-[#7c5cff]' : 'hover:bg-[rgba(246,244,255,0.015)]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#6f6a99] group-hover:text-[#7c5cff] transition-colors tabular-nums">{service.number}</span>
                    <div className="flex flex-col">
                      <h3 className="type-h3 text-[#f6f4ff] group-hover:text-[#7c5cff] transition-colors">{service.title}</h3>
                      <p className="text-[14px] sm:text-[15px] text-[#a09cc4] max-w-2xl mt-1.5 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 self-end lg:self-center">
                    <div className="hidden md:flex items-center gap-2">
                      {service.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[12px] font-medium px-2.5 py-1 rounded-md bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] text-[#a09cc4]">{tag}</span>
                      ))}
                    </div>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${isExpanded ? 'bg-[#7c5cff] border-[#7c5cff] text-white rotate-90' : 'border-[rgba(246,244,255,0.15)] text-[#a09cc4] group-hover:border-[#7c5cff] group-hover:text-[#f6f4ff]'}`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-8 pt-6 border-t border-[rgba(246,244,255,0.06)] grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <h4 className="text-[13px] font-semibold tracking-wider uppercase text-[#6f6a99] mb-3">Key Deliverables & Standards</h4>
                      <ul className="flex flex-col gap-2.5">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#d4d2e6]">
                            <CheckCircle2 className="w-4 h-4 text-[#7c5cff] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="text-[13px] font-semibold tracking-wider uppercase text-[#6f6a99] mb-3">Technologies Involved</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span key={tag} className="text-[12px] font-medium px-3 py-1 rounded-full bg-[rgba(124,92,255,0.1)] border border-[rgba(124,92,255,0.25)] text-[#f6f4ff]">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6">
                        <a href="#contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#7c5cff] hover:text-[#f7941e] transition-colors">
                          <span>Discuss this service for your project</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
