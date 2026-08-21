"use client";

import type { ComponentProps, CSSProperties, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase =
  | "idle"
  | "exiting"
  | "black"
  | "covering"
  | "covered"
  | "revealing";

type PendingTransition = {
  committed: boolean;
  href: string;
  pathname: string;
  pushed: boolean;
  skipReadinessWait: boolean;
  token: number;
};

type PaperRouteTransitionContextValue = {
  start: (href: string) => boolean;
};

type PaperTransitionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onNavigate" | "transitionTypes"
> & {
  href: string;
};

const handoffDuration = 220;
const revealDuration = 240;
const readinessDeadline = 1800;
const navigationDeadline = 6000;
const handoffStyle = {
  "--paper-handoff-duration": `${handoffDuration}ms`
} as CSSProperties;

const PaperRouteTransitionContext = createContext<PaperRouteTransitionContextValue | null>(
  null
);

function delay(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

function afterTwoPaints() {
  return Promise.race([
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    }),
    delay(96)
  ]);
}

async function waitForVisiblePaperAssets() {
  await afterTwoPaints();

  const images = Array.from(document.querySelectorAll<HTMLImageElement>("#main-content img"))
    .filter((image) => {
      const rect = image.getBoundingClientRect();

      return (
        rect.bottom >= 0 &&
        rect.top <= window.innerHeight &&
        rect.right >= 0 &&
        rect.left <= window.innerWidth
      );
    });
  const fontReadiness = document.fonts?.ready ?? Promise.resolve();
  const imageReadiness = images.map((image) => image.decode().catch(() => undefined));

  await Promise.race([
    Promise.allSettled([fontReadiness, ...imageReadiness]),
    delay(readinessDeadline)
  ]);
  await afterTwoPaints();
}

export function PaperRouteTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const phaseRef = useRef<TransitionPhase>("idle");
  const pendingRef = useRef<PendingTransition | null>(null);
  const timerIdsRef = useRef(new Set<number>());
  const tokenRef = useRef(0);

  const setTransitionPhase = useCallback((nextPhase: TransitionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const clearTimers = useCallback(() => {
    timerIdsRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timerIdsRef.current.clear();
  }, []);

  const schedule = useCallback((callback: () => void, duration: number) => {
    const timerId = window.setTimeout(() => {
      timerIdsRef.current.delete(timerId);
      callback();
    }, duration);

    timerIdsRef.current.add(timerId);
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    pendingRef.current = null;
    setTransitionPhase("idle");
  }, [clearTimers, setTransitionPhase]);

  const reveal = useCallback(
    (token: number) => {
      if (pendingRef.current?.token !== token) {
        return;
      }

      setTransitionPhase("revealing");
      schedule(reset, revealDuration);
    },
    [reset, schedule, setTransitionPhase]
  );

  const prepareAndReveal = useCallback(
    async (token: number) => {
      const pending = pendingRef.current;

      if (!pending || pending.token !== token) {
        return;
      }

      if (!pending.skipReadinessWait) {
        await waitForVisiblePaperAssets();
      } else {
        await afterTwoPaints();
      }

      reveal(token);
    },
    [reveal]
  );

  const start = useCallback(
    (href: string) => {
      if (
        !href.startsWith("/") ||
        href.startsWith("//") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return false;
      }

      if (phaseRef.current !== "idle") {
        return true;
      }

      const targetPathname = new URL(href, window.location.href).pathname;

      if (targetPathname === pathname) {
        return false;
      }

      const token = tokenRef.current + 1;
      tokenRef.current = token;
      pendingRef.current = {
        committed: false,
        href,
        pathname: targetPathname,
        pushed: false,
        skipReadinessWait: false,
        token
      };
      setTransitionPhase("exiting");

      schedule(() => {
        if (pendingRef.current?.token !== token) {
          return;
        }

        setTransitionPhase("black");
        void afterTwoPaints().then(() => {
          if (pendingRef.current?.token !== token) {
            return;
          }

          setTransitionPhase("covering");
          schedule(() => {
            if (pendingRef.current?.token !== token) {
              return;
            }

            setTransitionPhase("covered");
            void afterTwoPaints().then(() => {
              const pending = pendingRef.current;

              if (!pending || pending.token !== token) {
                return;
              }

              pending.pushed = true;
              router.push(pending.href);
              schedule(() => {
                const unresolved = pendingRef.current;

                if (unresolved?.token === token && !unresolved.committed) {
                  window.location.assign(unresolved.href);
                }
              }, navigationDeadline);
            });
          }, handoffDuration);
        });
      }, handoffDuration);

      return true;
    },
    [pathname, router, schedule, setTransitionPhase]
  );

  useEffect(() => {
    const pending = pendingRef.current;

    if (!pending?.pushed) {
      return;
    }

    if (pathname !== pending.pathname) {
      reset();
      return;
    }

    if (pending.committed) {
      return;
    }

    pending.committed = true;
    void prepareAndReveal(pending.token);
  }, [pathname, prepareAndReveal, reset]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || phaseRef.current === "idle") {
        return;
      }

      const pending = pendingRef.current;

      if (!pending?.pushed) {
        reset();
        return;
      }

      pending.skipReadinessWait = true;
      if (pending.committed) {
        reveal(pending.token);
      }
    }

    function handleHistoryChange() {
      reset();
    }

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("popstate", handleHistoryChange);
    window.addEventListener("pagehide", handleHistoryChange);
    window.addEventListener("pageshow", handleHistoryChange);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("popstate", handleHistoryChange);
      window.removeEventListener("pagehide", handleHistoryChange);
      window.removeEventListener("pageshow", handleHistoryChange);
      clearTimers();
    };
  }, [clearTimers, reset, reveal]);

  const contextValue = useMemo(() => ({ start }), [start]);
  const isTransitioning = phase !== "idle";

  return (
    <PaperRouteTransitionContext.Provider value={contextValue}>
      <div
        className="paper-route-transition-shell"
        data-paper-transition-phase={phase}
        aria-busy={isTransitioning || undefined}
        inert={isTransitioning}
        style={handoffStyle}
      >
        {children}
      </div>
      <div
        className="paper-route-transition-mask"
        data-paper-transition-phase={phase}
        aria-hidden="true"
        style={handoffStyle}
      />
    </PaperRouteTransitionContext.Provider>
  );
}

export function PaperTransitionLink({ href, ...props }: PaperTransitionLinkProps) {
  const transition = useContext(PaperRouteTransitionContext);

  if (!transition) {
    throw new Error("PaperTransitionLink must be used inside PaperRouteTransitionProvider.");
  }

  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        if (transition.start(href)) {
          event.preventDefault();
        }
      }}
    />
  );
}
