// A tiny History-API router (two routes don't justify a routing dependency).
// Respects Vite's BASE_URL so it works for both user sites (/) and project sites (/repo/).
// Uses the View Transitions API, when available, for the card -> case-study transition.
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const BASE = ((import.meta.env && import.meta.env.BASE_URL) || '/').replace(/\/$/, '');

const RouterContext = createContext({ path: '/', navigate: () => {} });

const currentPath = () => {
  const p = window.location.pathname;
  const stripped = BASE && p.startsWith(BASE) ? p.slice(BASE.length) : p;
  return stripped.replace(/\/+$/, '') || '/';
};

export const href = (path) => `${BASE}${path === '/' ? '/' : path}`;

function withTransition(update) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(update);
  else update();
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPop = () => withTransition(() => setPath(currentPath()));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to) => {
    const [pathname, hash] = to.split('#');
    withTransition(() => {
      window.history.pushState({}, '', href(pathname || '/') + (hash ? `#${hash}` : ''));
      setPath(currentPath());
      if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
      else window.scrollTo(0, 0);
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
