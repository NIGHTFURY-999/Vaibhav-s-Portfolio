/**
 * Cross-page fade transitions.
 * The <html> element starts with a "page-transitioning" class added by a
 * blocking inline script in <head> (before first paint), so every page loads
 * pre-hidden with zero flash. This script fades it in once ready, and fades
 * the current page out before following any same-site link.
 */
(() => {
  const html = document.documentElement;

  function revealPage() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => html.classList.remove('page-transitioning'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealPage);
  } else {
    revealPage();
  }

  // Also reveal instantly if the page is restored from the bfcache
  // (back/forward navigation), where DOMContentLoaded won't fire again.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) html.classList.remove('page-transitioning');
  });

  const TRANSITION_MS = 220;

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest('a');
    if (!link) return;
    if (link.target && link.target !== '_self') return;
    if (link.hasAttribute('download')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== window.location.origin) return;

    // Same-page anchor jump — let the browser handle the smooth scroll.
    if (url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '') && url.hash) return;

    e.preventDefault();
    html.classList.add('page-transitioning');
    setTimeout(() => { window.location.href = href; }, TRANSITION_MS);
  });
})();
