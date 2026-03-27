"use client";

import { MARKETS } from "@/lib/mockData";

export default function Ticker() {
  const items = [...MARKETS, ...MARKETS];

  return (
    <div className="border-y border-white/5 bg-[#060606] overflow-hidden py-3 relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#060606] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#060606] to-transparent z-10" />
      <div className="ticker-track flex gap-12 items-center">
        {items.map((m, i) => (
          <div key={`${m.id}-${i}`} className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] text-white/25 tracking-wider max-w-[200px] truncate">
              {m.question.split(" ").slice(0, 6).join(" ")}...
            </span>
            <span
              className={`text-[11px] font-bold font-mono ${
                m.probability >= 70
                  ? "text-green-400/70"
                  : m.probability >= 40
                  ? "text-yellow-400/70"
                  : "text-red-400/70"
              }`}
            >
              {m.probability}%
            </span>
            <span
              className={`text-[10px] font-mono ${
                m.change > 0 ? "text-green-400/50" : "text-red-400/50"
              }`}
            >
              {m.change > 0 ? "+" : ""}
              {m.change}%
            </span>
            <span className="w-px h-3 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
