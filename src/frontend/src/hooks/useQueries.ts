import { useQuery } from "@tanstack/react-query";
import type { Article } from "../backend.d";
import { useActor } from "./useActor";

// ── Category constants ──
export const CATEGORY_WORLD = "World";
export const CATEGORY_MIDDLE_EAST = "Middle East";
export const CATEGORY_POLITICS = "Politics";
export const CATEGORY_ANALYSIS = "Analysis";
export const CATEGORY_US = "US";
export const CATEGORY_EUROPE = "Europe";
export const CATEGORY_ASIA = "Asia";

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const FALLBACK_ARTICLES: Article[] = [
  // Featured
  {
    id: BigInt(1),
    title: "UN Security Council Deadlocked Over Gaza Ceasefire Resolution",
    isFeatured: true,
    content: "",
    date: "January 15, 2026",
    slug: "un-security-council-gaza-ceasefire",
    author: "MD Aun",
    readingTime: "8 min read",
    imageUrl: UNSPLASH("1529107386315-e1a2ed48a620", 1600),
    isBreaking: false,
    excerpt:
      "Russia and China vetoed a US-drafted resolution calling for an immediate ceasefire in Gaza, leaving the Security Council paralyzed as civilian casualties mount and international pressure intensifies.",
    category: CATEGORY_WORLD,
  },
  // World
  {
    id: BigInt(2),
    title: "NATO Summit Confronts New Russian Offensive in Eastern Europe",
    isFeatured: false,
    content: "",
    date: "February 3, 2026",
    slug: "nato-summit-russia-eastern-europe",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1541872703-74c5e44368f9", 800),
    isBreaking: false,
    excerpt:
      "Alliance leaders convened an emergency session as Russian forces advanced along a new axis in northeastern Ukraine, testing NATO's Article 5 commitments and defense spending pledges.",
    category: CATEGORY_WORLD,
  },
  {
    id: BigInt(3),
    title: "Global Food Crisis Deepens as Climate Shocks Hit Harvests",
    isFeatured: false,
    content: "",
    date: "February 18, 2026",
    slug: "global-food-crisis-climate-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1569163139599-0f4517e36f51", 800),
    isBreaking: false,
    excerpt:
      "Record droughts across sub-Saharan Africa and South Asia have driven staple grain prices to decade highs, pushing an estimated 60 million more people into food insecurity this year.",
    category: CATEGORY_WORLD,
  },
  {
    id: BigInt(4),
    title: "IMF Warns of Synchronized Global Slowdown in 2026 Outlook",
    isFeatured: false,
    content: "",
    date: "March 1, 2026",
    slug: "imf-global-slowdown-2026",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl: UNSPLASH("1611974789855-9c2a0a7236a3", 800),
    isBreaking: false,
    excerpt:
      "The International Monetary Fund cut global growth projections to 2.4%, citing geopolitical fragmentation, elevated interest rates, and declining trade volumes across major economies.",
    category: CATEGORY_WORLD,
  },
  // Middle East
  {
    id: BigInt(5),
    title: "Ceasefire Negotiations Stall as Gaza Reconstruction Talks Begin",
    isFeatured: false,
    content: "",
    date: "January 22, 2026",
    slug: "gaza-ceasefire-reconstruction-talks",
    author: "MD Aun",
    readingTime: "7 min read",
    imageUrl: UNSPLASH("1546074177-ffdda98d214f", 800),
    isBreaking: false,
    excerpt:
      "Mediators from Qatar and Egypt reported a breakdown in the latest round of negotiations as both parties hardened their positions over the terms of a permanent ceasefire agreement.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(6),
    title: "Iran Nuclear Talks Resume in Vienna Amid Regional Tensions",
    isFeatured: false,
    content: "",
    date: "February 10, 2026",
    slug: "iran-nuclear-talks-vienna-2026",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1521791055366-0236500763e1", 800),
    isBreaking: false,
    excerpt:
      "Diplomatic teams from Iran and P5+1 nations returned to Vienna for the first substantive talks in eight months, though analysts remain skeptical about bridging gaps on enrichment limits.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(7),
    title: "Saudi Arabia Accelerates Vision 2030 with New Tech Investment",
    isFeatured: false,
    content: "",
    date: "March 1, 2026",
    slug: "saudi-vision-2030-tech-investment",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl: UNSPLASH("1580537659466-0a9bfa916a54", 800),
    isBreaking: false,
    excerpt:
      "Riyadh announced a $200 billion sovereign investment tranche targeting AI infrastructure, renewable energy, and advanced manufacturing as part of its accelerated economic transformation agenda.",
    category: CATEGORY_MIDDLE_EAST,
  },
  // Politics
  {
    id: BigInt(8),
    title:
      "US Congress Passes Sweeping AI Regulation Bill After Year of Debate",
    isFeatured: false,
    content: "",
    date: "January 28, 2026",
    slug: "us-congress-ai-regulation-bill",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1518770660439-4636190af475", 800),
    isBreaking: false,
    excerpt:
      "The bipartisan Artificial Intelligence Accountability Act cleared the Senate 68-32, establishing mandatory safety testing, disclosure requirements, and a new federal oversight office for high-risk AI systems.",
    category: CATEGORY_POLITICS,
  },
  {
    id: BigInt(9),
    title: "European Parliament Votes on Migration Policy Overhaul",
    isFeatured: false,
    content: "",
    date: "February 14, 2026",
    slug: "european-parliament-migration-policy",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1572949645880-007c1f57d42e", 800),
    isBreaking: false,
    excerpt:
      "MEPs approved a controversial asylum reform package that centralizes border processing and introduces mandatory burden-sharing quotas, prompting sharp criticism from Eastern European member states.",
    category: CATEGORY_POLITICS,
  },
  {
    id: BigInt(10),
    title: "India-China Border Diplomacy Sees Cautious Progress in 2026",
    isFeatured: false,
    content: "",
    date: "March 1, 2026",
    slug: "india-china-border-diplomacy-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1504711434969-e33886168f5c", 800),
    isBreaking: false,
    excerpt:
      "Senior military commanders from India and China reached a provisional agreement on a second disengagement site along the Line of Actual Control, raising cautious optimism for bilateral stabilization.",
    category: CATEGORY_POLITICS,
  },
  // Analysis
  {
    id: BigInt(11),
    title: "The Israel–Iran Conflict: A Comprehensive Analysis",
    isFeatured: false,
    content: "israel-iran-full-content",
    date: "January 10, 2026",
    slug: "israel-iran-conflict-analysis",
    author: "MD Aun",
    readingTime: "15 min read",
    imageUrl: UNSPLASH("1525026760597-50c5a6f26e78", 800),
    isBreaking: false,
    excerpt:
      "From pre-1979 alliance to proxy wars, nuclear brinkmanship, and the first direct state-on-state missile exchange — a comprehensive factual analysis of one of the defining geopolitical rivalries of our era.",
    category: CATEGORY_ANALYSIS,
  },
  {
    id: BigInt(12),
    title: "The New Cold War: How Great Power Competition Reshaped 2025",
    isFeatured: false,
    content: "",
    date: "March 1, 2026",
    slug: "new-cold-war-great-power-competition",
    author: "MD Aun",
    readingTime: "12 min read",
    imageUrl: UNSPLASH("1486325212027-8081e485255e", 800),
    isBreaking: false,
    excerpt:
      "US-China rivalry, Russia's continued belligerence, and the fracturing of multilateral institutions defined a year in which the rules-based international order faced its most sustained challenge since 1945.",
    category: CATEGORY_ANALYSIS,
  },
  // US
  {
    id: BigInt(17),
    title: "US Federal Reserve Holds Rates Amid Inflation Uncertainty",
    isFeatured: false,
    content: "",
    date: "February 20, 2026",
    slug: "us-federal-reserve-rates-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1444653614773-995674bc4f29", 800),
    isBreaking: false,
    excerpt:
      "The Federal Open Market Committee voted 10-2 to maintain the benchmark rate at 4.75%, citing conflicting signals from the labor market and persistent services inflation as key uncertainties.",
    category: CATEGORY_US,
  },
  {
    id: BigInt(18),
    title: "US-Mexico Border Policy Faces Legal Challenge in Federal Court",
    isFeatured: false,
    content: "",
    date: "February 25, 2026",
    slug: "us-mexico-border-policy-legal-challenge",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1541872703-74c5e44368f9", 800),
    isBreaking: false,
    excerpt:
      "A federal district court in Texas issued a preliminary injunction blocking key provisions of the administration's expanded border enforcement policy, setting the stage for a Supreme Court confrontation.",
    category: CATEGORY_US,
  },
  {
    id: BigInt(19),
    title: "Silicon Valley Layoffs Continue as AI Automation Accelerates",
    isFeatured: false,
    content: "",
    date: "March 1, 2026",
    slug: "silicon-valley-layoffs-ai-automation-2026",
    author: "MD Aun",
    readingTime: "7 min read",
    imageUrl: UNSPLASH("1518770660439-4636190af475", 800),
    isBreaking: false,
    excerpt:
      "Major tech companies collectively announced 45,000 job cuts in the first quarter of 2026, with executives citing AI-driven productivity gains as the primary factor restructuring their workforce needs.",
    category: CATEGORY_US,
  },
  // Europe
  {
    id: BigInt(20),
    title: "Germany Announces Record Defense Budget for 2026-2027 Fiscal Year",
    isFeatured: false,
    content: "",
    date: "January 30, 2026",
    slug: "germany-record-defense-budget-2026",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl: UNSPLASH("1486325212027-8081e485255e", 800),
    isBreaking: false,
    excerpt:
      "Berlin approved a 2.5% of GDP defense allocation for the upcoming fiscal year, the highest since reunification, fulfilling its long-delayed NATO commitment and signaling a fundamental shift in German strategic culture.",
    category: CATEGORY_EUROPE,
  },
  {
    id: BigInt(21),
    title: "France-UK Nuclear Sharing Agreement Reshapes European Security",
    isFeatured: false,
    content: "",
    date: "February 8, 2026",
    slug: "france-uk-nuclear-sharing-european-security",
    author: "MD Aun",
    readingTime: "8 min read",
    imageUrl: UNSPLASH("1541872703-74c5e44368f9", 800),
    isBreaking: false,
    excerpt:
      "Paris and London announced a landmark agreement on nuclear deterrence coordination, offering extended deterrence guarantees to European partners in what analysts called the most significant shift in European security architecture in decades.",
    category: CATEGORY_EUROPE,
  },
  {
    id: BigInt(22),
    title: "ECB Signals Rate Cuts as Eurozone Economy Contracts",
    isFeatured: false,
    content: "",
    date: "March 1, 2026",
    slug: "ecb-rate-cuts-eurozone-contraction-2026",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl: UNSPLASH("1611974789855-9c2a0a7236a3", 800),
    isBreaking: false,
    excerpt:
      "European Central Bank President signaled readiness to cut rates below 2% as GDP data confirmed the eurozone entered a technical recession, driven by weak German industrial output and sluggish consumer spending.",
    category: CATEGORY_EUROPE,
  },
  // Asia
  {
    id: BigInt(23),
    title: "China's Property Sector Crisis Deepens Despite Stimulus Package",
    isFeatured: false,
    content: "",
    date: "January 25, 2026",
    slug: "china-property-crisis-stimulus-2026",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1504711434969-e33886168f5c", 800),
    isBreaking: false,
    excerpt:
      "Beijing's third attempt to stabilize its embattled real estate sector showed limited results, as home prices continued to decline for the 18th consecutive month and developer defaults mounted.",
    category: CATEGORY_ASIA,
  },
  {
    id: BigInt(24),
    title: "Japan's Demographic Decline Accelerates Economic Planning Overhaul",
    isFeatured: false,
    content: "",
    date: "February 12, 2026",
    slug: "japan-demographic-decline-economic-overhaul",
    author: "MD Aun",
    readingTime: "7 min read",
    imageUrl: UNSPLASH("1569163139599-0f4517e36f51", 800),
    isBreaking: false,
    excerpt:
      "Tokyo's new five-year economic plan acknowledged for the first time that Japan's shrinking workforce requires a fundamental rethinking of growth models, with major implications for immigration policy and automation investment.",
    category: CATEGORY_ASIA,
  },
  {
    id: BigInt(25),
    title: "ASEAN Divided Over South China Sea Territorial Escalation",
    isFeatured: false,
    content: "",
    date: "March 1, 2026",
    slug: "asean-south-china-sea-escalation-2026",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl: UNSPLASH("1504711434969-e33886168f5c", 800),
    isBreaking: false,
    excerpt:
      "The Association of Southeast Asian Nations failed to issue a unified statement on escalating Chinese activity around the Spratly Islands, exposing deep divisions within the bloc and emboldening Beijing's posture.",
    category: CATEGORY_ASIA,
  },
  // ── Iran–Israel Conflict Focus (Feb 2026) ──
  {
    id: BigInt(13),
    title:
      "US and Israel Strike Iran as Netanyahu Says 'Many Signs' Khamenei No Longer Alive",
    isFeatured: false,
    content: "israel-iran-full-content",
    date: "February 14, 2026",
    slug: "us-israel-strike-iran-khamenei",
    author: "MD Aun",
    readingTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1525026760597-50c5a6f26e78?auto=format&fit=crop&w=1200&q=80",
    isBreaking: true,
    excerpt:
      "American and Israeli forces carried out coordinated strikes on Iranian nuclear and military infrastructure early Friday, as Prime Minister Netanyahu addressed the nation citing multiple intelligence indicators suggesting Supreme Leader Khamenei may no longer be alive.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(14),
    title:
      "Iran Vows Revenge After Killing of Its Top Leader; Trade Strikes with Israel",
    isFeatured: false,
    content: "",
    date: "February 15, 2026",
    slug: "iran-vows-revenge-khamenei-killed",
    author: "MD Aun",
    readingTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1521791055366-0236500763e1?auto=format&fit=crop&w=800&q=80",
    isBreaking: true,
    excerpt:
      "Iran's Revolutionary Guards Command issued a formal declaration of revenge operations after confirming the death of Supreme Leader Ali Khamenei. Ballistic missiles targeted Israeli cities as the conflict entered its most dangerous phase since 1948.",
    category: CATEGORY_MIDDLE_EAST,
  },
  {
    id: BigInt(15),
    title: "China Condemns Attacks on Iran, Urges Immediate Ceasefire at UN",
    isFeatured: false,
    content: "",
    date: "February 16, 2026",
    slug: "china-condemns-iran-attacks-ceasefire",
    author: "MD Aun",
    readingTime: "4 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    excerpt:
      "Beijing issued its strongest condemnation of the US-Israeli military operation against Iran, calling it a 'flagrant violation of international law' and demanding an emergency UN Security Council session to impose an immediate ceasefire.",
    category: CATEGORY_POLITICS,
  },
  {
    id: BigInt(16),
    title: "Israel Rallies in National Unity to Support Attack on Iran",
    isFeatured: false,
    content: "",
    date: "February 17, 2026",
    slug: "israel-national-unity-iran-attack",
    author: "MD Aun",
    readingTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    isBreaking: false,
    excerpt:
      "Israel's fractured political landscape unified behind a national emergency government as tens of thousands rallied in Tel Aviv supporting the government's decision to strike Iranian nuclear and military targets.",
    category: CATEGORY_WORLD,
  },
];

export const BREAKING_NEWS_FALLBACK = [
  "BREAKING: US and Israeli forces conduct joint strike on Iranian nuclear facilities — Feb 14, 2026",
  "DEVELOPING: Khamenei fate unknown; Israeli PM Netanyahu cites 'many signs' top leader no longer alive",
  "URGENT: Iran launches retaliatory missile barrage targeting Tel Aviv and Haifa — IDF intercepts 94%",
  "LIVE: China calls emergency UN Security Council session; urges immediate ceasefire",
  "UPDATE: Israel Knesset votes national unity government — full cabinet backs Iran operation",
  "BREAKING: Oil prices surge 12% as Strait of Hormuz threatened; global markets in turmoil",
  "ALERT: US carrier group moves to Eastern Mediterranean; Pentagon activates rapid response",
];

// ── React Query hooks ──

export function useGetAllArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ARTICLES;
      try {
        const result = await Promise.race([
          actor.getArticles(),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0 ? result : FALLBACK_ARTICLES;
      } catch {
        return FALLBACK_ARTICLES;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: FALLBACK_ARTICLES,
  });
}

export function useGetFeaturedArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["featured-articles"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ARTICLES.filter((a) => a.isFeatured);
      try {
        const result = await Promise.race([
          actor.getFeaturedArticles(),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0
          ? result
          : FALLBACK_ARTICLES.filter((a) => a.isFeatured);
      } catch {
        return FALLBACK_ARTICLES.filter((a) => a.isFeatured);
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: FALLBACK_ARTICLES.filter((a) => a.isFeatured),
  });
}

export function useGetArticlesByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles-by-category", category],
    queryFn: async () => {
      if (!actor)
        return FALLBACK_ARTICLES.filter((a) => a.category === category);
      try {
        const result = await Promise.race([
          actor.getArticlesByCategory(category),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0
          ? result
          : FALLBACK_ARTICLES.filter((a) => a.category === category);
      } catch {
        return FALLBACK_ARTICLES.filter((a) => a.category === category);
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: FALLBACK_ARTICLES.filter((a) => a.category === category),
  });
}

export function useGetBreakingNews() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["breaking-news"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ARTICLES.filter((a) => a.isBreaking);
      try {
        const result = await Promise.race([
          actor.getBreakingArticles(),
          new Promise<Article[]>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000),
          ),
        ]);
        return result.length > 0
          ? result
          : FALLBACK_ARTICLES.filter((a) => a.isBreaking);
      } catch {
        return FALLBACK_ARTICLES.filter((a) => a.isBreaking);
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
    placeholderData: FALLBACK_ARTICLES.filter((a) => a.isBreaking),
  });
}
