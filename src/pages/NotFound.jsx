import { Link } from '../lib/router.jsx';
import { Blossom } from '../components/sakura/Sakura.jsx';

export default function NotFound() {
  return (
    <main id="main" className="section" style={{ minHeight: '80svh', display: 'grid', placeItems: 'center' }}>
      <div className="wrap" style={{ display: 'grid', gap: 'var(--s2)', justifyItems: 'center', textAlign: 'center' }}>
        <Blossom size={72} tone="pale" />
        <h1 style={{ fontSize: 'var(--step-4)' }}>This page drifted away.</h1>
        <p style={{ color: 'var(--sumi-soft)' }}>The link may be old, or the project may have moved.</p>
        <Link to="/" className="btn">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
