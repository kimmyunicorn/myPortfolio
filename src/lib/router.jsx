// A tiny History-API router (two routes don't justify a routing dependency).
// Respects Vite's BASE_URL so it works for both user sites (/) and project sites (/repo/).
// Uses the View Transitions API, when available, for the card -> case-study transition.
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

const BASE = ((import.meta.env && import.meta.env.BASE_URL) || '/').replace(/\/$/, '');

const RouterContext = createContext({ path: '/', navigate: () => {} });

const currentPath = () => {
  const p = window.location.pathname;
  const stripped = BASE && p.startsWith(BASE) ? p.slice(BASE.length) : p;
  return stripped.replace(/\/+$/, '') || '/';
};

export const href = (path) => `${BASE}${path === '/' ? '/' : path}`;

// We manage scroll ourselves, so stop the browser restoring old positions on navigation.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/** Jump instantly (ignores the page's smooth-scroll setting, which can leave you mid-page). */
const jumpTo = (top) => window.scrollTo({ top, left: 0, behavior: 'instant' });

function withTransition(update) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(update);
  else update();
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(currentPath);
  // Where to land after the next render: 'top', a hash id, or null (leave as is).
  const pendingScroll = useRef(null);

  useEffect(() => {
    const onPop = () => {
      pendingScroll.current = window.location.hash.slice(1) || 'top';
      withTransition(() => setPath(currentPath()));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Runs after the new page is in the DOM, before paint.
  useLayoutEffect(() => {
    const target = pendingScroll.current;
    if (!target) return;
    pendingScroll.current = null;
    const go = () => {
      if (target === 'top') jumpTo(0);
      else document.getElementById(target)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    go();
    // Case studies load lazily; repeat once the content has had a frame to appear.
    requestAnimationFrame(() => requestAnimationFrame(go));
  }, [path]);

  const navigate = useCallback((to) => {
    const [pathname, hash] = to.split('#');
    const nextPath = (pathname || '/').replace(/\/+$/, '') || '/';
    const samePage = nextPath === currentPath();
    if (samePage) {
      // e.g. a nav link on the home page: no re-render happens, so just scroll.
      window.history.pushState({}, '', href(nextPath) + (hash ? `#${hash}` : ''));
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    pendingScroll.current = hash || 'top';
    withTransition(() => {
      window.history.pushState({}, '', href(nextPath) + (hash ? `#${hash}` : ''));
      setPath(currentPath());
    });
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

/** Internal link: real <a href> (works without JS, middle-click, etc.) with client navigation. */
export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRouter();
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  const [p, h] = to.split('#');
  return (
    <a href={href(p || '/') + (h ? `#${h}` : '')} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
