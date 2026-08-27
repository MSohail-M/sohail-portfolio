import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Video, CheckCircle2 } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackgroundCanvas } from './BackgroundCanvas';
import { BookingEmbed } from './BookingEmbed';
import { PERSONAL_INFO } from '../lib/data';

const WHAT_TO_EXPECT = [
  'You talk, I listen. Bring the problem, not a brief — we will shape the brief together.',
  'You leave with a scope, a rough price and a realistic date, whether or not you hire me.',
  'No slide deck, no pitch. If it is not a fit I will say so on the call and point you elsewhere.',
];

export const BookPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <BackgroundCanvas />
      <Header scrollY={scrollY} homeHref="/" />

      <main className="relative z-10 pt-32 sm:pt-36 pb-20 px-5 sm:px-8">
        <div className="max-w-[1120px] mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#a09cc4] hover:text-[#f6f4ff] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to portfolio
          </a>

          <div className="flex items-center gap-2 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7c5cff]">
              30 minutes · no slide deck
            </span>
          </div>

          <h1 className="text-[36px] sm:text-[52px] lg:text-[60px] font-extrabold leading-[1.05] tracking-tight text-[#f6f4ff] max-w-[900px]">
            Let&apos;s talk about what you&apos;re{' '}
            <span className="text-[#7c5cff]">actually trying to build.</span>
          </h1>

          <p className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-[#a09cc4] max-w-[620px]">
            Pick a time that works. We will go through what you have, what it needs to do, and what
            it realistically takes to get there.
          </p>

          <div className="mt-10 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Calendar */}
            <div className="rounded-3xl bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] p-4 sm:p-6 backdrop-blur-md">
              <div className="mb-4 px-1">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f6a99] mb-1.5">
                  Book a time
                </div>
                <h2 className="text-[20px] font-bold text-[#f6f4ff]">
                  Schedule a call with Sohail
                </h2>
              </div>
              <BookingEmbed />
            </div>

            {/* Aside */}
            <aside className="flex flex-col gap-4">
              <div className="rounded-2xl bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] p-6">
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#f6f4ff] mb-4">
                  What to expect
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {WHAT_TO_EXPECT.map((line) => (
                    <li key={line} className="flex gap-2.5 text-[14px] leading-relaxed text-[#a09cc4]">
                      <CheckCircle2 className="w-4 h-4 text-[#7c5cff] flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-[rgba(246,244,255,0.03)] border border-[rgba(246,244,255,0.08)] p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-[14px] text-[#a09cc4]">
                  <Clock className="w-4 h-4 text-[#7c5cff]" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px] text-[#a09cc4]">
                  <Video className="w-4 h-4 text-[#7c5cff]" />
                  <span>Video or phone, your call</span>
                </div>
              </div>

              <p className="text-[13px] leading-relaxed text-[#6f6a99] px-1">
                Nothing in the calendar that suits you? Email{' '}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-[#a09cc4] hover:text-[#7c5cff] transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>{' '}
                or call{' '}
                <a
                  href={PERSONAL_INFO.phoneTel}
                  className="text-[#a09cc4] hover:text-[#7c5cff] transition-colors"
                >
                  {PERSONAL_INFO.whatsappDisplay}
                </a>{' '}
                and we will find a slot.
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
