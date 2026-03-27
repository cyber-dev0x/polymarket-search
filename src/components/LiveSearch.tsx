"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Filter,
  X,
} from "lucide-react";
import { searchMarkets, MARKETS, type Market } from "@/lib/mockData";

const CATEGORIES = ["All", "Politics", "Finance", "Crypto", "Geopolitics", "Technology"];

const DEMO_QUERIES = ["Trump", "Fed", "Bitcoin ETF", "Iran", "AI regulation", "2026 midterms"];

function ProbabilityBar({ probability }: { probability: number }) {
  const color =
    probability >= 70 ? "#22c55e" : probability >= 40 ? "#eab308" : "#ef4444";
  return (
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${probability}%`,
          background: color,
          boxShadow: `0 0 8px ${color}40`,
        }}
      />
    </div>
  );
}

function VelocityScore({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-1 h-3 rounded-full"
          style={{
            background: i < score ? (score >= 8 ? "#ef4444" : score >= 5 ? "#eab308" : "#60a5fa") : "rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}

function MarketCard({ market, index }: { market: Market; index: number }) {
  const isUp = market.change > 0;
  const isFlat = market.change === 0;

  return (
    <div
      className="result-card glass border border-white/5 p-4 rounded-none"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-sm text-white/80 leading-snug flex-1 font-medium">
          {market.question}
        </p>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-2xl font-bold text-white">
            {market.probability}%
          </span>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              isUp ? "text-green-400" : isFlat ? "text-white/30" : "text-red-400"
            }`}
          >
            {isUp ? (
              <TrendingUp size={10} />
            ) : isFlat ? (
              <Minus size={10} />
            ) : (
              <TrendingDown size={10} />
            )}
            {isUp ? "+" : ""}
            {market.change}%
          </div>
        </div>
      </div>

      <ProbabilityBar probability={market.probability} />

      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-wrap gap-1">
          {market.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] tracking-widest uppercase text-white/30 border border-white/8 bg-white/2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] text-white/30 font-mono">{market.volume}</span>
          <VelocityScore score={market.velocity} />
        </div>
      </div>
    </div>
  );
}

function InsightPanel({ markets }: { markets: Market[] }) {
  const avgProb = markets.length
    ? Math.round(markets.reduce((s, m) => s + m.probability, 0) / markets.length)
    : 0;
  const topMover = markets.reduce(
    (best, m) => (Math.abs(m.change) > Math.abs(best?.change || 0) ? m : best),
    markets[0]
  );
  const hottest = markets.reduce(
    (best, m) => (m.velocity > (best?.velocity || 0) ? m : best),
    markets[0]
  );

  return (
    <div className="glass border border-white/5 p-5 space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Zap size={12} className="text-yellow-400" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          Signal Panel
        </span>
      </div>

      <div>
        <div className="text-[9px] tracking-widest uppercase text-white/25 mb-1">
          Avg Probability
        </div>
        <div className="text-3xl font-bold text-white">{avgProb || "—"}%</div>
      </div>

      {topMover && (
        <div>
          <div className="text-[9px] tracking-widest uppercase text-white/25 mb-2">
            Top Mover
          </div>
          <p className="text-xs text-white/60 leading-snug">{topMover.question}</p>
          <div
            className={`text-sm font-bold mt-1 ${
              topMover.change > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {topMover.change > 0 ? "+" : ""}
            {topMover.change}%
          </div>
        </div>
      )}

      {hottest && (
        <div>
          <div className="text-[9px] tracking-widest uppercase text-white/25 mb-2">
            Highest Velocity
          </div>
          <p className="text-xs text-white/60 leading-snug">{hottest.question}</p>
          <div className="mt-2">
            <VelocityScore score={hottest.velocity} />
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-white/5">
        <div className="text-[9px] tracking-widest uppercase text-white/25 mb-2">
          Volume Distribution
        </div>
        {markets.slice(0, 4).map((m) => (
          <div key={m.id} className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/30 rounded-full"
                style={{
                  width: `${(parseFloat(m.volume.replace(/[$M]/g, "")) / 10) * 100}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-white/30 font-mono w-10 text-right">
              {m.volume}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Market[]>(MARKETS.slice(0, 6));
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [heatMode, setHeatMode] = useState(false);

  const runSearch = useCallback(
    (q: string, cat: string, heat: boolean) => {
      setLoading(true);
      setTimeout(() => {
        let res = searchMarkets(q);
        if (cat !== "All") res = res.filter((m) => m.category === cat);
        if (heat) res = res.filter((m) => m.velocity >= 8);
        setResults(res);
        setLoading(false);
      }, 200);
    },
    []
  );

  useEffect(() => {
    runSearch(query, category, heatMode);
  }, [query, category, heatMode, runSearch]);

  // Listen for hero search events
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setQuery(e.detail.query);
    };
    window.addEventListener("heroSearch", handler as EventListener);
    return () => window.removeEventListener("heroSearch", handler as EventListener);
  }, []);

  return (
    <section id="live-search" className="py-24 px-6 bg-[#080808] relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-10">
          <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">
            Live Market Search
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Search. Signal. Speed.
          </h2>
        </div>

        {/* Demo query pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {DEMO_QUERIES.map((dq) => (
            <button
              key={dq}
              onClick={() => setQuery(dq)}
              className={`px-3 py-1.5 text-[10px] tracking-widest uppercase transition-all border ${
                query === dq
                  ? "border-white/40 text-white bg-white/8"
                  : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/50"
              }`}
            >
              {dq}
            </button>
          ))}
        </div>

        {/* 3-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-4">
          {/* Filters */}
          <div className="space-y-4">
            <div className="glass border border-white/5 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={12} className="text-white/30" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                  Filters
                </span>
              </div>

              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-all ${
                      category === cat
                        ? "bg-white/8 text-white border-l-2 border-white pl-2.5"
                        : "text-white/40 hover:text-white/60 hover:bg-white/4"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <button
                  onClick={() => setHeatMode((h) => !h)}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-xs tracking-wide transition-all ${
                    heatMode
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "text-white/40 hover:text-white/60 border border-white/5"
                  }`}
                >
                  <Zap size={11} className={heatMode ? "text-red-400" : "text-white/30"} />
                  Heat Mode
                  {heatMode && (
                    <span className="ml-auto text-[9px] bg-red-500/20 px-1.5 py-0.5 rounded">
                      ON
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Quick filters */}
            <div className="glass border border-white/5 p-4">
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
                Quick Filters
              </div>
              {["High probability (>60%)", "Top movers (>5%)", "High volume (>$5M)", "Ending soon"].map(
                (f) => (
                  <label key={f} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <div className="w-3 h-3 border border-white/15 group-hover:border-white/30 transition-colors" />
                    <span className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors">
                      {f}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Results */}
          <div>
            {/* Search bar */}
            <div className="relative mb-4">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                size={16}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search markets, narratives, events..."
                className="search-input w-full glass border border-white/8 pl-11 pr-10 py-3.5 text-sm text-white placeholder:text-white/20 tracking-wide focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-widest uppercase text-white/25">
                {loading ? "Searching..." : `${results.length} markets found`}
              </span>
              {heatMode && (
                <span className="text-[10px] text-red-400 tracking-widest uppercase">
                  Heat mode — velocity ≥ 8
                </span>
              )}
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 glass border border-white/5 animate-pulse"
                  />
                ))
              ) : results.length === 0 ? (
                <div className="py-16 text-center text-white/20 text-sm">
                  No markets found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((m, i) => (
                  <MarketCard key={m.id} market={m} index={i} />
                ))
              )}
            </div>
          </div>

          {/* Insight panel */}
          <div>
            <InsightPanel markets={results} />
          </div>
        </div>
      </div>
    </section>
  );
}
