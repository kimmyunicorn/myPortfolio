import { useMemo, useState } from 'react';
import { projects } from '../../data/projects.js';
import { skills } from '../../data/skills.js';
import { Link } from '../../lib/router.jsx';
import './skills.css';

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9+]/g, '');

/** Projects whose tech, highlights or category mention the skill (or one of its aliases). */
function projectsFor(skill) {
  const keys = [skill.name, ...(skill.aliases || [])].map(norm);
  return projects.filter((p) => {
    const hay = [...p.tech, ...(p.highlights || []), ...p.category.split('·')].map(norm);
    return keys.some((k) => hay.includes(k));
  });
}

export default function Skills() {
  const linked = useMemo(
    () => Object.fromEntries(skills.flatMap((g) => g.items.map((s) => [s.name, projectsFor(s)]))),
    [],
  );
  const [selected, setSelected] = useState('Computer Vision');
  const shown = linked[selected] || [];

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="skills-title" className="section__title">
            Skills
          </h2>
          <p className="section__intro">
            No progress bars. Pick a skill to see where it shows up in my work.
          </p>
        </header>

        <div className="sk">
          <div className="sk__groups">
            {skills.map((group) => (
              <div className="sk__group" key={group.id}>
                <h3 className="sk__group-title">{group.title}</h3>
                <ul className="sk__chips">
                  {group.items.map((s) => {
                    const count = linked[s.name].length;
                    return (
                      <li key={s.name}>
                        <button
                          className={`sk__chip ${count ? 'has-work' : ''}`}
                          aria-pressed={selected === s.name}
                          aria-controls="skill-panel"
                          onClick={() => setSelected(s.name)}
                        >
                          {s.name}
                          {count > 0 && (
                            <span className="sk__count" aria-label={`${count} project${count > 1 ? 's' : ''}`}>
                              {count}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <aside id="skill-panel" className="sk__panel" aria-live="polite">
            <p className="sk__panel-skill">{selected}</p>
            {shown.length ? (
              <>
                <p className="sk__panel-lead">Shows up in</p>
                <ul className="sk__panel-list">
                  {shown.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/projects/${p.slug}`}>
                        <span>{p.title}</span>
                        <small>{p.category}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="sk__panel-lead">Part of my toolkit. A project that features it is on the way.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
