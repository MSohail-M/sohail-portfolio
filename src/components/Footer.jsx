import React from 'react';
import { PERSONAL_INFO, SERVICES, PROJECTS } from '../lib/data.js';
import { MessageSquare, Mail, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#0d0a22] border-t border-[rgba(246,244,255,0.08)] z-main pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[rgba(246,244,255,0.06)]">
          {/* Brand (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-5">
                <img
                  src="/vocryn-logo.jpeg"
                  alt="Vocryn AI"
                  width="360"
                  height="120"
                  className="h-10 w-auto rounded-lg shadow-[0_6px_24px_rgba(124,92,255,0.28)]"
                />
              </div>
              <p className="text-[14px] text-[#a09cc4] leading-relaxed max-w-sm mb-6">Full-Stack Development Partner transforming ideas into digital products. Specializing in React, AI/ML, and scalable cloud infrastructure.</p>
              <div className="flex items-center gap-3">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="w-10 h-10 rounded-full bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] flex items-center justify-center text-[#a09cc4] hover:text-[#7c5cff] hover:border-[#7c5cff] transition-all" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#f6f4ff] mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-[14px] text-[#a09cc4] hover:text-[#7c5cff] transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Work (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#f6f4ff] mb-4">Projects</h4>
            <ul className="flex flex-col gap-2.5">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#a09cc4] hover:text-[#7c5cff] transition-colors line-clamp-1">{p.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#f6f4ff] mb-4">Direct Contact</h4>
            <div className="flex flex-col gap-2.5 text-[14px] text-[#a09cc4]">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#7c5cff] transition-colors break-words">{PERSONAL_INFO.email}</a>
              <a href={PERSONAL_INFO.phoneTel} className="hover:text-[#7c5cff] transition-colors">{PERSONAL_INFO.whatsappDisplay}</a>
              <span className="text-[14px] text-[#a09cc4]">{PERSONAL_INFO.location}</span>
              <span className="text-[12px] text-[#6f6a99] mt-2">Available for worldwide contract & technical co-founder engagements.</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[13px] text-[#6f6a99]">© 2026 Sohail Masood. All rights reserved.</div>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-[13px] text-[#a09cc4] hover:text-[#f6f4ff] transition-colors cursor-pointer">
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
