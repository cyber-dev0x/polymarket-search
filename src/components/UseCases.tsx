"use client";

import { BarChart2, FlaskConical, Newspaper, Flame } from "lucide-react";

const CASES = [
  {
    icon: BarChart2,
    role: "Traders",
    headline: "Edge before the market finds it.",
    points: [
      "Spot probability gaps before consensus forms",
      "Track momentum shifts in real time",
      "Filter high-velocity markets for fast entry",
      "Related market correlations surface hidden alpha",
    ],
    accent: "#60a5fa",
  },
  {
    icon: FlaskConical,
    role: "Researchers",
    headline: "Quantified narratives, not vibes.",
    points: [
      "Search thematic clusters across events",
      "Export probability timelines for analysis",
      "Compare market consensus vs poll data",
      "Track how forecasts evolve over time",
    ],
    accent: "#a78bfa",
  },
  {
    icon: Newspaper,
    role: "Journalists",
    headline: "What the money says.",
    points: [
      "Instant probability context for any story",
      "See which narratives markets are pricing in",
      "Velocity scores show what&apos;s breaking fast",
      "Heat mode surfaces emerging stories early",
    ],
    accent: "#22c55e",
  },
  {
    icon: Flame,
    role: "Degens",
    headline: "No charts. Just signal.",
    points: [
      "Heat mode — only the hot markets",
      "Quick filter by probability range",
      "Biggest movers, sorted by velocity",
      "Related markets for everything you care about",
    ],
    accent: "#f59e0b",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-6 bg-[#050505] relative">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
          Use Cases
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          Built for every kind of edge.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASES.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.role}
                className="group glass border border-white/5 p-8 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 flex items-center justify-center border"
                    style={{
                      borderColor: `${c.accent}30`,
                      background: `${c.accent}08`,
                    }}
                  >
                    <Icon size={16} style={{ color: c.accent }} />
                  </div>
                  <div>
                    <div
                      className="text-[9px] tracking-[0.3em] uppercase"
                      style={{ color: c.accent }}
                    >
                      For
                    </div>
                    <div className="text-base font-bold text-white">{c.role}</div>
                  </div>
                </div>

                <h3 className="text-lg text-white/80 mb-5 font-medium">{c.headline}</h3>

                <ul className="space-y-2.5">
                  {c.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-1 h-1 rounded-full mt-2 shrink-0"
                        style={{ background: c.accent }}
                      />
                      <span
                        className="text-xs text-white/40"
                        dangerouslySetInnerHTML={{ __html: point }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
