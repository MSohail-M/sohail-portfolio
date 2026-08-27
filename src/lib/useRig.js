const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

import { useEffect, useRef, useState } from 'react';

export const useRig = () => {
  const [rig, setRig] = useState({
    scrollY: 0,
    smoothScroll: 0,
    normalizedScroll: 0,
    mouseX: 0,
    mouseY: 0,
    smoothMouseX: 0,
    smoothMouseY: 0,
    viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1440,
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  const stateRef = useRef({
    targetScroll: 0,
    currentScroll: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    currentMouseX: 0,
    currentMouseY: 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
    docHeight: 4000,
    reducedMotion: false,
    rafId: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.reducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      stateRef.current.reducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const updateDimensions = () => {
      stateRef.current.width = window.innerWidth;
      stateRef.current.height = window.innerHeight;
      stateRef.current.docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 4
      );
    };
    updateDimensions();

    const handleScroll = () => {
      stateRef.current.targetScroll = window.scrollY || window.pageYOffset || 0;
      if (stateRef.current.reducedMotion) {
        stateRef.current.currentScroll = stateRef.current.targetScroll;
      }
    };

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetMouseX = nx;
      stateRef.current.targetMouseY = ny;

      if (stateRef.current.reducedMotion) {
        stateRef.current.currentMouseX = nx;
        stateRef.current.currentMouseY = ny;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateDimensions, { passive: true });

    handleScroll();

    let tickCount = 0;

    const loop = () => {
      const s = stateRef.current;
      if (!s.reducedMotion) {
        s.currentScroll = lerp(s.currentScroll, s.targetScroll, 0.13);
        s.currentMouseX = lerp(s.currentMouseX, s.targetMouseX, 0.11);
        s.currentMouseY = lerp(s.currentMouseY, s.targetMouseY, 0.11);
      } else {
        s.currentScroll = s.targetScroll;
        s.currentMouseX = s.targetMouseX;
        s.currentMouseY = s.targetMouseY;
      }

      const root = document.documentElement;
      const totalScrollable = Math.max(s.docHeight - s.height, 1);
      const normalizedScroll = Math.min(Math.max(s.currentScroll / totalScrollable, 0), 1);

      const tilt = s.currentMouseX * 12;
      const depth = normalizedScroll;

      root.style.setProperty('--sp', `${s.currentScroll.toFixed(1)}px`);
      root.style.setProperty('--scroll-y', `${s.currentScroll.toFixed(1)}px`);
      root.style.setProperty('--mx', `${s.currentMouseX.toFixed(3)}`);
      root.style.setProperty('--my', `${s.currentMouseY.toFixed(3)}`);
      root.style.setProperty('--tilt', `${tilt.toFixed(2)}deg`);
      root.style.setProperty('--depth', `${depth.toFixed(4)}`);

      tickCount++;
      if (tickCount % 2 === 0) {
        setRig({
          scrollY: s.targetScroll,
          smoothScroll: s.currentScroll,
          normalizedScroll,
          mouseX: s.targetMouseX,
          mouseY: s.targetMouseY,
          smoothMouseX: s.currentMouseX,
          smoothMouseY: s.currentMouseY,
          viewportWidth: s.width,
          viewportHeight: s.height,
        });
      }

      s.rafId = requestAnimationFrame(loop);
    };

    stateRef.current.rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(stateRef.current.rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return rig;
};
