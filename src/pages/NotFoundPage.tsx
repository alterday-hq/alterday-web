import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/stores/useThemeStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils';
import FuzzyText from '@/components/ui/FuzzyText';
import { darkPalette, lightPalette } from '@/shared/colors';


export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDark = useThemeStore((s) => s.isDark);
  const session = useAuthStore((s) => s.session);
  const palette = isDark ? darkPalette : lightPalette;

  return (
    <>
      {/* pointer-events-none so mouse parallax on GridScan still works */}
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
        <FuzzyText
          fontSize="clamp(5rem, 20vw, 16rem)"
          fontWeight={900}
          fontFamily="'Geist Mono', monospace"
          color={palette.accent}
          baseIntensity={0.15}
          hoverIntensity={0.45}
          enableHover
          glitchMode
          glitchInterval={3500}
          glitchDuration={180}
          className="pointer-events-auto"
        >
          404
        </FuzzyText>

        <button
          onClick={() => navigate(session ? '/home' : '/login', { replace: true })}
          className={cn(
            'pointer-events-auto rounded-2xl px-8 py-3 backdrop-blur-2xl',
            'font-mono text-sm tracking-widest uppercase text-foreground',
            'transition-colors hover:border-primary/50 hover:text-primary',
            isDark
              ? 'bg-card/80 border border-primary/20 shadow-2xl'
              : 'bg-card/90 border border-primary/30 shadow-[0_8px_40px_rgba(0,150,125,0.15)]',
          )}
        >
          {t('notFound.back')}
        </button>
      </div>

      {/* Scrolling terminal banner at bottom */}
      <div className="fixed bottom-0 left-0 right-0 overflow-hidden py-3 backdrop-blur-sm border-t border-primary/10">
        <div
          className="flex whitespace-nowrap animate-[marquee_18s_linear_infinite] font-mono text-xs tracking-[0.18em]"
          style={{ color: palette.accent, opacity: 0.65 }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="pr-12">{t('notFound.banner')}</span>
          ))}
        </div>
      </div>
    </>
  );
}
