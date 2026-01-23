import { useMemo, useRef } from "react";

type UseHorizontalSwipeOptions = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Minimum horizontal distance in px to qualify as a swipe. */
  thresholdPx?: number;
  /** Maximum vertical distance in px allowed for a horizontal swipe gesture. */
  maxVerticalPx?: number;
  /** Optional predicate to ignore swipe when gesture starts on certain elements. */
  shouldIgnoreStart?: (target: EventTarget | null) => boolean;
};

export function useHorizontalSwipe({
  onSwipeLeft,
  onSwipeRight,
  thresholdPx = 50,
  maxVerticalPx = 80,
  shouldIgnoreStart,
}: UseHorizontalSwipeOptions) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const ignored = useRef(false);

  return useMemo(
    () => ({
      onTouchStart: (e: React.TouchEvent) => {
        ignored.current = shouldIgnoreStart?.(e.target) ?? false;
        if (ignored.current) return;

        const t = e.touches[0];
        startX.current = t?.clientX ?? null;
        startY.current = t?.clientY ?? null;
      },
      onTouchMove: (e: React.TouchEvent) => {
        if (ignored.current) return;
        if (startX.current == null || startY.current == null) return;

        const t = e.touches[0];
        if (!t) return;

        const dx = t.clientX - startX.current;
        const dy = t.clientY - startY.current;

        // If gesture is clearly horizontal, stop the page from horizontally panning.
        if (Math.abs(dx) > 10 && Math.abs(dy) < maxVerticalPx) {
          e.preventDefault();
        }
      },
      onTouchEnd: (e: React.TouchEvent) => {
        if (ignored.current) return;
        if (startX.current == null || startY.current == null) return;

        const t = e.changedTouches[0];
        if (!t) return;

        const dx = t.clientX - startX.current;
        const dy = t.clientY - startY.current;

        startX.current = null;
        startY.current = null;

        if (Math.abs(dy) > maxVerticalPx) return;
        if (Math.abs(dx) < thresholdPx) return;

        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      },
    }),
    [maxVerticalPx, onSwipeLeft, onSwipeRight, shouldIgnoreStart, thresholdPx],
  );
}
