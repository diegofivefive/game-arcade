# TheFreeFix.com — Project Reference

## What It Is
TheFreeFix.com is a free online games and tools website. No accounts, no downloads, no paywalls — everything runs in the browser. Static HTML/CSS/JS hosted on GitHub Pages with a custom domain via Cloudflare.

## URLs
- **Production**: https://thefreefix.com
- **GitHub Pages**: https://diegofivefive.github.io/game-arcade (redirects to custom domain)
- **Repo**: https://github.com/diegofivefive/game-arcade
- **Twitter/X**: https://x.com/TheFreeFix

## Hosting & Infrastructure
- **Hosting**: GitHub Pages (static site, deploys from `main` branch, ~40s)
- **Domain**: thefreefix.com — DNS managed by Cloudflare (proxied), CNAME file in repo root
- **SSL**: Handled by Cloudflare
- **Dev USB**: `F:\freefixDEV`

## Goals
1. Build a library of free browser-based games and tools
2. Monetize with Google AdSense (2 ad slots per page, moderate density)
3. Rank in search for "free online [game/tool name]" queries
4. Clean, modern dark-mode-first UI that works on mobile and desktop

## Tech Stack
- Pure HTML/CSS/JS — no frameworks, no build step
- CSS custom properties for dark/light theme (dark mode default, `[data-theme="light"]` for light)
- All game/tool logic is vanilla JS inline in each page's HTML file
- Shared utilities in `theme.js`: GameTheme, GameTimer, GameStatsManager, GameSettings, Confetti, Modal
- Shared design system in `theme.css` (665 lines)
- **CDN dependencies** (tools only):
  - jsPDF 3.0.3 — document-templates.html (PDF generation)
  - pdf-lib 1.17.1 — pdf-merge-split.html (PDF manipulation)
  - JSZip 3.10.1 — pdf-merge-split.html (ZIP creation)
  - jsQR 1.4.0 — qr-code-generator.html (QR code reading, lazy-loaded)

## Site Structure

```
thefreefix.com/                    ← Hub page (2 cards: Games, Tools)
├── games.html                     ← Games listing (12 game cards)
│   ├── sudoku.html                + sudoku-info.html
│   ├── minesweeper.html           + minesweeper-info.html
│   ├── 2048.html                  + 2048-info.html
│   ├── word-leap.html             + word-leap-info.html
│   ├── block-drop.html            + block-drop-info.html
│   ├── chess-puzzles.html         + chess-puzzles-info.html
│   ├── memory-match.html          + memory-match-info.html
│   ├── solitaire.html             + solitaire-info.html
│   ├── nonograms.html             + nonograms-info.html
│   ├── brick-smash.html           + brick-smash-info.html
│   ├── bubble-shooter.html        + bubble-shooter-info.html
│   └── pipe-dream.html            + pipe-dream-info.html
├── tools.html                     ← Tools listing (15 tool cards)
│   ├── qr-code-generator.html     + qr-code-generator-info.html
│   ├── word-counter.html          + word-counter-info.html
│   ├── pdf-merge-split.html       + pdf-merge-split-info.html
│   ├── color-palette-generator.html + color-palette-generator-info.html
│   ├── image-compressor.html      + image-compressor-info.html
│   ├── json-formatter.html        + json-formatter-info.html
│   ├── currency-converter.html    + currency-converter-info.html
│   ├── document-templates.html    + document-templates-info.html
│   ├── pomodoro-timer.html        + pomodoro-timer-info.html
│   ├── password-generator.html    + password-generator-info.html
│   ├── unit-converter.html        + unit-converter-info.html
│   ├── metadata-stripper.html    + metadata-stripper-info.html
│   ├── regex-tester.html          + regex-tester-info.html
│   └── ascii-art-generator.html  + ascii-art-generator-info.html
├── templates/                     ← SEO landing pages (20 pages, link to document-templates.html?t=id)
│   ├── invoice-template.html
│   ├── receipt-template.html
│   ├── business-letter-template.html
│   ├── meeting-agenda-template.html
│   ├── meeting-minutes-template.html
│   ├── letter-of-resignation-template.html
│   ├── employment-offer-letter-template.html
│   ├── resume-template.html
│   ├── cover-letter-template.html
│   ├── bill-of-sale-template.html
│   ├── nda-template.html
│   ├── lease-agreement-template.html
│   ├── promissory-note-template.html
│   ├── power-of-attorney-template.html
│   ├── permission-slip-template.html
│   ├── rent-receipt-template.html
│   ├── personal-budget-template.html
│   ├── moving-checklist-template.html
│   ├── emergency-contact-sheet-template.html
│   └── pet-sitter-instructions-template.html
├── theme.css                      ← Shared design system (CSS variables, components, responsive)
├── theme.js                       ← Shared JS utilities (theme, timer, stats, settings, confetti, modals)
├── _template-game.html            ← Scaffold for new games
├── _template-tool.html            ← Scaffold for new tools
├── _template-info.html            ← Scaffold for new info/how-to pages
├── favicon.svg                    ← Site favicon
├── og-image.png                   ← Shared Open Graph image
├── 404.html                       ← Custom 404 page
├── privacy.html                   ← Privacy policy
├── about.html                     ← About page
├── contact.html                   ← Contact page
├── terms.html                     ← Terms of Service
├── robots.txt                     ← Crawling directives
├── sitemap.xml                    ← XML sitemap (62 URLs)
├── ads.txt                        ← AdSense authorization
├── CNAME                          ← GitHub Pages custom domain (thefreefix.com)
├── CLAUDE.md                      ← Claude Code instructions
└── PROJECT.md                     ← This file
```

**Total: ~86 files** (28 game/tool pages + 28 info pages + 20 template landing pages + core files)

## Navigation Flow
- **Homepage** → Games card → games.html → individual game → game-info.html
- **Homepage** → Tools card → tools.html → individual tool → tool-info.html
- Every page has "TheFreeFix.com" brand link at top → homepage
- Game/tool pages have back arrow → their listing page (games.html or tools.html)
- Info pages have back arrow → their parent game/tool page
- Template landing pages have back arrow + CTA → document-templates.html?t=templateId

## Design System (theme.css)
- **Dark mode** (default): Deep purple/navy (#0a0a1a bg, #7b6fff accent, #ff5e94 accent2, #00e6b8 accent3)
- **Light mode** (`[data-theme="light"]`): Clean white/gray (#e4e8f4 bg) with darker accent variants
- **Font**: System font stack (Segoe UI, system-ui, -apple-system, sans-serif)
- **Radius**: sm 8px, md 12px, lg 16px, xl 20px
- **Components**: `.icon-btn`, `.pill-selector`/`.pill-btn`, `.stat-chip`, `.toggle-chip`, `.modal-overlay`/`.modal`, `.site-brand`, `.game-header`, `.site-footer`, `.ad-slot`
- **Responsive breakpoints**: 400px (small phones), 768px (mobile/tablet), 800px+500px (landscape games)
- **Animations**: fadeIn, slideUp, confettiFall, shake, pop

## SEO (all pages)
- Meta descriptions, Open Graph, Twitter Cards (`@TheFreeFix`)
- Canonical URLs pointing to thefreefix.com
- Schema.org JSON-LD: `WebSite` (homepage), `CollectionPage`+`ItemList` (listings), `VideoGame` (games), `WebApplication` (tools), `Article` (info & template pages)
- Semantic titles: "[Page] - TheFreeFix.com"
- robots.txt + sitemap.xml (58 URLs)
- Shared og-image.png across all pages

## Ads (Google AdSense)
- Account: `ca-pub-7700405385978151`
- 2 ad slots per page (placeholder containers during development)
- Desktop: 728x90 leaderboard, Mobile: 320x50 banner
- CSS classes: `.ad-slot` + `.ad-content` (top) or `.ad-bottom` (bottom), `.ad-slot--placeholder`
- ads.txt in repo root

## Current Games (12)
1. **Sudoku** — 4 difficulty levels (easy/medium/hard/expert), notes mode, hints (3/game), undo, error checking, stats tracking, best times, keyboard support, landscape layout on wide screens
2. **Minesweeper** — 3 difficulty levels (beginner 9x9, intermediate 16x16, expert 16x30), flagging, chord clicking, timer, stats, best times. Expert board uses horizontal scroll on mobile.
3. **2048** — Slide and merge tiles. Arrow keys + swipe controls, score tracking, best score persistence, timer, stats, keep playing after win
4. **Word Leap** — 5-letter word guessing in 6 tries. Animated tile reveals, on-screen keyboard with color states, stats with guess distribution, physical keyboard support. ~700 answers, ~2500 valid guesses.
5. **Block Drop** — Falling-blocks puzzle. Stack, rotate, clear lines. Touch and keyboard controls.
6. **Chess Puzzles** — 20,000 tactical puzzles from real Lichess games. Four difficulty levels (beginner to master).
7. **Memory Match** — Card-matching memory game across multiple difficulty levels.
8. **Solitaire Collection** — Three variants: Klondike, Spider, FreeCell.
9. **Nonograms** — Picross picture logic puzzles. Four difficulty levels (5x5 to 20x20), auto-cross completed clues, error checking, undo, timer, stats, keyboard support.
10. **Brick Smash** — Breakout-style arcade. Canvas-based, requestAnimationFrame loop. Mouse/touch/keyboard. 3 brick types, 3 power-ups, 10 handcrafted levels + procedural generation for 11+. Particle effects, ball glow trail.
11. **Bubble Shooter** — Aim-and-match arcade puzzle. Canvas-based, hex grid. Match 3+ to pop. Disconnected clusters fall for bonus. Ceiling descends every N shots. 6 colors introduced progressively, combo scoring, glossy rendering. Mouse/touch/keyboard with trajectory preview.
12. **Pipe Dream** — Classic retro pipe-connecting puzzle. Place pipe pieces from a queue onto a grid before water flows from the start tile. 11 pipe types (straight, curved, T, cross). 4 difficulty levels (easy 7x7 to expert 10x10). Countdown timer, animated water flow, skip/bomb tools, progressive levels, cross-pipe bonus scoring. Stats tracking with best score, streak, total pipes. Mobile-first canvas rendering.

## Current Tools (14)
1. **QR Code Generator & Reader** — Generate: auto-generation with debounce, custom FG/BG colors, 3 sizes (S/M/L), download as PNG/SVG, modes for Text/WiFi/vCard/Event. Self-contained QR encoder (byte mode, EC level M, versions 1-40, Reed-Solomon). Read: decode QR codes from uploaded images (drag-and-drop, JPEG/PNG/WebP/GIF) or scan live with device camera. Uses jsQR (CDN, lazy-loaded on Read tab). Copy result or open decoded URLs directly. All processing in-browser.
2. **Word Counter** — Words, characters (with/without spaces), sentences, paragraphs, reading time (238 WPM). Live updates, responsive 3-column stat grid.
3. **PDF Merge & Split** — Drag-and-drop upload, drag-to-reorder merge, extract pages by range, split all to ZIP. Uses pdf-lib + JSZip (CDN). All in-browser.
4. **Color Palette Generator** — Harmony modes, lock colors, adjust hues, export to CSS or JSON.
5. **Image Compressor** — Compress JPEG/PNG/WebP in-browser. No server uploads.
6. **JSON Formatter & Validator** — Format, validate, minify with syntax highlighting and error detection.
7. **Currency Converter** — 30+ currencies via Frankfurter API (ECB rates). Two-way conversion, swap, quick picks, localStorage caching, status indicator. No API key.
8. **Document Templates** — 20+ PDF templates across 4 categories (Business, Personal, Legal, Everyday). Dynamic forms, line items, legal variable substitution. Uses jsPDF (CDN). Each template has an SEO landing page in `templates/` linking to `document-templates.html?t=templateId`.
9. **Pomodoro Timer** — Customizable Pomodoro sessions with focus tracking.
10. **Password Generator** — Length 4-128, character type toggles, exclude ambiguous, entropy strength meter, bulk generation (5), session history (10). Uses crypto.getRandomValues(). All in-browser.
11. **Unit Converter** — 80+ units across 10 categories (Length, Weight, Temperature, Volume, Area, Speed, Time, Data, Energy, Pressure). Real-time conversion, swap, formula display, quick-pick shortcuts. Decimal + binary data units.
12. **Metadata Stripper** — Remove EXIF, IPTC, and XMP metadata from JPEG, PNG, and WebP images. Drag-and-drop batch upload (up to 50 files), inline EXIF parser with GPS/camera/software detection, privacy warning tags for GPS data, per-file metadata detail view, strip individually or batch strip all, download cleaned files individually or all at once. Uses Canvas API to re-encode images without metadata. All processing in-browser.
13. **Regex Tester** — Test, debug, and understand regular expressions in real time. Pattern input with flag toggles (g/i/m/s/u/y), highlighted match overlay on test strings, match list with capture groups and named groups, human-readable regex explanation parser, live find-and-replace with backreference support, code generation for JavaScript/Python/Java/C#/PHP/Go, and a collapsible quick reference cheat sheet. Uses native JavaScript RegExp. All processing in-browser.
14. **ASCII Art Generator** — Convert images to ASCII art in-browser. Drag-and-drop upload, adjustable width (40-200 columns), 4 character set presets (Standard, Detailed, Blocks, Simple), invert toggle, color mode (monochrome/colored), live preview, auto-sizing font. Copy to clipboard or download as .txt. Uses Canvas API + getImageData() for pixel-to-character mapping. All processing in-browser.

## Key Implementation Notes
- **localStorage**: All stats, settings, theme preference, and best times persist per game/difficulty
- **Timer management**: Stop old GameTimer interval before creating a new one to prevent conflicts
- **Minesweeper overflow**: Expert 16x30 board uses `overflow-x: auto` on `.board-wrap` for mobile horizontal scroll
- **Sudoku landscape**: 800px+ width + 500px+ height triggers side-by-side layout (board left, controls right)
- **Canvas games** (Brick Smash, Bubble Shooter): Use requestAnimationFrame loop, responsive canvas sizing
- **All processing in-browser**: No data leaves the client (PDF tools, password generator, image compressor, etc.)
