# Claude Code Instructions

## Session Start
At the start of every new session, ask: **"What are we working on today?"**
Don't assume it's TheFreeFix.com — the user may be working on a side project.

## TheFreeFix.com — Quick Context
This repo is **TheFreeFix.com** — a free browser-based games & tools site. Static HTML/CSS/JS on GitHub Pages with Cloudflare DNS. See `PROJECT.md` for full details.

## Rules
- **No frameworks, no build tools, no dependencies** — pure HTML/CSS/JS only
- **Don't break existing pages** — read a file before editing it
- **Dark mode first** — all new UI must work in dark mode (default) and light mode
- **Mobile first** — test at 375px+ width, use existing responsive breakpoints
- **2 ad slots per page max** — follow existing `.ad-slot` pattern in theme.css
- **Shared styles go in theme.css**, shared JS utilities in theme.js
- **Game/tool logic stays self-contained** in each page's HTML file
- **SEO on every page** — meta description, canonical URL, Open Graph, Twitter Card, Schema.org JSON-LD
- **Update sitemap.xml** when adding new pages

## Git Workflow
- Always branch from latest `main` (pull first)
- Create PRs to merge into `main` — never push directly to main
- Never force push
- GitHub Pages auto-deploys from `main` (~40s)

## File Structure
```
index.html               ← Hub page (Games + Tools cards)
games.html               ← Games listing
tools.html               ← Tools listing
sudoku.html              ← Sudoku game
minesweeper.html         ← Minesweeper game
2048.html                ← 2048 game
qr-code-generator.html   ← QR Code Generator tool
_template-game.html      ← Scaffold for new games (copy this)
_template-tool.html      ← Scaffold for new tools (copy this)
theme.css                ← Shared stylesheet (CSS variables, components)
theme.js                 ← Shared JS (GameTheme, GameTimer, GameStatsManager, GameSettings, Confetti, Modal)
privacy.html             ← Privacy policy
about.html               ← About page
contact.html             ← Contact page
terms.html               ← Terms of Service
robots.txt               ← Crawling directives
sitemap.xml              ← XML sitemap
ads.txt                  ← AdSense authorization
CNAME                    ← Custom domain (thefreefix.com)
PROJECT.md               ← Full project reference doc
```

## Adding a New Game (use `_template-game.html`)
1. **Copy** `_template-game.html` → `gamename.html`
2. **Find-replace** the TODO placeholders: `GAME_TITLE`, `GAME_SLUG`, `GAME_DESC`, `GAME_GENRES`
3. **Add game CSS** inside the `<style>` block
4. **Add game HTML** between the ad slots
5. **Add game JS** in the `<script>` block at the bottom
6. **Add card** to `games.html` listing grid (and update its Schema.org ItemList)
7. **Add URL** to `sitemap.xml` (changefreq: monthly, priority: 0.8)
8. **Update `PROJECT.md`** with game details
9. **Do NOT re-read** sudoku.html, minesweeper.html, or theme.css for boilerplate — the template has it all

## Adding a New Tool (use `_template-tool.html`)
1. **Copy** `_template-tool.html` → `toolname.html`
2. **Find-replace** the TODO placeholders: `TOOL_TITLE`, `TOOL_SLUG`, `TOOL_DESC`, `TOOL_SHORT_TITLE`
3. **Add tool CSS** inside the `<style>` block
4. **Add tool HTML** inside `.tool-content`
5. **Add tool JS** in the `<script>` block at the bottom
6. **Add card** to `tools.html` listing grid (and update its Schema.org ItemList)
7. **Add URL** to `sitemap.xml` (changefreq: monthly, priority: 0.8)
8. **Update `PROJECT.md`** with tool details
9. **Do NOT re-read** other tool pages or theme.css for boilerplate — the template has it all

## Listing Card HTML (for games.html / tools.html)
```html
<a href="SLUG.html" class="listing-card">
  <div class="card-icon">EMOJI_CODE</div>
  <div class="card-name">NAME</div>
  <div class="card-desc">Short description</div>
</a>
```

## Sitemap Entry
```xml
<url>
  <loc>https://thefreefix.com/SLUG.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## theme.js Utilities (available on all pages)
- `GameTheme.init(buttonId='themeBtn')` — wire theme toggle, apply saved theme
- `GameTheme.toggle()` / `GameTheme.current` — switch or read theme
- `new GameTimer(displayId='timer')` — `.start()`, `.stop()`, `.reset()`, `.time`, `.formatted`
- `new GameStatsManager(gameId)` — `.addPlay()`, `.addWin()`, `.resetStreak()`, `.played`, `.won`, `.streak`, `.winRate`, `.getBestTime(level)`, `.setBestTime(level, time)`
- `new GameSettings(gameId, defaults)` — `.get(key)`, `.set(key, val)`, `.toggle(key)`, `.bindChips(onChange)`
- `Confetti.launch(count=80)` — celebration animation
- `Modal.show(id)` / `Modal.hide(id)` / `Modal.bindOverlayClose()` — modal management

## Key CSS Variables (from theme.css — dark mode default)
```
--bg: #0a0a1a          --card: #161633        --accent: #7b6fff
--bg2: #111128         --card-border: #2c2c58 --accent2: #ff5e94
--text: #f0f0ff        --btn-bg: #222250      --accent3: #00e6b8
--text-dim: #7e7ea8    --btn-hover: #333370   --shadow: 0 8px 32px rgba(0,0,0,0.5)
--radius-sm: 8px  --radius-md: 12px  --radius-lg: 16px  --radius-xl: 20px  --transition: 0.2s ease
```

## Key CSS Component Classes
`.icon-btn`, `.pill-selector` + `.pill-btn`, `.stat-chip`, `.tool-btn`, `.toggle-chip`, `.modal-overlay` + `.modal`, `.modal-btn.primary` / `.secondary`, `.site-brand`, `.game-header`, `.site-footer`, `.ad-slot` + `.ad-banner`

## Responsive Breakpoints
- `@media (max-width: 400px)` — small phones
- `@media (max-width: 768px)` — mobile/tablet (ad banners shrink to 320x50)
- `@media (min-width: 800px) and (min-height: 500px)` — landscape game layouts

## Key URLs
- Production: https://thefreefix.com
- Repo: https://github.com/diegofivefive/game-arcade
- Twitter/X: https://x.com/TheFreeFix
