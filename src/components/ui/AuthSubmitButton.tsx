import { useState, useEffect, useRef } from 'react';
import { useAnimate } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { mapAuthError } from '@/lib/authErrors';

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const CHAR_SPEED = 55;
const ERROR_HOLD_MS = 2500;

function rnd() {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

interface Props {
  children: string;
  isLoading: boolean;
  error: string | null;
  errorKey?: number;
  disabled?: boolean;
}

export function AuthSubmitButton({ children, isLoading, error, errorKey, disabled }: Props) {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState(children);
  const [isErrorState, setIsErrorState] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const initialErrorKeyRef = useRef(errorKey ?? 0);
  const shakeAnimRef = useRef<{ stop: () => void } | null>(null);
  const [scope, animate] = useAnimate();

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
  };

  const animateReveal = (target: string, startDelay = 0, onDone?: () => void) => {
    const chars = target.split('').map(c => (c === ' ' ? ' ' : rnd()));
    schedule(() => setDisplayText(chars.join('')), startDelay);

    let lastDelay = startDelay;
    target.split('').forEach((char, i) => {
      const delay = startDelay + 60 + i * CHAR_SPEED;
      lastDelay = delay;
      schedule(() => {
        chars[i] = char;
        setDisplayText(chars.join(''));
      }, delay);
    });

    if (onDone) schedule(onDone, lastDelay + 60);
  };

  const triggerShake = () => {
    shakeAnimRef.current?.stop();
    shakeAnimRef.current = animate(
      scope.current,
      { x: [0, -10, 10, -7, 7, -4, 4, 0] },
      { duration: 0.5 },
    ) as { stop: () => void };
  };

  useEffect(() => {
    // Skip stale store error — errorKey only increments on real submit, never on mount
    if ((errorKey ?? 0) === initialErrorKeyRef.current) return;

    if (!error) {
      clearTimers();
      if (isErrorState) {
        setIsErrorState(false);
        animateReveal(children, 0, () => setIsAnimating(false));
      } else {
        setIsAnimating(false);
      }
      return;
    }

    clearTimers();
    setIsErrorState(true);
    setIsAnimating(true);
    triggerShake();
    animateReveal(t(mapAuthError(error)), 0, () => {
      schedule(() => {
        setIsErrorState(false);
        animateReveal(children, 0, () => setIsAnimating(false));
      }, ERROR_HOLD_MS);
    });

    return clearTimers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, errorKey]);

  useEffect(() => () => {
    clearTimers();
    shakeAnimRef.current?.stop();
    // Reset transform so animation doesn't bleed to the next page
    if (scope.current) scope.current.style.transform = '';
  }, []);

  return (
    <button
      ref={scope}
      type="submit"
      disabled={isLoading || isErrorState || disabled}
      className={cn(
        'w-full py-2.5 rounded-lg text-sm font-mono font-semibold tracking-widest transition-colors duration-300 flex items-center justify-center gap-2',
        isErrorState
          ? 'bg-destructive/80 hover:bg-destructive text-white border border-destructive/60'
          : 'bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed',
      )}
    >
      {isLoading ? (
        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : (
        isAnimating ? displayText : children
      )}
    </button>
  );
}
