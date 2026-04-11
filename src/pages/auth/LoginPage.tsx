import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Mail, Lock, Sun, Moon } from "lucide-react";
import { GridScan } from "@/components/GridScan";
import GlitchText from "@/components/GlitchText";
import DecryptedText from "@/components/DecryptedText";
import { darkPalette, lightPalette, gridScanLightAccent } from "@/shared/colors";
import logoDark from "@/assets/logo/logo-base-transparent-dark-theme.svg";
import logoLight from "@/assets/logo/logo-base-transparent-light-theme.svg";
import { useThemeStore } from "@/stores/useThemeStore";

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    fill="none"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const { isDark, toggle: toggleTheme } = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);

  const palette = isDark ? darkPalette : lightPalette;

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "pl" : "en");

  return (
    // backgroundColor fixes the WebGL canvas alpha:0 bleed-through
    <div
      className="relative min-h-svh w-full"
      style={{ backgroundColor: palette.background }}
    >
      {/* ── Full-screen GridScan — adapts colours to current theme ──────────── */}
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
          onClick={toggleTheme}
          className="flex items-center justify-center size-9 rounded-full bg-card/60 backdrop-blur-md border border-primary/20 text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          aria-label={t("common.toggleTheme")}
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>

      {/* ── Page content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 py-8">
        {/* GlitchText floats directly on the grid background */}
        <div
          className="mb-4 text-center"
          style={
            {
              "--glitch-bg": palette.background,
              "--glitch-color": isDark ? "#ffffff" : "#0F1117",
              "--glitch-size": "clamp(3.5rem, 8vw, 5.5rem)",
            } as React.CSSProperties
          }
        >
          <GlitchText
            speed={1}
            enableShadows={isDark}
            enableOnHover={false}
            className="font-mono"
          >
            {t("auth.login.title")}
          </GlitchText>
        </div>

        {/* Glass card — stronger shadow + border in light mode so it lifts off the grid */}
        <div
          className={[
            "w-full max-w-[380px] rounded-2xl backdrop-blur-2xl px-8 py-6",
            isDark
              ? "bg-card/80 border border-primary/20 shadow-2xl"
              : "bg-card/90 border border-primary/30 shadow-[0_8px_40px_rgba(0,150,125,0.15)]",
          ].join(" ")}
        >
          <div className="flex justify-center mb-5">
            <img
              src={isDark ? logoDark : logoLight}
              alt="Alterday"
              width={80}
              height={80}
            />
          </div>

          <p className="font-mono text-sm text-muted-foreground mb-5 text-center">
            <DecryptedText
              key={i18n.language}
              text={t("auth.login.subtitle")}
              animateOn="view"
              sequential
              speed={28}
              revealDirection="start"
            />
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <DecryptedText
                  key={i18n.language + 'email'}
                  text={t("auth.login.emailLabel")}
                  animateOn="view"
                  speed={40}
                  sequential
                />
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 pointer-events-none" />
                <input
                  type="email"
                  placeholder={t("auth.login.emailPlaceholder")}
                  autoComplete="email"
                  className="w-full bg-background/60 text-foreground placeholder:text-foreground/30 pl-10 pr-4 py-2.5 rounded-lg text-sm border border-primary/15 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <DecryptedText
                  key={i18n.language + 'password'}
                  text={t("auth.login.passwordLabel")}
                  animateOn="view"
                  speed={40}
                  sequential
                />
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.login.passwordPlaceholder")}
                  autoComplete="current-password"
                  className="w-full bg-background/60 text-foreground placeholder:text-foreground/30 pl-10 pr-10 py-2.5 rounded-lg text-sm border border-primary/15 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors"
                  aria-label={t(
                    showPassword
                      ? "common.hidePassword"
                      : "common.showPassword",
                  )}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs font-mono text-primary/60 hover:text-primary transition-colors"
              >
                {t("auth.login.forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              {t("auth.login.submit")}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/15" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card/80 px-3 text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                <DecryptedText
                  key={i18n.language + 'or'}
                  text={t("auth.login.orContinueWith")}
                  animateOn="view"
                  speed={25}
                />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-background/50 hover:bg-background/80 border border-primary/15 hover:border-primary/40 text-foreground text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              <GitHubIcon />
              GitHub
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-background/50 hover:bg-background/80 border border-primary/15 hover:border-primary/40 text-foreground text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              <GoogleIcon />
              Google
            </button>
          </div>

          <p className="mt-6 text-center text-xs font-mono text-muted-foreground/60">
            {t("auth.login.noAccount")}{" "}
            <Link
              to="/register"
              className="text-primary/70 hover:text-primary transition-colors"
            >
              {t("auth.login.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
