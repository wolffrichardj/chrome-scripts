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

### Notes and limitations
- Matching is title-based and uses Rotten Tomatoes slug guesses (`/m/<slug>` and `/tv/<slug>`), so some titles may not resolve.
- Scores are cached in-memory for the current browser session by the extension service worker.
- Overlay targets card artwork containers (`title-card`, slider cards, and jawbone artwork).
