import { useRef } from 'react';
import { projects } from '../../data/projects.js';
import { useScrollVar } from '../../hooks/motion.js';
import { Link } from '../../lib/router.jsx';
import { ProjectMedia } from '../ui/Media.jsx';
import Reveal from '../ui/Reveal.jsx';
import './projects.css';

export const publicResults = (p) => (p.disclosure && !p.disclosure.approved ? [] : p.results || []);

function Feature({ project, index }) {
  const ref = useRef(null);
  useScrollVar(ref, '--progress', { start: 1, end: 0 });
  const flip = index % 2 === 1;
  const lead = publicResults(project)[0];
  const meta = [project.org, project.role, project.period].filter(Boolean);

  return (
    <article ref={ref} className={`pf pf--${project.theme} ${flip ? 'pf--flip' : ''}`}>
      <Link
        to={`/projects/${project.slug}`}
        className="pf__media"
        tabIndex={-1}
        aria-hidden="true"
        style={{ viewTransitionName: `media-${project.slug}` }}
      >
        <div className="pf__media-inner">
          <ProjectMedia project={project} sizes="(max-width: 860px) 100vw, 58vw" />
        </div>
      </Link>

      <Reveal className="pf__body">
        <p className="pf__category">{project.category}</p>
        <h3 className="pf__title">
          <Link to={`/projects/${project.slug}`} className="pf__title-link">
            {project.title}
          </Link>
        </h3>
        {meta.length > 0 && (
          <ul className="pf__meta">
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
        <p className="pf__summary">{project.summary}</p>

        {lead && (
          <p className="pf__stat">
            <strong>{lead.value}</strong>
            <span>{lead.label}</span>
          </p>
        )}

        {project.tech.length > 0 && (
          <ul className="tags" aria-label="Technologies">
            {project.tech.slice(0, 6).map((t) => (
              <li className="tag" key={t}>
                {t}
              </li>
            ))}
            {project.tech.length > 6 && <li className="tag">+{project.tech.length - 6}</li>}
          </ul>
        )}

        {project.visibility === 'summary-only' && (
          <p className="pf__note">Company work, shared as a high-level summary. No code or internal details.</p>
        )}

        <Link to={`/projects/${project.slug}`} className="pf__cta">
          Read the case study
          <span className="visually-hidden">: {project.title}</span>
        </Link>
      </Reveal>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="projects-title" className="section__title">
            Selected projects
          </h2>
          <p className="section__intro">
            Robots built for the ocean, the Moon, the operating room and the field, and the perception software that
            helps them see.
          </p>
        </header>

        <div className="pf-list">
          {featured.map((p, i) => (
            <Feature key={p.slug} project={p} index={i} />
          ))}
        </div>

        {more.length > 0 && (
          <div className="more">
            <h3 className="more__title">More projects</h3>
            <ul className="more__list">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`} className="more__item">
                    <span className="more__name">{p.title}</span>
                    <span className="more__cat">{p.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
