/**
 * Interactive Developer Terminal CLI Component
 * Allows visitors, engineers, and recruiters to explore Vaibhav's portfolio via command line.
 */

class InteractiveTerminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.input = this.container.querySelector('.terminal-input');
    this.output = this.container.querySelector('.terminal-body');
    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.cmdHelp(),
      about: () => this.cmdAbout(),
      skills: () => this.cmdSkills(),
      projects: (args) => this.cmdProjects(args),
      project: (args) => this.cmdProjects(args),
      experience: () => this.cmdExperience(),
      exp: () => this.cmdExperience(),
      certs: () => this.cmdCerts(),
      certifications: () => this.cmdCerts(),
      resume: () => this.cmdResume(),
      cv: () => this.cmdResume(),
      'cat resume.txt': () => this.cmdResume(),
      contact: () => this.cmdContact(),
      hire: () => this.cmdHire(),
      'sudo hire-vaibhav': () => this.cmdHire(),
      'sudo hire': () => this.cmdHire(),
      clear: () => this.cmdClear(),
      cls: () => this.cmdClear(),
      matrix: () => this.cmdMatrix(),
      whoami: () => '<span class="text-cyan">guest@recruiter-workstation:~$</span> You are a visionary tech recruiter / engineering leader seeking top-tier AI & Cloud talent.',
      date: () => new Date().toUTCString(),
      sudo: () => '<span class="text-yellow">Permission granted!</span> Elevated privileges unlocked for hiring Vaibhav Shekhar Haldankar.',
      echo: (args) => args.join(' '),
      exit: () => 'To exit the terminal, simply scroll to explore the visual UI sections below.'
    };

    this.init();
  }

  init() {
    if (!this.input) return;

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleCommand(this.input.value.trim());
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        } else if (this.historyIndex === 0) {
          this.historyIndex = -1;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.handleAutocomplete();
      }
    });

    // Terminal click focuses input
    this.container.addEventListener('click', () => {
      if (this.input) this.input.focus();
    });
  }

  handleAutocomplete() {
    const current = this.input.value.trim();
    if (!current) return;

    const available = Object.keys(this.commands);
    const match = available.find(c => c.startsWith(current));
    if (match) {
      this.input.value = match;
    }
  }

  handleCommand(rawCmd) {
    if (!rawCmd) return;

    this.history.push(rawCmd);
    this.historyIndex = -1;

    // Print user input line
    this.printLine(`<span class="prompt-prefix">vaibhav@neural-core:~$</span> <span class="cmd-text">${this.escapeHtml(rawCmd)}</span>`);

    const parts = rawCmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Exact compound command matching
    if (this.commands[rawCmd.toLowerCase()]) {
      const response = this.commands[rawCmd.toLowerCase()](args);
      if (response) this.printLine(response);
    } else if (this.commands[mainCmd]) {
      const response = this.commands[mainCmd](args);
      if (response) this.printLine(response);
    } else {
      this.printLine(`<span class="text-red">zsh: command not found: ${this.escapeHtml(rawCmd)}. Type <span class="text-cyan font-bold">help</span> to view all available commands.</span>`);
    }

    if (window.AudioEngine) {
      window.AudioEngine.play('keystroke');
    }

    this.scrollToBottom();
  }

  printLine(html) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = html;
    this.output.appendChild(line);
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  cmdClear() {
    this.output.innerHTML = '';
    return null;
  }

  cmdHelp() {
    return `
<div class="terminal-help-grid">
  <div class="help-header text-cyan font-mono">⚡ VAIBHAV OS (v2.6.0) COMMAND MANUAL</div>
  <div class="help-row"><span class="cmd text-accent">about</span> <span>Display summary, education & core mission</span></div>
  <div class="help-row"><span class="cmd text-accent">skills</span> <span>List technical competencies & frameworks</span></div>
  <div class="help-row"><span class="cmd text-accent">projects</span> <span>Show portfolio projects (or 'project &lt;id&gt;')</span></div>
  <div class="help-row"><span class="cmd text-accent">exp</span> <span>View work experience & leadership timeline</span></div>
  <div class="help-row"><span class="cmd text-accent">certs</span> <span>List verified certifications (AWS, OpenAI, Infosys)</span></div>
  <div class="help-row"><span class="cmd text-accent">hire</span> <span>Quick recruiter pitch & immediate hiring brief</span></div>
  <div class="help-row"><span class="cmd text-accent">resume</span> <span>Get direct Google Drive CV download link</span></div>
  <div class="help-row"><span class="cmd text-accent">contact</span> <span>Display direct phone, email, and social links</span></div>
  <div class="help-row"><span class="cmd text-accent">matrix</span> <span>Trigger Matrix rain visual stream</span></div>
  <div class="help-row"><span class="cmd text-accent">clear</span> <span>Clear terminal history screen</span></div>
</div>`;
  }

  cmdAbout() {
    const p = window.PORTFOLIO_DATA.personal;
    return `
<div class="terminal-card">
  <div class="text-cyan font-bold mb-1">${p.name} — ${p.title}</div>
  <div class="text-gray-300 text-sm mb-2">${p.tagline}</div>
  <div class="text-muted text-xs">🎓 <strong>MCA in AI & Data Science</strong> (2024-2026) | DY Patil International University, Pune (CGPA: 6.7)</div>
  <div class="text-muted text-xs">🎓 <strong>BCA</strong> (2020-2023) | St Xaviers College Mapusa, Goa (CGPA: 5.7)</div>
  <div class="text-emerald text-xs mt-2">Status: ${p.statusBadge}</div>
</div>`;
  }

  cmdSkills() {
    const categories = window.PORTFOLIO_DATA.skills.categories;
    let html = '<div class="terminal-skills-table"><div class="text-cyan font-bold mb-2">⚡ CORE TECHNICAL COMPETENCIES</div>';
    
    categories.forEach(cat => {
      html += `<div class="font-bold text-accent mt-2 text-xs">[ ${cat.name.toUpperCase()} ]</div>`;
      html += '<div class="grid-skills">';
      cat.skills.forEach(s => {
        const bar = '█'.repeat(Math.floor(s.level / 10)) + '░'.repeat(10 - Math.floor(s.level / 10));
        html += `<div class="skill-item"><span class="skill-name">${s.name}</span> <span class="skill-bar text-cyan">${bar}</span> <span class="skill-tag text-xs">[${s.tag}]</span></div>`;
      });
      html += '</div>';
    });

    html += '</div>';
    return html;
  }

  cmdProjects(args) {
    const projects = window.PORTFOLIO_DATA.projects;
    
    if (args && args.length > 0) {
      const pId = args[0].toLowerCase();
      const p = projects.find(item => item.id.includes(pId) || item.title.toLowerCase().includes(pId));
      if (p) {
        return `
<div class="terminal-card">
  <div class="text-cyan font-bold text-base mb-1">${p.title} <span class="badge">[${p.badge}]</span></div>
  <div class="text-gray-300 text-sm mb-2">${p.fullDesc}</div>
  <div class="text-accent text-xs mb-1"><strong>Tech Stack:</strong> ${p.techStack.join(', ')}</div>
  <div class="text-emerald text-xs"><strong>Impact:</strong> ${p.impact}</div>
</div>`;
      }
    }

    let html = '<div class="terminal-projects-list"><div class="text-cyan font-bold mb-2">🚀 FEATURED ENGINEERING PROJECTS</div>';
    projects.forEach((p, idx) => {
      html += `
<div class="mb-2">
  <span class="text-accent font-bold">${idx + 1}. [${p.id}]</span> <strong class="text-white">${p.title}</strong>
  <div class="text-xs text-muted pl-4">${p.shortDesc}</div>
  <div class="text-xs text-cyan pl-4">Tech: ${p.techStack.slice(0, 5).join(', ')}...</div>
</div>`;
    });
    html += '<div class="text-xs text-yellow mt-2">💡 Tip: Type <strong>project water-quality</strong> or <strong>project querytube</strong> for deep dive.</div></div>';
    return html;
  }

  cmdExperience() {
    const exp = window.PORTFOLIO_DATA.experience;
    let html = '<div class="terminal-exp-list"><div class="text-cyan font-bold mb-2">💼 EXPERIENCE & LEADERSHIP TIMELINE</div>';
    exp.forEach(e => {
      html += `
<div class="mb-2">
  <div class="text-white font-bold text-sm">${e.role} @ <span class="text-accent">${e.company}</span> <span class="text-muted text-xs">(${e.period})</span></div>
  <div class="text-xs text-gray-300 pl-2">• ${e.responsibilities[0]}</div>
</div>`;
    });
    html += '</div>';
    return html;
  }

  cmdCerts() {
    const certs = window.PORTFOLIO_DATA.certifications;
    let html = '<div class="terminal-certs-list"><div class="text-cyan font-bold mb-2">📜 VERIFIED CERTIFICATIONS & ACHIEVEMENTS</div>';
    certs.forEach((c, idx) => {
      html += `<div class="text-sm text-gray-200 mb-1"><span class="text-accent font-bold">${idx + 1}.</span> <strong>${c.title}</strong> — <span class="text-muted">${c.issuer} (${c.year})</span></div>`;
    });
    html += '</div>';
    return html;
  }

  cmdResume() {
    const url = window.PORTFOLIO_DATA.personal.resumeLink;
    return `
<div class="terminal-card">
  <div class="text-cyan font-bold mb-1">📄 VAIBHAV SHEKHAR HALDANKAR - RESUME / CV</div>
  <div class="text-gray-300 text-sm mb-2">Available for immediate deployment in AI, Data Science, and Software roles.</div>
  <div>🔗 <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-accent underline font-bold">Click here to open / download Resume (Google Drive)</a></div>
</div>`;
  }

  cmdContact() {
    const p = window.PORTFOLIO_DATA.personal;
    return `
<div class="terminal-card">
  <div class="text-cyan font-bold mb-1">📬 GET IN TOUCH WITH VAIBHAV</div>
  <div class="text-sm">📧 Email: <a href="mailto:${p.email}" class="text-accent underline">${p.email}</a></div>
  <div class="text-sm">📱 Phone: <a href="tel:${p.phone}" class="text-accent underline">${p.phoneDisplay}</a></div>
  <div class="text-sm">💼 LinkedIn: <a href="${p.socials.linkedin}" target="_blank" class="text-accent underline">linkedin.com/in/vaibhav-haldankar</a></div>
  <div class="text-sm">🐙 GitHub: <a href="${p.socials.github}" target="_blank" class="text-accent underline">github.com/Vaibhav-Haldankar</a></div>
  <div class="text-sm">⚡ LeetCode: <a href="${p.socials.leetcode}" target="_blank" class="text-accent underline">leetcode.com/u/Vaibhav-Haldankar/</a></div>
</div>`;
  }

  cmdHire() {
    const p = window.PORTFOLIO_DATA.personal;
    return `
<div class="terminal-card border-neon-cyan">
  <div class="text-cyan font-bold text-base mb-1">🎯 WHY HIRE VAIBHAV SHEKHAR HALDANKAR?</div>
  <div class="text-white text-xs mb-2">
    1. <strong>Full-Stack AI Synergy</strong>: Bridges research ML (PyTorch, Kalman, XGBoost) with production GenAI & FAISS vector search.<br>
    2. <strong>AWS Certified & SRE-Minded</strong>: Builds self-healing CloudWatch + Lambda observability systems.<br>
    3. <strong>Proven Leadership</strong>: MCA Placement Coordinator & Class Rep with top-tier collaboration.<br>
    4. <strong>Immediate Joiner</strong>: 100% available to start immediately with high energy and ownership.
  </div>
  <div class="mt-2">
    <a href="mailto:${p.email}?subject=Interview%20Invitation%20for%20Vaibhav%20Haldankar" class="btn-terminal-cta">Schedule Interview Directly &rarr;</a>
  </div>
</div>`;
  }

  cmdMatrix() {
    const matrixEl = document.getElementById('matrix-overlay');
    if (matrixEl) {
      matrixEl.classList.toggle('active');
      if (matrixEl.classList.contains('active')) {
        if (!window.globalMatrixRain) {
          window.globalMatrixRain = new window.MatrixRain('matrix-canvas');
        }
        window.globalMatrixRain.start();
        return '<span class="text-emerald font-bold">[MATRIX MODE ACTIVE] Press matrix again or click anywhere to exit.</span>';
      } else {
        if (window.globalMatrixRain) window.globalMatrixRain.stop();
        return '<span class="text-muted">[MATRIX MODE DEACTIVATED]</span>';
      }
    }
    return 'Matrix canvas not found.';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
}

window.InteractiveTerminal = InteractiveTerminal;
