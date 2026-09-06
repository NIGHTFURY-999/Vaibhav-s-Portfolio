/**
 * Premium Neural Background
 * -----------------------------------------
 * • Deep-space ambient gradient
 * • Subtle neural constellation
 * • Mouse-reactive energy field
 * • Smooth cursor trail
 * • GPU-friendly rendering
 * • Retina / HiDPI support
 * • Automatic performance scaling
 * • Reduced-motion support
 */

class InteractiveBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);

    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', {
      alpha: true,
      desynchronized: true
    });

    if (!this.ctx) return;

    // -----------------------------------------
    // Configuration
    // -----------------------------------------

    this.config = {
      particleDensity: 0.000045,
      maxParticles: 65,

      connectionDistance: 145,
      mouseRadius: 220,

      particleSpeed: 0.22,

      trailLength: 22,
      trailLife: 0.75,

      dprLimit: 2
    };

    // -----------------------------------------
    // State
    // -----------------------------------------

    this.width = 0;
    this.height = 0;
    this.dpr = 1;

    this.time = 0;

    this.mouse = {
      x: -1000,
      y: -1000,
      active: false
    };

    this.targetMouse = {
      x: -1000,
      y: -1000
    };

    this.particles = [];
    this.trail = [];

    this.animationFrame = null;

    this.isVisible = true;

    // -----------------------------------------
    // Ambient neural orbs
    // -----------------------------------------

    this.orbs = [
      {
        x: 0.12,
        y: 0.18,
        size: 0.42,
        color: [34, 211, 238],
        opacity: 0.12,
        speed: 0.00035,
        phase: 0
      },

      {
        x: 0.88,
        y: 0.34,
        size: 0.38,
        color: [99, 102, 241],
        opacity: 0.10,
        speed: 0.00028,
        phase: 2.1
      },

      {
        x: 0.50,
        y: 0.90,
        size: 0.34,
        color: [168, 85, 247],
        opacity: 0.08,
        speed: 0.00032,
        phase: 4.4
      }
    ];

    this.init();
    this.bindEvents();
    this.animate();
  }

  // =========================================
  // INITIALIZATION
  // =========================================

  init() {
    this.resize();

    // Don't run animation when browser tab is hidden
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;

      if (this.isVisible && !this.animationFrame) {
        this.animate();
      }
    });
  }

  // =========================================
  // RESIZE
  // =========================================

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.dpr = Math.min(
      window.devicePixelRatio || 1,
      this.config.dprLimit
    );

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;

    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(
      this.dpr,
      0,
      0,
      this.dpr,
      0,
      0
    );

    this.createParticles();
  }

  // =========================================
  // PARTICLES
  // =========================================

  createParticles() {
    const area = this.width * this.height;

    let count = Math.floor(
      area * this.config.particleDensity
    );

    count = Math.min(
      count,
      this.config.maxParticles
    );

    // Fewer particles on smaller screens
    if (this.width < 768) {
      count = Math.min(count, 32);
    }

    this.particles.length = 0;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;

      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,

        vx:
          Math.cos(angle) *
          (Math.random() * this.config.particleSpeed),

        vy:
          Math.sin(angle) *
          (Math.random() * this.config.particleSpeed),

        radius:
          Math.random() * 1.2 + 0.45,

        alpha:
          Math.random() * 0.30 + 0.10,

        baseAlpha:
          Math.random() * 0.30 + 0.10,

        pulse:
          Math.random() * Math.PI * 2,

        pulseSpeed:
          Math.random() * 0.015 + 0.005
      });
    }
  }

  // =========================================
  // EVENTS
  // =========================================

  bindEvents() {
    window.addEventListener(
      'resize',
      () => {
        clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(() => {
          this.resize();
        }, 150);
      },
      { passive: true }
    );

    window.addEventListener(
      'mousemove',
      (event) => {
        this.targetMouse.x = event.clientX;
        this.targetMouse.y = event.clientY;

        this.mouse.active = true;

        // -----------------------------------
        // Elegant cursor trail
        // -----------------------------------

        if (this.trail.length < this.config.trailLength) {
          this.trail.push({
            x: event.clientX,
            y: event.clientY,

            vx:
              (Math.random() - 0.5) * 0.25,

            vy:
              (Math.random() - 0.5) * 0.25,

            life: 1,

            size:
              Math.random() * 1.8 + 0.5,

            hue:
              Math.random() > 0.5
                ? '34, 211, 238'
                : '129, 140, 248'
          });
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'mouseleave',
      () => {
        this.mouse.active = false;

        this.targetMouse.x = -1000;
        this.targetMouse.y = -1000;
      },
      { passive: true }
    );
  }

  // =========================================
  // MOUSE
  // =========================================

  updateMouse() {
    this.mouse.x +=
      (this.targetMouse.x - this.mouse.x) * 0.075;

    this.mouse.y +=
      (this.targetMouse.y - this.mouse.y) * 0.075;
  }

  // =========================================
  // BACKGROUND
  // =========================================

  drawBackground() {
    const ctx = this.ctx;

    ctx.globalCompositeOperation = 'source-over';

    // Very subtle base layer
    ctx.fillStyle = 'rgba(3, 7, 18, 0.12)';
    ctx.fillRect(
      0,
      0,
      this.width,
      this.height
    );
  }

  // =========================================
  // AURORA
  // =========================================

  drawAurora() {
    const ctx = this.ctx;

    ctx.globalCompositeOperation = 'screen';

    this.orbs.forEach((orb) => {
      const t =
        this.time * orb.speed +
        orb.phase;

      const x =
        (orb.x +
          Math.sin(t) * 0.07) *
        this.width;

      const y =
        (orb.y +
          Math.cos(t * 0.8) * 0.06) *
        this.height;

      const radius =
        orb.size *
        Math.min(this.width, this.height);

      const gradient =
        ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          radius
        );

      const [r, g, b] = orb.color;

      gradient.addColorStop(
        0,
        `rgba(${r},${g},${b},${orb.opacity})`
      );

      gradient.addColorStop(
        0.35,
        `rgba(${r},${g},${b},${orb.opacity * 0.35})`
      );

      gradient.addColorStop(
        1,
        `rgba(${r},${g},${b},0)`
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
  }

  // =========================================
  // MOUSE ENERGY FIELD
  // =========================================

  drawMouseField() {
    if (!this.mouse.active) return;

    const ctx = this.ctx;

    const gradient =
      ctx.createRadialGradient(
        this.mouse.x,
        this.mouse.y,
        0,

        this.mouse.x,
        this.mouse.y,
        230
      );

    gradient.addColorStop(
      0,
      'rgba(34, 211, 238, 0.055)'
    );

    gradient.addColorStop(
      0.35,
      'rgba(34, 211, 238, 0.025)'
    );

    gradient.addColorStop(
      1,
      'rgba(34, 211, 238, 0)'
    );

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(
      this.mouse.x,
      this.mouse.y,
      230,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  // =========================================
  // PARTICLES
  // =========================================

  updateParticles() {
    const w = this.width;
    const h = this.height;

    this.particles.forEach((p) => {
      // Floating movement
      p.x += p.vx;
      p.y += p.vy;

      // Soft pulse
      p.pulse += p.pulseSpeed;

      const pulse =
        Math.sin(p.pulse) * 0.08;

      p.alpha =
        Math.max(
          0.04,
          p.baseAlpha + pulse
        );

      // Wrap around screen
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // -----------------------------------
      // Mouse interaction
      // -----------------------------------

      if (!this.mouse.active) return;

      const dx =
        this.mouse.x - p.x;

      const dy =
        this.mouse.y - p.y;

      const distance =
        Math.sqrt(
          dx * dx + dy * dy
        );

      if (
        distance > 0 &&
        distance < this.config.mouseRadius
      ) {
        const force =
          (this.config.mouseRadius -
            distance) /
          this.config.mouseRadius;

        // Subtle repulsion
        p.x -=
          (dx / distance) *
          force *
          0.75;

        p.y -=
          (dy / distance) *
          force *
          0.75;

        // Illuminate particles near cursor
        p.alpha =
          Math.min(
            0.85,
            p.baseAlpha +
            force * 0.45
          );
      }
    });
  }

  // =========================================
  // PARTICLE CONNECTIONS
  // =========================================

  drawConnections() {
    const ctx = this.ctx;

    const particles =
      this.particles;

    const maxDistance =
      this.config.connectionDistance;

    for (
      let i = 0;
      i < particles.length;
      i++
    ) {
      const a = particles[i];

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {
        const b = particles[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;

        const distanceSquared =
          dx * dx + dy * dy;

        // Avoid expensive sqrt unless needed
        if (
          distanceSquared >
          maxDistance * maxDistance
        ) {
          continue;
        }

        const distance =
          Math.sqrt(distanceSquared);

        const alpha =
          (1 - distance / maxDistance) *
          0.12;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle =
          `rgba(56, 189, 248, ${alpha})`;

        ctx.lineWidth = 0.55;

        ctx.stroke();
      }
    }
  }

  // =========================================
  // PARTICLE RENDER
  // =========================================

  drawParticles() {
    const ctx = this.ctx;

    this.particles.forEach((p) => {
      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(148,163,184,${p.alpha})`;

      ctx.fill();
    });
  }

  // =========================================
  // CURSOR TRAIL
  // =========================================

  drawTrail() {
    const ctx = this.ctx;

    for (
      let i = this.trail.length - 1;
      i >= 0;
      i--
    ) {
      const point =
        this.trail[i];

      point.x += point.vx;
      point.y += point.vy;

      point.life -=
        1 / 45;

      if (point.life <= 0) {
        this.trail.splice(i, 1);
        continue;
      }

      const alpha =
        point.life * 0.35;

      ctx.beginPath();

      ctx.arc(
        point.x,
        point.y,
        point.size *
        point.life,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(${point.hue},${alpha})`;

      ctx.fill();
    }
  }

  // =========================================
  // MAIN LOOP
  // =========================================

  animate() {
    this.animationFrame = null;

    if (!this.isVisible) return;

    this.time++;

    this.updateMouse();

    const ctx = this.ctx;

    // Clear entire canvas
    ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );

    this.drawBackground();

    this.drawAurora();

    this.drawMouseField();

    this.updateParticles();

    this.drawConnections();

    this.drawParticles();

    this.drawTrail();

    this.animationFrame =
      requestAnimationFrame(
        () => this.animate()
      );
  }
}


// =============================================
// MATRIX RAIN
// =============================================

class MatrixRain {
  constructor(canvasId) {
    this.canvas =
      document.getElementById(canvasId);

    if (!this.canvas) return;

    this.ctx =
      this.canvas.getContext('2d');

    this.characters =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF{}[]<>=/+-*~^$#';

    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.intervalId = null;

    this.init();

    window.addEventListener(
      'resize',
      () => this.init(),
      { passive: true }
    );
  }

  init() {
    this.canvas.width =
      window.innerWidth;

    this.canvas.height =
      window.innerHeight;

    this.columns =
      Math.floor(
        this.canvas.width /
        this.fontSize
      );

    this.drops = [];

    for (
      let i = 0;
      i < this.columns;
      i++
    ) {
      this.drops[i] =
        Math.floor(
          Math.random() * -50
        );
    }
  }

  start() {
    if (this.intervalId) return;

    this.intervalId =
      setInterval(
        () => this.draw(),
        40
      );
  }

  stop() {
    if (!this.intervalId) return;

    clearInterval(
      this.intervalId
    );

    this.intervalId = null;
  }

  draw() {
    const ctx = this.ctx;

    ctx.fillStyle =
      'rgba(2, 2, 5, 0.12)';

    ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    ctx.font =
      `${this.fontSize}px 'JetBrains Mono', monospace`;

    for (
      let i = 0;
      i < this.drops.length;
      i++
    ) {
      const char =
        this.characters.charAt(
          Math.floor(
            Math.random() *
            this.characters.length
          )
        );

      const x =
        i * this.fontSize;

      const y =
        this.drops[i] *
        this.fontSize;

      ctx.fillStyle =
        Math.random() > 0.88
          ? '#ffffff'
          : Math.random() > 0.5
            ? '#00f0ff'
            : '#38bdf8';

      ctx.fillText(
        char,
        x,
        y
      );

      if (
        y > this.canvas.height &&
        Math.random() > 0.975
      ) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }
}


// =============================================
// GLOBAL EXPORTS
// =============================================

window.ParticleNetwork =
  InteractiveBackground;

window.MatrixRain =
  MatrixRain;