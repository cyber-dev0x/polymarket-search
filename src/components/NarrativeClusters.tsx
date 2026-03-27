"use client";

import { TrendingUp, TrendingDown, Minus, Zap } from "lucide-react";
import { NARRATIVE_CLUSTERS } from "@/lib/mockData";

export default function NarrativeClusters() {
  return (
    <section id="signals" className="py-24 px-6 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
              Signal Layer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Narrative clusters.
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Markets don&apos;t move alone. They move in clusters — connected by shared
              narratives, actors, and events. Polymarket Search maps those clusters so
              you see the story, not just the odds.
            </p>

            {/* Heat mode explainer */}
            <div className="glass border border-red-500/15 p-5 bg-red-500/3">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={12} className="text-red-400" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-red-400/70">
                  Heat Mode
                </span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Heat Mode surfaces only markets with velocity scores ≥ 8 — the ones
                where probability is shifting fast enough that minutes matter.
              </p>
            </div>
          </div>

          {/* Right — cluster grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NARRATIVE_CLUSTERS.map((cluster) => {
              const TrendIcon =
                cluster.trend === "up"
                  ? TrendingUp
                  : cluster.trend === "down"
                  ? TrendingDown
                  : Minus;
              const trendColor =
                cluster.trend === "up"
                  ? "text-green-400"
                  : cluster.trend === "down"
                  ? "text-red-400"
                  : "text-white/30";
              const isHot = cluster.velocity >= 8;

              return (
                <div
                  key={cluster.name}
                  className={`glass border p-4 hover:bg-white/5 transition-all duration-200 cursor-pointer relative ${
                    isHot ? "border-red-500/20" : "border-white/5"
                  }`}
                >
                  {isHot && (
                    <div className="absolute top-2 right-2">
                      <span className="text-[8px] tracking-widest uppercase text-red-400/70 bg-red-500/10 px-1.5 py-0.5">
                        Hot
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 mb-3">
                    <TrendIcon size={12} className={trendColor} />
                    <span className={`text-[9px] uppercase tracking-widest ${trendColor}`}>
                      {cluster.trend}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-white/80 mb-1">
                    {cluster.name}
                  </div>
                  <div className="text-[10px] text-white/25">
                    {cluster.count} markets
                  </div>

                  {/* Velocity bar */}
                  <div className="mt-3 flex items-center gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full"
                        style={{
                          background:
                            i < cluster.velocity
                              ? cluster.velocity >= 8
                                ? "rgba(239,68,68,0.6)"
                                : cluster.velocity >= 5
                                ? "rgba(234,179,8,0.5)"
                                : "rgba(96,165,250,0.4)"
                              : "rgba(255,255,255,0.06)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
