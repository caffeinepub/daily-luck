import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Clock,
  Coins,
  Hash,
  Heart,
  Leaf,
  Moon,
  Palette,
  RefreshCw,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import type { LuckReading } from "./backend.d.ts";
import { useActor } from "./hooks/useActor";

/* ─── React Query hook ───────────────────────────────────────── */
function useTodaysLuck() {
  const { actor, isFetching } = useActor();
  return useQuery<LuckReading>({
    queryKey: ["todaysLuck"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getTodaysLuck();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

/* ─── Star rating component ──────────────────────────────────── */
function StarRating({ score }: { score: bigint }) {
  const n = Number(score);
  return (
    <div className="flex gap-1">
      {(["s1", "s2", "s3", "s4", "s5"] as const).map((id, i) => (
        <Star
          key={id}
          className={`w-4 h-4 ${i < n ? "fill-[oklch(0.82_0.14_80)] text-[oklch(0.82_0.14_80)]" : "text-[oklch(0.35_0.07_285)]"}`}
          strokeWidth={i < n ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

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
      {/* Large violet orb top-left */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.58 0.2 295) 0%, transparent 70%)",
        }}
      />
      {/* Gold orb bottom-right */}
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.14 80) 0%, transparent 70%)",
        }}
      />
      {/* Teal orb center-right */}
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

/* ─── Category card config ───────────────────────────────────── */
const CATEGORIES = [
  {
    key: "love" as const,
    label: "Love",
    Icon: Heart,
    color: "oklch(0.72 0.2 15)",
    bgColor: "oklch(0.72 0.2 15 / 0.12)",
    borderColor: "oklch(0.72 0.2 15 / 0.3)",
    glowColor: "oklch(0.72 0.2 15 / 0.2)",
    marker: "luck.category.card.1",
  },
  {
    key: "career" as const,
    label: "Career",
    Icon: Briefcase,
    color: "oklch(0.82 0.14 80)",
    bgColor: "oklch(0.82 0.14 80 / 0.12)",
    borderColor: "oklch(0.82 0.14 80 / 0.3)",
    glowColor: "oklch(0.82 0.14 80 / 0.2)",
    marker: "luck.category.card.2",
  },
  {
    key: "health" as const,
    label: "Health",
    Icon: Leaf,
    color: "oklch(0.72 0.16 145)",
    bgColor: "oklch(0.72 0.16 145 / 0.12)",
    borderColor: "oklch(0.72 0.16 145 / 0.3)",
    glowColor: "oklch(0.72 0.16 145 / 0.2)",
    marker: "luck.category.card.3",
  },
  {
    key: "finance" as const,
    label: "Finance",
    Icon: Coins,
    color: "oklch(0.75 0.18 220)",
    bgColor: "oklch(0.75 0.18 220 / 0.12)",
    borderColor: "oklch(0.75 0.18 220 / 0.3)",
    glowColor: "oklch(0.75 0.18 220 / 0.2)",
    marker: "luck.category.card.4",
  },
];

/* ─── Loading state ──────────────────────────────────────────── */
function LoadingState() {
  return (
    <motion.div
      data-ocid="luck.loading_state"
      className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Orbiting moon */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-[oklch(0.82_0.14_80_/_0.3)]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-[oklch(0.58_0.2_295_/_0.3)]"
          animate={{ rotate: -360 }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[oklch(0.82_0.14_80)]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
        <Moon
          className="w-8 h-8 text-gold"
          style={{ color: "oklch(0.82 0.14 80)" }}
        />
      </div>

      <div className="text-center space-y-2">
        <motion.p
          className="font-display text-xl"
          style={{ color: "oklch(0.82 0.14 80)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Reading the cosmic signs…
        </motion.p>
        <p className="text-sm" style={{ color: "oklch(0.65 0.04 285)" }}>
          The universe is preparing your fortune
        </p>
      </div>

      {/* Shimmer bar */}
      <div
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ background: "oklch(0.25 0.07 285)" }}
      >
        <div className="h-full w-full animate-shimmer rounded-full" />
      </div>
    </motion.div>
  );
}

/* ─── Error state ────────────────────────────────────────────── */
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      data-ocid="luck.error_state"
      className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-5xl"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        🌙
      </motion.div>
      <div className="space-y-2">
        <h2
          className="font-display text-2xl"
          style={{ color: "oklch(0.82 0.14 80)" }}
        >
          The stars are misaligned
        </h2>
        <p style={{ color: "oklch(0.65 0.04 285)" }} className="max-w-xs">
          Mercury might be in retrograde. Let us try reading your fortune again.
        </p>
      </div>
      <Button
        data-ocid="luck.retry_button"
        onClick={onRetry}
        className="gap-2 font-body"
        style={{
          background: "oklch(0.82 0.14 80)",
          color: "oklch(0.12 0.04 285)",
        }}
      >
        <RefreshCw className="w-4 h-4" />
        Consult the Stars Again
      </Button>
    </motion.div>
  );
}

/* ─── Main reading view ──────────────────────────────────────── */
function LuckReadingView({ data }: { data: LuckReading }) {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto space-y-8 pb-16"
    >
      {/* ── Overall fortune hero card ── */}
      <motion.div variants={itemVariants}>
        <div
          data-ocid="luck.overall_card"
          className="relative overflow-hidden rounded-2xl card-glass card-glass-hover noise-overlay animate-pulse-glow"
          style={{
            borderColor: "oklch(0.82 0.14 80 / 0.35)",
            boxShadow:
              "0 0 40px oklch(0.82 0.14 80 / 0.12), 0 20px 60px oklch(0.1 0.04 285 / 0.8)",
          }}
        >
          {/* Subtle inner gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.82 0.14 80 / 0.08) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-10 text-center space-y-4">
            {/* Celestial icon */}
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

            <blockquote
              className="font-display text-2xl md:text-3xl leading-relaxed"
              style={{ color: "oklch(0.97 0.01 285)" }}
            >
              "{data.overallMessage}"
            </blockquote>

            {/* Lucky badges */}
            <div
              data-ocid="luck.lucky_badges"
              className="flex flex-wrap justify-center gap-3 pt-4"
            >
              <LuckyBadge
                icon={<Hash className="w-3.5 h-3.5" />}
                label="Lucky Number"
                value={data.luckyNumber.toString()}
                color="oklch(0.82 0.14 80)"
                bg="oklch(0.82 0.14 80 / 0.12)"
                border="oklch(0.82 0.14 80 / 0.3)"
              />
              <LuckyBadge
                icon={<Palette className="w-3.5 h-3.5" />}
                label="Lucky Color"
                value={data.luckyColor}
                color="oklch(0.58 0.2 295)"
                bg="oklch(0.58 0.2 295 / 0.12)"
                border="oklch(0.58 0.2 295 / 0.3)"
              />
              <LuckyBadge
                icon={<Clock className="w-3.5 h-3.5" />}
                label="Best Time"
                value={data.luckyTimeOfDay}
                color="oklch(0.72 0.16 185)"
                bg="oklch(0.72 0.16 185 / 0.12)"
                border="oklch(0.72 0.16 185 / 0.3)"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Section header ── */}
      <motion.div variants={itemVariants} className="text-center space-y-1">
        <p
          className="text-xs uppercase tracking-[0.2em] font-body"
          style={{ color: "oklch(0.55 0.08 285)" }}
        >
          — Life Domains —
        </p>
        <h2
          className="font-display text-xl"
          style={{ color: "oklch(0.82 0.14 80 / 0.8)" }}
        >
          Today's Cosmic Alignment
        </h2>
      </motion.div>

      {/* ── Category cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <motion.div key={cat.key} variants={itemVariants}>
            <CategoryCard config={cat} fortune={data[cat.key]} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Lucky badge pill ───────────────────────────────────────── */
function LuckyBadge({
  icon,
  label,
  value,
  color,
  bg,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-body"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color: color,
      }}
    >
      {icon}
      <span className="opacity-70 text-xs">{label}:</span>
      <span className="font-semibold capitalize">{value}</span>
    </div>
  );
}

/* ─── Category card ──────────────────────────────────────────── */
function CategoryCard({
  config,
  fortune,
}: {
  config: (typeof CATEGORIES)[0];
  fortune: { score: bigint; message: string };
}) {
  const { Icon, label, color, bgColor, borderColor, glowColor, marker } =
    config;

  return (
    <div
      data-ocid={marker}
      className="relative overflow-hidden rounded-2xl card-glass card-glass-hover noise-overlay cursor-default"
      style={{
        borderColor: borderColor,
        boxShadow: `0 4px 24px ${glowColor}, 0 8px 40px oklch(0.1 0.04 285 / 0.5)`,
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color.replace(")", " / 0.15)")} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: bgColor,
                border: `1px solid ${borderColor}`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <span
              className="font-display text-lg"
              style={{ color: "oklch(0.95 0.02 285)" }}
            >
              {label}
            </span>
          </div>
          <div
            className="text-xs font-body font-semibold px-2 py-1 rounded-full"
            style={{ background: bgColor, color }}
          >
            {Number(fortune.score)}/5
          </div>
        </div>

        {/* Star rating */}
        <StarRating score={fortune.score} />

        {/* Message */}
        <p
          className="font-body text-sm leading-relaxed"
          style={{ color: "oklch(0.78 0.03 285)" }}
        >
          {fortune.message}
        </p>
      </div>
    </div>
  );
}

/* ─── Root App ───────────────────────────────────────────────── */
export default function App() {
  const { data, isLoading, isError, refetch } = useTodaysLuck();

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            {isLoading && <LoadingState key="loading" />}
            {isError && <ErrorState key="error" onRetry={() => refetch()} />}
            {data && !isLoading && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LuckReadingView data={data} />
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
