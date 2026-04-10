import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Mail, Lock, User, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { GridScan } from "@/components/GridScan";
import GlitchText from "@/components/GlitchText";
import DecryptedText from "@/components/DecryptedText";
import { darkPalette, lightPalette, gridScanLightAccent } from "@/shared/colors";
import logoDark from "@/assets/logo/logo-base-transparent-dark-theme.svg";
import logoLight from "@/assets/logo/logo-base-transparent-light-theme.svg";

// Placeholder avatars using initials
const AVATAR_SEEDS = ["AX", "N7", "Z3", "K9", "V1", "08"];
const AVATAR_COLORS = ["#00E5C3", "#1A2E2E", "#00967D", "#0F1117", "#2AAA8A", "#00E5C3"];

const metrics = [
  {
    id: "NODE_01_ACTIVE",
    label: "NODE_01_ACTIVE",
    value: "0.998s latency",
    progress: 32,
    color: "#00E5C3",
  },
  {
    id: "NEURAL_SYNC",
    label: "NEURAL_SYNC",
    value: "94.2% stability",
    progress: 94,
    color: "#00E5C3",
  },
  {
    id: "CORE_PROCESS",
    label: "CORE_PROCESS",
    value: "Optimized",
    progress: 100,
    color: "#00E5C3",
  },
] as const;

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const palette = isDark ? darkPalette : lightPalette;

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    return () => root.classList.remove("dark");
  }, [isDark]);

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "pl" : "en");

  return (
    <div
      className="relative min-h-svh w-full"
      style={{ backgroundColor: palette.background }}
    >
      {/* ── Full-screen GridScan ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor={palette.surface}
          gridScale={0.1}
          scanColor={isDark ? palette.accent : gridScanLightAccent}
          scanOpacity={isDark ? 0.4 : 0.35}
          enablePost
          bloomIntensity={isDark ? 0.6 : 0.3}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* ── Top-right controls ───────────────────────────────────────────────── */}
      <div className="fixed top-5 right-5 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center justify-center h-9 px-3 rounded-full bg-card/60 backdrop-blur-md border border-primary/20 text-foreground text-xs font-mono font-semibold hover:border-primary/50 hover:text-primary transition-colors"
          aria-label={t("common.switchLanguage")}
        >
          {i18n.language === "en" ? "EN" : "PL"}
        </button>

        <button
          type="button"
          onClick={() => setIsDark((v) => !v)}
          className="flex items-center justify-center size-9 rounded-full bg-card/60 backdrop-blur-md border border-primary/20 text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          aria-label={t("common.toggleTheme")}
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>

      {/* ── Page content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-svh flex-col lg:flex-row items-center justify-center px-4 py-12 gap-8 lg:gap-16">

        {/* ── Left panel — headline + metrics ─────────────────────────────────── */}
        <div className="flex flex-col gap-8 w-full max-w-[420px] lg:max-w-[460px]">
          {/* Headline */}
          <div
            className="font-mono font-black leading-tight"
            style={
              {
                "--glitch-bg": palette.background,
                "--glitch-size": "clamp(2.8rem, 6vw, 4.5rem)",
              } as React.CSSProperties
            }
          >
            <div style={{ "--glitch-color": isDark ? "#ffffff" : "#0F1117" } as React.CSSProperties}>
              <GlitchText speed={1} enableShadows={isDark} enableOnHover={false} className="font-mono">
                {t("auth.register.headline1")}
              </GlitchText>
            </div>
            <div style={{ "--glitch-color": isDark ? palette.accent : lightPalette.accent } as React.CSSProperties}>
              <GlitchText speed={1.4} enableShadows={isDark} enableOnHover={false} className="font-mono">
                {t("auth.register.headline2")}
              </GlitchText>
            </div>
            <div style={{ "--glitch-color": isDark ? "#ffffff" : "#0F1117" } as React.CSSProperties}>
              <GlitchText speed={0.8} enableShadows={isDark} enableOnHover={false} className="font-mono">
                {t("auth.register.headline3")}
              </GlitchText>
            </div>
          </div>

          {/* Metrics panel */}
          <div
            className={[
              "rounded-2xl backdrop-blur-2xl p-6 space-y-5",
              isDark
                ? "bg-card/60 border border-primary/20"
                : "bg-card/80 border border-primary/30 shadow-[0_4px_24px_rgba(0,150,125,0.12)]",
            ].join(" ")}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/50 mb-1">
              // system_status
            </p>

            {metrics.map((metric, i) => (
              <div key={metric.id} className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs text-primary/70 tracking-widest">
                    {metric.label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {metric.value}
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-primary/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: isDark ? palette.accent : lightPalette.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.progress}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            {/* Overlapping avatars */}
            <div className="flex -space-x-2">
              {AVATAR_SEEDS.map((seed, i) => (
                <div
                  key={seed}
                  className="size-8 rounded-full border-2 flex items-center justify-center font-mono text-[9px] font-bold select-none"
                  style={{
                    backgroundColor: AVATAR_COLORS[i],
                    borderColor: palette.background,
                    color: i % 2 === 0 ? palette.background : palette.accent,
                    zIndex: AVATAR_SEEDS.length - i,
                  }}
                >
                  {seed}
                </div>
              ))}
            </div>
            <div className="font-mono">
              <span className="text-sm font-bold" style={{ color: isDark ? palette.accent : lightPalette.accent }}>
                12,847+
              </span>{" "}
              <span className="text-xs text-muted-foreground/70">
                <DecryptedText
                  key={i18n.language + "stats"}
                  text={t("auth.register.statsJoined")}
                  animateOn="view"
                  speed={30}
                  sequential
                />
              </span>
            </div>
          </div>
        </div>

        {/* ── Right panel — registration form ─────────────────────────────────── */}
        <div className="w-full max-w-[380px]">
          {/* GlitchText title */}
          <div
            className="mb-4 text-center"
            style={
              {
                "--glitch-bg": palette.background,
                "--glitch-color": isDark ? "#ffffff" : "#0F1117",
                "--glitch-size": "clamp(3rem, 7vw, 4.5rem)",
              } as React.CSSProperties
            }
          >
            <GlitchText
              speed={1}
              enableShadows={isDark}
              enableOnHover={false}
              className="font-mono"
            >
              {t("auth.register.title")}
            </GlitchText>
          </div>

          {/* Glass card */}
          <div
            className={[
              "w-full rounded-2xl backdrop-blur-2xl px-8 py-6",
              isDark
                ? "bg-card/80 border border-primary/20 shadow-2xl"
                : "bg-card/90 border border-primary/30 shadow-[0_8px_40px_rgba(0,150,125,0.15)]",
            ].join(" ")}
          >
            <div className="flex justify-center mb-5">
              <img
                src={isDark ? logoDark : logoLight}
                alt="Alterday"
                width={72}
                height={72}
              />
            </div>

            <p className="font-mono text-sm text-muted-foreground mb-5 text-center">
              <DecryptedText
                key={i18n.language + "subtitle"}
                text={t("auth.register.subtitle")}
                animateOn="view"
                sequential
                speed={28}
                revealDirection="start"
              />
            </p>

            <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
              {/* Identity Tag (username) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <DecryptedText
                    key={i18n.language + "username"}
                    text={t("auth.register.usernameLabel")}
                    animateOn="view"
                    speed={40}
                    sequential
                  />
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={t("auth.register.usernamePlaceholder")}
                    autoComplete="username"
                    className="w-full bg-background/60 text-foreground placeholder:text-foreground/30 pl-10 pr-4 py-2.5 rounded-lg text-sm border border-primary/15 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
              </div>

              {/* Digital Address (email) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <DecryptedText
                    key={i18n.language + "email"}
                    text={t("auth.register.emailLabel")}
                    animateOn="view"
                    speed={40}
                    sequential
                  />
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 pointer-events-none" />
                  <input
                    type="email"
                    placeholder={t("auth.register.emailPlaceholder")}
                    autoComplete="email"
                    className="w-full bg-background/60 text-foreground placeholder:text-foreground/30 pl-10 pr-4 py-2.5 rounded-lg text-sm border border-primary/15 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
              </div>

              {/* Access Key (password) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <DecryptedText
                    key={i18n.language + "password"}
                    text={t("auth.register.passwordLabel")}
                    animateOn="view"
                    speed={40}
                    sequential
                  />
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.register.passwordPlaceholder")}
                    autoComplete="new-password"
                    className="w-full bg-background/60 text-foreground placeholder:text-foreground/30 pl-10 pr-10 py-2.5 rounded-lg text-sm border border-primary/15 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors"
                    aria-label={t(showPassword ? "common.hidePassword" : "common.showPassword")}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Verify Access Key (confirm password) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <DecryptedText
                    key={i18n.language + "confirm"}
                    text={t("auth.register.confirmLabel")}
                    animateOn="view"
                    speed={40}
                    sequential
                  />
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 pointer-events-none" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder={t("auth.register.confirmPlaceholder")}
                    autoComplete="new-password"
                    className="w-full bg-background/60 text-foreground placeholder:text-foreground/30 pl-10 pr-10 py-2.5 rounded-lg text-sm border border-primary/15 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors"
                    aria-label={t(showConfirm ? "common.hidePassword" : "common.showPassword")}
                  >
                    {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-colors mt-1"
              >
                {t("auth.register.submit")}
              </button>
            </form>

            <p className="mt-5 text-center text-xs font-mono text-muted-foreground/60">
              {t("auth.register.hasAccount")}{" "}
              <Link
                to="/login"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                {t("auth.register.signIn")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
