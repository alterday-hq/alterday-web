import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useThemeStore } from "@/stores/useThemeStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-mono text-2xl font-bold text-foreground mb-6 mt-0 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-mono text-base font-semibold text-primary uppercase tracking-widest mb-3 mt-8 border-b border-primary/15 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-mono text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-2 mt-5">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-foreground/70 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-1.5 mb-4 pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1.5 mb-4 text-sm text-foreground/70">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 text-sm text-foreground/70 leading-relaxed">
      <span className="text-primary/60 shrink-0 font-mono">›</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground/90">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground/60">{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary/30 pl-4 my-4 text-sm text-foreground/50 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
      {children}
    </code>
  ),
  hr: () => <hr className="border-primary/10 my-6" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-primary/10">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="text-left font-mono text-xs font-semibold text-primary/70 uppercase tracking-wider py-2 pr-4">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2 pr-4 text-foreground/65 align-top">{children}</td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary/70 hover:text-primary underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
};

interface LegalPageProps {
  content: string;
  titleKey: string;
}

export default function LegalPage({ content, titleKey }: LegalPageProps) {
  const { t, i18n } = useTranslation();
  const isDark = useThemeStore((s) => s.isDark);
  const session = useAuthStore((s) => s.session);
  const navigate = useNavigate();

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "pl" : "en");

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(session ? "/home" : "/login");
    }
  };

  return (
    <div className="relative min-h-svh w-full">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 font-mono text-xs text-foreground/50 hover:text-primary transition-colors"
          aria-label={t("legal.back")}
        >
          <ArrowLeft className="size-3.5" />
          {t("legal.back")}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center justify-center h-9 px-3 rounded-full bg-card/60 backdrop-blur-md border border-primary/20 text-foreground text-xs font-mono font-semibold hover:border-primary/50 hover:text-primary transition-colors"
            aria-label={t("common.switchLanguage")}
          >
            {i18n.language === "en" ? "EN" : "PL"}
          </button>
          <AnimatedThemeToggler
            className="flex items-center justify-center size-9 rounded-full bg-card/60 backdrop-blur-md border border-primary/20 text-foreground hover:border-primary/50 hover:text-primary transition-colors [&_svg]:size-4"
            aria-label={t("common.toggleTheme")}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 min-h-svh pt-20 pb-16 px-4 flex justify-center">
        <div
          className={cn(
            "w-full max-w-2xl rounded-2xl backdrop-blur-2xl px-8 py-8 h-fit",
            isDark
              ? "bg-card/80 border border-primary/20 shadow-2xl"
              : "bg-card/90 border border-primary/30 shadow-[0_8px_40px_rgba(0,150,125,0.15)]",
          )}
        >
          <div className="mb-2">
            <span className="font-mono text-[10px] text-primary/50 uppercase tracking-widest">
              {t(titleKey)}
            </span>
          </div>
          <ReactMarkdown components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
