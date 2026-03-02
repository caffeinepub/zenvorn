import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  Clock,
  Globe,
  Instagram,
  Menu,
  Radio,
  Search,
  Shield,
  TrendingUp,
  X,
} from "lucide-react";
import type { Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Article } from "./backend.d";
import {
  BREAKING_NEWS_FALLBACK,
  CATEGORY_ANALYSIS,
  CATEGORY_ASIA,
  CATEGORY_EUROPE,
  CATEGORY_MIDDLE_EAST,
  CATEGORY_POLITICS,
  CATEGORY_US,
  CATEGORY_WORLD,
  FALLBACK_ARTICLES,
  useGetAllArticles,
} from "./hooks/useQueries";

// ──────────────────────────────────────────────
// ANIMATION VARIANTS
// ──────────────────────────────────────────────

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────

type CategoryKey =
  | "World"
  | "Middle East"
  | "Politics"
  | "Analysis"
  | "US"
  | "Europe"
  | "Asia";

function getCategoryBadgeClass(cat: string): string {
  const map: Record<string, string> = {
    [CATEGORY_WORLD]: "badge-world",
    [CATEGORY_MIDDLE_EAST]: "badge-mideast",
    [CATEGORY_POLITICS]: "badge-politics",
    [CATEGORY_ANALYSIS]: "badge-analysis",
    [CATEGORY_US]: "badge-us",
    [CATEGORY_EUROPE]: "badge-europe",
    [CATEGORY_ASIA]: "badge-asia",
  };
  return map[cat] ?? "badge-world";
}

function getArticlesByCategory(articles: Article[], cat: string): Article[] {
  return articles.filter((a) => a.category === cat);
}

function getFeaturedArticle(articles: Article[]): Article | undefined {
  return articles.find((a) => a.isFeatured) ?? articles[0];
}

// Unsplash URL builder
function unsplash(id: string, w = 800, h = 600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

// Map category/context to best Unsplash photo
function getContextualImage(article: Article): string {
  if (article.imageUrl?.startsWith("https://")) {
    return article.imageUrl;
  }
  const slugMap: Record<string, string> = {
    "un-security-council-gaza-ceasefire": unsplash(
      "1529107386315-e1a2ed48a620",
      1600,
      900,
    ),
    "nato-summit-russia-eastern-europe": unsplash("1541872703-74c5e44368f9"),
    "global-food-crisis-climate-2026": unsplash("1569163139599-0f4517e36f51"),
    "imf-global-slowdown-2026": unsplash("1611974789855-9c2a0a7236a3"),
    "gaza-ceasefire-reconstruction-talks": unsplash("1546074177-ffdda98d214f"),
    "iran-nuclear-talks-vienna-2026": unsplash("1521791055366-0236500763e1"),
    "saudi-vision-2030-tech-investment": unsplash("1580537659466-0a9bfa916a54"),
    "us-congress-ai-regulation-bill": unsplash("1518770660439-4636190af475"),
    "european-parliament-migration-policy": unsplash(
      "1572949645880-007c1f57d42e",
    ),
    "india-china-border-diplomacy-2026": unsplash("1504711434969-e33886168f5c"),
    "israel-iran-conflict-analysis": unsplash("1525026760597-50c5a6f26e78"),
    "new-cold-war-great-power-competition": unsplash(
      "1486325212027-8081e485255e",
    ),
  };
  return slugMap[article.slug] ?? unsplash("1504711434969-e33886168f5c");
}

// ──────────────────────────────────────────────
// ISRAEL–IRAN FULL ARTICLE DATA
// ──────────────────────────────────────────────

const timelineEvents = [
  {
    year: "1948",
    event: "State of Israel established",
    detail:
      "Iran, under Shah Mohammad Reza Pahlavi, was among the first Muslim-majority countries to recognize Israel de facto.",
    category: "diplomatic",
  },
  {
    year: "1979",
    event: "Iranian Revolution",
    detail:
      "The Islamic Revolution ends Shah rule. Ayatollah Khomeini declares Israel an enemy state and severs diplomatic ties.",
    category: "critical",
  },
  {
    year: "1982",
    event: "Hezbollah Founded",
    detail:
      "Iran's Islamic Revolutionary Guard Corps (IRGC) helps establish Hezbollah in Lebanon — a proxy force on Israel's northern border.",
    category: "military",
  },
  {
    year: "2002",
    event: "Iran's Nuclear Program Revealed",
    detail:
      "An Iranian opposition group reveals secret nuclear facilities at Natanz and Arak, bringing Iran's nuclear ambitions into the global spotlight.",
    category: "nuclear",
  },
  {
    year: "2006",
    event: "Israel–Hezbollah War",
    detail:
      "A 34-day war. Iran-supplied weapons played a central role in Hezbollah's capabilities against Israel.",
    category: "military",
  },
  {
    year: "2010",
    event: "Stuxnet Cyberattack",
    detail:
      "A sophisticated worm (attributed to the US and Israel) destroys approximately 1,000 Iranian nuclear centrifuges at Natanz.",
    category: "covert",
  },
  {
    year: "2015",
    event: "JCPOA Nuclear Deal Signed",
    detail:
      "Iran signs the Joint Comprehensive Plan of Action with the US, UK, France, Germany, Russia, and China.",
    category: "diplomatic",
  },
  {
    year: "2018",
    event: "US Withdraws from JCPOA",
    detail:
      "President Trump withdraws from the nuclear deal and reimposed sweeping sanctions. Iran gradually begins exceeding enrichment limits.",
    category: "diplomatic",
  },
  {
    year: "2020",
    event: "Assassination of General Soleimani",
    detail:
      "A US drone strike kills IRGC Quds Force commander Qasem Soleimani near Baghdad. Iran retaliates with missile strikes on US bases in Iraq.",
    category: "critical",
  },
  {
    year: "2021–2023",
    event: "Shadow War Intensifies",
    detail:
      "Multiple Iranian nuclear scientists and IRGC officers are assassinated in operations attributed to Israel's Mossad.",
    category: "covert",
  },
  {
    year: "Oct 7, 2023",
    event: "Hamas Attacks on Israel",
    detail:
      "Hamas launches the deadliest attack on Israel since its founding, killing approximately 1,200 people. Iran denies direct operational involvement.",
    category: "critical",
  },
  {
    year: "April 2024",
    event: "Iran's First Direct Attack on Israel",
    detail:
      "Iran launches over 300 drones and ballistic missiles directly at Israel — the first direct attack in history. ~99% intercepted.",
    category: "critical",
  },
];

const tlCategoryMap: Record<string, string> = {
  diplomatic: "tl-badge-diplomatic",
  critical: "tl-badge-critical",
  military: "tl-badge-military",
  nuclear: "tl-badge-nuclear",
  covert: "tl-badge-covert",
};

const turningPoints = [
  {
    year: "1990s–2000s",
    title: "Iran's Nuclear Program as a Flashpoint",
    body: "Iran secretly developed uranium enrichment capabilities, which Western intelligence and Israel identified as a potential weapons program. Israel began lobbying Western governments to impose sanctions and threatened military action if Iran approached nuclear weapons capability.",
  },
  {
    year: "2010",
    title: "Stuxnet: The First Major Cyberweapon",
    body: "A sophisticated computer worm physically destroyed approximately 1,000 centrifuges at Iran's Natanz facility. Stuxnet represented a new domain of conflict — cyber warfare against physical infrastructure.",
  },
  {
    year: "2015",
    title: "JCPOA: A Temporary Diplomatic Breakthrough",
    body: "The Joint Comprehensive Plan of Action limited Iran's uranium enrichment to 3.67% and imposed strict IAEA inspections in exchange for sanctions relief. Israel vigorously opposed the deal.",
  },
  {
    year: "2018",
    title: "US Withdrawal from JCPOA",
    body: "Trump's decision fundamentally altered the agreement's architecture. By 2024, Iran had enriched uranium to 60% purity — approaching weapons-grade levels of 90%.",
  },
  {
    year: "2021–2023",
    title: "The Shadow War Becomes Visible",
    body: "Multiple senior IRGC officers and nuclear scientists were killed in operations attributed to Mossad. Both sides operated through plausible deniability.",
  },
  {
    year: "April 2024",
    title: "The Rubicon: Iran's Direct Attack on Israel",
    body: "Following an Israeli airstrike on Iran's consulate in Damascus that killed IRGC generals, Iran launched over 300 drones and missiles at Israel. The assault was largely intercepted.",
  },
];

const futureScenarios = [
  {
    title: "Continued Shadow War",
    likelihood: "Most Likely",
    likelihoodClass: "badge-likely",
    description:
      "Both sides continue covert operations, cyberattacks, targeted assassinations, and proxy conflicts without direct large-scale war. This has been the dominant pattern since the 1980s.",
  },
  {
    title: "Diplomatic De-escalation",
    likelihood: "Possible",
    likelihoodClass: "badge-possible",
    description:
      "A renewed nuclear agreement or sustained back-channel diplomacy could reduce tensions. This would require significant political will in both Tehran and Washington.",
  },
  {
    title: "Iranian Nuclear Breakout",
    likelihood: "Increasing Risk",
    likelihoodClass: "badge-rising",
    description:
      "Iran is assessed to be weeks from weapons-grade uranium if it chose to proceed. Israel has stated this is an existential red line and may launch preemptive military strikes.",
  },
  {
    title: "Regional War Escalation",
    likelihood: "Low but Consequential",
    likelihoodClass: "badge-low-risk",
    description:
      "A major miscalculation could trigger broader conflict involving Iran, Israel, US forces, and proxy networks across Lebanon, Syria, Iraq, and Yemen simultaneously.",
  },
  {
    title: "Regime Change or Internal Transformation",
    likelihood: "Long-term Possibility",
    likelihoodClass: "badge-longterm",
    description:
      "Sustained economic pressure combined with public protests could eventually force a political transformation in Iran. The IRGC's institutional power complicates such a transition.",
  },
];

// ──────────────────────────────────────────────
// BREAKING NEWS TICKER
// ──────────────────────────────────────────────

function BreakingNewsTicker({ headlines }: { headlines: string[] }) {
  const segment = headlines.join("   ·   ");
  return (
    <div
      className="h-10 flex items-center overflow-hidden shrink-0 z-50 relative"
      style={{
        background: "oklch(0.47 0.22 18)",
        boxShadow:
          "0 2px 20px oklch(0.47 0.22 18 / 0.45), inset 0 -1px 0 oklch(0 0 0 / 0.2)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.04) 2px, oklch(0 0 0 / 0.04) 4px)",
        }}
      />
      <div
        className="shrink-0 flex items-center gap-2 px-4 h-full z-10 border-r border-white/20 relative"
        style={{ background: "oklch(0.38 0.22 15)" }}
      >
        <span className="live-dot" />
        <span className="font-body font-black text-white text-[10px] tracking-[0.22em] uppercase whitespace-nowrap">
          LIVE
        </span>
        <Radio size={10} className="text-white/70 shrink-0" />
      </div>
      <div className="flex-1 overflow-hidden relative z-10">
        <div
          className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, oklch(0.47 0.22 18), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, oklch(0.47 0.22 18), transparent)",
          }}
        />
        <div className="ticker-wrapper text-white font-body text-[11px] font-semibold tracking-wide">
          <span className="ticker-segment">{segment}</span>
          <span className="ticker-segment">{segment}</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SEARCH OVERLAY
// ──────────────────────────────────────────────

function SearchOverlay({
  isOpen,
  onClose,
  onArticleClick,
  articles,
}: {
  isOpen: boolean;
  onClose: () => void;
  onArticleClick: (a: Article) => void;
  articles: Article[];
}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [highlightedIdx, setHighlightedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setHighlightedIdx(-1);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = articles
    .filter((a) => {
      const matchesQuery =
        query.trim() === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        activeFilter === null || a.category === activeFilter;
      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 6);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIdx((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIdx((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && highlightedIdx >= 0) {
      const article = results[highlightedIdx];
      if (article) {
        onArticleClick(article);
        onClose();
      }
    }
  };

  const FILTER_OPTS: { label: string; value: string | null }[] = [
    { label: "All", value: null },
    { label: "World", value: CATEGORY_WORLD },
    { label: "Middle East", value: CATEGORY_MIDDLE_EAST },
    { label: "Politics", value: CATEGORY_POLITICS },
    { label: "Analysis", value: CATEGORY_ANALYSIS },
    { label: "US", value: CATEGORY_US },
    { label: "Europe", value: CATEGORY_EUROPE },
    { label: "Asia", value: CATEGORY_ASIA },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.dialog
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="fixed top-[4.75rem] left-0 right-0 z-50 mx-auto max-w-3xl px-4 bg-transparent border-0 p-0 m-0 w-full"
            aria-modal="true"
            aria-label="Search Zenvorn"
            open
          >
            <div
              className="bg-card/95 backdrop-blur-md shadow-2xl border border-border"
              style={{
                borderRadius: "3px",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
              onKeyDown={handleKeyDown}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search size={18} className="shrink-0 text-accent-red" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setHighlightedIdx(-1);
                  }}
                  placeholder="Search Zenvorn..."
                  className="flex-1 font-display text-xl text-foreground placeholder:text-muted-foreground bg-transparent outline-none"
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.2rem",
                  }}
                  aria-label="Search articles"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors ml-1"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border flex-wrap">
                {FILTER_OPTS.map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveFilter(value)}
                    className={`font-body text-[11px] font-semibold px-3 py-1 rounded-full border transition-all duration-150 ${
                      activeFilter === value
                        ? "text-white border-transparent"
                        : "text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground bg-muted/50"
                    }`}
                    style={
                      activeFilter === value
                        ? { background: "oklch(0.47 0.22 18)" }
                        : {}
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="divide-y divide-border">
                {results.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <Search
                      size={28}
                      className="mx-auto mb-3 text-muted-foreground/40"
                    />
                    <p className="font-body text-sm text-muted-foreground">
                      No stories found{query ? ` for "${query}"` : ""}
                    </p>
                  </div>
                ) : (
                  results.map((article, idx) => (
                    <button
                      key={Number(article.id)}
                      type="button"
                      onClick={() => {
                        onArticleClick(article);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                        highlightedIdx === idx
                          ? "bg-surface-hover"
                          : "hover:bg-surface-elevated"
                      }`}
                    >
                      <div className="shrink-0 w-12 h-12 overflow-hidden bg-muted">
                        <img
                          src={getContextualImage(article)}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-block font-body text-[9px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-sm border ${getCategoryBadgeClass(article.category)}`}
                          >
                            {article.category}
                          </span>
                        </div>
                        <p className="font-display font-bold text-foreground text-sm leading-snug truncate">
                          {article.title}
                        </p>
                        <p className="font-body text-[11px] text-muted-foreground mt-0.5">
                          {article.author} · {article.date} ·{" "}
                          {article.readingTime}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-muted-foreground/50"
                      />
                    </button>
                  ))
                )}
              </div>
              <div className="px-5 py-2.5 border-t border-border flex items-center justify-between bg-muted/30">
                <p className="font-body text-[10px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                    ↑↓
                  </kbd>{" "}
                  navigate{" · "}
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                    Enter
                  </kbd>{" "}
                  open{" · "}
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                    Esc
                  </kbd>{" "}
                  close
                </p>
                <p className="font-body text-[10px] text-muted-foreground">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}

// Hover preview dropdown for search button
function SearchHoverPreview({
  articles,
  onArticleClick,
  onOpenFull,
}: {
  articles: Article[];
  onArticleClick: (a: Article) => void;
  onOpenFull: () => void;
}) {
  const top3 = articles.slice(0, 3);
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-80 bg-card border border-border shadow-xl z-50"
      style={{ borderRadius: "3px" }}
    >
      <div className="px-4 pt-3 pb-2 border-b border-border">
        <p className="font-body text-[10px] font-bold tracking-[0.14em] uppercase text-muted-foreground">
          Top Stories
        </p>
      </div>
      {top3.map((a) => (
        <button
          key={Number(a.id)}
          type="button"
          onClick={() => onArticleClick(a)}
          className="w-full flex gap-3 items-start px-4 py-2.5 hover:bg-surface-elevated transition-colors text-left border-b border-border last:border-0"
        >
          <div className="shrink-0 w-8 h-8 overflow-hidden bg-muted mt-0.5">
            <img
              src={getContextualImage(a)}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="font-body text-xs text-foreground font-medium leading-snug line-clamp-2">
            {a.title}
          </p>
        </button>
      ))}
      <button
        type="button"
        onClick={onOpenFull}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-surface-elevated transition-colors group"
      >
        <span className="font-body text-[11px] font-semibold text-accent-red">
          Search all stories
        </span>
        <ArrowRight
          size={12}
          className="text-accent-red group-hover:translate-x-0.5 transition-transform"
        />
      </button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// NAVBAR
// ──────────────────────────────────────────────

const ALL_NAV_CATS: CategoryKey[] = [
  "World",
  "Middle East",
  "Politics",
  "Analysis",
  "US",
  "Europe",
  "Asia",
];

const PRIMARY_NAV: CategoryKey[] = [
  "World",
  "Middle East",
  "Politics",
  "Analysis",
];

function NavBar({
  onCategoryClick,
  onLogoClick,
  onEditorialClick,
  activeCategory,
  onSearchOpen,
  articles,
  onArticleClick,
}: {
  onCategoryClick: (cat: string | null) => void;
  onLogoClick: () => void;
  onEditorialClick: () => void;
  activeCategory: string | null;
  onSearchOpen: () => void;
  articles: Article[];
  onArticleClick: (a: Article) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHoverPreview, setShowHoverPreview] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSearchMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => setShowHoverPreview(true), 200);
  };

  const handleSearchMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setShowHoverPreview(false), 250);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-background ${
        scrolled
          ? "border-b border-border shadow-[0_2px_12px_oklch(0.12_0.005_260/0.08)]"
          : "border-b border-border"
      }`}
    >
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-7 flex items-center justify-between">
          <span className="font-body text-[10px] text-muted-foreground tracking-wide hidden sm:block">
            {todayStr}
          </span>
          <span className="font-body text-[10px] text-muted-foreground tracking-wide">
            Independent · Factual · Global
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex flex-col items-start shrink-0">
          <button
            type="button"
            onClick={onLogoClick}
            className="font-masthead font-black text-foreground leading-none tracking-[-0.05em] hover:opacity-80 transition-opacity"
            style={{ fontSize: "1.8rem" }}
            aria-label="Zenvorn — Go to homepage"
          >
            ZENVORN
          </button>
          <div
            className="h-0.5 w-3/4 mt-0.5 mx-auto"
            style={{ background: "oklch(0.47 0.22 18)" }}
          />
        </div>

        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {PRIMARY_NAV.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                onCategoryClick(activeCategory === label ? null : label)
              }
              className={`font-body text-[11px] font-semibold px-3.5 py-2 transition-all duration-200 relative ${
                activeCategory === label
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {activeCategory === label && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "oklch(0.47 0.22 18)" }}
                />
              )}
            </button>
          ))}
          <span className="w-px h-4 bg-border mx-1" />
          {(["US", "Europe", "Asia"] as CategoryKey[]).map((label) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                onCategoryClick(activeCategory === label ? null : label)
              }
              className={`font-body text-[11px] px-3 py-2 transition-colors relative ${
                activeCategory === label
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {activeCategory === label && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "oklch(0.47 0.22 18)" }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={handleSearchMouseEnter}
            onMouseLeave={handleSearchMouseLeave}
          >
            <button
              type="button"
              onClick={onSearchOpen}
              aria-label="Search"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-surface-elevated"
            >
              <Search size={15} />
            </button>
            <AnimatePresence>
              {showHoverPreview && (
                <SearchHoverPreview
                  articles={articles.slice(0, 3)}
                  onArticleClick={(a) => {
                    setShowHoverPreview(false);
                    onArticleClick(a);
                  }}
                  onOpenFull={() => {
                    setShowHoverPreview(false);
                    onSearchOpen();
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col gap-0 px-4 py-3">
              {ALL_NAV_CATS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    onCategoryClick(activeCategory === label ? null : label);
                    setMobileOpen(false);
                  }}
                  className={`font-body text-sm font-medium py-3 px-2 text-left border-b border-border last:border-0 transition-colors ${
                    activeCategory === label
                      ? "text-accent-red"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  onEditorialClick();
                  setMobileOpen(false);
                }}
                className="font-body text-sm font-medium py-3 px-2 text-left text-muted-foreground hover:text-foreground border-b border-border"
              >
                Editorial Standards
              </button>
              <button
                type="button"
                onClick={() => {
                  onSearchOpen();
                  setMobileOpen(false);
                }}
                className="font-body text-sm font-medium py-3 px-2 text-left text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <Search size={14} />
                Search
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ──────────────────────────────────────────────
// CATEGORY BADGE
// ──────────────────────────────────────────────

function CategoryBadge({ cat }: { cat: string }) {
  return (
    <span
      className={`inline-block font-body text-[10px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm border ${getCategoryBadgeClass(cat)}`}
    >
      {cat}
    </span>
  );
}

// ──────────────────────────────────────────────
// ARTICLE CARD (standard)
// ──────────────────────────────────────────────

function ArticleCard({
  article,
  onClick,
  size = "md",
}: {
  article: Article;
  onClick: (a: Article) => void;
  size?: "sm" | "md" | "lg";
}) {
  const imgH = size === "lg" ? "h-60" : size === "md" ? "h-48" : "h-40";
  return (
    <motion.article
      variants={fadeInUp}
      className="news-card group cursor-pointer flex flex-col"
      onClick={() => onClick(article)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(article)}
    >
      <div className={`card-img ${imgH} bg-muted shrink-0`}>
        <img
          src={getContextualImage(article)}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <CategoryBadge cat={article.category} />
          {article.isBreaking && (
            <span className="font-body text-[9px] font-black tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-sm border badge-breaking">
              Breaking
            </span>
          )}
        </div>
        <h3
          className={`card-headline font-display font-bold text-foreground leading-snug mb-2 flex-1 ${
            size === "sm" ? "text-[0.9375rem]" : "text-base"
          }`}
        >
          {article.title}
        </h3>
        {size !== "sm" && (
          <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-muted-foreground font-body text-[11px]">
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={10} />
            {article.readingTime}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ──────────────────────────────────────────────
// SKELETON LOADER
// ──────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-card p-4 border border-border">
      <div className="skeleton h-44 w-full mb-4" />
      <div className="skeleton h-3 w-16 mb-3" />
      <div className="skeleton h-5 w-full mb-2" />
      <div className="skeleton h-4 w-3/4 mb-4" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  );
}

// ──────────────────────────────────────────────
// HERO SECTION
// ──────────────────────────────────────────────

function HeroSection({
  article,
  onArticleClick,
}: {
  article: Article;
  onArticleClick: (a: Article) => void;
}) {
  return (
    <div className="relative min-h-[85vh] flex items-end overflow-hidden group">
      <div className="absolute inset-0">
        <img
          src={unsplash("1529107386315-e1a2ed48a620", 1600, 900)}
          alt=""
          className="w-full h-full object-cover transition-transform ease-out group-hover:scale-[1.03]"
          style={{ transitionDuration: "8000ms" }}
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-16 pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-[46rem]"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-5 flex items-center gap-3"
          >
            <span className="badge-breaking font-body text-[9px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm border">
              Featured
            </span>
            <CategoryBadge cat={article.category} />
            <span className="font-body text-[11px] text-white/40 ml-1">
              {article.date}
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            style={{ fontSize: "clamp(2rem, 4.8vw, 4.2rem)" }}
          >
            {article.title}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-body text-[0.9375rem] text-white/72 max-w-xl leading-relaxed mb-7"
          >
            {article.excerpt}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex items-center flex-wrap gap-5"
          >
            <div className="flex items-center gap-3 text-white/55 font-body text-xs">
              <span className="font-semibold text-white/75">
                {article.author}
              </span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {article.readingTime}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onArticleClick(article)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-body text-xs font-bold tracking-[0.08em] uppercase transition-all duration-200 rounded-sm shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5"
              style={{ background: "oklch(0.47 0.22 18)" }}
            >
              Read Full Story
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// IRAN–ISRAEL CONFLICT FOCUS SECTION
// ──────────────────────────────────────────────

function IranIsraelFocusSection({
  articles,
  onArticleClick,
}: {
  articles: Article[];
  onArticleClick: (a: Article) => void;
}) {
  const conflictArticles = articles.filter((a) =>
    [BigInt(13), BigInt(14), BigInt(15), BigInt(16)].some((id) => id === a.id),
  );

  if (conflictArticles.length === 0) return null;

  const [lead, ...secondary] = conflictArticles;
  if (!lead) return null;

  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="flex items-center gap-0 mb-2">
            <div
              className="w-1 h-6 mr-3 shrink-0"
              style={{ background: "oklch(0.47 0.22 18)" }}
            />
            <span className="font-body text-[10px] font-black tracking-[0.22em] uppercase text-accent-red">
              Conflict Focus
            </span>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="font-display font-black text-foreground text-xl tracking-[-0.02em]">
              Iran–Israel Escalation
            </h2>
            <span className="font-body text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-full">
              Updated 1 March 2026
            </span>
          </div>
          <div className="mt-3 h-px bg-border w-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
            className="lg:col-span-3 news-card cursor-pointer group"
            onClick={() => onArticleClick(lead)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onArticleClick(lead)}
          >
            <div className="card-img h-72 bg-muted overflow-hidden relative">
              <img
                src={getContextualImage(lead)}
                alt={lead.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span
                  className="font-body text-[9px] font-black tracking-[0.18em] uppercase px-2.5 py-1 text-white rounded-sm"
                  style={{ background: "oklch(0.47 0.22 18)" }}
                >
                  Conflict Focus
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <CategoryBadge cat={lead.category} />
              </div>
              <h3 className="font-display font-black text-foreground leading-tight mb-3 card-headline text-xl lg:text-2xl">
                {lead.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {lead.excerpt}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="font-body text-[11px] text-muted-foreground flex items-center gap-2">
                  <span className="font-semibold text-foreground/70">
                    Zenvorn
                  </span>
                  <span>·</span>
                  <span>{lead.date}</span>
                  <span>·</span>
                  <span>{lead.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {lead.readingTime}
                  </span>
                </div>
                <span className="font-body text-xs font-bold flex items-center gap-1.5 transition-all group-hover:gap-2 text-accent-red">
                  Read Full Coverage
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </motion.article>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {secondary.slice(0, 3).map((article) => (
              <motion.article
                key={Number(article.id)}
                variants={fadeInUp}
                className="news-card cursor-pointer group flex gap-4 p-4"
                onClick={() => onArticleClick(article)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onArticleClick(article)}
              >
                <div className="card-img shrink-0 w-20 h-20 bg-muted overflow-hidden">
                  <img
                    src={getContextualImage(article)}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <CategoryBadge cat={article.category} />
                  </div>
                  <h3 className="card-headline font-display font-bold text-foreground text-sm leading-snug mb-1.5 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-body text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={9} />
                      {article.readingTime}
                    </span>
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// LATEST UPDATES SECTION
// ──────────────────────────────────────────────

function LatestUpdatesSection({
  articles,
  onArticleClick,
}: {
  articles: Article[];
  onArticleClick: (a: Article) => void;
}) {
  const sorted = [...articles]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 6);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <section className="py-10 bg-surface-elevated border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="section-header mb-0">
            <span className="section-header-title">Latest Updates</span>
            <div className="section-header-line" />
          </div>
          <span className="font-body text-[10px] text-muted-foreground shrink-0 ml-4">
            Updated: {timeStr}
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="border border-border rounded-sm overflow-hidden"
        >
          {sorted.map((article, i) => (
            <motion.div
              key={Number(article.id)}
              variants={fadeInUp}
              className={`flex items-center gap-4 px-4 py-3.5 border-b border-border last:border-0 cursor-pointer group transition-colors ${
                i % 2 === 0 ? "bg-card" : "bg-background"
              } hover:bg-surface-hover`}
              onClick={() => onArticleClick(article)}
            >
              <span className="shrink-0 font-body text-[11px] text-muted-foreground/60 w-10 text-right tabular-nums">
                {String(article.id).padStart(2, "0")}:00
              </span>
              <span className="w-px h-3 bg-border shrink-0" />
              <div className="shrink-0">
                <CategoryBadge cat={article.category} />
              </div>
              <button
                type="button"
                onClick={() => onArticleClick(article)}
                className="flex-1 font-body text-sm font-semibold text-foreground leading-snug text-left group-hover:text-accent-red transition-colors line-clamp-1"
              >
                {article.title}
              </button>
              <span className="shrink-0 font-body text-[11px] text-muted-foreground hidden sm:block">
                {article.author}
              </span>
              <ArrowRight
                size={12}
                className="shrink-0 text-muted-foreground/40 group-hover:text-accent-red transition-colors"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// SECONDARY STORIES GRID
// ──────────────────────────────────────────────

function SecondaryStoriesGrid({
  articles,
  onArticleClick,
}: {
  articles: Article[];
  onArticleClick: (a: Article) => void;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {articles.slice(0, 3).map((article) => (
        <ArticleCard
          key={Number(article.id)}
          article={article}
          onClick={onArticleClick}
        />
      ))}
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// TRENDING STRIP
// ──────────────────────────────────────────────

function TrendingStrip({
  articles,
  onArticleClick,
}: {
  articles: Article[];
  onArticleClick: (a: Article) => void;
}) {
  const top5 = articles.slice(0, 5);
  return (
    <div className="bg-background border-y border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-header mb-6">
          <span className="section-header-title">Trending Now</span>
          <div className="section-header-line" />
        </div>
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {top5.map((article, i) => (
            <button
              key={Number(article.id)}
              type="button"
              onClick={() => onArticleClick(article)}
              className="flex-shrink-0 w-64 sm:flex-1 sm:w-auto flex gap-4 items-start px-4 py-2 border-r border-border last:border-0 hover:bg-surface-hover transition-colors text-left group"
            >
              <span className="trending-num shrink-0">{i + 1}</span>
              <div className="pt-1">
                <CategoryBadge cat={article.category} />
                <p className="font-display font-bold text-foreground text-sm leading-snug mt-2 group-hover:text-accent-red transition-colors line-clamp-3">
                  {article.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// CATEGORY SECTION
// ──────────────────────────────────────────────

function CategorySection({
  category,
  articles,
  onArticleClick,
}: {
  category: string;
  articles: Article[];
  onArticleClick: (a: Article) => void;
}) {
  const [lead, ...rest] = articles;
  if (!lead) return null;

  return (
    <section className="py-12 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-header">
          <span className="section-header-title">{category}</span>
          <div className="section-header-line" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="news-card lg:col-span-1 cursor-pointer group"
            onClick={() => onArticleClick(lead)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onArticleClick(lead)}
          >
            <div className="card-img h-60 bg-muted">
              <img
                src={getContextualImage(lead)}
                alt={lead.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <CategoryBadge cat={lead.category} />
              <h3 className="card-headline font-display font-bold text-foreground text-xl leading-snug mt-3 mb-2">
                {lead.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {lead.excerpt}
              </p>
              <div className="flex items-center gap-3 text-muted-foreground font-body text-[11px]">
                <span>{lead.author}</span>
                <span>·</span>
                <span>{lead.date}</span>
              </div>
            </div>
          </motion.article>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {rest.slice(0, 2).map((article) => (
              <ArticleCard
                key={Number(article.id)}
                article={article}
                onClick={onArticleClick}
                size="sm"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// ISRAEL/IRAN FULL ARTICLE CONTENT
// ──────────────────────────────────────────────

function IsraelIranArticleContent() {
  return (
    <div className="article-prose space-y-0">
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <BookOpen size={16} className="text-accent-red" />
          <span className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            01 · Historical Background
          </span>
        </div>
        <h2>From Alliance to Enmity: The Pre-1979 Era</h2>
        <div className="w-8 h-0.5 bg-accent-red mb-6" />
        <p>
          The Israel–Iran relationship was not always adversarial. Under Shah
          Mohammad Reza Pahlavi, Iran was one of the first Muslim-majority
          countries to recognize Israel de facto in 1950. Both nations shared
          strategic interests in countering Arab nationalist movements and
          Soviet influence in the region.
        </p>
        <p>
          This relationship transformed overnight with the 1979 Iranian
          Revolution. When Ayatollah Ruhollah Khomeini came to power, he
          declared Israel a "Little Satan" and an illegitimate state. Israel's
          embassy in Tehran was handed to the Palestine Liberation Organization
          (PLO), and diplomatic ties were formally severed.
        </p>
        <p>
          Iran subsequently became the primary state sponsor of Palestinian
          militant organizations, including Hamas and Palestinian Islamic Jihad.
          Most consequentially, Iran's IRGC played a founding role in creating
          Hezbollah in Lebanon in 1982, following Israel's invasion of that
          country. Hezbollah has since become Iran's most powerful proxy, with
          an arsenal estimated to include over 150,000 rockets and missiles.
        </p>
        <p>
          Throughout the 1980s and 1990s, Iran funded and trained Palestinian
          groups while systematically building a "Axis of Resistance" — a
          network of non-state actors designed to encircle Israel on multiple
          fronts. This strategic doctrine, formalized under IRGC Quds Force
          commander Qasem Soleimani, became the cornerstone of Iranian regional
          policy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          {[
            {
              year: "1950",
              fact: "Iran recognizes Israel de facto under the Shah",
            },
            {
              year: "1979",
              fact: "Revolution ends ties; Israeli embassy becomes PLO mission",
            },
            { year: "1982", fact: "Iran helps found Hezbollah in Lebanon" },
          ].map((item) => (
            <div key={item.year} className="stat-callout">
              <span className="font-display font-bold text-accent-red text-xl">
                {item.year}
              </span>
              <p className="font-body text-sm text-muted-foreground mt-1 leading-snug">
                {item.fact}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <AlertTriangle size={16} className="text-accent-red" />
          <span className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            02 · Key Turning Points
          </span>
        </div>
        <h2>Escalation Milestones</h2>
        <div className="w-8 h-0.5 bg-accent-red mb-6" />
        <div className="space-y-6">
          {turningPoints.map((item) => (
            <div
              key={item.year}
              className="flex gap-5 pb-6 border-b border-border last:border-0"
            >
              <div className="shrink-0 font-body font-bold text-accent-red text-xs w-20 pt-1 leading-tight tracking-wide">
                {item.year}
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-base mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <Clock size={16} className="text-accent-red" />
          <span className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            03 · Timeline
          </span>
        </div>
        <h2>Key Dates &amp; Events</h2>
        <div className="w-8 h-0.5 bg-accent-red mb-6" />
        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {timelineEvents.map((ev) => (
              <div key={ev.year} className="flex gap-5 items-start">
                <div className="shrink-0 w-16 font-body text-xs font-bold text-accent-red text-right pt-1">
                  {ev.year}
                </div>
                <div className="w-3 h-3 rounded-full bg-accent-red border-2 border-background z-10 mt-1 shrink-0 ml-[-6px]" />
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-body font-semibold text-foreground text-sm">
                      {ev.event}
                    </span>
                    <span
                      className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-full border ${tlCategoryMap[ev.category]}`}
                    >
                      {ev.category}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {ev.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <TrendingUp size={16} className="text-accent-red" />
          <span className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            04 · Recent Developments
          </span>
        </div>
        <h2>2023–2026: A New Phase of Conflict</h2>
        <div className="w-8 h-0.5 bg-accent-red mb-6" />
        <p>
          The October 7, 2023 Hamas attack on Israel — the deadliest attack on
          Jews since the Holocaust — killed approximately 1,200 Israelis and
          wounded thousands more. Iran denied direct operational planning but
          senior IRGC officials publicly celebrated the attack.
        </p>
        <div className="stat-callout my-6">
          <p className="font-body font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
            <span className="text-accent-red">◆</span> Key Distinction
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Independent investigations by Western intelligence agencies have not
            established that Iran directly ordered or co-ordinated the October 7
            attack. Iran has long-term strategic relationships with Hamas and
            provides material support, but the operational details are
            attributed primarily to Hamas leadership.
          </p>
        </div>
        <p>
          By February 2026, the conflict had entered its most dangerous phase.
          US and Israeli forces conducted coordinated strikes on Iranian nuclear
          and military infrastructure, triggering a full retaliatory response
          from Iran. The international community scrambled to prevent a wider
          regional conflagration.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="stat-callout">
            <div className="font-display font-bold text-accent-red text-3xl leading-none mb-2">
              300+
            </div>
            <div className="font-body text-sm text-foreground font-semibold mb-1">
              Drones &amp; Missiles
            </div>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              Launched by Iran directly at Israeli territory in April 2024 — the
              first direct Iranian attack on Israel in history.
            </p>
          </div>
          <div className="stat-callout">
            <div className="font-display font-bold text-accent-red text-3xl leading-none mb-2">
              ~94%
            </div>
            <div className="font-body text-sm text-foreground font-semibold mb-1">
              Interception Rate
            </div>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              IDF reported intercepting 94% of incoming Iranian projectiles
              during the February 2026 retaliatory barrage.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <Globe size={16} className="text-accent-red" />
          <span className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            05 · Geopolitical Impact
          </span>
        </div>
        <h2>Regional &amp; Global Implications</h2>
        <div className="w-8 h-0.5 bg-accent-red mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <div className="bg-surface-elevated border border-border rounded-sm p-5">
            <h3 className="font-body font-bold text-foreground text-sm mb-3">
              The Middle East
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Iran leads the "Axis of Resistance" — a network including
              Hezbollah, Hamas, Houthi forces in Yemen, and Iraqi Shi'a
              militias. Gulf Arab states share Israeli concerns about Iranian
              hegemony but maintain a publicly neutral stance.
            </p>
          </div>
          <div className="bg-surface-elevated border border-border rounded-sm p-5">
            <h3 className="font-body font-bold text-foreground text-sm mb-3">
              Global Powers
            </h3>
            <div className="space-y-2">
              {[
                {
                  c: "United States",
                  s: "Israel's primary military ally. Participated in joint strikes on Iranian infrastructure in February 2026.",
                },
                {
                  c: "Russia",
                  s: "Maintains cordial relations with Iran; has not condemned the Iranian retaliatory strikes.",
                },
                {
                  c: "China",
                  s: "Condemned US-Israeli strikes; called emergency UN Security Council session for ceasefire.",
                },
                {
                  c: "European Union",
                  s: "Expressed deep concern; calls for immediate de-escalation and return to diplomacy.",
                },
              ].map(({ c, s }) => (
                <div
                  key={c}
                  className="border-b border-border pb-2 last:border-0 last:pb-0"
                >
                  <p className="font-body font-semibold text-foreground text-xs mb-0.5">
                    {c}
                  </p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <Shield size={16} className="text-accent-red" />
          <span className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            06 · Key Factors
          </span>
        </div>
        <h2>Military, Political &amp; Economic Dynamics</h2>
        <div className="w-8 h-0.5 bg-accent-red mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Military",
              points: [
                "Iran relies on asymmetric warfare — proxy forces, ballistic missiles, drones, and naval harassment.",
                "Israel operates one of the most technologically advanced militaries with layered missile defense.",
                "Iran's ballistic missile arsenal is the largest in the Middle East.",
                "Both states maintain active offensive cyber capabilities.",
              ],
            },
            {
              title: "Political",
              points: [
                "Iran's Supreme Leader and IRGC use hostility toward Israel as an ideological pillar of the Islamic Republic.",
                "Israel has treated Iran's nuclear program as an existential threat requiring military options.",
                "Domestic politics significantly shape escalation decisions in both countries.",
                "US domestic politics shape American commitment levels.",
              ],
            },
            {
              title: "Economic",
              points: [
                "Western sanctions have severely limited Iran's economy: GDP contraction, 40%+ inflation, currency collapse.",
                "Despite sanctions, Iran earns significant revenue through oil exports to China.",
                "Israel has a high-income, technology-driven economy resilient to security pressures.",
                "Oil markets react to each major escalation; a regional war would trigger a major supply shock.",
              ],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-surface-elevated border border-border rounded-sm p-4"
            >
              <h3 className="font-body font-bold text-foreground text-sm mb-3">
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.points.map((p) => (
                  <li key={p.slice(0, 25)} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent-red mt-2 shrink-0" />
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <TrendingUp size={16} className="text-accent-red" />
          <span className="font-body text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            07 · Future Scenarios
          </span>
        </div>
        <h2>Possible Futures: Expert Analysis</h2>
        <div className="w-8 h-0.5 bg-accent-red mb-3" />
        <p className="font-body text-xs text-muted-foreground italic mb-6">
          Based on analysis from the International Crisis Group, RAND
          Corporation, Council on Foreign Relations, and academic Middle East
          scholars. These are analytical scenarios, not predictions.
        </p>
        <div className="space-y-4">
          {futureScenarios.map((sc) => (
            <div
              key={sc.title}
              className="bg-surface-elevated border border-border rounded-sm p-4 sm:p-5"
            >
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h3 className="font-body font-bold text-foreground text-sm">
                  {sc.title}
                </h3>
                <span
                  className={`font-body text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${sc.likelihoodClass}`}
                >
                  {sc.likelihood}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {sc.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Generic article content renderer
function ArticleFullContent({ article }: { article: Article }) {
  if (
    article.content === "israel-iran-full-content" ||
    article.slug === "israel-iran-conflict-analysis"
  ) {
    return <IsraelIranArticleContent />;
  }

  const paragraphs = article.content
    ? article.content.split("\n\n").filter((p) => p.trim().length > 0)
    : [];

  if (paragraphs.length === 0) {
    // Generate content from excerpt + category context
    return (
      <div className="article-prose">
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          {article.excerpt}
        </p>
        <p>
          This report is part of Zenvorn's ongoing coverage of{" "}
          {article.category} affairs. Our editorial team continues to monitor
          this developing story and will provide updates as new information
          becomes available. All reporting adheres to Zenvorn's strict editorial
          standards for accuracy, fairness, and source transparency.
        </p>
        <p>
          The implications of this development extend beyond immediate political
          and diplomatic spheres. Analysts across major think tanks and policy
          institutions are closely watching how key stakeholders respond in the
          coming days and weeks. The geopolitical significance of this story
          cannot be understated, particularly in the context of broader regional
          and global trends that have been building throughout 2026.
        </p>
        <p>
          Zenvorn has reached out to multiple official sources for comment.
          Statements received will be incorporated into subsequent reporting.
          Readers seeking to engage more deeply with this topic are encouraged
          to explore our related coverage below, which provides essential
          context and background for understanding the full scope of this story.
        </p>
        <div className="stat-callout my-6">
          <p className="font-body font-semibold text-foreground text-sm mb-1">
            Editorial Note
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Zenvorn is committed to factual, impartial reporting. If you have
            information relevant to this story, contact our secure newsroom tip
            line. All sources are protected under our editorial independence
            charter.
          </p>
        </div>
        <p>
          The broader context of this story sits at the intersection of
          diplomacy, security, and global economics — areas that Zenvorn covers
          with depth and rigor. Founded by MD Aun with the mission of providing
          independent global journalism, Zenvorn brings together experienced
          correspondents from across the world to deliver verified, balanced
          reporting free from political influence.
        </p>
      </div>
    );
  }

  return (
    <div className="article-prose">
      {paragraphs.map((para, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are static
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// ARTICLE DETAIL VIEW
// ──────────────────────────────────────────────

function ArticleDetail({
  article,
  allArticles,
  onBack,
  onArticleClick,
}: {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onArticleClick: (a: Article) => void;
}) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article.id]);

  const related = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}?article=${article.slug}`;
    navigator.clipboard.writeText(url).catch(() => {});
  }, [article.slug]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
        <img
          src={getContextualImage(article)}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="mb-3 flex items-center gap-2"
              >
                <CategoryBadge cat={article.category} />
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-display font-black text-white leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
              >
                {article.title}
              </motion.h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-surface-elevated border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center flex-wrap gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-xs transition-colors"
          >
            <ChevronLeft size={14} />
            Back to Zenvorn
          </button>
          <div className="w-px h-4 bg-border" />
          <span className="font-body text-xs font-bold text-accent-red">
            Zenvorn
          </span>
          <span className="font-body text-xs text-foreground/70 font-semibold">
            {article.author}
          </span>
          <span className="font-body text-xs text-muted-foreground">
            {article.date}
          </span>
          <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
            <Clock size={11} />
            {article.readingTime}
          </span>
          <button
            type="button"
            onClick={handleShare}
            className="ml-auto font-body text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors border border-border rounded-sm px-3 py-1.5 hover:bg-surface-hover"
          >
            Share
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 bg-background">
        <p
          className="font-body text-lg leading-relaxed mb-10 italic"
          style={{
            borderLeft: "2px solid oklch(0.47 0.22 18)",
            paddingLeft: "1rem",
            color: "oklch(var(--muted-foreground))",
          }}
        >
          {article.excerpt}
        </p>
        <ArticleFullContent article={article} />
      </article>

      {related.length > 0 && (
        <div className="border-t border-border bg-surface-elevated py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="section-header mb-8">
              <span className="section-header-title">Related Stories</span>
              <div className="section-header-line" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {related.map((a) => (
                <ArticleCard
                  key={Number(a.id)}
                  article={a}
                  onClick={onArticleClick}
                  size="sm"
                />
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// CATEGORY PAGE VIEW
// ──────────────────────────────────────────────

function CategoryPageView({
  category,
  articles,
  onArticleClick,
}: {
  category: string;
  articles: Article[];
  onArticleClick: (a: Article) => void;
}) {
  const categoryArticles = getArticlesByCategory(articles, category);

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-0 mb-2">
            <div
              className="w-1 h-6 mr-3 shrink-0"
              style={{ background: "oklch(0.47 0.22 18)" }}
            />
            <span className="font-body text-[10px] font-black tracking-[0.22em] uppercase text-accent-red">
              Coverage
            </span>
          </div>
          <h1 className="font-display font-black text-foreground text-3xl tracking-[-0.02em]">
            {category}
          </h1>
          <div className="mt-3 h-px bg-border w-full" />
        </div>

        {categoryArticles.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-body text-muted-foreground">
              No stories in this category yet.
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {categoryArticles.map((a) => (
              <ArticleCard
                key={Number(a.id)}
                article={a}
                onClick={onArticleClick}
              />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}

// ──────────────────────────────────────────────
// EDITORIAL STANDARDS PAGE
// ──────────────────────────────────────────────

function EditorialStandardsPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = [
    {
      title: "Our Mission",
      content: `Zenvorn exists to provide independent, factual, and balanced global journalism to readers everywhere. Founded by MD Aun with a commitment to journalistic integrity above all else, Zenvorn operates free from political influence, commercial pressure, and ideological bias.

Our mission is to inform — not to advocate. We report facts as verified through multiple independent sources, present multiple perspectives on complex issues, and clearly distinguish between news reporting and opinion or analysis. Every story published by Zenvorn is held to the same rigorous standard, regardless of the subject matter or the parties involved.

We believe that a well-informed public is essential to a functioning democracy. That belief drives every editorial decision we make.`,
    },
    {
      title: "Editorial Independence",
      content: `Zenvorn's editorial operations are entirely independent from commercial interests. Our advertising department has no influence over editorial decisions, story selection, or the framing of coverage.

No story at Zenvorn is published, suppressed, or modified at the request of advertisers, government bodies, political parties, or any external organization. Editorial decisions are made exclusively by our editorial team, guided by journalistic merit and public interest.

Our reporters and editors are free to pursue stories wherever they lead. Zenvorn will not kill a story because it is commercially inconvenient or politically sensitive. Our commitment to editorial independence is non-negotiable.`,
    },
    {
      title: "Fact-Checking Process",
      content: `Every factual claim published by Zenvorn undergoes a multi-stage verification process before publication:

1. Primary source verification: Claims are traced to their original source and verified through direct contact or official documentation wherever possible.

2. Multiple-source corroboration: Significant claims are verified through at least two independent sources before publication. For breaking news, we clearly label information as developing and update stories as verification is completed.

3. Expert review: For complex technical, scientific, or legal matters, relevant specialists are consulted to ensure accuracy.

4. Editorial review: All stories are reviewed by a senior editor before publication. Editors check for factual accuracy, source attribution, and compliance with our editorial standards.

5. Post-publication monitoring: We actively monitor published stories for errors and update or correct them promptly when identified.`,
    },
    {
      title: "Corrections Policy",
      content: `Zenvorn is committed to correcting errors promptly, transparently, and without defensiveness.

When an error is identified — whether by readers, sources, or our own staff — we will issue a correction at the earliest opportunity. Corrections are clearly labeled on the affected story, explaining what was wrong and what the correct information is.

We do not silently alter stories to remove errors without noting that a correction has been made. We do not delete published corrections once issued.

For significant errors that materially misrepresent events or individuals, we will issue a prominent correction at the top of the affected story and may publish a standalone correction notice.

Readers who believe they have identified an error in our reporting are encouraged to contact our editorial team. We take all correction requests seriously.`,
    },
    {
      title: "Source Transparency",
      content: `Zenvorn is committed to transparency about how we gather information and where it comes from.

Wherever possible, we identify our sources by name and title. When sources request anonymity — typically because disclosure would endanger them professionally or personally — we grant it only when the information they provide is essential to a story in the public interest and cannot be obtained by other means.

We do not grant anonymity for convenience or to protect sources from political embarrassment. When we use anonymous sources, we will describe their general role or position so readers can assess their credibility.

We are transparent about the methods used to gather information: interviews, documents, data analysis, on-the-ground reporting, and official statements. Zenvorn does not pay for exclusive access to stories, sources, or information.

Sponsored content, if any, is clearly labeled and kept entirely separate from news reporting.`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-surface-elevated border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-xs transition-colors"
          >
            <ChevronLeft size={14} />
            Back to Zenvorn
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-0 mb-3">
            <div
              className="w-1 h-6 mr-3 shrink-0"
              style={{ background: "oklch(0.47 0.22 18)" }}
            />
            <span className="font-body text-[10px] font-black tracking-[0.22em] uppercase text-accent-red">
              Zenvorn
            </span>
          </div>
          <h1
            className="font-display font-black text-foreground tracking-[-0.03em] leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Editorial Standards
          </h1>
          <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl">
            Zenvorn is committed to the highest standards of independent
            journalism. These guidelines govern how we report, verify, and
            publish — and how we hold ourselves accountable when we fall short.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display font-bold text-foreground text-2xl mb-4 pb-3 border-b border-border">
                {section.title}
              </h2>
              <div className="article-prose">
                {section.content.split("\n\n").map((para, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static content
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="font-body text-xs text-muted-foreground">
            These editorial standards were last reviewed and updated by the
            Zenvorn editorial board in January 2026. For questions about our
            editorial practices, please reach out via our social channels at{" "}
            <a
              href="https://instagram.com/zenvorn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-red hover:underline underline-offset-2"
            >
              @zenvorn
            </a>
            .
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// HOMEPAGE
// ──────────────────────────────────────────────

function Homepage({
  articles,
  isLoading,
  onArticleClick,
  activeCategory,
}: {
  articles: Article[];
  isLoading: boolean;
  onArticleClick: (a: Article) => void;
  activeCategory: string | null;
}) {
  const featured = getFeaturedArticle(articles);
  const nonFeatured = articles.filter((a) => a.id !== featured?.id);

  if (isLoading) {
    return (
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-7xl mx-auto mt-8 px-4 sm:px-6">
          {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
            <SkeletonCard key={k} />
          ))}
        </div>
      </main>
    );
  }

  if (activeCategory !== null) {
    return (
      <main>
        <CategoryPageView
          category={activeCategory}
          articles={articles}
          onArticleClick={onArticleClick}
        />
      </main>
    );
  }

  return (
    <main>
      {featured && (
        <HeroSection article={featured} onArticleClick={onArticleClick} />
      )}
      <IranIsraelFocusSection
        articles={articles}
        onArticleClick={onArticleClick}
      />
      <LatestUpdatesSection
        articles={nonFeatured}
        onArticleClick={onArticleClick}
      />
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          <div className="section-header mb-6">
            <span className="section-header-title">Latest News</span>
            <div className="section-header-line" />
          </div>
          <SecondaryStoriesGrid
            articles={nonFeatured}
            onArticleClick={onArticleClick}
          />
        </div>
      </div>
      <TrendingStrip
        articles={nonFeatured.slice(3)}
        onArticleClick={onArticleClick}
      />
      <div>
        {[
          CATEGORY_WORLD,
          CATEGORY_MIDDLE_EAST,
          CATEGORY_POLITICS,
          CATEGORY_ANALYSIS,
          CATEGORY_US,
          CATEGORY_EUROPE,
          CATEGORY_ASIA,
        ].map((cat) => {
          const catArticles = getArticlesByCategory(articles, cat);
          if (catArticles.length === 0) return null;
          return (
            <CategorySection
              key={cat}
              category={cat}
              articles={catArticles}
              onArticleClick={onArticleClick}
            />
          );
        })}
      </div>
    </main>
  );
}

// ──────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────

function Footer({
  onCategoryClick,
  onEditorialClick,
}: {
  onCategoryClick: (cat: string) => void;
  onEditorialClick: () => void;
}) {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "oklch(0.12 0.005 260)",
        borderTop: "3px solid oklch(0.47 0.22 18)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Column 1: Masthead */}
          <div>
            <div
              className="font-masthead font-black text-3xl tracking-[-0.05em] mb-1"
              style={{ color: "white" }}
            >
              ZENVORN
            </div>
            <div
              className="h-0.5 w-16 mb-4"
              style={{ background: "oklch(0.47 0.22 18)" }}
            />
            <p
              className="font-body text-xs leading-relaxed mb-3 font-semibold tracking-wide uppercase"
              style={{ color: "oklch(0.70 0.005 260)" }}
            >
              Independent. Factual. Global.
            </p>
            <p
              className="font-body text-xs leading-relaxed mb-5"
              style={{ color: "oklch(0.55 0.005 260)" }}
            >
              Delivering factual, in-depth reporting from every corner of the
              world. Trusted by readers in 180+ countries.
            </p>
          </div>

          {/* Column 2: Editorial Standards */}
          <div>
            <h4
              className="font-body font-bold text-xs tracking-[0.16em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.005 260)" }}
            >
              Standards
            </h4>
            <nav className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onEditorialClick}
                className="font-body text-xs text-left transition-colors"
                style={{ color: "oklch(0.50 0.005 260)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    "oklch(0.50 0.005 260)";
                }}
              >
                Editorial Standards
              </button>
              <button
                type="button"
                onClick={onEditorialClick}
                className="font-body text-xs text-left transition-colors"
                style={{ color: "oklch(0.50 0.005 260)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    "oklch(0.50 0.005 260)";
                }}
              >
                Corrections Policy
              </button>
              <button
                type="button"
                onClick={onEditorialClick}
                className="font-body text-xs text-left transition-colors"
                style={{ color: "oklch(0.50 0.005 260)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    "oklch(0.50 0.005 260)";
                }}
              >
                Source Transparency
              </button>
              <button
                type="button"
                onClick={onEditorialClick}
                className="font-body text-xs text-left transition-colors"
                style={{ color: "oklch(0.50 0.005 260)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    "oklch(0.50 0.005 260)";
                }}
              >
                Fact-Checking Process
              </button>
            </nav>
          </div>

          {/* Column 3: Instagram */}
          <div>
            <h4
              className="font-body font-bold text-xs tracking-[0.16em] uppercase mb-4"
              style={{ color: "oklch(0.65 0.005 260)" }}
            >
              Follow
            </h4>
            <a
              href="https://instagram.com/zenvorn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-body text-sm font-semibold transition-colors group"
              style={{ color: "oklch(0.70 0.005 260)" }}
            >
              <Instagram size={16} className="text-pink-400" />
              <span className="group-hover:text-white transition-colors">
                @zenvorn
              </span>
            </a>
            <p
              className="font-body text-xs mt-3 leading-relaxed"
              style={{ color: "oklch(0.45 0.005 260)" }}
            >
              Follow Zenvorn on Instagram for breaking news, in-depth analysis,
              and real-time updates from our global correspondents.
            </p>
          </div>
        </div>

        {/* Coverage nav */}
        <div
          className="border-t py-6 mb-6"
          style={{ borderColor: "oklch(0.22 0.005 260)" }}
        >
          <h4
            className="font-body font-bold text-xs tracking-[0.16em] uppercase mb-4"
            style={{ color: "oklch(0.65 0.005 260)" }}
          >
            Coverage
          </h4>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {ALL_NAV_CATS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onCategoryClick(label)}
                className="font-body text-xs transition-colors"
                style={{ color: "oklch(0.50 0.005 260)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    "oklch(0.50 0.005 260)";
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(0.22 0.005 260)" }}
        >
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.40 0.005 260)" }}
          >
            © {year} Zenvorn. All rights reserved. Founder: MD Aun
          </p>
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.40 0.005 260)" }}
          >
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.60 0.22 18)" }}
              className="hover:underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────
// VIEW STATE
// ──────────────────────────────────────────────

type View =
  | { type: "home" }
  | { type: "article"; article: Article }
  | { type: "editorial" };

// ──────────────────────────────────────────────
// APP ROOT
// ──────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>({ type: "home" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: articles = FALLBACK_ARTICLES, isLoading } = useGetAllArticles();
  const breakingHeadlines = BREAKING_NEWS_FALLBACK;

  const handleArticleClick = useCallback((article: Article) => {
    setView({ type: "article", article });
    setActiveCategory(null);
  }, []);

  const handleBack = useCallback(() => {
    setView({ type: "home" });
  }, []);

  const handleLogoClick = useCallback(() => {
    setView({ type: "home" });
    setActiveCategory(null);
  }, []);

  const handleCategoryClick = useCallback((cat: string | null) => {
    setView({ type: "home" });
    setActiveCategory(cat);
  }, []);

  const handleEditorialClick = useCallback(() => {
    setView({ type: "editorial" });
    setActiveCategory(null);
  }, []);

  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);

  return (
    <div className="min-h-screen bg-background">
      <BreakingNewsTicker headlines={breakingHeadlines} />

      <NavBar
        onCategoryClick={handleCategoryClick}
        onLogoClick={handleLogoClick}
        onEditorialClick={handleEditorialClick}
        activeCategory={activeCategory}
        onSearchOpen={handleSearchOpen}
        articles={articles}
        onArticleClick={handleArticleClick}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={handleSearchClose}
        onArticleClick={(article) => {
          handleArticleClick(article);
          handleSearchClose();
        }}
        articles={articles}
      />

      <AnimatePresence mode="wait">
        {view.type === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Homepage
              articles={articles}
              isLoading={isLoading}
              onArticleClick={handleArticleClick}
              activeCategory={activeCategory}
            />
            <Footer
              onCategoryClick={(cat) => handleCategoryClick(cat)}
              onEditorialClick={handleEditorialClick}
            />
          </motion.div>
        )}

        {view.type === "article" && (
          <motion.div
            key={`article-${String(view.article.id)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ArticleDetail
              article={view.article}
              allArticles={articles}
              onBack={handleBack}
              onArticleClick={handleArticleClick}
            />
            <Footer
              onCategoryClick={(cat) => handleCategoryClick(cat)}
              onEditorialClick={handleEditorialClick}
            />
          </motion.div>
        )}

        {view.type === "editorial" && (
          <motion.div
            key="editorial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <EditorialStandardsPage onBack={handleBack} />
            <Footer
              onCategoryClick={(cat) => handleCategoryClick(cat)}
              onEditorialClick={handleEditorialClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
