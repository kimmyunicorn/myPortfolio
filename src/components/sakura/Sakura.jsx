// Decorative graphics for the "cozy space girl" look: blossoms, sparkles,
// doodled stars, a ringed pink planet, a little rocket, and drifting particles.
// Pure SVG + CSS animation (transform/opacity only). No images, no canvas.
import { useId } from 'react';
import './sakura.css';

// Seeded PRNG so placement is identical on every render.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// One sakura petal pointing up from the origin, with the notch at its tip.
const PETAL = 'M0 0 C-9 -6 -13 -19 -8 -29 C-6 -33 -3 -33 0 -29.5 C3 -33 6 -33 8 -29 C13 -19 9 -6 0 0Z';
// Four-point sparkle centred on the origin (radius 10).
const SPARKLE = 'M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z';

export function Blossom({ size = 64, className = '', style, tone = 'sakura', ...rest }) {
  return (
    <svg
      className={`blossom blossom--${tone} ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="-40 -40 80 80"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g className="blossom__petals">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d={PETAL} transform={`rotate(${a})`} />
        ))}
      </g>
      <circle className="blossom__heart" r="6" />
    </svg>
  );
}

export function Sparkle({ size = 20, tone = 'gold', className = '', style }) {
  return (
    <svg
      className={`sparkle sparkle--${tone} ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="-11 -11 22 22"
      aria-hidden="true"
      focusable="false"
    >
      <path d={SPARKLE} />
    </svg>
  );
}

/** Hand-drawn five-point star (stroked, slightly uneven). */
export function DoodleStar({ size = 28, tone = 'gold', className = '', style }) {
  return (
    <svg
      className={`doodle-star doodle-star--${tone} ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 3.5 L24.6 14.2 L36 15.3 L27.3 23 L30 34.6 L20.2 28.6 L10 34.8 L12.8 23.2 L4 15.6 L15.6 14 Z" />
    </svg>
  );
}

/** A soft pink planet with a ring. The back half of the ring sits behind the sphere. */
export function Planet({ className = '' }) {
  return (
    <svg className={`planet ${className}`} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="planet-body" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#ffe9ef" />
          <stop offset="45%" stopColor="#ffc6d5" />
          <stop offset="100%" stopColor="#f39ab5" />
        </radialGradient>
        <clipPath id="planet-clip">
          <circle cx="200" cy="200" r="150" />
        </clipPath>
      </defs>
      <g transform="rotate(-16 200 200)">
        <path className="planet__ring planet__ring--back" d="M18 200 A182 46 0 0 1 382 200" />
      </g>
      <circle cx="200" cy="200" r="150" fill="url(#planet-body)" />
      <g clipPath="url(#planet-clip)" className="planet__bands">
        <path d="M40 150 C120 132 280 168 360 140" />
        <path d="M40 250 C140 270 260 236 360 262" />
        <circle cx="140" cy="120" r="12" />
        <circle cx="262" cy="292" r="8" />
        <circle cx="290" cy="150" r="5" />
      </g>
      <g transform="rotate(-16 200 200)">
        <path className="planet__ring planet__ring--front" d="M18 200 A182 46 0 0 0 382 200" />
      </g>
    </svg>
  );
}

/** A small doodled rocket with a dashed flight path. */
export function Rocket({ className = '' }) {
  return (
    <svg className={`rocket ${className}`} viewBox="0 0 320 240" aria-hidden="true" focusable="false">
      <path className="rocket__trail" d="M8 228 C70 214 120 190 150 150 C178 112 200 90 236 74" />
      <g className="rocket__body-group" transform="translate(262 56) rotate(52)">
        <path className="rocket__flame" d="M-9 34 Q0 58 9 34 Z" />
        <path className="rocket__fin" d="M-14 14 L-26 32 L-12 30 Z" />
        <path className="rocket__fin" d="M14 14 L26 32 L12 30 Z" />
        <path className="rocket__body" d="M0 -36 C16 -22 17 10 12 32 L-12 32 C-17 10 -16 -22 0 -36 Z" />
        <circle className="rocket__window" cx="0" cy="-6" r="7" />
      </g>
    </svg>
  );
}

/**
 * Drifting particles: a mix of sakura petals and sparkles. Far particles are small,
 * slow and faint; near ones are larger and quicker. Count is halved on small screens.
 */
export function PetalField({ count = 14, seed = 7, className = '', sparkleEvery = 3 }) {
  const r = rng(seed);
  const items = Array.from({ length: count }, (_, i) => {
    const depth = r();
    return {
      i,
      sparkle: i % sparkleEvery === 0,
      x: r() * 100,
      size: 10 + depth * 14,
      dur: 22 - depth * 9 + r() * 6,
      delay: -r() * 24,
      sway: 30 + r() * 70,
      spin: 180 + r() * 360,
      opacity: 0.4 + depth * 0.5,
      depth,
    };
  });
  return (
    <div className={`petal-field ${className}`} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.i}
          className={`petal ${p.sparkle ? 'petal--sparkle' : ''}`}
          style={{
            '--x': `${p.x}%`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--sway': `${p.sway}px`,
            '--spin': `${p.spin}deg`,
            '--o': p.opacity,
            '--depth': p.depth,
            width: p.size,
            height: p.size,
          }}
        >
          <svg viewBox={p.sparkle ? '-11 -11 22 22' : '-12 -32 24 34'} className="petal__svg">
            <path d={p.sparkle ? SPARKLE : PETAL} />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Static, gently twinkling star dots for dark sections. */
export function StarField({ count = 70, seed = 5, className = '' }) {
  const r = rng(seed);
  return (
    <div className={`star-field ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="star-dot"
          style={{
            left: `${r() * 100}%`,
            top: `${r() * 100}%`,
            '--s': `${1 + r() * 2.2}px`,
            '--tw': `${2.5 + r() * 4}s`,
            '--td': `${-r() * 6}s`,
          }}
        />
      ))}
    </div>
  );
}

// ---------- 2010 layer: holographic stickers ----------
const STICKER_PATHS = {
  star: 'M50 6 L62 37 L95 39 L69 60 L78 93 L50 74 L22 93 L31 60 L5 39 L38 37 Z',
  heart: 'M50 88 C20 66 6 50 6 32 C6 18 17 8 30 8 C40 8 46 14 50 22 C54 14 60 8 70 8 C83 8 94 18 94 32 C94 50 80 66 50 88 Z',
  planet:
    'M50 18 A26 26 0 1 1 49.9 18 Z M8 62 C2 54 22 44 50 40 C78 36 98 38 94 46 C91 52 76 58 50 62 C24 66 12 66 8 62 Z',
  sparkle: 'M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z',
};

/** A die-cut foil sticker (white border, shimmering soft-yellow foil). */
export function HoloSticker({ shape = 'star', size = 64, className = '', style }) {
  const id = `holo-${useId().replace(/:/g, '')}`;
  return (
    <svg
      className={`holo ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="-4 -4 108 108"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          {/* Soft butter-yellow foil with a gentle shimmer */}
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="30%" stopColor="#ffd970" />
          <stop offset="50%" stopColor="#fff4cc" />
          <stop offset="70%" stopColor="#ffd25e" />
          <stop offset="100%" stopColor="#ffe9a8" />
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            values="0 0.5 0.5;360 0.5 0.5"
            dur="6s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <path d={STICKER_PATHS[shape]} className="holo__border" fillRule="evenodd" />
      <path d={STICKER_PATHS[shape]} fill={`url(#${id})`} fillRule="evenodd" className="holo__foil" />
      <path d={STICKER_PATHS[shape]} className="holo__glint" fillRule="evenodd" />
    </svg>
  );
}
