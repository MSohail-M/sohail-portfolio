import React, { useEffect, useRef } from 'react';
import { ProceduralEngine } from '../lib/gl';

export const BackgroundCanvas = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize procedural Three.js engine
    engineRef.current = new ProceduralEngine(containerRef.current);

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-canvas"
      aria-hidden="true"
    >
      {/* 3D WebGL Canvas - reduced opacity for text clarity */}
      <div
        id="canvas-container"
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.55 }}
      />

      {/* Fallback CSS background (active under html.no-gl) */}
      <div className="fallback-bg hidden absolute inset-0 w-full h-full pointer-events-none" />

      {/* Film Grain Layer - very subtle */}
      <div
        className="absolute inset-0 z-grain pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Stronger Vignette - makes text areas much clearer */}
      <div
        className="absolute inset-0 z-vignette pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(5, 6, 10, 0.55) 60%, rgba(5, 6, 10, 0.97) 100%)`,
        }}
      />

      {/* Dark overlay at the top for nav/hero text clarity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, rgba(5,6,10,0.45) 0%, rgba(5,6,10,0.0) 30%)`,
        }}
      />

      {/* Atmospheric Violet/Ember Veil - toned down */}
      <div
        className="absolute inset-0 z-veil pointer-events-none opacity-25 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 80% 20%, rgba(124, 92, 255, 0.12) 0%, transparent 50%),
                       radial-gradient(circle at 15% 85%, rgba(247, 148, 30, 0.07) 0%, transparent 45%)`,
        }}
      />
    </div>
  );
};
