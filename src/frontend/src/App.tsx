import { Briefcase, Coins, Heart, Leaf, Sparkles } from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useState } from "react";

/* ─── Local luck generator (no backend needed) ───────────────── */
function generateDailyLuck() {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const rng = (offset: number) =>
    ((seed * 9301 + offset * 49297 + 233) % 233280) / 233280;

  const messages = [
    "Today is going to be a wonderful day for you!",
    "Good things are coming your way today.",
    "The universe is smiling on you today.",
    "Today brings fresh energy and new possibilities.",
    "Your positivity today will open unexpected doors.",
    "Trust your instincts today — they will guide you well.",
    "Today is perfect for taking a small brave step.",
  ];

  const colors = [
    "Red",
    "Gold",
    "Blue",
    "Green",
    "Purple",
    "Pink",
    "Orange",
    "Teal",
  ];

  const careerMsgs = [
    "A great opportunity may come your way today.",
    "Your hard work is about to pay off.",
    "Focus on one task and you will shine.",
  ];
  const healthMsgs = [
    "Take a moment to breathe and relax today.",
    "A short walk could do wonders for you.",
    "Listen to your body and rest when needed.",
  ];
  const financeMsgs = [
    "A small saving today builds a big future.",
    "Avoid impulse purchases — your wallet will thank you.",
    "Good financial news could surprise you today.",
  ];
  const loveMsgs = [
    "Show someone you care with a kind gesture.",
    "Open your heart and love will find its way.",
    "Today is a beautiful day to connect with someone special.",
  ];

  const pick = (arr: string[], r: number) => arr[Math.floor(r * arr.length)];

  return {
    luckyNumber: Math.floor(rng(1) * 9) + 1,
    luckyColor: pick(colors, rng(2)),
    overallMessage: pick(messages, rng(3)),
    career: pick(careerMsgs, rng(4)),
    health: pick(healthMsgs, rng(5)),
    finance: pick(financeMsgs, rng(6)),
    love: pick(loveMsgs, rng(7)),
  };
}

type DailyLuck = ReturnType<typeof generateDailyLuck>;

/* ─── Floating star decorations ──────────────────────────────── */
function FloatingStars() {
  const stars = [
    { id: "st1", size: 3, top: "8%", left: "6%", delay: 0, duration: 2.1 },
    { id: "st2", size: 2, top: "15%", left: "88%", delay: 0.8, duration: 1.8 },
    { id: "st3", size: 4, top: "30%", left: "92%", delay: 1.4, duration: 2.5 },
    { id: "st4", size: 2, top: "55%", left: "3%", delay: 0.3, duration: 2.2 },
    { id: "st5", size: 3, top: "72%", left: "95%", delay: 1.1, duration: 1.9 },
    { id: "st6", size: 2, top: "85%", left: "8%", delay: 0.6, duration: 2.4 },
    { id: "st7", size: 4, top: "20%", left: "45%", delay: 1.7, duration: 2.0 },
    { id: "st8", size: 2, top: "90%", left: "70%", delay: 0.4, duration: 2.3 },
    { id: "st9", size: 3, top: "42%", left: "0.5%", delay: 1.2, duration: 1.7 },
    { id: "st10", size: 2, top: "65%", left: "50%", delay: 0.9, duration: 2.6 },
  ];
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden
    >
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-[oklch(0.97_0.01_285)]"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Mystical orb decoration ────────────────────────────────── */
function OrbDecoration() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden
    >
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.58 0.2 295) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.14 80) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 -right-20 w-64 h-64 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.16 185) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ─── Category config ────────────────────────────────────────── */
type CategoryKey = "love" | "career" | "health" | "finance";

const CATEGORIES = [
  {
    key: "career" as CategoryKey,
    label: "Career",
    Icon: Briefcase,
    color: "oklch(0.82 0.14 80)",
    bgColor: "oklch(0.82 0.14 80 / 0.12)",
    borderColor: "oklch(0.82 0.14 80 / 0.3)",
    glowColor: "oklch(0.82 0.14 80 / 0.2)",
    emoji: "💼",
  },
  {
    key: "health" as CategoryKey,
    label: "Health",
    Icon: Leaf,
    color: "oklch(0.72 0.16 145)",
    bgColor: "oklch(0.72 0.16 145 / 0.12)",
    borderColor: "oklch(0.72 0.16 145 / 0.3)",
    glowColor: "oklch(0.72 0.16 145 / 0.2)",
    emoji: "🌿",
  },
  {
    key: "finance" as CategoryKey,
    label: "Finance",
    Icon: Coins,
    color: "oklch(0.75 0.18 220)",
    bgColor: "oklch(0.75 0.18 220 / 0.12)",
    borderColor: "oklch(0.75 0.18 220 / 0.3)",
    glowColor: "oklch(0.75 0.18 220 / 0.2)",
    emoji: "💰",
  },
  {
    key: "love" as CategoryKey,
    label: "Love",
    Icon: Heart,
    color: "oklch(0.72 0.2 15)",
    bgColor: "oklch(0.72 0.2 15 / 0.12)",
    borderColor: "oklch(0.72 0.2 15 / 0.3)",
    glowColor: "oklch(0.72 0.2 15 / 0.2)",
    emoji: "💖",
  },
] as const;

/* ─── Color name → CSS color map ─────────────────────────────── */
const COLOR_MAP: Record<string, string> = {
  red: "oklch(0.65 0.22 25)",
  orange: "oklch(0.75 0.18 50)",
  yellow: "oklch(0.88 0.18 95)",
  gold: "oklch(0.82 0.14 80)",
  green: "oklch(0.65 0.2 145)",
  teal: "oklch(0.65 0.14 185)",
  blue: "oklch(0.60 0.18 240)",
  indigo: "oklch(0.55 0.2 270)",
  violet: "oklch(0.60 0.22 295)",
  purple: "oklch(0.58 0.2 295)",
  pink: "oklch(0.72 0.18 340)",
  white: "oklch(0.97 0.01 285)",
  silver: "oklch(0.75 0.03 285)",
  black: "oklch(0.2 0.03 285)",
  emerald: "oklch(0.68 0.18 160)",
  crimson: "oklch(0.60 0.25 20)",
  cobalt: "oklch(0.52 0.2 250)",
  turquoise: "oklch(0.72 0.16 185)",
  amber: "oklch(0.82 0.16 70)",
  lavender: "oklch(0.78 0.1 295)",
};

function getLuckyColor(colorName: string): string {
  const key = colorName.toLowerCase().trim();
  return (
    COLOR_MAP[key] ??
    `oklch(0.65 0.18 ${Math.abs(key.charCodeAt(0) * 7) % 360})`
  );
}

/* ─── Expanded category card ─────────────────────────────────── */
function ExpandedCategoryCard({
  config,
  message,
}: {
  config: (typeof CATEGORIES)[number];
  message: string;
}) {
  const { Icon, label, color, bgColor, borderColor, glowColor, emoji } = config;

  return (
    <motion.div
      data-ocid="luck.category.expanded"
      key={config.key}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-2xl card-glass noise-overlay w-full"
      style={{
        borderColor: borderColor,
        boxShadow: `0 0 60px ${glowColor}, 0 20px 60px oklch(0.1 0.04 285 / 0.8)`,
      }}
    >
      {/* Background glow gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, ${bgColor} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-8 md:p-12">
        {/* Icon + label */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: bgColor,
              border: `2px solid ${borderColor}`,
              boxShadow: `0 0 30px ${glowColor}`,
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-10 h-10" style={{ color }} />
          </motion.div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">{emoji}</span>
              <h2
                className="font-display text-4xl md:text-5xl"
                style={{
                  color,
                  textShadow: `0 0 30px ${glowColor}`,
                }}
              >
                {label}
              </h2>
            </div>
          </div>
        </div>

        {/* Message */}
        <p
          className="font-body text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto"
          style={{ color: "oklch(0.90 0.02 285)" }}
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Category pill button ───────────────────────────────────── */
function CategoryPillButton({
  config,
  isActive,
  onClick,
  index,
}: {
  config: (typeof CATEGORIES)[number];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const { Icon, label, color, bgColor, borderColor, glowColor } = config;
  const markerIndex = index + 1;

  return (
    <motion.button
      type="button"
      data-ocid={`luck.category.button.${markerIndex}`}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-2.5 px-6 py-3.5 rounded-full font-body font-semibold text-base transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      style={{
        background: isActive ? color : bgColor,
        border: `1.5px solid ${isActive ? color : borderColor}`,
        color: isActive ? "oklch(0.1 0.04 285)" : color,
        boxShadow: isActive
          ? `0 0 28px ${glowColor}, 0 4px 20px oklch(0.1 0.04 285 / 0.5)`
          : "none",
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="active-pill-indicator"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: "oklch(1 0 0 / 0.08)" }}
        />
      )}
    </motion.button>
  );
}

/* ─── Main reading view ──────────────────────────────────────── */
function LuckReadingView({ data }: { data: DailyLuck }) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(
    null,
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  const luckyColorCss = getLuckyColor(data.luckyColor);
  const activeCatConfig = activeCategory
    ? CATEGORIES.find((c) => c.key === activeCategory)
    : null;

  function handleCategoryClick(key: CategoryKey) {
    setActiveCategory((prev) => (prev === key ? null : key));
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto space-y-6 pb-16"
    >
      {/* ── Hero: overall message + lucky number + lucky color ── */}
      <motion.div variants={itemVariants}>
        <div
          data-ocid="luck.overall_card"
          className="relative overflow-hidden rounded-2xl card-glass noise-overlay animate-pulse-glow"
          style={{
            borderColor: "oklch(0.82 0.14 80 / 0.35)",
            boxShadow:
              "0 0 40px oklch(0.82 0.14 80 / 0.12), 0 20px 60px oklch(0.1 0.04 285 / 0.8)",
          }}
        >
          {/* Inner gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.82 0.14 80 / 0.08) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-10 text-center space-y-8">
            {/* Rotating sparkles icon */}
            <motion.div
              className="flex justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles
                className="w-8 h-8"
                style={{ color: "oklch(0.82 0.14 80)" }}
              />
            </motion.div>

            <p
              className="text-xs uppercase tracking-[0.25em] font-body font-medium"
              style={{ color: "oklch(0.65 0.1 80)" }}
            >
              Your Fortune Today
            </p>

            {/* Lucky Message — friendly, light */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <blockquote
                className="font-display text-2xl md:text-3xl leading-relaxed max-w-xl mx-auto"
                style={{
                  color: "oklch(0.97 0.01 285)",
                  textShadow: "0 0 20px oklch(0.82 0.14 80 / 0.25)",
                }}
              >
                ✨ {data.overallMessage}
              </blockquote>
            </motion.div>

            {/* Divider */}
            <div
              className="mx-auto h-px w-40 rounded-full"
              style={{ background: "oklch(0.4 0.09 285 / 0.35)" }}
            />

            {/* Lucky Number — large, prominent */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
            >
              <span
                className="text-xs uppercase tracking-[0.22em] font-body font-semibold"
                style={{ color: "oklch(0.65 0.1 80)" }}
              >
                Lucky Number
              </span>
              <motion.span
                className="font-display leading-none select-none"
                style={{
                  fontSize: "clamp(5rem, 18vw, 9rem)",
                  color: "oklch(0.82 0.14 80)",
                  textShadow:
                    "0 0 30px oklch(0.82 0.14 80 / 0.7), 0 0 80px oklch(0.82 0.14 80 / 0.3)",
                  fontVariantNumeric: "tabular-nums",
                }}
                animate={{
                  textShadow: [
                    "0 0 30px oklch(0.82 0.14 80 / 0.5), 0 0 80px oklch(0.82 0.14 80 / 0.2)",
                    "0 0 50px oklch(0.82 0.14 80 / 0.9), 0 0 120px oklch(0.82 0.14 80 / 0.5)",
                    "0 0 30px oklch(0.82 0.14 80 / 0.5), 0 0 80px oklch(0.82 0.14 80 / 0.2)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {data.luckyNumber}
              </motion.span>
            </motion.div>

            {/* Divider */}
            <div
              className="mx-auto h-px w-40 rounded-full"
              style={{ background: "oklch(0.4 0.09 285 / 0.35)" }}
            />

            {/* Lucky Color — large swatch + name */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: "backOut" }}
            >
              <span
                className="text-xs uppercase tracking-[0.22em] font-body font-semibold"
                style={{ color: "oklch(0.58 0.2 295 / 0.9)" }}
              >
                Lucky Colour
              </span>
              <div className="flex items-center gap-4">
                <motion.div
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: "clamp(3.5rem, 12vw, 5rem)",
                    height: "clamp(3.5rem, 12vw, 5rem)",
                    background: luckyColorCss,
                    boxShadow: `0 0 24px ${luckyColorCss} / 0.6, 0 0 60px ${luckyColorCss} / 0.25`,
                    border: `2px solid ${luckyColorCss}`,
                  }}
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
                <span
                  className="font-display capitalize leading-none"
                  style={{
                    fontSize: "clamp(2rem, 7vw, 3.5rem)",
                    color: luckyColorCss,
                    textShadow: `0 0 20px ${luckyColorCss}`,
                  }}
                >
                  {data.luckyColor}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Expanded category view (shown ABOVE the buttons row) ── */}
      <AnimatePresence mode="wait">
        {activeCatConfig && (
          <ExpandedCategoryCard
            key={activeCategory}
            config={activeCatConfig}
            message={data[activeCatConfig.key]}
          />
        )}
      </AnimatePresence>

      {/* ── No category selected: hint text ── */}
      <AnimatePresence>
        {!activeCategory && (
          <motion.div
            key="explore-prompt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="text-center py-2"
          >
            <p
              className="font-body text-sm uppercase tracking-[0.18em]"
              style={{ color: "oklch(0.5 0.06 285)" }}
            >
              — tap a domain to reveal your cosmic reading —
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Category buttons row (always shown below the expanded card) ── */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat, i) => (
            <CategoryPillButton
              key={cat.key}
              config={cat}
              isActive={activeCategory === cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              index={i}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Home hero — single CTA button ─────────────────────────── */
function HomeHero({ onReveal }: { onReveal: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[55vh] gap-10 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Decorative glyph cluster */}
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="flex items-center gap-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="text-3xl">✦</span>
          <span className="text-4xl">🔮</span>
          <span className="text-3xl">✦</span>
        </motion.div>

        <p
          className="font-body text-sm uppercase tracking-[0.22em] text-center max-w-xs"
          style={{ color: "oklch(0.55 0.08 285)" }}
        >
          What does the cosmos hold for you today?
        </p>
      </div>

      {/* THE main CTA button */}
      <motion.button
        type="button"
        data-ocid="home.primary_button"
        onClick={onReveal}
        className="relative flex items-center gap-3 px-10 py-5 rounded-full font-display text-xl md:text-2xl cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-yellow-400/40 select-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.88 0.18 85) 0%, oklch(0.78 0.16 75) 50%, oklch(0.70 0.14 65) 100%)",
          color: "oklch(0.12 0.04 285)",
          boxShadow:
            "0 0 40px oklch(0.82 0.14 80 / 0.55), 0 0 80px oklch(0.82 0.14 80 / 0.2), 0 8px 32px oklch(0.1 0.04 285 / 0.6)",
          border: "1px solid oklch(0.88 0.18 85 / 0.5)",
        }}
        animate={{
          boxShadow: [
            "0 0 30px oklch(0.82 0.14 80 / 0.4), 0 0 60px oklch(0.82 0.14 80 / 0.15), 0 8px 32px oklch(0.1 0.04 285 / 0.5)",
            "0 0 55px oklch(0.82 0.14 80 / 0.7), 0 0 110px oklch(0.82 0.14 80 / 0.3), 0 8px 32px oklch(0.1 0.04 285 / 0.6)",
            "0 0 30px oklch(0.82 0.14 80 / 0.4), 0 0 60px oklch(0.82 0.14 80 / 0.15), 0 8px 32px oklch(0.1 0.04 285 / 0.5)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
          aria-hidden
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, oklch(0.98 0.01 90 / 0.35) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatDelay: 1.5,
            }}
          />
        </div>

        <Sparkles className="w-6 h-6 flex-shrink-0" />
        <span>Today's Luck</span>
      </motion.button>

      {/* Subtle sub-hint */}
      <motion.p
        className="font-body text-xs text-center"
        style={{ color: "oklch(0.42 0.05 285)" }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        Your daily cosmic reading awaits
      </motion.p>
    </motion.div>
  );
}

/* ─── Root App ───────────────────────────────────────────────── */
export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [luckData] = useState<DailyLuck>(() => generateDailyLuck());

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handleReveal() {
    setRevealed(true);
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-body"
      style={{ background: "oklch(0.1 0.04 285)" }}
    >
      {/* Cosmic background image */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('/assets/generated/cosmic-bg.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
        }}
      />

      {/* Atmosphere overlays */}
      <OrbDecoration />
      <FloatingStars />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.97 0.01 285) 1px, transparent 1px), linear-gradient(90deg, oklch(0.97 0.01 285) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ── Header ── */}
        <header className="pt-12 pb-6 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Moon emoji decorations */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 8, 0, -8, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                ✦
              </motion.span>
              <motion.span className="text-2xl animate-float-slow">
                🌙
              </motion.span>
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, -8, 0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
              >
                ✦
              </motion.span>
            </div>

            <h1
              className="font-display text-5xl md:text-6xl tracking-tight"
              style={{
                color: "oklch(0.97 0.01 285)",
                textShadow: "0 0 40px oklch(0.82 0.14 80 / 0.4)",
              }}
            >
              Daily Luck
            </h1>

            {/* Gold shimmer underline */}
            <div
              className="mx-auto mt-3 h-px w-32"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.82 0.14 80), transparent)",
              }}
            />

            <p
              className="mt-4 font-body text-sm uppercase tracking-[0.18em]"
              style={{ color: "oklch(0.6 0.06 285)" }}
            >
              {dateStr}
            </p>
          </motion.div>
        </header>

        {/* ── Main ── */}
        <main className="flex-1 px-4 py-4">
          <AnimatePresence mode="wait">
            {/* Home state: show big CTA */}
            {!revealed && <HomeHero key="home" onReveal={handleReveal} />}

            {/* Data ready */}
            {revealed && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LuckReadingView data={luckData} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* ── Footer ── */}
        <footer className="py-8 px-4 text-center">
          <div
            className="mx-auto mb-6 h-px w-48"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.35 0.07 285), transparent)",
            }}
          />
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.45 0.04 285)" }}
          >
            © {new Date().getFullYear()}. Built with{" "}
            <span style={{ color: "oklch(0.72 0.2 15)" }}>♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:opacity-80"
              style={{ color: "oklch(0.65 0.1 80)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
