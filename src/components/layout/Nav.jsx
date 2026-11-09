import { useEffect, useRef, useState } from 'react';
import { navigation } from '../../data/navigation.js';
import { useActiveSection } from '../../hooks/motion.js';
import { Link, useRouter } from '../../lib/router.jsx';
import './nav.css';

const IDS = navigation.map((n) => n.id);
const NONE = [];

export default function Nav() {
  const { path } = useRouter();
  const onHome = path === '/';
  const active = useActiveSection(onHome ? IDS : NONE);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef(null);

  // Page scroll progress → CSS var (no re-render) + "scrolled" state for the bar background.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty('--page', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [path]);

  // Close the mobile menu on Escape and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      ref={barRef}
      className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}
    >
      <div className="nav__inner wrap">
        <Link to="/#home" className="nav__mark" aria-label="Kimberly Camanero, home" onClick={() => setOpen(false)}>
          <span aria-hidden="true">K</span>
          <span aria-hidden="true">C</span>
        </Link>

        <nav aria-label="Primary" className="nav__links" id="primary-nav">
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  className="nav__link"
                  aria-current={onHome && active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__toggle-line nav__toggle-line--a" aria-hidden="true" />
          <span className="nav__toggle-line nav__toggle-line--b" aria-hidden="true" />
        </button>
      </div>
      <div className="nav__progress" aria-hidden="true" />
    </header>
  );
}
