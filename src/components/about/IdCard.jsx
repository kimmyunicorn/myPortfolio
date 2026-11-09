import { portrait, srcSet, asset } from '../../config/assets.js';
import { HoloSticker } from '../sakura/Sakura.jsx';

// A playful "engineer license" ID card — every field comes from Kimberly's real background.
const FIELDS = [
  ['Name', 'Kimberly Camanero'],
  ['Class', 'Robotics + Software Engineer'],
  ['Based in', 'New York City'],
  ['Education', 'UC Santa Cruz · NYU (M.S. in progress)'],
  ['Endorsements', 'Computer vision, autonomy, embedded'],
  ['Off duty', 'Guitar, piano, singing, acting'],
];

export default function IdCard() {
  const opts = { local: portrait.local };
  return (
    <figure className="idcard" aria-label="Engineer license card for Kimberly Camanero">
      <header className="idcard__top">
        <span className="idcard__title">Engineer License</span>
        <span className="idcard__no">ID KC-2026</span>
      </header>

      <div className="idcard__body">
        <div className="idcard__photo">
          <picture>
            {portrait.formats.map((f) => (
              <source key={f} type={`image/${f}`} srcSet={srcSet(portrait.key, [640], f, opts)} sizes="160px" />
            ))}
            <img src={asset(`${portrait.key}-640.webp`, opts)} width="640" height="852" alt="" loading="lazy" />
          </picture>
        </div>
        <dl className="idcard__fields">
          {FIELDS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figcaption className="idcard__sig">
        <span aria-hidden="true">Kimberly Camanero</span>
        <small>Signature</small>
      </figcaption>

      <span className="idcard__stamp" aria-hidden="true">
        Kimberly Camanero
      </span>
      <HoloSticker shape="star" size={58} className="idcard__holo" />
    </figure>
  );
}
