import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import ScratchCard, { Brushes, Covers, type ScratchCardRef } from "react-scratchcard-v2";
import { foilCoverDataUrl } from "@/lib/scratch-cover";

// Computed once — the SVG is deterministic and immutable.
const COVER = Covers.image(foilCoverDataUrl());
const BRUSH = Brushes.circle(22);

/**
 * Scratch-to-reveal wrapper for a freshly minted card.
 *
 * The card renders in normal flow and defines the wrapper's size; the foil
 * canvas is an overlay sized to the measured wrapper, so it always covers the
 * full card (photo + footer) and inherits the card's rounded corners through
 * the wrapper's clipping. Scratching ~65% of it triggers an auto-reveal sweep.
 *
 * Remount (or `key` by card id) for a fresh card — the scratch state is
 * component-local on purpose.
 */
export function ScratchCardReveal({
  children,
  onRevealed,
}: {
  children: ReactNode;
  onRevealed?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<ScratchCardRef>(null);
  const revealedRef = useRef(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // The canvas needs pixel dimensions; the card is fluid (`max-w-xs` inside
  // `px-6`) and its height is content-driven, so measure both axes.
  // Layout effect: measure before first paint so the card never flashes
  // uncovered.
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ready = size.width > 0 && size.height > 0;

  return (
    <div className="mx-auto w-full max-w-xs">
      <p
        aria-hidden={started || revealed}
        className={`mb-2 text-center text-xs text-muted transition-opacity duration-300 ${
          started || revealed ? "opacity-0" : "opacity-100"
        }`}
      >
        Cào lớp vàng để mở thẻ
      </p>
      <div ref={wrapRef} className="relative overflow-hidden rounded-3xl">
        {children}
        {ready && (
          <div className="absolute inset-0">
            <ScratchCard
              ref={cardRef}
              width={size.width}
              height={size.height}
              cover={COVER}
              brush={BRUSH}
              finishPercent={65}
              ariaLabel="Cào để mở thẻ mới"
              onScratchStart={() => setStarted(true)}
              onComplete={() => {
                if (revealedRef.current) return;
                revealedRef.current = true;
                // Defer: onComplete fires mid-scratch inside the canvas
                // engine — an immediate revealAll there races its own bookkeeping.
                window.setTimeout(() => {
                  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  if (reduce) cardRef.current?.revealAll();
                  else cardRef.current?.revealAll({ duration: 400, blockSize: 4 });
                  setRevealed(true);
                  onRevealed?.();
                }, 0);
              }}
            >
              <span />
            </ScratchCard>
          </div>
        )}
      </div>
    </div>
  );
}
