"use client";

import { useState, useEffect } from "react";
// GitHub icon inline since lucide-react version doesn't export Github
const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-7 h-7 rounded border border-white/20 flex items-center justify-center bg-white/5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M2 7h10M7 2v10" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="7" cy="7" r="2" fill="white" fillOpacity="0.8" />
              </svg>
            </div>
          </div>
          <span className="text-sm font-semibold tracking-wider text-white/90 uppercase">
            Polymarket Search
          </span>
        </div>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Markets", "Signals", "Momentum", "Use Cases"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/cyber-dev0x/polymarket-search"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <GithubIcon size={14} />
            <span className="hidden sm:inline tracking-wider">GitHub</span>
          </a>
          <a
            href="#search"
            className="px-4 py-2 text-xs font-medium tracking-widest uppercase bg-white text-black hover:bg-white/90 transition-all rounded-none"
          >
            Search
          </a>
        </div>
      </div>
    </nav>
  );
}
