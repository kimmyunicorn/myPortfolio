import { socials } from '../../data/socials.js';
import { site } from '../../config/site.js';
import { useInView } from '../../hooks/motion.js';
import { HoloSticker, PetalField, Planet, Rocket, StarField } from '../sakura/Sakura.jsx';
import './contact.css';

const ICONS = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.96c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z" />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  email: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.3V17h16V7.3l-8 5.6-8-5.6ZM5.4 7l6.6 4.6L18.6 7H5.4Z" />
  ),
};

/** Buttons drift slightly toward the pointer (fine pointers, motion allowed). */
function magnetic(e) {
  const el = e.currentTarget;
  if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width / 2) * 0.18;
  const y = (e.clientY - r.top - r.height / 2) * 0.28;
  el.style.transform = `translate(${x}px, ${y}px)`;
}
const release = (e) => (e.currentTarget.style.transform = '');

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const year = new Date().getFullYear();

  return (
    <footer id="contact" ref={ref} className={`contact ${inView ? 'is-in' : ''}`} aria-labelledby="contact-title">
      <StarField className="contact__stars" count={80} seed={29} />
      <PetalField className="contact__petals" count={8} seed={31} sparkleEvery={2} />
      <div className="contact__glow" aria-hidden="true" />
      <Planet className="contact__planet" />
      <Planet className="contact__moon" />
      <Rocket className="contact__rocket" />

      <div className="wrap contact__inner">
        {/* "Renewal notice" style sign-off */}
        <div className="notice">
          <p className="notice__head">Notice of appointment</p>
          <dl className="notice__fields">
            <div>
              <dt>Appointment</dt>
              <dd>Whenever you’re ready</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>New York City, or online</dd>
            </div>
            <div>
              <dt>Please bring</dt>
              <dd>Your most ambitious robot idea</dd>
            </div>
          </dl>
          <span className="notice__stamp" aria-hidden="true">
            Approved
          </span>
          <HoloSticker shape="heart" size={54} className="notice__holo holo--tilt" style={{ '--rot': '12deg' }} />
        </div>
        <h2 id="contact-title" className="contact__title">
          Let’s build something extraordinary.
        </h2>
        <p className="contact__lead">
          I’m always glad to talk about robotics, perception, and ambitious projects that need someone who can work
          across software and hardware.
        </p>

        <ul className="contact__links">
          {socials.map((s) => {
            const icon = (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                {ICONS[s.id]}
              </svg>
            );
            return (
              <li key={s.id}>
                {s.href ? (
                  <a
                    className="contact__btn"
                    href={s.href}
                    {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onPointerMove={magnetic}
                    onPointerLeave={release}
                  >
                    {icon}
                    <span>{s.label}</span>
                  </a>
                ) : (
                  <span className="contact__btn is-pending" aria-disabled="true" title={`${s.label} link coming soon`}>
                    {icon}
                    <span>{s.label}</span>
                    <small>soon</small>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="wrap contact__base">
        <p>
          © {year} {site.name}
        </p>
        <a href="#home" className="contact__top">
          Back to top
        </a>
      </div>
    </footer>
  );
}
