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

## 2026-04-02 — repo
- Summary: Initialized repository scaffolding for an agent-first chrome-scripts project with per-site and per-extension structure.
- Rationale: Enables incremental feature development for multiple websites while keeping ownership boundaries clear.
- Follow-up: Add runnable starter scripts and packaging/build workflow.
