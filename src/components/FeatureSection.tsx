"use client";

import { useRef } from "react";
import { Zap, Radio, Activity, Target } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Speed",
    subtitle: "Find markets instantly.",
    description:
      "Sub-100ms search across every active Polymarket market. No loading spinners. No friction. Just signal.",
    stat: "<100ms",
    statLabel: "Query latency",
    accent: "#60a5fa",
  },
  {
    icon: Radio,
    title: "Signal",
    subtitle: "See what people are betting on.",
    description:
      "Real-time probability streams, volume spikes, and sentiment clusters surface what matters — before you have to look for it.",
    stat: "287+",
    statLabel: "Active markets",
    accent: "#a78bfa",
  },
  {
    icon: Activity,
    title: "Momentum",
    subtitle: "Track narrative movement in real time.",
    description:
      "Velocity scores measure how fast probabilities shift. Catch narratives in motion, not after they've already priced in.",
    stat: "10x",
    statLabel: "Faster than scanning",
    accent: "#f59e0b",
  },
  {
    icon: Target,
    title: "Precision",
    subtitle: "Filter to what you actually need.",
    description:
      "Category filters, heat mode, and narrative clusters let you cut through noise and see only the markets that matter to you.",
    stat: "99%",
    statLabel: "Signal-to-noise",
    accent: "#22c55e",
  },
];

export default function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="markets" className="py-24 px-6 bg-[#050505] relative">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="max-w-7xl mx-auto relative">
        {/* Label */}
        <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
          Product
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Built for speed.
        </h2>
        <p className="text-white/30 mb-16 text-sm">
          Every feature is designed around one goal: information advantage.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-[#050505] p-10 hover:bg-[#090909] transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: feature.accent }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 mb-6 flex items-center justify-center border border-white/8 group-hover:border-white/15 transition-all"
                  style={{ background: `${feature.accent}10` }}
                >
                  <Icon size={18} style={{ color: feature.accent }} />
                </div>

                <div
                  className="text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: feature.accent }}
                >
                  {feature.title}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.subtitle}
                </h3>

                <p className="text-sm text-white/40 leading-relaxed mb-8">
                  {feature.description}
                </p>

                {/* Stat */}
                <div className="flex items-end gap-2">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: feature.accent }}
                  >
                    {feature.stat}
                  </span>
                  <span className="text-xs text-white/25 mb-2 tracking-wider">
                    {feature.statLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
