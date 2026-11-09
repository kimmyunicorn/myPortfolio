import { useId, useRef, useState } from 'react';
import { experience } from '../../data/experience.js';
import { useInView, useScrollVar } from '../../hooks/motion.js';
import { Link } from '../../lib/router.jsx';
import { DoodleStar } from '../sakura/Sakura.jsx';
import './experience.css';

const DEV = Boolean(import.meta.env && import.meta.env.DEV);
const TONE = { leadership: 'lavender', work: 'pink', research: 'green', project: 'gold' };

function Entry({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const expandable = Boolean(item.details || item.focus.length || item.project);
  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <li ref={ref} className={`tl__item tl__item--${side} ${inView ? 'is-in' : ''}`}>
      <div className="tl__node" aria-hidden="true">
        <DoodleStar size={26} tone={TONE[item.kind] || 'pink'} />
      </div>
      <article className={`tl__card ${open ? 'is-open' : ''}`}>
        <p className="tl__period">{item.period}</p>
        <h3 className="tl__role">{item.role}</h3>
        <p className="tl__org">
          {item.org}
          {item.location && <span>{item.location}</span>}
        </p>

        {expandable && (
          <>
            <button className="tl__toggle" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
              {open ? 'Hide details' : 'Show details'}
              <span className="tl__chev" aria-hidden="true" />
            </button>
            <div id={panelId} className="tl__panel" role="region" aria-label={`${item.role} details`}>
              <div className="tl__panel-inner">
                {item.details && <p className="tl__details">{item.details}</p>}
                {item.focus.length > 0 && (
                  <ul className="tags" aria-label="Focus areas">
                    {item.focus.map((f) => (
                      <li className="tag" key={f}>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {item.project && (
                  <Link className="tl__case" to={`/projects/${item.project}`} tabIndex={open ? 0 : -1}>
                    Read the case study
                  </Link>
                )}
              </div>
            </div>
          </>
        )}

        {DEV && item.verify?.length > 0 && (
          <ul className="tl__verify">
            {item.verify.map((v) => (
              <li key={v} className="todo">
                To confirm: {v}
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  useScrollVar(listRef, '--progress', { start: 0.6, end: 0.5 });

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="experience-title" className="section__title">
            Experience
          </h2>
          <p className="section__intro">
            From electrical engineering internships to leading robotics teams and building perception systems.
          </p>
        </header>

        <div ref={listRef} className="tl">
          <span className="tl__line" aria-hidden="true">
            <span className="tl__fill" />
          </span>
          <ol className="tl__list">
            {experience.map((item, i) => (
              <Entry key={item.id} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
