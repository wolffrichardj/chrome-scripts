# AGENTS.md

This repository is designed as an **agent-first project**.

## Operating rules for agents
1. Make the smallest possible change that satisfies the request.
2. Update documentation with every structural or behavioral change.
3. Keep website-specific logic isolated under `sites/<website>/`.
4. Keep cross-site capability isolated under `extensions/<capability>/`.
5. Add an entry to `docs/CHANGE_TRACKING.md` for any non-trivial change.
6. Prefer plain JavaScript + minimal dependencies unless requested otherwise.

## File and folder conventions
- `sites/` = scripts and docs tied to a specific website.
- `extensions/` = reusable capabilities across multiple websites.
- `docs/` = governance, architecture notes, and project history.

## Definition of done for agent tasks
- Requested implementation is present.
- README and local module docs are updated.
- Historical tracking entry exists (if change is non-trivial).
- Commands used for verification are documented in the task summary.
