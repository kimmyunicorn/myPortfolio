import { lazy, Suspense } from 'react';
import Nav from './components/layout/Nav.jsx';
import Contact from './components/contact/Contact.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { RouterProvider, useRouter } from './lib/router.jsx';

// Case studies are code-split: the home page never downloads them.
const CaseStudy = lazy(() => import('./pages/CaseStudy.jsx'));

function Routes() {
  const { path } = useRouter();
  if (path === '/') return <Home />;
  const match = path.match(/^\/projects\/([\w-]+)$/);
  if (match)
    return (
      <Suspense fallback={<main id="main" style={{ minHeight: '100svh' }} />}>
        <CaseStudy slug={match[1]} />
      </Suspense>
    );
  return <NotFound />;
}

export default function App() {
  return (
    <RouterProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <Routes />
      <Contact />
    </RouterProvider>
  );
}
