/**
 * Theme Mood Customizer — Instant 1-Click Aesthetic Switcher
 * Cycles through 4 curated premium dark palettes (Sapphire, Emerald, Amethyst, Obsidian).
 */

class ThemeMoodController {
  constructor() {
    this.moods = [
      {
        name: 'Sapphire Pro',
        icon: 'fa-gem',
        vars: {
          '--bg-pure-black': '#020205',
          '--bg-dark-base': '#08090f',
          '--bg-dark-surface': '#0d0e18',
          '--apple-blue': '#2997ff',
          '--apple-cyan': '#5ac8fa',
          '--apple-purple': '#bf5af2'
        }
      },
      {
        name: 'Emerald Cyber',
        icon: 'fa-leaf',
        vars: {
          '--bg-pure-black': '#020503',
          '--bg-dark-base': '#061009',
          '--bg-dark-surface': '#0c1a10',
          '--apple-blue': '#30d158',
          '--apple-cyan': '#64d2ff',
          '--apple-purple': '#34c759'
        }
      },
      {
        name: 'Royal Amethyst',
        icon: 'fa-wand-magic-sparkles',
        vars: {
          '--bg-pure-black': '#040206',
          '--bg-dark-base': '#0b0612',
          '--bg-dark-surface': '#130a1f',
          '--apple-blue': '#bf5af2',
          '--apple-cyan': '#e5c0ff',
          '--apple-purple': '#ff375f'
        }
      },
      {
        name: 'Midnight Obsidian',
        icon: 'fa-moon',
        vars: {
          '--bg-pure-black': '#000000',
          '--bg-dark-base': '#070707',
          '--bg-dark-surface': '#111111',
          '--apple-blue': '#94a3b8',
          '--apple-cyan': '#e2e8f0',
          '--apple-purple': '#64748b'
        }
      }
    ];

    this.currentIndex = parseInt(localStorage.getItem('theme_mood_idx') || '0', 10);
    this.init();
  }

  init() {
    this.applyMood(this.currentIndex, false);

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#theme-mood-btn');
      if (btn) {
        this.cycleMood();
      }
    });
  }

  cycleMood() {
    this.currentIndex = (this.currentIndex + 1) % this.moods.length;
    localStorage.setItem('theme_mood_idx', this.currentIndex);
    this.applyMood(this.currentIndex, true);
  }

  applyMood(idx, showToast = false) {
    const mood = this.moods[idx];
    const root = document.documentElement;

    Object.entries(mood.vars).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });

    const btn = document.getElementById('theme-mood-btn');
    if (btn) {
      btn.title = `Current Theme: ${mood.name} (Click to switch)`;
    }

    if (showToast) {
      if (typeof window.showToast === 'function') {
        window.showToast(`🎨 Switched aesthetic mood to ${mood.name}`, 'info');
      } else if (typeof showToast === 'function') {
        showToast(`🎨 Switched aesthetic mood to ${mood.name}`, 'info');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.themeMoodCtrl = new ThemeMoodController();
});
