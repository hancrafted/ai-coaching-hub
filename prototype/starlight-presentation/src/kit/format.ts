// KIT — shared formatting. Exists because prototype 1 had two `mmss`
// implementations with a REAL behavioural difference, not just duplication:
//   VariantAScript.astro:11    `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`
//   VariantBRunOfShow.astro:13 zero-padded both fields
// A's minutes were unpadded, B's were padded, so the same subsection rendered
// "4:05" in one variant and "04:05" in another. The kit picks one: unpadded
// minutes (a talk is never an hour long), padded seconds.

export const int = (n: number): string => new Intl.NumberFormat('en-US').format(n);

export const mmss = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;

/** Whole minutes, for run-of-show envelopes. */
export const minutes = (seconds: number): string => `${Math.round(seconds / 60)}m`;

/** Costs in the token-economy module run from $0.000018 to ~$40k, so precision
 *  has to slide or every small number renders as "$0.00". */
export const usd = (amount: number): string => {
  if (amount === 0) return '$0';
  const abs = Math.abs(amount);
  if (abs < 0.01) return `$${amount.toFixed(6).replace(/0+$/, '')}`;
  if (abs < 1) return `$${amount.toFixed(4).replace(/0+$/, '')}`;
  if (abs < 1000) return `$${amount.toFixed(2)}`;
  return `$${int(Math.round(amount))}`;
};

export interface CountUpOptions {
  duration?: number;
  format?: (n: number) => string;
  reduceMotion?: boolean;
  /** Start value. S5.1 chains counters so each carries on from the last total. */
  from?: number;
  /** Fired when the count settles — S5.1 uses it to sequence the chain. */
  onDone?: () => void;
}

/** Ported from coaching-content/presentation.js — the shared rAF helper behind
 *  every counting animation. `reduceMotion` short-circuits to the final value so
 *  a number is never left mid-count. */
export function countUp(el: Element, to: number, options: CountUpOptions = {}): void {
  const { duration = 900, format = int, reduceMotion = false, from = 0, onDone } = options;
  if (reduceMotion || duration <= 0) {
    el.textContent = format(to);
    onDone?.();
    return;
  }
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic, as in the original
    el.textContent = format(from + (to - from) * eased);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = format(to);
      onDone?.();
    }
  };
  requestAnimationFrame(step);
}
