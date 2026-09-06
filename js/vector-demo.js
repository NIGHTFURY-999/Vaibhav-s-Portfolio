/**
 * Interactive Vector Embedding Playground Widget
 * Allows visitors to experiment with real-time semantic similarity scoring
 * and vector spatial distance calculations (Simulating Vaibhav's FAISS & LLM projects).
 */

class VectorSearchSimulator {
  constructor() {
    this.knowledgeBase = [
      { text: "FAISS Vector Search Engine", vector: [0.92, 0.88, 0.15, 0.95], cat: "AI/ML" },
      { text: "PyTorch Deep Learning Neural Networks", vector: [0.95, 0.90, 0.10, 0.85], cat: "AI/ML" },
      { text: "AWS CloudWatch & Lambda Observability", vector: [0.20, 0.15, 0.98, 0.90], cat: "Cloud" },
      { text: "Kalman Filter Spatio-Temporal Sensor ML", vector: [0.85, 0.75, 0.30, 0.80], cat: "Research" },
      { text: "QueryTube YouTube Semantic Summarizer", vector: [0.90, 0.82, 0.40, 0.92], cat: "Full-Stack" },
      { text: "PostgreSQL & MongoDB Schema Normalization", vector: [0.30, 0.25, 0.85, 0.75], cat: "Database" },
      { text: "XGBoost Telemetry & Anomaly Detection", vector: [0.88, 0.70, 0.45, 0.78], cat: "Data Science" }
    ];

    this.init();
  }

  init() {
    const container = document.getElementById('ml-playground-widget');
    if (!container) return;

    this.renderWidget(container);
    this.bindEvents();
    this.runQuery("vector embeddings search");
  }

  renderWidget(container) {
    container.innerHTML = `
      <div class="glass-card p-4 rounded-24">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <div class="section-tag mb-1"><i class="fa-solid fa-flask"></i> Interactive ML Playground</div>
            <h3 class="h4 font-bold text-white mb-0">Semantic Vector Distance Simulator</h3>
          </div>
          <span class="badge bg-primary-subtle text-primary font-mono text-xs px-3 py-1 rounded-pill">FAISS L2 / Cosine Similarity Mode</span>
        </div>
        <p class="text-secondary text-sm mb-3">
          Type any technical concept below to compute real-time high-dimensional vector similarity scores across Vaibhav's project embedding space.
        </p>

        <div class="d-flex gap-2 mb-4">
          <div class="position-relative flex-grow-1">
            <input type="text" id="vector-query-input" class="form-input text-sm ps-4" value="vector embeddings search" placeholder="Try: 'deep learning', 'AWS cloud', 'anomaly detection'...">
          </div>
          <button id="vector-search-btn" class="btn-neon text-sm px-4">
            <i class="fa-solid fa-magnifying-glass font-xs"></i> Compute Distance
          </button>
        </div>

        <div class="row g-3" id="vector-results-list">
          <!-- Rendered dynamically -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    const input = document.getElementById('vector-query-input');
    const btn = document.getElementById('vector-search-btn');

    if (btn && input) {
      btn.addEventListener('click', () => this.runQuery(input.value));
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') this.runQuery(input.value);
      });
    }
  }

  // Simple string pseudo-embedding generator
  generatePseudoEmbedding(text) {
    const str = text.toLowerCase();
    let v1 = 0.1, v2 = 0.1, v3 = 0.1, v4 = 0.1;

    if (str.includes('ai') || str.includes('ml') || str.includes('deep') || str.includes('vector') || str.includes('neural') || str.includes('pytorch')) {
      v1 += 0.8; v2 += 0.75;
    }
    if (str.includes('cloud') || str.includes('aws') || str.includes('lambda') || str.includes('serverless')) {
      v3 += 0.85; v4 += 0.8;
    }
    if (str.includes('data') || str.includes('sql') || str.includes('database') || str.includes('summary')) {
      v2 += 0.4; v4 += 0.6;
    }
    if (str.includes('sensor') || str.includes('research') || str.includes('filter') || str.includes('model')) {
      v1 += 0.5; v3 += 0.4;
    }

    const norm = Math.sqrt(v1*v1 + v2*v2 + v3*v3 + v4*v4) || 1;
    return [v1/norm, v2/norm, v3/norm, v4/norm];
  }

  cosineSimilarity(a, b) {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  runQuery(queryText) {
    const resultsContainer = document.getElementById('vector-results-list');
    if (!resultsContainer) return;

    const queryVec = this.generatePseudoEmbedding(queryText);

    const scored = this.knowledgeBase.map(item => {
      const sim = this.cosineSimilarity(queryVec, item.vector);
      // add small random variation for naturalness
      const finalScore = Math.min(0.99, Math.max(0.42, sim + (Math.random() * 0.04 - 0.02)));
      return { ...item, score: finalScore };
    }).sort((a, b) => b.score - a.score);

    resultsContainer.innerHTML = scored.slice(0, 4).map(item => {
      const pct = Math.round(item.score * 100);
      const color = pct > 85 ? '#30d158' : (pct > 70 ? '#5ac8fa' : '#bf5af2');
      return `
        <div class="col-md-6">
          <div class="p-3 rounded-16 border border-subtle bg-dark-subtle h-100">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge text-xs font-mono" style="background: rgba(255,255,255,0.06); color: var(--text-secondary);">${item.cat}</span>
              <span class="font-mono text-xs font-bold" style="color: ${color};">${pct}% Similarity</span>
            </div>
            <div class="font-bold text-sm text-white mb-2">${item.text}</div>
            <div class="progress-track" style="height: 4px;">
              <div class="progress-fill" style="width: ${pct}%; background: ${color} !important;"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VectorSearchSimulator();
});
