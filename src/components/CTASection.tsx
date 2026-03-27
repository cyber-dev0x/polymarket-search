"use client";

import { ArrowRight } from "lucide-react";

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
import dynamic from "next/dynamic";
import { useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function CTASection() {
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#050505]">
      {/* Background car — subtle, partial */}
      <div
        className="absolute right-0 bottom-0 w-[600px] h-[400px] opacity-30 transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: splineLoaded ? 0.25 : 0 }}
      >
        <Spline
          scene="https://prod.spline.design/koenigseggjesko-eCdQwMXKCxfd7e5SOq7Fn2G0/scene.splinecode"
          onLoad={() => setSplineLoaded(true)}
        />
      </div>

      {/* Dark overlay on the car */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[400px] bg-gradient-to-l from-transparent to-[#050505] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[600px] h-[400px] bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6">
            Ready?
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-none mb-2">
            Don&apos;t scroll
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold text-white/20 leading-none mb-2">
            the market.
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold leading-none mb-12 gradient-text-red">
            Drive through it.
          </h2>

          <p className="text-white/40 text-sm mb-12 leading-relaxed max-w-md">
            Every second of delay is a second the market has already moved.
            Polymarket Search puts you in the cockpit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#live-search"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase hover:bg-white/90 transition-all group"
            >
              Launch Search
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>

            <a
              href="https://github.com/dmitriidiagilev/polymarket-search"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 border border-white/15 text-white/60 text-sm tracking-widest uppercase hover:border-white/30 hover:text-white/80 transition-all"
            >
              <GithubIcon size={14} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
