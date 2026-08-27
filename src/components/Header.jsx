import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, SERVICE_LINKS } from '../lib/data.js';

export const Header = ({ scrollY, homeHref = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isStuck = scrollY > 24;

  /* homeHref is '' on the one-pager and '/' on /demo, so the same anchors
     resolve from either document */
  const navItems = [
    { label: 'Home', href: `${homeHref}#hero` },
    { label: 'Services', href: `${homeHref}#services` },
    { label: 'Process', href: `${homeHref}#process` },
    { label: 'Work', href: `${homeHref}#work` },
    { label: 'Contact', href: `${homeHref}#contact` },
  ];

  useEffect(() => {
    const handleObserver = () => {
      const sections = ['hero', 'services', 'process', 'work', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleObserver);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
        isStuck
          ? 'bg-[#070516]/80 backdrop-blur-xl border-b border-[rgba(246,244,255,0.08)] py-3 shadow-2xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Lockup + service links */}
        <div className="flex items-center gap-3 lg:gap-4 min-w-0">
          <a href={`${homeHref}#hero`} className="flex items-center group focus:outline-none flex-shrink-0" aria-label="Vocryn AI - Home">
            <img
              src="/vocryn-logo.jpeg"
              alt="Vocryn AI"
              width="360"
              height="120"
              className="h-9 sm:h-10 w-auto rounded-lg shadow-[0_6px_24px_rgba(124,92,255,0.32)] transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>

          <nav
            aria-label="Services"
            className="hidden md:flex items-center gap-1.5 pl-3 lg:pl-4 border-l border-[rgba(246,244,255,0.14)]"
          >
            {SERVICE_LINKS.map((service) => (
              <a
                key={service.short}
                href={`${homeHref}${service.href}`}
                title={service.label}
                className="px-3 py-1.5 rounded-full text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#d8d3f2] bg-[rgba(124,92,255,0.12)] border border-[rgba(124,92,255,0.3)] hover:text-[#f6f4ff] hover:bg-[rgba(124,92,255,0.26)] hover:border-[#7c5cff] hover:-translate-y-px transition-all duration-200 whitespace-nowrap"
              >
                {service.short}
              </a>
            ))}
          </nav>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] rounded-full px-4 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = item.href.endsWith(`#${activeSection}`) && !homeHref;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-1.5 text-[14px] font-medium transition-colors duration-200 rounded-full ${
                  isActive ? 'text-[#f6f4ff]' : 'text-[#a09cc4] hover:text-[#f6f4ff]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#7c5cff] rounded-full shadow-[0_0_8px_#7c5cff]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-medium text-[#a09cc4]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span>Available for new projects</span>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-[rgba(246,244,255,0.05)] border border-[rgba(246,244,255,0.12)] text-[#f6f4ff] focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#070516]/95 backdrop-blur-2xl z-menu flex flex-col justify-between p-6 lg:hidden border-t border-[rgba(246,244,255,0.08)] animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-medium text-[#a09cc4] mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for new projects · Replies in &lt;2h</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2 md:hidden">
              {SERVICE_LINKS.map((service) => (
                <a
                  key={service.short}
                  href={`${homeHref}${service.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.1em] text-[#d8d3f2] bg-[rgba(124,92,255,0.12)] border border-[rgba(124,92,255,0.3)]"
                >
                  {service.label}
                </a>
              ))}
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[20px] font-display font-semibold text-[#f6f4ff] py-2.5 border-b border-[rgba(246,244,255,0.05)] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#7c5cff]" />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-6 pb-8 border-t border-[rgba(246,244,255,0.1)]">
            <a href="/demo" onClick={() => setMobileMenuOpen(false)} className="btn-pill w-full !h-12 text-center">Book Free Consultation</a>
          </div>
        </div>
      )}
    </header>
  );
};
