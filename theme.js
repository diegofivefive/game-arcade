/*
 * Shared Game Utilities
 * Import in every game: <script src="theme.js"></script>
 *
 * Provides:
 *   GameTheme   — dark/light toggle, persisted
 *   GameTimer   — start/stop/reset timer with display
 *   GameStats   — per-game stats: played, won, streak, best times
 *   GameSettings — toggle-chip helper for help settings
 *   Confetti    — launch celebration confetti
 */

// ===========================
// THEME (dark/light)
// ===========================
const GameTheme = {
  init(buttonId = 'themeBtn') {
    const btn = document.getElementById(buttonId);
    const saved = localStorage.getItem('games_theme') || 'dark';
    this.apply(saved);
    if (btn) btn.addEventListener('click', () => this.toggle());
  },
  apply(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    const btn = document.getElementById('themeBtn');
    if (btn) btn.innerHTML = theme === 'light' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    localStorage.setItem('games_theme', theme);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.apply(current === 'light' ? 'dark' : 'light');
  },
  get current() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
};

// ===========================
// TIMER
// ===========================
class GameTimer {
  constructor(displayId = 'timer') {
    this.displayEl = document.getElementById(displayId);
    this.seconds = 0;
    this.interval = null;
    this.running = false;
  }
  start() {
    this.stop();
    this.seconds = 0;
    this.update();
    this.running = true;
    this.interval = setInterval(() => { this.seconds++; this.update(); }, 1000);
  }
  stop() {
    clearInterval(this.interval);
    this.running = false;
  }
  reset() {
    this.stop();
    this.seconds = 0;
    this.update();
  }
  update() {
    if (this.displayEl) this.displayEl.textContent = this.format(this.seconds);
  }
  format(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
  get time() { return this.seconds; }
  get formatted() { return this.format(this.seconds); }
}

// ===========================
// STATS (per-game persistence)
// ===========================
class GameStatsManager {
  constructor(gameId) {
    this.key = `stats_${gameId}`;
    this.bestKey = `best_${gameId}`;
    this.data = this.load();
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || { played: 0, won: 0, streak: 0 };
    } catch { return { played: 0, won: 0, streak: 0 }; }
  }
  save() { localStorage.setItem(this.key, JSON.stringify(this.data)); }
  addPlay() { this.data.played++; this.save(); }
  addWin() { this.data.won++; this.data.streak++; this.save(); }
  resetStreak() { this.data.streak = 0; this.save(); }

  get played() { return this.data.played; }
  get won() { return this.data.won; }
  get streak() { return this.data.streak; }
  get winRate() {
    return this.data.played > 0 ? Math.round((this.data.won / this.data.played) * 100) : 0;
  }

  // Best times per difficulty/level
  getBestTime(level) {
    const bests = JSON.parse(localStorage.getItem(this.bestKey) || '{}');
    return bests[level] ?? null;
  }
  setBestTime(level, time) {
    const bests = JSON.parse(localStorage.getItem(this.bestKey) || '{}');
    const current = bests[level];
    if (current === undefined || current === null || time < current) {
      bests[level] = time;
      localStorage.setItem(this.bestKey, JSON.stringify(bests));
      return true; // new best
    }
    return false;
  }
}

// ===========================
// SETTINGS (help toggles)
// ===========================
class GameSettings {
  constructor(gameId, defaults = {}) {
    this.key = `settings_${gameId}`;
    this.defaults = defaults;
    this.data = this.load();
  }
  load() {
    try {
      return { ...this.defaults, ...JSON.parse(localStorage.getItem(this.key)) };
    } catch { return { ...this.defaults }; }
  }
  save() { localStorage.setItem(this.key, JSON.stringify(this.data)); }
  get(key) { return this.data[key]; }
  set(key, val) { this.data[key] = val; this.save(); }
  toggle(key) { this.data[key] = !this.data[key]; this.save(); return this.data[key]; }

  // Bind toggle chips: <div class="toggle-chip on" data-setting="key">
  bindChips(onChange) {
    document.querySelectorAll('.toggle-chip[data-setting]').forEach(chip => {
      const key = chip.dataset.setting;
      chip.classList.toggle('on', this.data[key]);
      chip.addEventListener('click', () => {
        const val = this.toggle(key);
        chip.classList.toggle('on', val);
        if (onChange) onChange(key, val);
      });
    });
  }
}

// ===========================
// CONFETTI
// ===========================
const Confetti = {
  launch(count = 80) {
    const colors = ['#7b6fff','#ff5e94','#00e6b8','#ffb347','#ff6b6b','#4ecdc4','#a78bfa'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.top = '-10px';
      piece.style.width = (Math.random() * 8 + 4) + 'px';
      piece.style.height = (Math.random() * 8 + 4) + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }
};

// ===========================
// MODAL HELPERS
// ===========================
const Modal = {
  show(id) { document.getElementById(id)?.classList.add('visible'); },
  hide(id) { document.getElementById(id)?.classList.remove('visible'); },
  // Auto-close on overlay click
  bindOverlayClose() {
    document.querySelectorAll('.modal-overlay').forEach(m => {
      m.addEventListener('click', e => {
        if (e.target === m) m.classList.remove('visible');
      });
    });
  }
};
