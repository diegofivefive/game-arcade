# TheFreeFix.com — Project Reference

## What It Is
TheFreeFix.com is a free online games and tools website. No accounts, no downloads, no paywalls — everything runs in the browser. The site is static HTML/CSS/JS hosted on GitHub Pages with a custom domain via Cloudflare.

## Live URLs
- **Production**: https://thefreefix.com
- **GitHub Pages**: https://diegofivefive.github.io/game-arcade (redirects to custom domain)
- **Repo**: https://github.com/diegofivefive/game-arcade

## Hosting & Infrastructure
- **Hosting**: GitHub Pages (static site, deploys from `main` branch)
- **Domain**: thefreefix.com — DNS managed by Cloudflare, CNAME file in repo root
- **SSL**: Handled by Cloudflare (proxied)
- **Deployment**: Push/merge to `main` → GitHub Pages auto-builds (~40s)

## Goals
1. Build a library of free browser-based games and tools
2. Monetize with Google AdSense ads (standard IAB sizes, moderate density — 2 ad slots per page)
3. Rank in search engines for "free online [game name]" and "free online [tool name]" queries
4. Clean, modern dark-mode-first UI that works well on mobile and desktop

## Site Structure

```
thefreefix.com/                  ← Hub page (2 cards: Games, Tools)
├── games.html                   ← Games listing (cards for each game)
│   ├── sudoku.html              ← Sudoku game (4 difficulty levels)
│   └── minesweeper.html         ← Minesweeper game (3 difficulty levels)
├── tools.html                   ← Tools listing (placeholder — coming soon)
├── theme.css                    ← Shared stylesheet (all CSS variables, components)
├── theme.js                     ← Shared JS utilities (theme toggle, timer, stats, confetti, modals)
├── privacy.html                 ← Privacy policy page
├── robots.txt                   ← Search engine crawling directives
├── sitemap.xml                  ← XML sitemap for all pages
├── ads.txt                      ← Google AdSense authorization
└── CNAME                        ← GitHub Pages custom domain config
```

## Navigation Flow
- **Homepage** → Games card → games.html → individual game page
- **Homepage** → Tools card → tools.html → individual tool page (future)
- Every page has a small "TheFreeFix.com" brand link at top → links to homepage
- Game/tool pages have a back arrow → links to their listing page (games.html or tools.html)

## Tech Stack
- Pure HTML/CSS/JS — no frameworks, no build step, no dependencies
- CSS custom properties for dark/light theme (dark mode default)
- All game logic is vanilla JS in each game's HTML file
- Shared utilities in theme.js: `GameTheme`, `GameTimer`, `GameStatsManager`, `GameSettings`, `Confetti`, `Modal`

## Design System (theme.css)
- **Dark mode** (default): Deep purple/navy palette (#0a0a1a bg, #7b6fff accent, #ff5e94 accent2, #00e6b8 accent3)
- **Light mode**: Clean white/gray with same accent colors adjusted
- **Font**: System font stack (Segoe UI, system-ui, -apple-system, sans-serif)
- **Components**: `.icon-btn`, `.pill-selector`/`.pill-btn`, `.stat-chip`, `.tool-btn`, `.toggle-chip`, `.modal-overlay`/`.modal`, `.card`, `.site-brand`, `.game-header`
- **Responsive breakpoints**: 400px (small mobile), 480px (mobile), 768px (tablet), 800px (landscape games)

## SEO (implemented)
- Meta descriptions, Open Graph, Twitter Cards on all pages
- Canonical URLs pointing to thefreefix.com
- Schema.org JSON-LD: `WebSite` (homepage), `CollectionPage` + `ItemList` (listings), `VideoGame` (games)
- robots.txt + sitemap.xml
- Semantic titles: "[Page] - TheFreeFix.com"

## Ads (implemented — placeholder containers)
- 2 ad slots per page (moderate density)
- Standard IAB sizes: 728×90 desktop, 320×50 mobile (responsive)
- CSS classes: `.ad-slot`, `.ad-banner`, `.ad-sidebar`, `.ad-sticky`, `.ad-slot--placeholder`
- Placeholders show dashed borders with size labels
- Ad network: Google AdSense (script integrated on all pages, ads.txt in repo root)

## Current Games
1. **Sudoku** — Full-featured: 4 difficulty levels (easy/medium/hard/expert), notes mode, hints (3 per game), undo, error checking, stats tracking, best times per difficulty, keyboard support, landscape layout on wide screens
2. **Minesweeper** — 3 difficulty levels (beginner 9×9, intermediate 16×16, expert 16×30), flagging, chord clicking, timer, stats tracking, best times per difficulty

## Planned Games (listed as "coming soon" on games.html)
- 2048, Wordle, Snake, Memory, Tetris, Nonogram

## Tools Section
- Currently empty placeholder ("Tools are coming soon")
- No specific tools planned yet

## Key Implementation Details
- **Minesweeper board overflow**: Expert mode (16×30) exceeds mobile viewport. Uses `overflow-x: auto` on `.board-wrap` with `width: 100%` to enable horizontal scrolling without clipping.
- **Sudoku landscape**: At 800px+ width and 500px+ height, switches to side-by-side layout (board left, controls right)
- **Timer management**: Old timer interval must be stopped before creating new `GameTimer` to prevent multiple intervals fighting
- **Stats persistence**: All game stats stored in localStorage per game and difficulty level
- **Theme persistence**: Dark/light preference stored in localStorage, applied on page load

## Git Workflow
- Work happens on feature branches (e.g., `claude/compassionate-jang`)
- PRs are created and merged to `main` for deployment
- GitHub Pages auto-deploys from `main` branch
