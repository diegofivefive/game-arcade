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
- **Game logic stays self-contained** in each game's HTML file
- **SEO on every page** — meta description, canonical URL, Open Graph, Twitter Card, Schema.org JSON-LD
- **Update sitemap.xml** when adding new pages

## Git Workflow
- Always branch from latest `main` (pull first)
- Create PRs to merge into `main` — never push directly to main
- Never force push
- GitHub Pages auto-deploys from `main` (~40s)

## File Structure
```
index.html          ← Hub page (Games + Tools cards)
games.html          ← Games listing
tools.html          ← Tools listing (placeholder)
sudoku.html         ← Sudoku game
minesweeper.html    ← Minesweeper game
privacy.html        ← Privacy policy
theme.css           ← Shared stylesheet (CSS variables, components)
theme.js            ← Shared JS (GameTheme, GameTimer, GameStatsManager, GameSettings, Confetti, Modal)
robots.txt          ← Crawling directives
sitemap.xml         ← XML sitemap
ads.txt             ← AdSense authorization
CNAME               ← Custom domain (thefreefix.com)
PROJECT.md          ← Full project reference doc
```

## Adding a New Game
1. Create `gamename.html` — follow sudoku.html or minesweeper.html as template
2. Include theme.css + theme.js, add site-brand header, game-header, ad slots
3. Add SEO meta tags, canonical URL, Schema.org VideoGame JSON-LD
4. Add a card to `games.html` listing
5. Add URL to `sitemap.xml`
6. Update `PROJECT.md` with game details

## Adding a New Tool
Same as above but use `tools.html` listing and appropriate Schema.org type.

## Key URLs
- Production: https://thefreefix.com
- Repo: https://github.com/diegofivefive/game-arcade
