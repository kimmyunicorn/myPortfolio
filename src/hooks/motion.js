// Small, dependency-free motion hooks. All of them respect prefers-reduced-motion.
import { useEffect, useRef, useState } from 'react';

export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** Adds `is-in` to the element once it enters the viewport (one-shot). */
export function useInView({ rootMargin = '0px 0px -12% 0px', threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setInView(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);
  return [ref, inView];
}

/**
 * Writes scroll progress (0 → 1) of an element through the viewport to a CSS custom
 * property on that element. No React re-renders; one rAF-throttled listener.
 *   start: progress is 0 when the element's top hits `start` × viewport height
 *   end:   progress is 1 when the element's bottom hits `end` × viewport height
 */
export function useScrollVar(ref, name = '--progress', { start = 0.75, end = 0.6 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = r.top - vh * start;
      const total = r.height - vh * end + vh * start;
      const p = Math.min(1, Math.max(0, -from / Math.max(total, 1)));
      el.style.setProperty(name, p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, name, start, end]);
}

/** Eased pointer position (-1 → 1) written to --px / --py on the element. Fine pointers only. */
export function usePointerParallax(ref, { ease = 0.08 } = {}) {
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, frame = 0, running = false;
    const tick = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      el.style.setProperty('--px', x.toFixed(4));
      el.style.setProperty('--py', y.toFixed(4));
      if (Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001) frame = requestAnimationFrame(tick);
      else running = false;
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [ref, reduced, ease]);
}

/** Id of the section currently nearest the top third of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}
