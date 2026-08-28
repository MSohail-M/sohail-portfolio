import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle2, Send, AlertCircle, MapPin } from 'lucide-react';
import { PERSONAL_INFO, SERVICES } from '../lib/data.js';

export const Contact = () => {
  const EMPTY = { name: '', email: '', category: '', message: '', botcheck: '' };
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  /* Never claim a brief landed when it did not — /api/contact returns 200 only
     once the enquiry is in Airtable or has been emailed out. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const out = await res.json().catch(() => ({}));

      if (res.ok && out.ok) {
        setStatus('success');
        setFormData(EMPTY);
      } else {
        setStatus('error');
        setErrorMessage(
          `That did not send. Email ${PERSONAL_INFO.email} directly and I will pick it up from there.`
        );
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(
        `That did not send — check your connection, or email ${PERSONAL_INFO.email} directly.`
      );
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 z-main border-t border-[rgba(246,244,255,0.06)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(124,92,255,0.08)] border border-[rgba(124,92,255,0.2)] text-[12px] font-semibold text-[#7c5cff] tracking-widest uppercase mb-4">
                <Mail className="w-3.5 h-3.5 text-[#7c5cff]" />
                <span>Get in Touch</span>
              </div>
              <h2 className="type-h2 text-[#f6f4ff] mb-4">Tell Me About Your Project</h2>
              <p className="type-lead text-[#a09cc4] mb-8">Ready to build something great? Whether you need a full product build, AI integration, or an engineering audit, let's explore how we can collaborate.</p>

              <div className="flex flex-col gap-4">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.07)] hover:border-[rgba(124,92,255,0.3)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(124,92,255,0.1)] flex items-center justify-center text-[#7c5cff] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] uppercase font-bold text-[#6f6a99] tracking-wider">Email Directly</div>
                    <div className="text-[15px] font-medium text-[#f6f4ff] group-hover:text-[#7c5cff] transition-colors">{PERSONAL_INFO.email}</div>
                  </div>
                </a>

                <a href={PERSONAL_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.07)] hover:border-[#34d399] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] uppercase font-bold text-[#6f6a99] tracking-wider">Call or WhatsApp</div>
                    <div className="text-[15px] font-medium text-[#f6f4ff] group-hover:text-emerald-400 transition-colors">{PERSONAL_INFO.whatsappDisplay}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(246,244,255,0.02)] border border-[rgba(246,244,255,0.07)]">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(247,148,30,0.1)] flex items-center justify-center text-[#f7941e]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] uppercase font-bold text-[#6f6a99] tracking-wider">Based In</div>
                    <div className="text-[15px] font-medium text-[#f6f4ff]">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[rgba(246,244,255,0.06)] flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[14px] text-[#d4d2e6]">
                <Clock className="w-4 h-4 text-[#7c5cff]" />
                <span>Average reply: <strong className="text-[#f6f4ff]">2 hours</strong></span>
              </div>
              <div className="flex items-center gap-3 text-[14px] text-[#d4d2e6]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Currently <strong className="text-[#f6f4ff]">Available for new projects</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[rgba(246,244,255,0.025)] border border-[rgba(246,244,255,0.08)] backdrop-blur-xl">
              <h3 className="text-xl font-bold text-[#f6f4ff] mb-6">Send Project Brief</h3>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-[rgba(124,92,255,0.1)] border border-[rgba(124,92,255,0.3)] text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-[#f6f4ff] mb-2">Inquiry Received</h4>
                  <p className="text-[14px] text-[#a09cc4] mb-6">Thank you for reaching out! Sohail typically reviews briefs and responds within 2 hours.</p>
                  <button onClick={() => setStatus('idle')} className="btn-pill !h-10 !text-[13px]">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-[14px] text-red-200">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span>{errorMessage || 'Server returned an invalid response. Please try again.'}</span>
                    </div>
                  )}

                  {/* Honeypot — hidden from people and screen readers, catnip for bots. */}
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[13px] font-semibold text-[#a09cc4]">Your Name *</label>
                      <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="w-full h-12 px-4 rounded-xl bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.1)] text-[#f6f4ff] text-[16px] placeholder-[#6f6a99] focus:border-[#7c5cff] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[13px] font-semibold text-[#a09cc4]">Your Email *</label>
                      <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" className="w-full h-12 px-4 rounded-xl bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.1)] text-[#f6f4ff] text-[16px] placeholder-[#6f6a99] focus:border-[#7c5cff] transition-colors" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-[13px] font-semibold text-[#a09cc4]">Service Required</label>
                    <select id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full h-12 px-4 rounded-xl bg-[#0d0a22] border border-[rgba(246,244,255,0.1)] text-[#f6f4ff] text-[16px] focus:border-[#7c5cff] transition-colors">
                      <option value="">Select category...</option>
                      {SERVICES.map((s) => (<option key={s.id} value={s.title}>{s.title}</option>))}
                      <option value="General Technical Consultation">General Technical Consultation</option>
                      <option value="Code Review & Audit">Code Review & Architecture Audit</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[13px] font-semibold text-[#a09cc4]">Project Overview *</label>
                    <textarea id="message" required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your project, goals, and any specific requirements..." className="w-full p-4 rounded-xl bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.1)] text-[#f6f4ff] text-[16px] placeholder-[#6f6a99] focus:border-[#7c5cff] transition-colors resize-y min-h-[110px]" />
                  </div>

                  <button type="submit" disabled={status === 'submitting'} className="btn-pill w-full !h-12 mt-2 flex items-center justify-center gap-2 group cursor-pointer">
                    {status === 'submitting' ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Tell Me About Your Project</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
