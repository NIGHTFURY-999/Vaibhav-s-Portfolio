/**
 * Main Application Controller for Vaibhav Shekhar Haldankar Portfolio
 * Handles Preloader, Sound Synthesis, Modals, Smooth Navigation, macOS Dock,
 * Spotlight Command Palette (⌘K), Filters, and Contact Form.
 */

// --- 1. Web Audio API Sci-Fi Sound Synthesizer ---
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('sound_muted') === 'true';
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('sound_muted', this.isMuted);
    this.updateSoundIcon();
    if (!this.isMuted) this.play('click');
    return !this.isMuted;
  }

  updateSoundIcon() {
    const btn = document.getElementById('toggle-sound-btn');
    if (btn) {
      btn.innerHTML = this.isMuted
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
      btn.title = this.isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects';
    }
  }

  play(type) {
    if (this.isMuted || !this.ctx) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    switch (type) {
      case 'hover':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;

      case 'click':
      case 'keystroke':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'open':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(720, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
        break;

      case 'close':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.1);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'send':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;

      case 'receive':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;

      case 'success':
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, High C
        notes.forEach((freq, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.connect(g);
          g.connect(this.ctx.destination);
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, now + idx * 0.06);
          g.gain.setValueAtTime(0.04, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.15);
          o.start(now + idx * 0.06);
          o.stop(now + idx * 0.06 + 0.15);
        });
        break;
    }
  }
}

window.AudioEngine = new SoundSynthesizer();


// --- 2. Main App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Sound controls
  window.AudioEngine.updateSoundIcon();
  const soundBtn = document.getElementById('toggle-sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const active = window.AudioEngine.toggleMute();
      showToast(active ? 'Sound Effects Enabled 🔊' : 'Sound Effects Muted 🔇');
    });
  }

  // Initialize Background Canvas
  if (window.ParticleNetwork) {
    window.globalParticles = new window.ParticleNetwork('bg-canvas');
  }

  // Initialize Preloader & Booting Sequence
  initCoderPreloader();

  // Initialize Sections & Data Rendering
  renderDynamicContent();

  // Initialize Headline Flip / Typewriter
  initHeroTextFlipper();

  // Initialize Terminal CLI
  if (window.InteractiveTerminal) {
    window.globalTerminal = new window.InteractiveTerminal('interactive-cli');
  }

  // Initialize AI Twin
  if (window.AITwinEngine) {
    window.globalAITwin = new window.AITwinEngine();
  }

  // Initialize macOS Floating Dock & Navigation
  initMacOSDock();

  // Initialize Spotlight Command Palette (⌘K)
  initCommandPalette();

  // Initialize Modals System
  initModals();

  // Initialize Contact Form & Copy buttons
  initContactForm();

  // Initialize Scroll Spy & Intersection Observers
  initScrollObservers();

  // Initialize 3D Interactive Card Tilt & Cursor Spotlight
  init3DTiltAndCursor();

  // Interactive Button Sound Effects
  initAudioTriggers();
});


// --- 3. Coder Booting Sequence & Preloader ---
function initCoderPreloader() {
  const preloader = document.getElementById('coder-preloader');
  const progressBar = document.getElementById('preloader-progress-bar');
  const progressText = document.getElementById('preloader-percent');
  if (!preloader) return;

  // Full animated boot only on the very first page of the visit; every page
  // after that gets a near-instant flash so navigating the site never feels slow.
  const alreadyBooted = sessionStorage.getItem('vh_booted') === '1';
  const duration = alreadyBooted ? 260 : 850;

  let completed = false;
  let start = null;

  const finishBoot = () => {
    if (completed) return;
    completed = true;
    sessionStorage.setItem('vh_booted', '1');
    preloader.classList.add('fade-out');
    setTimeout(() => { preloader.style.display = 'none'; }, 380);
  };

  function tick(ts) {
    if (completed) return;
    if (!start) start = ts;
    const elapsed = ts - start;
    const pct = Math.min(100, Math.round((elapsed / duration) * 100));
    if (progressBar) progressBar.style.width = pct + '%';
    if (progressText) progressText.innerText = pct + '%';
    if (elapsed < duration) {
      requestAnimationFrame(tick);
    } else {
      finishBoot();
    }
  }
  requestAnimationFrame(tick);

  // Instant skip: click anywhere on the loader or press Escape/Enter/Space
  preloader.addEventListener('click', finishBoot, { once: true });
  window.addEventListener('keydown', function skipKey(e) {
    if (['Escape', 'Enter', ' '].includes(e.key)) {
      finishBoot();
      window.removeEventListener('keydown', skipKey);
    }
  });

  // Absolute safety net
  setTimeout(finishBoot, 1600);
}


// --- 4. Dynamic Content Rendering ---
function renderDynamicContent() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  // Render Stats Counter in Hero
  const statsContainer = document.getElementById('hero-stats-grid');
  if (statsContainer) {
    statsContainer.innerHTML = data.personal.stats.map(s => `
      <div class="stat-card glass-card">
        <div class="stat-icon-wrapper"><i class="fa-solid ${s.icon} text-cyan"></i></div>
        <div class="stat-value text-gradient-cyan counter" data-target="${s.value}">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  // Render Skills Categories & Matrix
  renderSkillsMatrix('all');

  // Render Projects Grid
  renderProjectsGrid('all');

  // Render Experience & Leadership Timeline
  renderExperienceTimeline();

  // Render Certifications Grid
  renderCertificationsGrid();

  // Render Articles / Blog Grid
  renderArticlesGrid();

  // Render Testimonials Carousel
  renderTestimonials();
}


// --- 5. Hero Headline Flipper ---
function initHeroTextFlipper() {
  const flipper = document.getElementById('hero-typing-text');
  if (!flipper) return;

  const titles = [
    "AI & Machine Learning Engineer",
    "Full-Stack ML Systems Developer",
    "AWS Certified Cloud Specialist",
    "Generative AI & LLM Architect",
    "Data Scientist & Researcher"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      flipper.innerText = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      flipper.innerText = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}


// --- 6. Skills Matrix Rendering ---
function renderSkillsMatrix(filterCategory) {
  const container = document.getElementById('skills-matrix-container');
  const tabsContainer = document.getElementById('skills-filter-tabs');
  if (!container) return;

  const categories = window.PORTFOLIO_DATA.skills.categories;

  // Build filter tabs if not already populated
  if (tabsContainer && tabsContainer.children.length === 0) {
    let tabsHtml = `<button class="filter-tab active" data-category="all"><i class="fa-solid fa-layer-group"></i> All Competencies</button>`;
    categories.forEach(cat => {
      tabsHtml += `<button class="filter-tab" data-category="${cat.id}"><i class="fa-solid ${cat.icon}"></i> ${cat.name}</button>`;
    });
    tabsContainer.innerHTML = tabsHtml;

    tabsContainer.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSkillsMatrix(tab.getAttribute('data-category'));
        if (window.AudioEngine) window.AudioEngine.play('click');
      });
    });
  }

  const filteredCategories = filterCategory === 'all'
    ? categories
    : categories.filter(c => c.id === filterCategory);

  container.innerHTML = filteredCategories.map(cat => `
    <div class="skill-category-card glass-card">
      <div class="category-header">
        <div class="cat-icon-badge"><i class="fa-solid ${cat.icon} text-cyan"></i></div>
        <h3 class="category-title">${cat.name}</h3>
      </div>
      <div class="skills-list">
        ${cat.skills.map(s => `
          <div class="skill-meter-item">
            <div class="skill-info">
              <span class="skill-name">${s.name}</span>
              <span class="skill-tag">${s.tag}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${s.level}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}


// --- 7. Projects Grid Rendering & Filtering ---
function renderProjectsGrid(filterCategory) {
  const grid = document.getElementById('projects-grid');
  const tabsContainer = document.getElementById('projects-filter-tabs');
  if (!grid) return;

  const projects = window.PORTFOLIO_DATA.projects;

  // Build filter tabs
  if (tabsContainer && tabsContainer.children.length === 0) {
    const filters = [
      { id: 'all', label: 'All Projects', icon: 'fa-globe' },
      { id: 'ai-ml', label: 'AI & Machine Learning', icon: 'fa-brain' },
      { id: 'cloud-devops', label: 'Cloud & Observability', icon: 'fa-cloud' },
      { id: 'full-stack', label: 'Full-Stack & Systems', icon: 'fa-code' }
    ];

    tabsContainer.innerHTML = filters.map((f, i) => `
      <button class="filter-tab ${i === 0 ? 'active' : ''}" data-category="${f.id}">
        <i class="fa-solid ${f.icon}"></i> ${f.label}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderProjectsGrid(tab.getAttribute('data-category'));
        if (window.AudioEngine) window.AudioEngine.play('click');
      });
    });
  }

  const filtered = filterCategory === 'all'
    ? projects
    : projects.filter(p => p.category === filterCategory);

  grid.innerHTML = filtered.map(p => `
    <div class="project-card glass-card ${p.featured ? 'featured-border' : ''}" data-project-id="${p.id}">
      <div class="project-card-header">
        <span class="project-badge" style="border-color: ${p.accentColor}; color: ${p.accentColor};">
          <i class="fa-solid fa-sparkles"></i> ${p.badge}
        </span>
        <div class="project-actions">
          <button class="btn-icon view-project-btn" data-id="${p.id}" title="View Architecture & Details">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
        </div>
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.shortDesc}</p>
      
      <div class="project-impact-box">
        <i class="fa-solid fa-chart-line text-cyan"></i>
        <span>${p.impact}</span>
      </div>

      <div class="project-tech-tags">
        ${p.techStack.slice(0, 5).map(t => `<span class="tech-tag">${t}</span>`).join('')}
        ${p.techStack.length > 5 ? `<span class="tech-tag more">+${p.techStack.length - 5}</span>` : ''}
      </div>

      <div class="project-footer">
        <button class="btn-glass-sm view-project-btn" data-id="${p.id}">
          <i class="fa-solid fa-microchip"></i> System Deep Dive
        </button>
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-icon-link" title="Source Code">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
  `).join('');

  // Attach modal trigger listeners
  grid.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openProjectModal(id);
    });
  });

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });
}


// --- 8. Project Detail Modal ---
function openProjectModal(projectId) {
  const project = window.PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('modal-project-title');
  const badgeEl = document.getElementById('modal-project-badge');
  const descEl = document.getElementById('modal-project-desc');
  const impactEl = document.getElementById('modal-project-impact');
  const highlightsEl = document.getElementById('modal-project-highlights');
  const techEl = document.getElementById('modal-project-tech');
  const githubBtn = document.getElementById('modal-project-github');

  if (titleEl) titleEl.innerText = project.title;
  if (badgeEl) {
    badgeEl.innerText = project.badge;
    badgeEl.style.borderColor = project.accentColor;
    badgeEl.style.color = project.accentColor;
  }
  if (descEl) descEl.innerText = project.fullDesc;
  if (impactEl) impactEl.innerText = project.impact;

  if (highlightsEl) {
    highlightsEl.innerHTML = project.highlights.map(h => `
      <li class="highlight-item"><i class="fa-solid fa-check text-cyan"></i> ${h}</li>
    `).join('');
  }

  if (techEl) {
    techEl.innerHTML = project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');
  }

  if (githubBtn) {
    githubBtn.href = project.github;
  }

  if (modal) {
    modal.classList.add('active');
    if (window.AudioEngine) window.AudioEngine.play('open');
  }
}


// --- 9. Experience & Leadership Timeline ---
function renderExperienceTimeline() {
  const container = document.getElementById('experience-timeline-container');
  if (!container) return;

  const experiences = window.PORTFOLIO_DATA.experience;
  const education = window.PORTFOLIO_DATA.education;

  container.innerHTML = `
    <div class="timeline-column">
      <div class="column-header">
        <i class="fa-solid fa-briefcase text-cyan"></i>
        <h3>Industry Experience & Leadership</h3>
      </div>
      <div class="timeline-tree">
        ${experiences.map((exp, idx) => `
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content glass-card">
              <div class="timeline-top">
                <span class="timeline-role">${exp.role}</span>
                <span class="timeline-period"><i class="fa-regular fa-clock"></i> ${exp.period}</span>
              </div>
              <div class="timeline-company text-cyan">
                <strong>${exp.company}</strong> • <span class="text-muted text-xs">${exp.location}</span>
              </div>
              <p class="timeline-desc">${exp.description}</p>
              <ul class="timeline-resp-list">
                ${exp.responsibilities.map(r => `<li><i class="fa-solid fa-angle-right text-cyan"></i> ${r}</li>`).join('')}
              </ul>
              <div class="timeline-skills">
                ${exp.skills.map(s => `<span class="tag-badge">${s}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="timeline-column">
      <div class="column-header">
        <i class="fa-solid fa-graduation-cap text-cyan"></i>
        <h3>Academic Education & Specialization</h3>
      </div>
      <div class="timeline-tree">
        ${education.map(edu => `
          <div class="timeline-item">
            <div class="timeline-marker education-marker"></div>
            <div class="timeline-content glass-card border-neon-blue">
              <div class="timeline-top">
                <span class="timeline-role">${edu.degree}</span>
                <span class="timeline-period"><i class="fa-regular fa-calendar"></i> ${edu.period}</span>
              </div>
              <div class="timeline-company text-cyan">
                <strong>${edu.institution}</strong> • <span class="text-muted text-xs">${edu.location}</span>
              </div>
              <div class="edu-specialization-badge">
                <i class="fa-solid fa-award"></i> Specialization: ${edu.specialization} (${edu.cgpa})
              </div>
              <ul class="timeline-resp-list">
                ${edu.highlights.map(h => `<li><i class="fa-solid fa-check text-cyan"></i> ${h}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}

        <!-- Recruiter Pitch Card -->
        <div class="recruiter-pitch-card glass-card">
          <div class="pitch-header">
            <i class="fa-solid fa-bolt text-yellow"></i>
            <h4>Immediate Availability</h4>
          </div>
          <p class="pitch-text">Vaibhav is ready to deploy into fast-paced engineering squads with zero ramp-up lag. He combines strong algorithmic foundations in AI with production cloud and backend rigor.</p>
          <div class="pitch-actions">
            <a href="mailto:${window.PORTFOLIO_DATA.personal.email}?subject=Hiring%20Discussion" class="btn-neon-sm">
              <i class="fa-solid fa-paper-plane"></i> Fast-Track Interview
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}


// --- 10. Certifications & Badges Grid ---
function renderCertificationsGrid() {
  const container = document.getElementById('certifications-grid');
  if (!container) return;

  const certs = window.PORTFOLIO_DATA.certifications;

  container.innerHTML = certs.map(c => `
    <div class="cert-card glass-card" data-cert-id="${c.id}">
      <div class="cert-badge-icon">
        <i class="${c.badgeIcon} text-cyan"></i>
      </div>
      <div class="cert-info">
        <span class="cert-category">${c.category}</span>
        <h4 class="cert-title">${c.title}</h4>
        <div class="cert-issuer">
          <span>${c.issuer}</span> • <strong>${c.year}</strong>
        </div>
      </div>
      <div class="cert-status-tag">
        <i class="fa-solid fa-circle-check text-emerald"></i> Verified
      </div>
      <p class="cert-desc">${c.description}</p>
      <div class="cert-footer">
        <button class="btn-cert-view" data-cert-id="${c.id}">
          <i class="fa-solid fa-shield-halved"></i> View Credential
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-cert-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-cert-id');
      openCertModal(id);
    });
  });
}

function openCertModal(certId) {
  const cert = window.PORTFOLIO_DATA.certifications.find(c => c.id === certId);
  if (!cert) return;

  const modal = document.getElementById('cert-modal');
  const titleEl = document.getElementById('modal-cert-title');
  const issuerEl = document.getElementById('modal-cert-issuer');
  const descEl = document.getElementById('modal-cert-desc');
  const linkEl = document.getElementById('modal-cert-link');

  if (titleEl) titleEl.innerText = cert.title;
  if (issuerEl) issuerEl.innerText = `${cert.issuer} (${cert.year})`;
  if (descEl) descEl.innerText = cert.description;
  if (linkEl) {
    if (cert.credentialUrl && cert.credentialUrl !== '#') {
      linkEl.href = cert.credentialUrl;
      linkEl.style.display = 'inline-flex';
    } else {
      linkEl.style.display = 'none';
    }
  }

  if (modal) {
    modal.classList.add('active');
    if (window.AudioEngine) window.AudioEngine.play('open');
  }
}


// --- 11. Articles & Tech Insights Grid ---
function renderArticlesGrid() {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  const articles = window.PORTFOLIO_DATA.articles;

  container.innerHTML = articles.map(a => `
    <div class="article-card glass-card" data-article-id="${a.id}">
      <div class="article-meta">
        <span><i class="fa-regular fa-calendar"></i> ${a.date}</span>
        <span><i class="fa-regular fa-clock"></i> ${a.readTime}</span>
      </div>
      <h3 class="article-title">${a.title}</h3>
      <p class="article-summary">${a.summary}</p>
      <div class="article-tags">
        ${a.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
      </div>
      <button class="btn-read-article" data-id="${a.id}">
        Read Technical Article <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.btn-read-article').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openArticleModal(id);
    });
  });
}

function openArticleModal(articleId) {
  const article = window.PORTFOLIO_DATA.articles.find(a => a.id === articleId);
  if (!article) return;

  const modal = document.getElementById('article-modal');
  const titleEl = document.getElementById('modal-article-title');
  const metaEl = document.getElementById('modal-article-meta');
  const bodyEl = document.getElementById('modal-article-body');

  if (titleEl) titleEl.innerText = article.title;
  if (metaEl) metaEl.innerText = `${article.date} • ${article.readTime}`;
  if (bodyEl) bodyEl.innerHTML = article.content;

  if (modal) {
    modal.classList.add('active');
    if (window.AudioEngine) window.AudioEngine.play('open');
  }
}


// --- 12. Testimonials Carousel ---
function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  const list = window.PORTFOLIO_DATA.testimonials;

  container.innerHTML = list.map((t, i) => `
    <div class="testimonial-card glass-card ${i === 0 ? 'active' : ''}">
      <div class="quote-icon"><i class="fa-solid fa-quote-left text-cyan"></i></div>
      <p class="quote-text">"${t.quote}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.avatar}</div>
        <div class="author-meta">
          <div class="author-name">${t.author}</div>
          <div class="author-role">${t.designation}</div>
          <div class="author-badge"><i class="fa-solid fa-medal text-yellow"></i> ${t.highlight}</div>
        </div>
      </div>
    </div>
  `).join('');
}


// --- 13. macOS Floating Navigation Dock ---
function initMacOSDock() {
  const dock = document.getElementById('macos-dock');
  if (!dock) return;

  const dockItems = dock.querySelectorAll('.dock-item');

  dockItems.forEach((item, index) => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const offset = (e.clientX - rect.left) / rect.width - 0.5;

      dockItems.forEach((other, otherIdx) => {
        const dist = Math.abs(index - otherIdx);
        let scale = 1;
        if (dist === 0) scale = 1.35;
        else if (dist === 1) scale = 1.18;
        else if (dist === 2) scale = 1.05;
        other.style.transform = `translateY(-${(scale - 1) * 20}px) scale(${scale})`;
      });
    });

    item.addEventListener('click', (e) => {
      if (window.AudioEngine) window.AudioEngine.play('click');
    });
  });

  dock.addEventListener('mouseleave', () => {
    dockItems.forEach(item => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  });
}


// --- 14. Spotlight Command Palette (⌘K / Ctrl+K) ---
function initCommandPalette() {
  const palette = document.getElementById('command-palette-modal');
  const input = document.getElementById('palette-input');
  const resultsContainer = document.getElementById('palette-results');
  const triggerBtns = document.querySelectorAll('.trigger-palette-btn');

  if (!palette) return;

  const actions = [
    { title: "Download Official CV (Google Drive)", category: "Action", icon: "fa-download", action: () => window.open(window.PORTFOLIO_DATA.personal.resumeLink, '_blank') },
    { title: "Chat with Vaibhav's AI Twin 🤖", category: "AI", icon: "fa-robot", action: () => { closePalette(); if (window.globalAITwin) window.globalAITwin.openChat(); } },
    { title: "Schedule an Interview / Email", category: "Contact", icon: "fa-calendar", action: () => window.location.href = `mailto:${window.PORTFOLIO_DATA.personal.email}?subject=Interview%20Invitation` },
    { title: "Call Vaibhav Directly (+91 81779 23800)", category: "Contact", icon: "fa-phone", action: () => window.location.href = `tel:${window.PORTFOLIO_DATA.personal.phone}` },
    { title: "Urban Water Quality ML (Research Project)", category: "Project", icon: "fa-chart-pie", action: () => { closePalette(); openProjectModal('water-quality'); } },
    { title: "QueryTube – AI Semantic Video Search", category: "Project", icon: "fa-play", action: () => { closePalette(); openProjectModal('querytube'); } },
    { title: "Agri AI – Full-Stack Smart Agriculture", category: "Project", icon: "fa-seedling", action: () => { closePalette(); openProjectModal('agri-ai'); } },
    { title: "AWS CloudWatch Observability Pipeline", category: "Project", icon: "fa-cloud", action: () => { closePalette(); openProjectModal('aws-observability'); } },
    { title: "AWS Certified Cloud Practitioner Credential", category: "Certification", icon: "fa-award", action: () => { closePalette(); openCertModal('aws-ccp'); } },
    { title: "OpenAI GPT-3 for Developers Credential", category: "Certification", icon: "fa-robot", action: () => { closePalette(); openCertModal('openai-gpt3'); } },
    { title: "Jump to Skills Matrix", category: "Navigation", icon: "fa-layer-group", action: () => { closePalette(); scrollToSection('skills'); } },
    { title: "Jump to Projects Showcase", category: "Navigation", icon: "fa-code", action: () => { closePalette(); scrollToSection('projects'); } },
    { title: "Jump to Experience Timeline", category: "Navigation", icon: "fa-briefcase", action: () => { closePalette(); scrollToSection('experience'); } },
    { title: "Toggle Futuristic CLI Terminal", category: "Terminal", icon: "fa-terminal", action: () => { closePalette(); scrollToSection('terminal'); } }
  ];

  function openPalette() {
    palette.classList.add('active');
    if (input) {
      input.value = '';
      input.focus();
    }
    renderResults(actions);
    if (window.AudioEngine) window.AudioEngine.play('open');
  }

  function closePalette() {
    palette.classList.remove('active');
    if (window.AudioEngine) window.AudioEngine.play('close');
  }

  function renderResults(list) {
    if (!resultsContainer) return;
    if (list.length === 0) {
      resultsContainer.innerHTML = `<div class="palette-empty">No results found. Try searching for "AWS", "Projects", "CV", or "Skills".</div>`;
      return;
    }

    resultsContainer.innerHTML = list.map((item, idx) => `
      <div class="palette-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
        <div class="palette-item-left">
          <i class="fa-solid ${item.icon} text-cyan"></i>
          <span class="palette-item-title">${item.title}</span>
        </div>
        <span class="palette-item-badge">${item.category}</span>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.palette-item').forEach((el, idx) => {
      el.addEventListener('click', () => {
        list[idx].action();
      });
    });
  }

  if (input) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = actions.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });
  }

  // Keyboard shortcut (⌘K or Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  triggerBtns.forEach(btn => btn.addEventListener('click', openPalette));

  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });
}


// --- 15. Modals Management ---
function initModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    const closeBtns = modal.querySelectorAll('.modal-close-btn, .btn-modal-dismiss');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
        if (window.AudioEngine) window.AudioEngine.play('close');
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        if (window.AudioEngine) window.AudioEngine.play('close');
      }
    });
  });

  // CV Download trigger buttons
  document.querySelectorAll('.download-cv-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      showToast('Opening Vaibhav\'s Official Resume (Google Drive)... 📄');
      if (window.AudioEngine) window.AudioEngine.play('success');
    });
  });

  // Quick Hire Me Modal
  const hireBtn = document.getElementById('hero-hire-me-btn');
  const hireModal = document.getElementById('hire-me-modal');
  if (hireBtn && hireModal) {
    hireBtn.addEventListener('click', () => {
      hireModal.classList.add('active');
      if (window.AudioEngine) window.AudioEngine.play('open');
    });
  }
}


// --- 16. Contact Form & Clipboard ---
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields ⚠️', 'error');
        return;
      }

      // Email client dispatch simulation
      const mailtoLink = `mailto:${window.PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(subject + ' - From ' + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

      showToast('Redirecting to your email client... 🚀', 'success');
      if (window.AudioEngine) window.AudioEngine.play('success');

      setTimeout(() => {
        window.location.href = mailtoLink;
        form.reset();
      }, 700);
    });
  }

  // Copy-to-clipboard buttons (Email, Phone)
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy} 📋`, 'success');
          if (window.AudioEngine) window.AudioEngine.play('click');
        });
      }
    });
  });
}


// --- 17. Scroll Observers & Counters ---
function initScrollObservers() {
  // Stats counter animation on view
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        // Counter animation logic
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('hero-stats-grid');
  if (statsSection) observer.observe(statsSection);

  // Active section spy for macOS dock
  const sections = document.querySelectorAll('section[id]');
  const dockLinks = document.querySelectorAll('.dock-item[href]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    dockLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}


// --- 18. Helper Utilities ---
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  // Section lives on a different page — route there.
  const pageMap = {
    hero: 'index.html', about: 'index.html',
    skills: 'skills.html', terminal: 'skills.html',
    projects: 'projects.html', services: 'projects.html',
    experience: 'experience.html', certifications: 'experience.html',
    articles: 'experience.html', testimonials: 'experience.html',
    contact: 'contact.html'
  };
  const page = pageMap[sectionId];
  if (page) window.location.href = `${page}#${sectionId}`;
}

function showToast(message, type = 'info') {
  window.showToast = showToast;
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('visible');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initAudioTriggers() {
  document.querySelectorAll('button, a.btn-glass, a.btn-neon, .dock-item, .tech-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.AudioEngine) window.AudioEngine.play('hover');
    });
  });
}

// --- 19. 3D Interactive Card Tilt & Cursor Spotlight ---
function init3DTiltAndCursor() {
  const spotlight = document.getElementById('cursor-spotlight');

  const cardSelector = [
    '.glass-card',
    '.project-card',
    '.skill-category-card',
    '.cert-card',
    '.service-card',
    '.article-card',
    '.hero-visual-card',
    '.stat-card'
  ].join(',');

  let cards = [];
  let activeCard = null;

  let mouseX = 0;
  let mouseY = 0;
  let spotlightX = 0;
  let spotlightY = 0;

  let animationFrame = null;

  // --------------------------------------------------
  // Get all cards
  // --------------------------------------------------
  function refreshCards() {
    cards = Array.from(document.querySelectorAll(cardSelector));
  }

  refreshCards();

  // Dynamic sections are populated by app.js,
  // so refresh the card list periodically without
  // doing expensive DOM queries on every mouse movement.
  const observer = new MutationObserver(() => {
    refreshCards();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // --------------------------------------------------
  // Reset card
  // --------------------------------------------------
  function resetCard(card) {
    if (!card) return;

    card.style.transform = '';
    card.style.removeProperty('--mouse-x');
    card.style.removeProperty('--mouse-y');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  }

  // --------------------------------------------------
  // Find card under cursor
  // --------------------------------------------------
  function getCardUnderCursor(x, y) {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      const rect = card.getBoundingClientRect();

      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return {
          card,
          rect
        };
      }
    }

    return null;
  }

  // --------------------------------------------------
  // Main animation loop
  // --------------------------------------------------
  function animate() {
    animationFrame = null;

    // -----------------------------
    // Cursor spotlight
    // -----------------------------
    if (spotlight) {
      spotlightX += (mouseX - spotlightX) * 0.18;
      spotlightY += (mouseY - spotlightY) * 0.18;

      spotlight.style.transform =
        `translate3d(${spotlightX}px, ${spotlightY}px, 0) translate(-50%, -50%)`;
    }

    // -----------------------------
    // Card tilt
    // -----------------------------
    if (activeCard) {
      const rect = activeCard.getBoundingClientRect();

      // If cursor is no longer inside the card
      if (
        mouseX < rect.left ||
        mouseX > rect.right ||
        mouseY < rect.top ||
        mouseY > rect.bottom
      ) {
        resetCard(activeCard);
        activeCard = null;
      } else {
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        const percentX = x / rect.width;
        const percentY = y / rect.height;

        // Convert cursor position to -1 → +1
        const normalizedX = percentX * 2 - 1;
        const normalizedY = percentY * 2 - 1;

        // Maximum rotation
        const maxTilt = 8;

        const rotateX = normalizedY * -maxTilt;
        const rotateY = normalizedX * maxTilt;

        activeCard.style.transform = `
          perspective(1000px)
          rotateX(${rotateX.toFixed(2)}deg)
          rotateY(${rotateY.toFixed(2)}deg)
          translateZ(10px)
        `;

        // CSS variables for spotlight/glow effects
        activeCard.style.setProperty(
          '--mouse-x',
          `${percentX * 100}%`
        );

        activeCard.style.setProperty(
          '--mouse-y',
          `${percentY * 100}%`
        );

        activeCard.style.setProperty(
          '--tilt-x',
          `${rotateX.toFixed(2)}deg`
        );

        activeCard.style.setProperty(
          '--tilt-y',
          `${rotateY.toFixed(2)}deg`
        );
      }
    }

    // Continue animation while mouse is active
    animationFrame = requestAnimationFrame(animate);
  }

  // --------------------------------------------------
  // Mouse movement
  // --------------------------------------------------
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    const result = getCardUnderCursor(mouseX, mouseY);

    const hoveredCard = result ? result.card : null;

    // Cursor entered a new card
    if (hoveredCard !== activeCard) {
      if (activeCard) {
        resetCard(activeCard);
      }

      activeCard = hoveredCard;

      if (activeCard) {
        activeCard.style.transition = 'transform 0.08s ease-out';
        activeCard.style.willChange = 'transform';
      }
    }

    // Start animation loop if necessary
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animate);
    }
  }, { passive: true });

  // --------------------------------------------------
  // Mouse leaves the browser window
  // --------------------------------------------------
  document.addEventListener('mouseleave', () => {
    if (activeCard) {
      resetCard(activeCard);
      activeCard = null;
    }
  });

  // --------------------------------------------------
  // Touch devices don't need cursor tilt
  // --------------------------------------------------
  if (window.matchMedia('(hover: none)').matches) {
    if (spotlight) {
      spotlight.style.display = 'none';
    }

    return;
  }

  // --------------------------------------------------
  // Reduced motion accessibility
  // --------------------------------------------------
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  function handleReducedMotion() {
    if (reducedMotion.matches && activeCard) {
      resetCard(activeCard);
      activeCard = null;
    }
  }

  reducedMotion.addEventListener('change', handleReducedMotion);
}
