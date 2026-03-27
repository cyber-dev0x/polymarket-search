"use client";

import { HEAT_MARKETS } from "@/lib/mockData";
import { TrendingUp, Zap } from "lucide-react";

export default function MomentumSection() {
  return (
    <section id="momentum" className="py-24 px-6 bg-[#080808] relative overflow-hidden">
      {/* Red accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Right content */}
          <div className="order-2 lg:order-1">
            <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
              Momentum
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Track narrative movement in real time.
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Velocity scores quantify how fast a market&apos;s probability is shifting.
              A score of 9 or 10 means the market is moving now — not yesterday,
              not in an hour. Now.
            </p>

            {/* Velocity legend */}
            <div className="space-y-2">
              {[
                { range: "8–10", label: "Hot — act fast", color: "#ef4444" },
                { range: "5–7", label: "Moving — watch closely", color: "#eab308" },
                { range: "1–4", label: "Stable — lower urgency", color: "#60a5fa" },
              ].map((v) => (
                <div key={v.range} className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const threshold = v.range === "8–10" ? 8 : v.range === "5–7" ? 5 : 1;
                      const active = i < (v.range === "8–10" ? 10 : v.range === "5–7" ? 7 : 4);
                      return (
                        <div
                          key={i}
                          className="w-3 h-2 rounded-sm"
                          style={{
                            background: active && i >= threshold - 1 ? v.color : "rgba(255,255,255,0.06)",
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-white/30">
                    <span className="text-white/50 mr-1">{v.range}</span>
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot markets */}
          <div className="order-1 lg:order-2 space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={12} className="text-red-400" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-red-400/60">
                Currently hot — velocity 8+
              </span>
            </div>

            {HEAT_MARKETS.map((m) => (
              <div
                key={m.id}
                className="glass border border-red-500/10 p-4 hover:border-red-500/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-xs text-white/70 leading-snug flex-1">{m.question}</p>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold text-white">{m.probability}%</div>
                    <div
                      className={`text-[10px] font-medium ${
                        m.change > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {m.change > 0 ? "+" : ""}
                      {m.change}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-sm"
                        style={{
                          background:
                            i < m.velocity
                              ? `rgba(239,68,68,${0.3 + (i / 10) * 0.7})`
                              : "rgba(255,255,255,0.05)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-red-400/60">
                    <TrendingUp size={9} />
                    <span>Velocity {m.velocity}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
