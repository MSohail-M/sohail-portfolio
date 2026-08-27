import React from 'react';
import { PROJECTS } from '../lib/data.js';
import { Briefcase, ArrowUpRight, Globe } from 'lucide-react';

export const Work = () => {
  return (
    <section
      id="work"
      className="relative py-24 sm:py-32 z-main border-t border-[rgba(246,244,255,0.06)] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.10)] border border-[rgba(124,92,255,0.22)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#7c5cff]" />
            <span>Selected Work</span>
          </div>
          <h2 className="type-h2 text-[#f6f4ff] mb-3">
            Sites we have shipped
          </h2>
          <p className="type-lead text-[#a09cc4]">
            Three live builds. Open any of them and read the page structure. That is the part that decides whether it ranks.
          </p>
        </div>
      </div>

      {/* Project Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-3xl bg-[rgba(246,244,255,0.025)] border border-[rgba(246,244,255,0.08)] hover:border-[rgba(124,92,255,0.4)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl group overflow-hidden flex flex-col"
            >
              {/* Screenshot */}
              <div className="relative overflow-hidden aspect-[16/10] bg-[#0c0920] border-b border-[rgba(246,244,255,0.07)]">
                <img
                  src={project.image}
                  alt={`${project.title}, ${project.category}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 mix-blend-multiply pointer-events-none`} />
                <span
                  className="absolute top-3 left-4 font-display font-black text-[64px] leading-none text-[rgba(246,244,255,0.16)] pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {project.number}
                </span>
              </div>

              <div className="relative z-10 p-7 sm:p-8 flex flex-col flex-1">
                {/* Category + domain */}
                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                  <span className="text-[11.5px] font-semibold uppercase tracking-wider text-[#7c5cff] px-3 py-1 rounded-full bg-[rgba(124,92,255,0.12)] border border-[rgba(124,92,255,0.22)]">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#f7941e] bg-[rgba(247,148,30,0.09)] px-3 py-1 rounded-full border border-[rgba(247,148,30,0.22)]">
                    <Globe className="w-3.5 h-3.5" />
                    {project.metrics}
                  </span>
                </div>

                <h3 className="type-h3 text-2xl sm:text-[26px] text-[#f6f4ff] font-bold group-hover:text-[#7c5cff] transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-[#b9b4dc] leading-relaxed text-[15px]">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] font-medium text-[#a09cc4] bg-[rgba(246,244,255,0.04)] border border-[rgba(246,244,255,0.09)] px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(246,244,255,0.04)] border border-[rgba(246,244,255,0.12)] text-[13px] font-semibold text-[#f6f4ff] group-hover:border-[#7c5cff] group-hover:text-[#7c5cff] group-hover:bg-[rgba(124,92,255,0.08)] transition-all duration-200">
                    <span>Visit live site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
