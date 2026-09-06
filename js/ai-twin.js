/**
 * Vaibhav's AI Twin 🤖 (Interactive Digital Clone Engine)
 * Features 3 personality modes (Crisp, Clear, Chatty), real-time streaming answers,
 * pre-loaded context knowledge base, suggested prompts, and simulated typewriter responses.
 */

class AITwinEngine {
  constructor() {
    this.currentMode = 'clear'; // default: 'clear'
    this.isOpen = false;
    this.isTyping = false;
    this.customApiKey = localStorage.getItem('ai_twin_api_key') || '';
    this.messages = [];

    this.initDOM();
    this.bindEvents();
    this.loadInitialGreeting();
  }

  initDOM() {
    this.widget = document.getElementById('ai-twin-widget');
    this.triggerBtn = document.getElementById('ai-twin-trigger');
    this.closeBtn = document.getElementById('ai-twin-close');
    this.minimizeBtn = document.getElementById('ai-twin-minimize');
    this.resetBtn = document.getElementById('ai-twin-reset');
    this.chatBody = document.getElementById('ai-twin-messages');
    this.inputForm = document.getElementById('ai-twin-form');
    this.inputField = document.getElementById('ai-twin-input');
    this.promptContainer = document.getElementById('ai-twin-prompts');
    this.modeButtons = document.querySelectorAll('.ai-mode-pill');
    this.typingIndicator = document.getElementById('ai-twin-typing');
    this.unreadBadge = document.getElementById('ai-twin-badge');
  }

  bindEvents() {
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', () => this.toggleChat());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeChat());
    }

    if (this.minimizeBtn) {
      this.minimizeBtn.addEventListener('click', () => this.closeChat());
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetChat());
    }

    if (this.inputForm) {
      this.inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.inputField.value.trim();
        if (text && !this.isTyping) {
          this.handleUserMessage(text);
          this.inputField.value = '';
        }
      });
    }

    // Personality mode pill buttons
    this.modeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = btn.getAttribute('data-mode');
        this.setMode(mode);
      });
    });

    // Handle prompt pill clicks
    if (this.promptContainer) {
      this.promptContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.prompt-pill');
        if (pill && !this.isTyping) {
          const promptText = pill.getAttribute('data-prompt') || pill.innerText.trim();
          this.handleUserMessage(promptText);
        }
      });
    }

    // Keyboard escape to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    if (!this.widget) return;
    this.isOpen = true;
    this.widget.classList.add('active');
    if (this.unreadBadge) this.unreadBadge.style.display = 'none';
    if (this.inputField) this.inputField.focus();

    if (window.AudioEngine) window.AudioEngine.play('open');
    this.scrollToBottom();
  }

  closeChat() {
    if (!this.widget) return;
    this.isOpen = false;
    this.widget.classList.remove('active');
    if (window.AudioEngine) window.AudioEngine.play('close');
  }

  setMode(mode) {
    if (!['crisp', 'clear', 'chatty'].includes(mode)) return;
    this.currentMode = mode;
    this.modeButtons.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-mode') === mode);
    });

    const modeMeta = window.PORTFOLIO_DATA.aiTwin.modes[mode];
    this.addSystemNotice(`Switched to <strong>${modeMeta.label} Mode</strong>: ${modeMeta.subtitle}`);
    if (window.AudioEngine) window.AudioEngine.play('click');
  }

  resetChat() {
    this.chatBody.innerHTML = '';
    this.messages = [];
    this.loadInitialGreeting();
    if (window.AudioEngine) window.AudioEngine.play('reset');
  }

  loadInitialGreeting() {
    const ai = window.PORTFOLIO_DATA.aiTwin;
    this.addBotMessage(ai.greeting, false);
    this.renderSuggestedPrompts();
  }

  renderSuggestedPrompts() {
    if (!this.promptContainer) return;
    const prompts = window.PORTFOLIO_DATA.aiTwin.suggestedPrompts;
    this.promptContainer.innerHTML = '';

    prompts.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'prompt-pill';
      btn.setAttribute('data-prompt', p);
      btn.innerHTML = `<i class="fa-solid fa-sparkles"></i> ${p}`;
      this.promptContainer.appendChild(btn);
    });
  }

  addUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message user-msg';
    msgEl.innerHTML = `
      <div class="msg-content">${this.escapeHtml(text)}</div>
      <div class="msg-avatar"><i class="fa-solid fa-user"></i></div>
    `;
    this.chatBody.appendChild(msgEl);
    this.scrollToBottom();
    if (window.AudioEngine) window.AudioEngine.play('send');
  }

  addBotMessage(markdownText, animate = true) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message bot-msg';
    const avatarImg = '<div class="msg-avatar bot"><i class="fa-solid fa-robot"></i></div>';
    
    const formattedHtml = this.formatMarkdown(markdownText);
    
    if (!animate) {
      msgEl.innerHTML = `
        ${avatarImg}
        <div class="msg-content">${formattedHtml}</div>
      `;
      this.chatBody.appendChild(msgEl);
      this.scrollToBottom();
      return;
    }

    // Typewriter streaming effect
    const contentEl = document.createElement('div');
    contentEl.className = 'msg-content';
    msgEl.innerHTML = avatarImg;
    msgEl.appendChild(contentEl);
    this.chatBody.appendChild(msgEl);

    this.streamText(contentEl, formattedHtml);
  }

  streamText(targetEl, fullHtml) {
    this.isTyping = true;
    if (this.typingIndicator) this.typingIndicator.style.display = 'flex';

    // Simulate natural tokens/words typing
    const words = fullHtml.split(' ');
    let currentWordIdx = 0;
    targetEl.innerHTML = '';

    const interval = setInterval(() => {
      if (currentWordIdx < words.length) {
        targetEl.innerHTML = words.slice(0, currentWordIdx + 1).join(' ');
        currentWordIdx++;
        this.scrollToBottom();
      } else {
        clearInterval(interval);
        this.isTyping = false;
        if (this.typingIndicator) this.typingIndicator.style.display = 'none';
        if (window.AudioEngine) window.AudioEngine.play('receive');
      }
    }, 28);
  }

  addSystemNotice(html) {
    const notice = document.createElement('div');
    notice.className = 'chat-system-notice';
    notice.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${html}`;
    this.chatBody.appendChild(notice);
    this.scrollToBottom();
  }

  handleUserMessage(query) {
    this.addUserMessage(query);

    // Show typing indicator
    if (this.typingIndicator) this.typingIndicator.style.display = 'flex';
    this.isTyping = true;

    // Slight neural thought latency
    setTimeout(() => {
      const response = this.generateResponse(query);
      if (this.typingIndicator) this.typingIndicator.style.display = 'none';
      this.addBotMessage(response, true);
    }, 450);
  }

  normalizeQuery(query) {
    return query
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Scores how strongly a normalized query matches a set of triggers.
  // Uses whole-word/phrase boundaries for short triggers (<=3 chars) to
  // avoid false positives (e.g. "cv" shouldn't match inside "discover").
  scoreTriggers(normalizedQuery, triggers) {
    let score = 0;
    let matches = 0;
    for (const trigger of triggers) {
      const isShort = trigger.length <= 3 && !trigger.includes(' ');
      let hit = false;
      if (isShort) {
        const re = new RegExp('(^|\\s)' + trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\s|$)');
        hit = re.test(normalizedQuery);
      } else {
        hit = normalizedQuery.includes(trigger);
      }
      if (hit) {
        matches++;
        score += trigger.length * 2;
      }
    }
    // Reward entries where multiple distinct triggers matched (stronger topical signal)
    if (matches > 1) score += matches * 6;
    return score;
  }

  generateResponse(query) {
    const normalizedQuery = this.normalizeQuery(query);
    const data = window.PORTFOLIO_DATA.aiTwin;

    // 1. Small talk pass (greetings, thanks, farewells, identity questions)
    if (data.smallTalk) {
      let stBest = null;
      let stScore = 0;
      for (const key in data.smallTalk) {
        const entry = data.smallTalk[key];
        const score = this.scoreTriggers(normalizedQuery, entry.triggers);
        if (score > stScore) {
          stScore = score;
          stBest = entry;
        }
      }
      // Only trust small-talk on short, clearly conversational messages
      if (stBest && stScore > 0 && normalizedQuery.split(' ').length <= 6) {
        return stBest.responses[this.currentMode] || stBest.responses.clear;
      }
    }

    // 2. Knowledge base pass with weighted multi-trigger scoring
    const kb = data.knowledgeBase;
    let bestMatch = null;
    let highestScore = 0;

    for (const entry of kb) {
      const score = this.scoreTriggers(normalizedQuery, entry.triggers);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.responses[this.currentMode] || bestMatch.responses.clear;
    }

    // 3. Dynamic contextual fallback
    return this.generateDynamicFallback(normalizedQuery);
  }

  generateDynamicFallback(normalizedQuery) {
    // Default intelligent guidance — every topic below now has a real KB entry,
    // so this only triggers for genuinely out-of-scope questions.
    if (this.currentMode === 'crisp') {
      return `I don't have an exact match for that. I can help with Vaibhav's **Projects** (QueryTube, Water Quality ML, Agri AI, AWS Observability, GFA Portal, POS Billing), **Skills**, **Experience**, **Certifications**, **Leadership**, or **Contact/Resume**.\n\nTry one of the suggested prompt pills above, or rephrase your question!`;
    } else if (this.currentMode === 'chatty') {
      return `Hmm, that one's a bit outside what I know! 🤔 But I'm loaded up on Vaibhav's **projects** (QueryTube, Water Quality ML, Agri AI, and more), his **skills**, **internship experience**, **certifications**, and how to **reach him directly**.\n\nWant me to walk you through his favorite project, or his AI/ML skill set? 🚀`;
    } else {
      return `I don't have a specific answer prepared for *"${this.escapeHtml(normalizedQuery)}"*, but I can help with:\n\n• **Engineering Projects** (*QueryTube, Urban Water ML, Agri AI, AWS Observability, GFA Portal, POS Billing*)\n• **Technical Skills** (*Python, PyTorch, FAISS, LangChain, AWS Cloud, MERN*)\n• **Education & Experience** (*MCA at DY Patil University, Codtech ML Internship, W Goa Training*)\n• **Certifications, Leadership & Testimonials**\n• **Contact & Resume** (*Direct CV Download, Instant Email/Call*)\n\nFeel free to choose a prompt above or ask a more specific question!`;
    }
  }

  formatMarkdown(text) {
    if (!text) return '';
    let html = text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>')
      // Bullet lists
      .replace(/^\s*•\s*(.*)$/gm, '<li class="chat-li">$1</li>')
      .replace(/^\s*\*\s*(.*)$/gm, '<li class="chat-li">$1</li>')
      // Numbered items
      .replace(/^\s*(\d+)\.\s*(.*)$/gm, '<div class="chat-num-item"><strong>$1.</strong> $2</div>')
      // Headers
      .replace(/###\s*(.*)/g, '<h4 class="chat-h4">$1</h4>')
      // Code spans
      .replace(/`([^`]+)`/g, '<code class="chat-code">$1</code>')
      // Newlines
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    // Wrap li in ul if needed
    if (html.includes('<li class="chat-li">')) {
      html = html.replace(/(<li class="chat-li">.*<\/li>)/gs, '<ul class="chat-ul">$1</ul>');
    }

    return html;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  scrollToBottom() {
    if (this.chatBody) {
      this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
  }
}

window.AITwinEngine = AITwinEngine;
