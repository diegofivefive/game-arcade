# Claude Code Instructions

## Dev Environment
- **Dev USB**: `F:\freefixDEV` — all building, fixing, and updating happens here
- **Repo**: https://github.com/diegofivefive/game-arcade
- **Production**: https://thefreefix.com
- **Twitter/X**: https://x.com/TheFreeFix
- Push directly to `main` → GitHub Pages auto-deploys (~40s). Never force push.

## Quick Context
**TheFreeFix.com** — free browser-based games & tools site. Static HTML/CSS/JS on GitHub Pages + Cloudflare DNS. **Read `PROJECT.md` for full project details** (all games/tools, descriptions, site structure, infrastructure).

## Rules
- **No frameworks, no build tools** — pure HTML/CSS/JS only (CDN libs OK for specific tools)
- **Read before editing** — don't break existing pages
- **Dark mode first** — all new UI must work in dark mode (default) and light mode
- **Mobile first** — design for 375px+, use existing responsive breakpoints
- **2 ad slots per page max** — top `.ad-content` + bottom `.ad-bottom`
- **Shared styles in theme.css**, shared JS utilities in theme.js
- **All game/tool logic stays inline** in each page's HTML file (self-contained)
- **SEO on every page** — title, meta description, canonical, Open Graph, Twitter Card, Schema.org JSON-LD
- **Update sitemap.xml** when adding new pages
- **Update PROJECT.md** when adding games/tools or changing structure

## Adding a New Game (use `_template-game.html`)
1. Copy `_template-game.html` → `gamename.html`
2. Find-replace placeholders: `GAME_TITLE`, `GAME_SLUG`, `GAME_DESC`, `GAME_GENRES`
3. Add game CSS in `<style>`, game HTML between ad slots, game JS in bottom `<script>`
4. Add card to `games.html` listing grid (update Schema.org ItemList)
5. Create `gamename-info.html` from `_template-info.html` (replace `INFO_TITLE`, `INFO_SLUG`, `INFO_DESC`, `INFO_PARENT_SLUG`, `INFO_PARENT_NAME`)
6. Add both URLs to `sitemap.xml` (game: priority 0.8, info: priority 0.6)
7. Update `PROJECT.md` with game details
8. Do NOT re-read existing game pages for boilerplate — the template has it all

## Adding a New Tool (use `_template-tool.html`)
1. Copy `_template-tool.html` → `toolname.html`
2. Find-replace placeholders: `TOOL_TITLE`, `TOOL_SLUG`, `TOOL_DESC`, `TOOL_SHORT_TITLE`
3. Add tool CSS in `<style>`, tool HTML inside `.tool-content`, tool JS in bottom `<script>`
4. Add card to `tools.html` listing grid (update Schema.org ItemList)
5. Create `toolname-info.html` from `_template-info.html`
6. Add both URLs to `sitemap.xml` (tool: priority 0.8, info: priority 0.6)
7. Update `PROJECT.md` with tool details
8. Do NOT re-read existing tool pages for boilerplate — the template has it all

## Listing Card HTML (games.html / tools.html)
```html
<a href="SLUG.html" class="listing-card">
  <div class="card-icon">EMOJI_OR_SVG</div>
  <div class="card-name">NAME</div>
  <div class="card-desc">Short description</div>
</a>
```

## Sitemap Entries (add both game/tool + info page)
```xml
<url>
  <loc>https://thefreefix.com/SLUG.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://thefreefix.com/SLUG-info.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

## theme.js API
- `GameTheme.init(buttonId='themeBtn')` — wire theme toggle, apply saved theme
- `GameTheme.toggle()` / `GameTheme.current` — switch or read theme
- `new GameTimer(displayId='timer')` — `.start()`, `.stop()`, `.reset()`, `.time`, `.formatted`
- `new GameStatsManager(gameId)` — `.addPlay()`, `.addWin()`, `.resetStreak()`, `.played`, `.won`, `.streak`, `.winRate`, `.getBestTime(level)`, `.setBestTime(level, time)`
- `new GameSettings(gameId, defaults)` — `.get(key)`, `.set(key, val)`, `.toggle(key)`, `.bindChips(onChange)`
- `Confetti.launch(count=80)` — celebration particles
- `Modal.show(id)` / `Modal.hide(id)` / `Modal.bindOverlayClose()` — dialog management

## CSS Quick Reference (theme.css — dark mode defaults)
```
--bg: #0a0a1a     --card: #161633       --accent: #7b6fff
--bg2: #111128    --card-border: #2c2c58 --accent2: #ff5e94
--text: #f0f0ff   --btn-bg: #222250     --accent3: #00e6b8
--text-dim: #7e7ea8  --btn-hover: #333370  --accent-glow: rgba(123,111,255,0.35)
--radius-sm/md/lg/xl: 8/12/16/20px   --transition: 0.2s ease
```

**Components**: `.icon-btn`, `.pill-selector`+`.pill-btn`, `.stat-chip`, `.toggle-chip`, `.modal-overlay`+`.modal`, `.site-brand`, `.game-header`, `.site-footer`, `.ad-slot`

**Breakpoints**: 400px (small phones), 768px (mobile/tablet), 800px+500px (landscape)

## Schema.org Types
- Homepage: `WebSite` with `sameAs` (social links)
- Listing pages: `CollectionPage` + `ItemList`
- Games: `VideoGame` with genre array
- Tools: `WebApplication`
- Info pages: `Article`
- Templates landing pages: `Article`

## AdSense
- Account: `ca-pub-7700405385978151`
- ads.txt in repo root
- 2 placeholder slots per page: `.ad-slot.ad-content` (top) + `.ad-slot.ad-bottom` (bottom)
