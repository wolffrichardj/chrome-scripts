# chrome-scripts

Agent-first repository for building reusable browser scripts and lightweight extension modules that enhance websites (for example Netflix and GitHub) with custom graphics, overlays, and stitched metrics.

## Goals
- Keep scripts modular by website/use-case.
- Make automation and handoff easy for human + agent collaboration.
- Maintain a clear historical record of decisions and changes.

## Repository layout

```text
chrome-scripts/
├── AGENTS.md
├── README.md
├── docs/
│   └── CHANGE_TRACKING.md
├── sites/
│   ├── github/
│   │   └── README.md
│   └── netflix/
│       └── README.md
└── extensions/
    ├── custom-graphics/
    │   └── README.md
    └── metrics-tracker/
        └── README.md
```

## Getting started
1. Pick a target area under `sites/` or `extensions/`.
2. Create a small scoped feature branch and add implementation + docs together.
3. Record notable decisions in `docs/CHANGE_TRACKING.md`.
4. Update the relevant module README with setup/testing notes.

## Initial roadmap
- [ ] Netflix overlays (visual annotations and timeline graphics).
- [ ] GitHub productivity overlays (PR/review activity indicators).
- [ ] Shared metrics stitching utility for combining browser-side signals.
- [ ] Packaging path for Tampermonkey scripts and Chrome extension builds.

## Contribution principles
- Small, reviewable changes.
- Explicit assumptions in docs.
- Always include test/check commands in PR notes.
