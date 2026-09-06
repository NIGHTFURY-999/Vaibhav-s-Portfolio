/**
 * Apple-Inspired Scroll Effects & Interactive Motion Controller
 * Handles 3D Card Tilt, Scroll Progress, IntersectionObserver Reveal, Mouse Sheen & Active Dock.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Create Scroll Progress Bar element if absent
  if (!document.getElementById('scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);
  }

  const progressBar = document.getElementById('scroll-progress');
  const siteHeader = document.querySelector('.site-header');

  // 2. Scroll Progress & Sticky Header Handler
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    if (siteHeader) {
      if (scrollTop > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Scroll Reveal Observer (Apple-style fade & slide up)
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars inside revealed sections
        const skillBars = entry.target.querySelectorAll('.progress-fill');
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width') || bar.style.width;
          if (targetWidth) {
            bar.style.setProperty('--skill-width', targetWidth);
            bar.classList.add('animated');
          }
        });
      }
    });
  }, revealObserverOptions);

  // Auto-observe sections & card elements
  const observeAllElements = () => {
    document.querySelectorAll('section, .section-header, .glass-card, .project-card, .article-card, .service-card, .cert-card, .about-bio-card, .hero-visual-card, .contact-info-card, .contact-form-card, .skill-category-card').forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
      revealObserver.observe(el);
    });
  };

  observeAllElements();

  // Re-observe after dynamic rendering (e.g. skills or projects populated by app.js)
  setTimeout(observeAllElements, 600);
  setTimeout(observeAllElements, 1500);

  // 4. Apple-inspired 3D Card Tilt Physics & Mouse Light Sheen for ALL Cards
  const attach3DTilt = () => {
    const cardSelectors = [
      '.glass-card',
      '.project-card',
      '.article-card',
      '.service-card',
      '.cert-card',
      '.about-bio-card',
      '.hero-visual-card',
      '.contact-info-card',
      '.contact-form-card',
      '.skill-category-card'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(', '));

    cards.forEach(card => {
      if (card.dataset.tiltAttached) return;
      card.dataset.tiltAttached = 'true';

      // Ensure sheen element exists
      if (!card.querySelector('.card-sheen')) {
        const sheen = document.createElement('div');
        sheen.className = 'card-sheen';
        card.appendChild(sheen);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2.5; // subtle, Apple-style restraint
        const rotateY = ((x - centerX) / centerX) * 2.5;

        card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.005)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      });
    });
  };

  attach3DTilt();
  setTimeout(attach3DTilt, 600);
  setTimeout(attach3DTilt, 1500);

  // 5. macOS Dock Active Section Highlight
  const sections = document.querySelectorAll('section[id]');
  const dockItems = document.querySelectorAll('.macos-dock-wrapper .dock-item[href^="#"]');

  const dockObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const dockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, dockObserverOptions);

  sections.forEach(sec => dockObserver.observe(sec));
});
