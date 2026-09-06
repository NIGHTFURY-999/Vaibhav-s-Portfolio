/**
 * Cross-page navigation helper: mobile menu toggle + active link highlighting.
 */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page') || 'index';

  document.querySelectorAll('.main-nav a[data-page], .mobile-nav-panel a[data-page], .dock-item[data-page]')
    .forEach(link => {
      if (link.getAttribute('data-page') === page) link.classList.add('active');
    });

  const menuBtn = document.getElementById('mobile-menu-btn');
  const panel = document.getElementById('mobile-nav-panel');
  if (menuBtn && panel) {
    menuBtn.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      panel.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  }

  // Close mobile panel on escape / outside click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel && panel.classList.contains('open')) {
      panel.classList.remove('open');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    }
  });
});
