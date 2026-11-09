import { useEffect } from 'react';
import { getProject, projects } from '../data/projects.js';
import { site } from '../config/site.js';
import { Link } from '../lib/router.jsx';
import { ProjectMedia, ResponsiveImage, MediaPlaceholder } from '../components/ui/Media.jsx';
import { publicResults } from '../components/projects/Projects.jsx';
import NotFound from './NotFound.jsx';
import './case-study.css';

const DEV = Boolean(import.meta.env && import.meta.env.DEV);

/** Renders a section only when it has content; in development, shows a "to add" note instead. */
function Block({ id, title, show, todo, children }) {
  if (!show && !DEV) return null;
  return (
    <section id={id} className="cs__block" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="cs__h">
        {title}
      </h2>
      {show ? children : <p className="todo">To add: {todo}</p>}
    </section>
  );
}

function Pipeline({ stages }) {
  return (
    <ol className="pipe" aria-label="System pipeline">
      {stages.map((s, i) => (
        <li key={s} className="pipe__stage" style={{ '--i': i }}>
          <span className="pipe__label">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export default function CaseStudy({ slug }) {
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — ${site.name}`;
    return () => {
      document.title = `${site.name} — Robotics & Software Engineer`;
    };
  }, [project]);

  if (!project) return <NotFound />;

  const p = project;
  const results = publicResults(p);
  const held = p.disclosure && !p.disclosure.approved && p.results?.length > 0;
  const meta = [
    ['Organization', p.org],
    ['Role', p.role],
    ['When', p.period],
  ].filter(([, v]) => v);
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const gallery = p.media?.gallery || [];
  const wanted = (p.media?.wanted || []).slice(p.media?.hero ? 0 : 1);

  return (
    <main id="main" className={`cs cs--${p.theme}`}>
      <header className="cs__hero">
        <div className="wrap">
          <Link to="/#projects" className="cs__back">
            All projects
          </Link>
          <p className="cs__category">{p.category}</p>
          <h1 className="cs__title">{p.title}</h1>
          {meta.length > 0 && (
            <dl className="cs__meta">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="wrap">
          <div className="cs__media" style={{ viewTransitionName: `media-${p.slug}` }}>
            <ProjectMedia project={p} sizes="(max-width: 1320px) 100vw, 1320px" priority />
          </div>
        </div>
      </header>

      <div className="wrap cs__layout">
        <div className="cs__content">
          <Block id="overview" title="Overview" show>
            <p className="cs__lead">{p.summary}</p>
            {p.visibility === 'summary-only' && (
              <p className="cs__notice">
                This is company work, so I’m sharing a high-level summary only. No source code, data or internal
                details are published here.
              </p>
            )}
          </Block>

          <Block id="challenge" title="Engineering challenge" show={Boolean(p.problem)} todo="the problem this project solves.">
            <p>{p.problem}</p>
          </Block>

          <Block id="architecture" title="System architecture" show={Boolean(p.architecture?.stages?.length)} todo="the main stages of the system, or an architecture diagram.">
            <Pipeline stages={p.architecture?.stages || []} />
          </Block>

          <Block id="implementation" title="Technical implementation" show={Boolean(p.solution)} todo="how the system works.">
            <p>{p.solution}</p>
          </Block>

          <Block id="technologies" title="Technologies" show={p.tech.length > 0 || Boolean(p.highlights?.length)} todo="tools, languages and hardware used.">
            {p.tech.length > 0 && (
              <ul className="tags">
                {p.tech.map((t) => (
                  <li className="tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {p.highlights?.length > 0 && (
              <ul className="cs__highlights">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </Block>

          <Block id="role" title="My responsibilities" show={Boolean(p.contribution)} todo="what you personally owned.">
            <p>{p.contribution}</p>
          </Block>

          <Block id="results" title="Results" show={results.length > 0 || held} todo="verified results, with how they were measured.">
            {results.length > 0 ? (
              <ul className="cs__results">
                {results.map((r) => (
                  <li key={r.label}>
                    <strong>{r.value}</strong>
                    <span>{r.label}</span>
                    {r.context && <small>{r.context}</small>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Measured results are available on request.</p>
            )}
          </Block>

          <Block id="lessons" title="Lessons learned" show={Boolean(p.lessons)} todo="one or two things this project taught you.">
            <p>{p.lessons}</p>
          </Block>

          {(gallery.length > 0 || wanted.length > 0) && (
          <section id="gallery" className="cs__block" aria-labelledby="gallery-h">
            <h2 id="gallery-h" className="cs__h">
              Media
            </h2>
            <div className="cs__gallery">
              {gallery.map((img) => (
                <figure key={img.key}>
                  <ResponsiveImage image={img} sizes="(max-width: 860px) 100vw, 50vw" />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
              {wanted.map((w) => (
                <MediaPlaceholder key={w} theme={p.theme} label={w} className="cs__ph" />
              ))}
            </div>
          </section>
          )}

          {(p.links?.github || p.links?.demo || p.links?.paper) && (
            <section id="links" className="cs__block" aria-labelledby="links-h">
              <h2 id="links-h" className="cs__h">
                Links
              </h2>
              <ul className="cs__links">
                {p.links.github && (
                  <li>
                    <a className="btn btn--ghost" href={p.links.github} target="_blank" rel="noopener noreferrer">
                      Code on GitHub
                    </a>
                  </li>
                )}
                {p.links.demo && (
                  <li>
                    <a className="btn btn--ghost" href={p.links.demo} target="_blank" rel="noopener noreferrer">
                      Watch the demo
                    </a>
                  </li>
                )}
                {p.links.paper && (
                  <li>
                    <a className="btn btn--ghost" href={p.links.paper} target="_blank" rel="noopener noreferrer">
                      Read the paper
                    </a>
                  </li>
                )}
              </ul>
            </section>
          )}
        </div>
      </div>

      {next && next.slug !== p.slug && (
        <Link to={`/projects/${next.slug}`} className={`cs__next cs__next--${next.theme}`}>
          <span className="wrap">
            <small>Next project</small>
            <span className="cs__next-title">{next.title}</span>
          </span>
        </Link>
      )}
    </main>
  );
}
