import { useEffect, useRef, useState } from 'react';
import { portrait, srcSet, asset } from '../../config/assets.js';
import { site } from '../../config/site.js';
import { usePointerParallax, usePrefersReducedMotion } from '../../hooks/motion.js';
import { DoodleStar, HoloSticker, PetalField, Planet, Rocket, Sparkle, StarField } from '../sakura/Sakura.jsx';
import Typewriter from '../ui/Typewriter.jsx';
import './hero.css';

const SIZES = '(max-width: 760px) 92vw, 44vw';

// Twinkling doodle stars around the stage: [left %, top %, size px, kind, tone, twinkle delay s]
const STARS = [
  [46, 14, 30, 'doodle', 'gold', 0],
  [88, 50, 22, 'doodle', 'pink', 0.8],
  [38, 46, 16, 'sparkle', 'green', 1.4],
  [80, 70, 18, 'sparkle', 'lavender', 0.4],
  [94, 28, 14, 'sparkle', 'gold', 2],
  [30, 10, 12, 'sparkle', 'pink', 1.1],
  [70, 8, 16, 'sparkle', 'green', 1.8],
];

export default function Hero() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();
  usePointerParallax(ref);

  // Start the entrance once display fonts are in (avoids the name re-flowing mid-animation).
  useEffect(() => {
    let done = false;
    const go = () => !done && ((done = true), setReady(true));
    const t = setTimeout(go, 900);
    document.fonts?.ready.then(go);
    return () => clearTimeout(t);
  }, []);

  // Hero scroll progress (0 at top → 1 after one hero-height) for a gentle depth drift.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.setProperty('--hs', Math.min(1, Math.max(0, window.scrollY / el.offsetHeight)).toFixed(4));
    };
    const onScroll = () => !frame && (frame = requestAnimationFrame(update));
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const opts = { local: portrait.local };

  return (
    <section id="home" ref={ref} className={`hero ${ready ? 'is-ready' : ''}`} aria-labelledby="hero-title">
      <div className="hero__stage">
        {/* A soft pink universe: pastel nebula clouds + coloured star dots */}
        <div className="hero__nebula" aria-hidden="true">
          <span className="hero__cloud hero__cloud--pink" />
          <span className="hero__cloud hero__cloud--purple" />
          <span className="hero__cloud hero__cloud--green" />
          <span className="hero__cloud hero__cloud--magenta" />
        </div>
        <StarField className="hero__starfield" count={110} seed={17} />

        <Planet className="hero__planet" />
        <Planet className="hero__moon hero__moon--green" />
        <Planet className="hero__moon hero__moon--purple" />
        <Rocket className="hero__rocket" />

        <div className="hero__stars" aria-hidden="true">
          {STARS.map(([x, y, s, kind, tone, d], i) => {
            const Comp = kind === 'doodle' ? DoodleStar : Sparkle;
            return (
              <span key={i} className="hero__star" style={{ left: `${x}%`, top: `${y}%`, '--i': i }}>
                <Comp size={s} tone={tone} className="twinkle" style={{ '--tw-delay': `${d}s` }} />
              </span>
            );
          })}
        </div>
        <PetalField className="hero__petals hero__petals--far" count={10} seed={3} />

        {/* Name sits entirely behind the portrait */}
        <h1 id="hero-title" className="hero__name">
          <span className="hero__line hero__line--1">
            <span>Kimberly</span>
          </span>
          <span className="hero__line hero__line--2">
            <span>Camanero</span>
          </span>
        </h1>

        <picture className="hero__portrait">
          {portrait.formats.map((f) => (
            <source key={f} type={`image/${f}`} srcSet={srcSet(portrait.key, portrait.widths, f, opts)} sizes={SIZES} />
          ))}
          <img
            src={asset(`${portrait.key}-1000.webp`, opts)}
            width={portrait.width}
            height={portrait.height}
            alt={portrait.alt}
            fetchpriority="high"
            decoding="async"
          />
        </picture>

        {/* Holographic stickers, slapped on like a 2010 binder */}
        <HoloSticker shape="star" size={86} className="hero__sticker hero__sticker--star holo--tilt" style={{ '--rot': '-14deg' }} />
        <HoloSticker shape="heart" size={64} className="hero__sticker hero__sticker--heart holo--tilt" style={{ '--rot': '10deg' }} />
        <HoloSticker shape="sparkle" size={52} className="hero__sticker hero__sticker--sparkle" />

        <PetalField className="hero__petals hero__petals--near" count={5} seed={11} />
      </div>

      <div className="hero__intro">
        <ul className="hero__roles" aria-label="Roles">
          {site.roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="hero__tagline">
          <Typewriter text={site.tagline.toLowerCase()} start={ready} delay={1500} />
        </p>
        <div className="hero__ctas">
          <a className="btn" href="#projects">
            Explore my work
          </a>
          <a className="btn btn--ghost" href="#about">
            About me
          </a>
          <a className="btn btn--ghost" href="#contact">
            Contact
          </a>
        </div>
      </div>

      <a className="hero__cue" href="#about" aria-label="Scroll to About">
        <span className="hero__cue-dot" aria-hidden="true" />
      </a>
    </section>
  );
}
