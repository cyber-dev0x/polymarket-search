export interface Market {
  id: string;
  question: string;
  probability: number;
  volume: string;
  change: number;
  tags: string[];
  category: string;
  endDate: string;
  velocity: number; // 1-10 momentum score
}

export const MARKETS: Market[] = [
  // Trump
  {
    id: "1",
    question: "Will Trump issue a national emergency over tariffs in 2025?",
    probability: 61,
    volume: "$4.2M",
    change: +8.3,
    tags: ["Trump", "Trade", "Policy"],
    category: "Politics",
    endDate: "Dec 31, 2025",
    velocity: 9,
  },
  {
    id: "2",
    question: "Will Trump be impeached in his second term?",
    probability: 12,
    volume: "$2.8M",
    change: -1.2,
    tags: ["Trump", "Congress", "Politics"],
    category: "Politics",
    endDate: "Jan 20, 2029",
    velocity: 4,
  },
  {
    id: "3",
    question: "Will Trump's approval rating exceed 55% in 2025?",
    probability: 24,
    volume: "$1.1M",
    change: +2.1,
    tags: ["Trump", "Polls"],
    category: "Politics",
    endDate: "Dec 31, 2025",
    velocity: 6,
  },
  // Fed
  {
    id: "4",
    question: "Will the Fed cut rates in Q2 2025?",
    probability: 43,
    volume: "$8.7M",
    change: -5.4,
    tags: ["Fed", "Rates", "Macro"],
    category: "Finance",
    endDate: "Jun 30, 2025",
    velocity: 10,
  },
  {
    id: "5",
    question: "Will the Fed pause rate cuts for 2 consecutive meetings?",
    probability: 67,
    volume: "$3.3M",
    change: +12.1,
    tags: ["Fed", "Rates", "Macro"],
    category: "Finance",
    endDate: "Sep 30, 2025",
    velocity: 8,
  },
  {
    id: "6",
    question: "Will inflation drop below 2.5% before end of 2025?",
    probability: 38,
    volume: "$5.6M",
    change: +3.8,
    tags: ["Fed", "Inflation", "Macro"],
    category: "Finance",
    endDate: "Dec 31, 2025",
    velocity: 7,
  },
  // Bitcoin ETF
  {
    id: "7",
    question: "Will Bitcoin spot ETF AUM exceed $100B in 2025?",
    probability: 72,
    volume: "$6.4M",
    change: +9.7,
    tags: ["Bitcoin ETF", "Crypto", "Finance"],
    category: "Crypto",
    endDate: "Dec 31, 2025",
    velocity: 9,
  },
  {
    id: "8",
    question: "Will a Bitcoin ETF options product launch in 2025?",
    probability: 85,
    volume: "$2.1M",
    change: +4.2,
    tags: ["Bitcoin ETF", "Crypto"],
    category: "Crypto",
    endDate: "Dec 31, 2025",
    velocity: 6,
  },
  {
    id: "9",
    question: "Will Bitcoin ETF daily volume exceed $5B in a single day?",
    probability: 58,
    volume: "$1.8M",
    change: +11.3,
    tags: ["Bitcoin ETF", "Crypto", "Volume"],
    category: "Crypto",
    endDate: "Jun 30, 2025",
    velocity: 8,
  },
  // Iran
  {
    id: "10",
    question: "Will Iran resume nuclear enrichment talks in 2025?",
    probability: 34,
    volume: "$3.2M",
    change: +15.2,
    tags: ["Iran", "Nuclear", "Geopolitics"],
    category: "Geopolitics",
    endDate: "Dec 31, 2025",
    velocity: 10,
  },
  {
    id: "11",
    question: "Will the US impose new sanctions on Iran in 2025?",
    probability: 78,
    volume: "$4.5M",
    change: +6.1,
    tags: ["Iran", "Sanctions", "Geopolitics"],
    category: "Geopolitics",
    endDate: "Dec 31, 2025",
    velocity: 7,
  },
  // AI
  {
    id: "12",
    question: "Will an AI regulation bill pass in the US Congress by end of 2025?",
    probability: 18,
    volume: "$7.2M",
    change: -2.8,
    tags: ["AI regulation", "Tech", "Policy"],
    category: "Technology",
    endDate: "Dec 31, 2025",
    velocity: 5,
  },
  {
    id: "13",
    question: "Will OpenAI release GPT-5 in 2025?",
    probability: 81,
    volume: "$5.9M",
    change: +7.4,
    tags: ["AI", "OpenAI", "Tech"],
    category: "Technology",
    endDate: "Dec 31, 2025",
    velocity: 8,
  },
  // 2026 midterms
  {
    id: "14",
    question: "Will Republicans retain House majority in 2026 midterms?",
    probability: 55,
    volume: "$9.1M",
    change: +1.3,
    tags: ["2026 midterms", "Republicans", "Congress"],
    category: "Politics",
    endDate: "Nov 3, 2026",
    velocity: 6,
  },
  {
    id: "15",
    question: "Will Democrats flip the Senate in 2026?",
    probability: 41,
    volume: "$6.3M",
    change: +3.7,
    tags: ["2026 midterms", "Democrats", "Senate"],
    category: "Politics",
    endDate: "Nov 3, 2026",
    velocity: 7,
  },
];

export function searchMarkets(query: string): Market[] {
  if (!query.trim()) return MARKETS.slice(0, 6);
  const q = query.toLowerCase();
  return MARKETS.filter(
    (m) =>
      m.question.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q)) ||
      m.category.toLowerCase().includes(q)
  ).sort((a, b) => b.velocity - a.velocity);
}

export const NARRATIVE_CLUSTERS = [
  { name: "Fed Policy", count: 23, trend: "up", velocity: 9 },
  { name: "Trump Executive Actions", count: 41, trend: "up", velocity: 10 },
  { name: "Crypto Regulation", count: 18, trend: "up", velocity: 8 },
  { name: "AI Legislation", count: 15, trend: "neutral", velocity: 5 },
  { name: "Geopolitical Flashpoints", count: 32, trend: "up", velocity: 9 },
  { name: "2026 Midterms", count: 28, trend: "up", velocity: 7 },
  { name: "Energy Markets", count: 11, trend: "down", velocity: 4 },
  { name: "Healthcare Policy", count: 9, trend: "neutral", velocity: 3 },
];

export const HEAT_MARKETS = MARKETS.filter((m) => m.velocity >= 8);
