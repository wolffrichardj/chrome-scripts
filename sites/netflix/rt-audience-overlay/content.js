const BADGE_CLASS = "rt-audience-overlay-badge";
const CARD_SELECTOR = [
  ".title-card img[alt]",
  ".title-card-container img[alt]",
  ".slider-refocus img[alt]",
  ".jawBoneContainer img[alt]",
  ".boxart-container img[alt]",
  "[data-uia='title-card'] img[alt]",
  ".title-card[aria-label]",
  ".slider-refocus[aria-label]"
].join(", ");
const DEBUG = false;
const observedTitles = new Set();

injectStyles();
scanAndDecorate();

const observer = new MutationObserver(() => scanAndDecorate());
observer.observe(document.documentElement, { childList: true, subtree: true });

function injectStyles() {
  if (document.getElementById("rt-audience-overlay-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "rt-audience-overlay-styles";
  style.textContent = `
    .${BADGE_CLASS} {
      position: absolute;
      top: 6px;
      left: 6px;
      z-index: 4;
      background: rgba(0, 0, 0, 0.82);
      color: #ffffff;
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.2px;
      pointer-events: none;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    }
  `;

  document.head.appendChild(style);
}

function scanAndDecorate() {
  const cards = document.querySelectorAll(CARD_SELECTOR);
  log(`scan found ${cards.length} candidate cards`);

  cards.forEach((node) => {
    const title = titleFromNode(node);
    if (!title || observedTitles.has(title)) {
      return;
    }

    observedTitles.add(title);

    chrome.runtime.sendMessage({ type: "getAudienceScore", title }, (response) => {
      if (chrome.runtime.lastError) {
        log("runtime error", chrome.runtime.lastError.message);
        return;
      }

      if (!response?.ok) {
        log("lookup response error", title, response?.error);
        return;
      }

      if (!response.result) {
        log("no result for", title);
        return;
      }

      applyBadgesForTitle(title, response.result);
    });
  });
}

function applyBadgesForTitle(title, result) {
  const cards = document.querySelectorAll(CARD_SELECTOR);
  let applied = 0;

  cards.forEach((node) => {
    const currentTitle = titleFromNode(node);
    if (currentTitle !== title) {
      return;
    }

    const container = badgeContainer(node);
    if (!container) {
      return;
    }

    if (window.getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }

    if (container.querySelector(`.${BADGE_CLASS}`)) {
      return;
    }

    const badge = document.createElement("div");
    badge.className = BADGE_CLASS;
    badge.textContent = `${stateIcon(result.state)} ${result.score}%`;
    badge.title = `Rotten Tomatoes audience score from ${result.sourceUrl}`;
    container.appendChild(badge);
    applied += 1;
  });

  log(`applied ${applied} badge(s) for ${title}`);
}

function titleFromNode(node) {
  const raw = node.getAttribute("alt") || node.getAttribute("aria-label") || "";
  return cleanTitle(raw);
}

function badgeContainer(node) {
  return (
    node.closest(
      ".title-card-container, .title-card, .slider-refocus, .jawBone, .boxart-container, [data-uia='title-card']"
    ) || node.parentElement
  );
}

function cleanTitle(title) {
  return title
    .replace(/\s+/g, " ")
    .replace(/:\s*Season\s*\d+/i, "")
    .replace(/^Watch\s+/i, "")
    .trim();
}

function stateIcon(state) {
  if (state === "upright" || state === "spilled") {
    return state === "upright" ? "🍿" : "🪣";
  }

  return "👥";
}

function log(...parts) {
  if (!DEBUG) {
    return;
  }

  console.log("[RT Overlay CS]", ...parts);
}
