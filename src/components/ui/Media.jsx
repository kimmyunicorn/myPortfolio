// Project media: a real responsive image when one is configured, otherwise a
// themed, clearly labelled placeholder so missing photos never look broken.
import { asset, srcSet } from '../../config/assets.js';
import { DoodleStar, Planet, Rocket, Sparkle } from '../sakura/Sakura.jsx';
import './media.css';

export function ResponsiveImage({ image, sizes = '100vw', priority = false, className = '' }) {
  const widths = image.widths || [640, 1000, 1500];
  const fallbackW = widths.includes(1000) ? 1000 : widths[widths.length - 1];
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(image.key, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image.key, widths, 'webp')} sizes={sizes} />
      <img
        src={asset(`${image.key}-${fallbackW}.webp`)}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}

function Art({ theme }) {
  if (theme === 'lunar') {
    return (
      <svg className="ph__art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 190} r={i % 5 === 0 ? 1.4 : 0.8} className="ph__star" />
        ))}
        <path d="M-20 300 C80 210 320 210 420 300Z" className="ph__moon" />
        <path d="M-20 300 C80 228 320 228 420 300" className="ph__orbit" />
        <circle cx="300" cy="80" r="26" className="ph__planet-ring" />
      </svg>
    );
  }
  if (theme === 'ocean') {
    return (
      <svg className="ph__art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            className="ph__wave"
            d={`M-10 ${70 + i * 40} C60 ${55 + i * 40} 120 ${85 + i * 40} 200 ${70 + i * 40} S340 ${55 + i * 40} 410 ${70 + i * 40}`}
          />
        ))}
        {[40, 90, 150, 310, 350].map((x, i) => (
          <circle key={x} cx={x} cy={240 - i * 30} r={3 + (i % 3) * 2} className="ph__bubble" />
        ))}
      </svg>
    );
  }
  return null;
}

export function MediaPlaceholder({ theme = 'sakura', label, className = '' }) {
  return (
    <div className={`ph ph--${theme} ${className}`} role="img" aria-label={`${label}, coming soon`}>
      <Art theme={theme} />
      {theme === 'sakura' && (
        <div className="ph__cozy" aria-hidden="true">
          <Planet className="ph__planet" />
          <Rocket className="ph__rocket" />
          <DoodleStar size={34} className="ph__s1 twinkle" />
          <Sparkle size={22} tone="lavender" className="ph__s2 twinkle" />
          <Sparkle size={16} tone="green" className="ph__s3 twinkle" />
        </div>
      )}
      <p className="ph__label">
        <span>{label}</span>
        <span>Coming soon</span>
      </p>
    </div>
  );
}

export function ProjectMedia({ project, sizes, priority, className = '' }) {
  const hero = project.media?.hero;
  if (hero) return <ResponsiveImage image={hero} sizes={sizes} priority={priority} className={`media-img ${className}`} />;
  const label = project.media?.wanted?.[0] || 'Project photo';
  return <MediaPlaceholder theme={project.theme} label={label} className={className} />;
}
