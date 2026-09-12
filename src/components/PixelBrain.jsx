import { useMemo } from 'react';

const COLS = 28;
const ROWS = 11;

// Deterministic PRNG so the generated pattern is stable across renders.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function PixelBrain() {
  const cells = useMemo(() => {
    const rand = mulberry32(1337);
    // Two overlapping lobes give the blob a brain-like silhouette.
    const lobes = [
      { cx: COLS * 0.33, cy: ROWS * 0.5, rx: COLS * 0.26, ry: ROWS * 0.44 },
      { cx: COLS * 0.67, cy: ROWS * 0.5, rx: COLS * 0.26, ry: ROWS * 0.44 },
    ];
    const list = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const dist = Math.min(
          ...lobes.map((l) => Math.hypot((x - l.cx) / l.rx, (y - l.cy) / l.ry))
        );
        const density = Math.max(0, 1 - dist);
        if (rand() < density * 0.92) {
          list.push({
            x,
            y,
            tier: density > 0.62 ? 'core' : density > 0.3 ? 'mid' : 'edge',
            pulse: density > 0.2 && rand() < 0.14,
            delay: (rand() * 2.6).toFixed(2),
          });
        }
      }
    }
    return list;
  }, []);

  return (
    <div
      aria-hidden
      className="grid w-full max-w-md gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {cells.map(({ x, y, tier, pulse, delay }) => (
        <span
          key={`${x}-${y}`}
          className={[
            'aspect-square rounded-[1.5px]',
            tier === 'core' && 'bg-accent-glow/70',
            tier === 'mid' && 'bg-accent-glow/35',
            tier === 'edge' && 'bg-accent-glow/15',
            pulse && 'animate-pixel-pulse',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            gridColumnStart: x + 1,
            gridRowStart: y + 1,
            animationDelay: pulse ? `${delay}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
