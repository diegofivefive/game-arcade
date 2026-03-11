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
│   │   └── sudoku-info.html     ← Sudoku info/how-to-play page
│   ├── minesweeper.html         ← Minesweeper game (3 difficulty levels)
│   │   └── minesweeper-info.html ← Minesweeper info/how-to-play page
│   ├── 2048.html                ← 2048 game (slide and merge tiles)
│   │   └── 2048-info.html       ← 2048 info/how-to-play page
│   └── word-leap.html           ← Word Leap game (5-letter word puzzle)
│       └── word-leap-info.html  ← Word Leap info/how-to-play page
├── tools.html                   ← Tools listing (QR Code Generator, Word Counter, PDF Merge & Split)
│   ├── qr-code-generator.html   ← QR Code Generator tool
│   │   └── qr-code-generator-info.html ← QR Generator info/how-to-use page
│   ├── word-counter.html        ← Word Counter tool
│   │   └── word-counter-info.html ← Word Counter info/how-to-use page
│   └── pdf-merge-split.html     ← PDF Merge & Split tool
│       └── pdf-merge-split-info.html ← PDF Merge & Split info/how-to-use page
├── theme.css                    ← Shared stylesheet (all CSS variables, components)
├── theme.js                     ← Shared JS utilities (theme toggle, timer, stats, confetti, modals)
├── privacy.html                 ← Privacy policy page
├── about.html                   ← About page
├── contact.html                 ← Contact page
├── terms.html                   ← Terms of Service page
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
- **Components**: `.icon-btn`, `.pill-selector`/`.pill-btn`, `.stat-chip`, `.tool-btn`, `.toggle-chip`, `.modal-overlay`/`.modal`, `.card`, `.site-brand`, `.game-header`, `.site-footer`
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
3. **2048** — Slide and merge tiles to reach 2048. Arrow keys + swipe controls, score tracking, best score persistence, timer, stats tracking, keep playing after win
4. **Word Leap** — Guess the 5-letter word in 6 tries. Animated tile reveals, on-screen keyboard with color-coded letter states, stats tracking with guess distribution, physical keyboard support. ~700 answer words, ~2500 valid guesses.

## Planned Games (listed as "coming soon" on games.html)
- Snake, Memory, Nonogram

## Current Tools
1. **QR Code Generator** — Generate QR codes for any URL or text. Features: auto-generation on input with debounce, customizable foreground/background colors, three size options (S/M/L), download as PNG. Self-contained QR encoder in vanilla JS (byte mode, EC level M, versions 1-40, Reed-Solomon error correction).
2. **Word Counter** — Count words, characters (with/without spaces), sentences, paragraphs, and estimate reading time. Live updates on input, reading speed based on 238 WPM average. Responsive 3-column stat grid (2 columns on small phones).
3. **PDF Merge & Split** — Merge multiple PDFs into one or split a PDF into separate files. Features: drag-and-drop file upload, drag-to-reorder for merge, extract specific pages by range, split all pages into a ZIP archive. Uses pdf-lib (CDN) for PDF manipulation and JSZip (CDN) for ZIP creation. All processing in-browser, no server uploads.

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
