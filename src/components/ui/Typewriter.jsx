import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/motion.js';

/**
 * Types text out one character at a time, like a 2010 lyric video, with a blinking cursor.
 * Screen readers get the full text immediately; the animated copy is aria-hidden.
 */
export default function Typewriter({ text, start = true, speed = 42, delay = 400, className = '' }) {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setN(text.length);
      return;
    }
    let i = 0;
    let timer;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed + (text[i - 1] === ' ' ? 40 : 0));
    };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, start, speed, delay, reduced]);

  return (
    <span className={`typewriter ${className}`}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, n)}
        <span className="typewriter__cursor" />
      </span>
    </span>
  );
}
