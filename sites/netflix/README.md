# Netflix scripts

Home for scripts and assets specific to Netflix UI enhancements.

## Planned use cases
- Playback timeline overlays
- Scene or content annotation markers
- Session-level viewing metrics

## Implemented: Rotten Tomatoes audience overlay (Chrome extension)
Path: `sites/netflix/rt-audience-overlay/`

This lightweight Manifest V3 extension overlays Rotten Tomatoes **audience** score badges on Netflix title artwork cards.

### What it shows
- Audience score percentage only (no critic score).
- Popcorn state icon + percentage:
  - `🍿` for upright/popcorn-positive audience state.
  - `🪣` for spilled audience state.

### Install (unpacked)
1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select `sites/netflix/rt-audience-overlay`.
5. Open Netflix browse pages; badges render as rows/cards appear.

### Debugging checklist (if "it does nothing")
1. Confirm the extension is enabled on `chrome://extensions`.
2. Open Netflix, then reload the page after enabling the extension.
3. Open **DevTools** on Netflix and run:
   - `document.querySelectorAll('.title-card img[alt], .slider-refocus img[alt], .boxart-container img[alt]').length`
   - If this returns `0`, Netflix changed markup and selectors need an update.
4. On `chrome://extensions`, click **Service worker** under this extension and inspect logs/network.
5. Temporarily set `const DEBUG = true;` in both `content.js` and `background.js`, reload extension, then refresh Netflix to see verbose logs.
6. In service-worker DevTools Network tab, verify requests to `https://www.rottentomatoes.com/...` are not blocked/challenged.

### Notes and limitations
- Matching is title-based and uses Rotten Tomatoes slug guesses (`/m/<slug>` and `/tv/<slug>`), so some titles may not resolve.
- Scores are cached in-memory for the current browser session by the extension service worker.
- Overlay targets card artwork containers (`title-card`, slider cards, jawbone artwork, boxart containers, and title cards with `aria-label`).
