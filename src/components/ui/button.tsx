import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { useState, useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { mapAuthError } from '@/lib/authErrors'
import { AUTH_BUTTON_CHAR_POOL, AUTH_BUTTON_CHAR_SPEED, AUTH_BUTTON_ERROR_HOLD_MS } from '@/constants/authButton'

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

// ── Auth submit button ────────────────────────────────────────────────────────

function rnd() {
  return AUTH_BUTTON_CHAR_POOL[Math.floor(Math.random() * AUTH_BUTTON_CHAR_POOL.length)];
}

interface AuthSubmitButtonProps {
  children: string;
  isLoading: boolean;
  error: string | null;
  errorKey?: number;
  disabled?: boolean;
}

export function AuthSubmitButton({ children, isLoading, error, errorKey, disabled }: AuthSubmitButtonProps) {
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
      const delay = startDelay + 60 + i * AUTH_BUTTON_CHAR_SPEED;
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
      }, AUTH_BUTTON_ERROR_HOLD_MS);
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
