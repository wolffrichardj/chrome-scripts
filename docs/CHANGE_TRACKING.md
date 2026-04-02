# Change Tracking Strategy

This document defines how we preserve project history beyond raw git commits.

## Why this exists
Git history shows *what* changed. This file captures *why* and *how decisions were made*.

## Required update points
For each non-trivial change, add a short entry with:
- Date (UTC)
- Area (`sites/netflix`, `sites/github`, `extensions/*`, or `repo`)
- Summary of change
- Rationale / expected impact
- Follow-up items

## Entry template

```md
## YYYY-MM-DD — <area>
- Summary:
- Rationale:
- Follow-up:
```

## History

## 2026-04-02 — sites/netflix
- Summary: Added a Manifest V3 Chrome extension at `sites/netflix/rt-audience-overlay` that overlays Rotten Tomatoes audience badges (popcorn state + percentage) on Netflix title cards.
- Rationale: Delivers the fastest path to in-page audience score visibility without introducing external build dependencies.
- Follow-up: Improve title matching precision by adding year-aware matching and fallback search extraction when direct slug guesses miss.

## 2026-04-02 — sites/netflix
- Summary: Improved the Rotten Tomatoes Netflix overlay with broader Netflix card selectors, more robust audience-score parsing, and explicit debug logging hooks in both content/background scripts.
- Rationale: The initial version could appear inactive when Netflix markup differed or title slug matching missed; improved diagnostics make failure modes visible and easier to troubleshoot.
- Follow-up: Add optional UI status panel and year-aware disambiguation sourced from Netflix metadata.

## 2026-04-02 — repo
- Summary: Initialized repository scaffolding for an agent-first chrome-scripts project with per-site and per-extension structure.
- Rationale: Enables incremental feature development for multiple websites while keeping ownership boundaries clear.
- Follow-up: Add runnable starter scripts and packaging/build workflow.
