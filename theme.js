/*
 * Shared Game Utilities
 * Import in every game: <script src="theme.js"></script>
 *
 * Provides:
 *   SiteAds     — ad loading (Adsterra / AdSense), auto-inits on DOM ready
 *   GameTheme   — dark/light toggle, persisted
 *   GameTimer   — start/stop/reset timer with display
 *   GameStats   — per-game stats: played, won, streak, best times
 *   GameSettings — toggle-chip helper for help settings
 *   Confetti    — launch celebration confetti
 */

// ===========================
// ADS — switch provider here
// ===========================
const SiteAds = {
  // ▸▸▸ Change this to 'adsense' when approved ◂◂◂
  provider: 'adsterra',

  adsterra: {
    bannerKey: '8e7325ec05bc3ccf27c1d08c45a4148e',
    bottomBannerKey: '96aafd41d5af7537b63e81fef46b71a2'
  },

  adsense: {
    client: 'ca-pub-7700405385978151',
    topSlot: '1492611532',
    bottomSlot: '1081547998'
  },

  init() {
    const slots = [...document.querySelectorAll('.ad-slot')];
    // Adsterra uses a global `atOptions` — stagger slots so each invoke.js
    // reads its own config before the next slot overwrites it
    slots.forEach((slot, i) => {
      const isBottom = slot.classList.contains('ad-bottom');
      const delay = i * 2000;
      setTimeout(() => {
        if (this.provider === 'adsterra') this._adsterra(slot, isBottom);
        else this._adsense(slot, isBottom);
      }, delay);
    });
  },

  _addScript(parent, opts) {
    const s = document.createElement('script');
    if (opts.src) s.src = opts.src;
    if (opts.text) s.textContent = opts.text;
    if (opts.async) s.async = true;
    if (opts.cfasync) s.setAttribute('data-cfasync', 'false');
    parent.appendChild(s);
    return s;
  },

  // Check if ad content rendered and hide the "Advertisement" label
  _watchForFill(slot) {
    const check = () => {
      const iframe = slot.querySelector('iframe');
      const native = slot.querySelector('[id^="container-"]');
      const filled = (iframe && iframe.offsetHeight > 10) ||
                     (native && native.offsetHeight > 10 && native.style.display !== 'none');
      if (filled) slot.classList.add('ad-filled');
    };
    // Check at 1s, 3s, 5s to catch both fast and slow fills
    setTimeout(check, 1000);
    setTimeout(check, 3000);
    setTimeout(check, 5000);
  },

  _adsterra(slot, isBottom) {
    const c = this.adsterra;
    const bannerKey = isBottom ? c.bottomBannerKey : c.bannerKey;
    const w = isBottom ? 468 : 728;
    const h = isBottom ? 60 : 90;

    this._addScript(slot, { text: `atOptions = { 'key': '${bannerKey}', 'format': 'iframe', 'height': ${h}, 'width': ${w}, 'params': {} };` });
    this._addScript(slot, { src: `https://www.highperformanceformat.com/${bannerKey}/invoke.js` });
    this._watchForFill(slot);
  },

  _adsense(slot, isBottom) {
    const c = this.adsense;
    // Load AdSense library once
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${c.client}`;
      s.crossOrigin = 'anonymous';
      document.head.appendChild(s);
    }
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = c.client;
    ins.dataset.adSlot = isBottom ? c.bottomSlot : c.topSlot;
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    slot.appendChild(ins);

    const push = () => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {} };
    if (window.adsbygoogle) push();
    else document.querySelector('script[src*="adsbygoogle"]').addEventListener('load', push);
    this._watchForFill(slot);
  }
};

// Auto-init ads on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SiteAds.init());
} else {
  SiteAds.init();
}

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
