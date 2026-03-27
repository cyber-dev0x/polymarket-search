"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Search, ArrowRight } from "lucide-react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white/10 text-xs tracking-widest uppercase">Loading scene...</div>
    </div>
  ),
});

const HEADLINES = [
  "Markets move fast.",
  "Narratives move faster.",
  "Search them before they price in.",
];

export default function HeroSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [query, setQuery] = useState("");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<unknown>(null);

  // Typewriter effect
  useEffect(() => {
    const current = HEADLINES[headlineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, 40);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, 20);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setHeadlineIndex((i) => (i + 1) % HEADLINES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, headlineIndex]);

  // Parallax on cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!splineRef.current) return;
      // Spline handles its own camera — we just track for potential overlay parallax
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchSection = document.getElementById("live-search");
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: "smooth" });
        // Dispatch event for the search section to pick up
        window.dispatchEvent(new CustomEvent("heroSearch", { detail: { query } }));
      }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, #080808 80%)"
        }}
      />

      {/* 3D Spline Scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full h-full transition-opacity duration-1000"
          style={{ opacity: splineLoaded ? 1 : 0 }}
        >
          <Spline
            scene="https://prod.spline.design/koenigseggjesko-eCdQwMXKCxfd7e5SOq7Fn2G0/scene.splinecode"
            onLoad={(spline) => {
              splineRef.current = spline;
              setSplineLoaded(true);
            }}
          />
        </div>
      </div>

      {/* Gradient overlay — darkens edges so text is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.1) 30%, rgba(8,8,8,0.1) 60%, rgba(8,8,8,0.9) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full">
        {/* Live badge */}
        <div className="flex items-center gap-2 mb-8 px-3 py-1.5 glass rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
            Live Market Intelligence
          </span>
        </div>

        {/* Headline */}
        <div className="mb-3 h-[56px] md:h-[72px] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white text-glow">
            {displayText}
            <span className="animate-pulse text-white/30">|</span>
          </h1>
        </div>

        {/* Sub tagline */}
        <p className="text-sm md:text-base text-white/30 tracking-[0.2em] uppercase mb-12">
          Search prediction markets at market speed.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative glass-strong rounded-none border border-white/10 flex items-center">
            <Search className="absolute left-5 text-white/30" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search markets, narratives, events..."
              className="search-input w-full bg-transparent pl-14 pr-40 py-5 text-white placeholder:text-white/20 text-sm tracking-wide focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 flex items-center gap-2 px-5 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all"
            >
              Search Polymarket
              <ArrowRight size={12} />
            </button>
          </div>
        </form>

        {/* Quick tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {["Trump", "Fed rates", "Bitcoin ETF", "Iran", "AI regulation", "2026 midterms"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  const s = document.getElementById("live-search");
                  if (s) s.scrollIntoView({ behavior: "smooth" });
                  window.dispatchEvent(new CustomEvent("heroSearch", { detail: { query: tag } }));
                }}
                className="px-3 py-1 text-[10px] tracking-widest uppercase text-white/30 border border-white/10 hover:border-white/30 hover:text-white/60 transition-all rounded-none"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">Scroll</span>
      </div>

      {/* Speed metrics */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-end gap-1">
        <div className="text-[9px] tracking-[0.3em] uppercase text-white/20">Market Velocity</div>
        <div className="text-2xl font-bold text-white/60">287 <span className="text-xs font-normal text-white/30">mph</span></div>
      </div>
    </section>
  );
}
