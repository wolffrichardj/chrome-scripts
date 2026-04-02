const BADGE_CLASS = "rt-audience-overlay-badge";
const CARD_SELECTOR = ".title-card img[alt], .slider-refocus img[alt], .jawBoneContainer img[alt]";
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
      z-index: 3;
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

  cards.forEach((img) => {
    const title = cleanTitle(img.getAttribute("alt") || "");
    if (!title || observedTitles.has(title)) {
      return;
    }

    observedTitles.add(title);

    chrome.runtime.sendMessage({ type: "getAudienceScore", title }, (response) => {
      if (chrome.runtime.lastError || !response?.ok || !response.result) {
        return;
      }

      applyBadgesForTitle(title, response.result);
    });
  });
}

function applyBadgesForTitle(title, result) {
  const cards = document.querySelectorAll(CARD_SELECTOR);

  cards.forEach((img) => {
    const currentTitle = cleanTitle(img.getAttribute("alt") || "");
    if (currentTitle !== title) {
      return;
    }

    const container = img.closest(".title-card-container, .slider-refocus, .jawBone") || img.parentElement;
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
  });
}

function cleanTitle(title) {
  return title
    .replace(/\s+/g, " ")
    .replace(/:\s*Season\s*\d+/i, "")
    .trim();
}

function stateIcon(state) {
  if (state === "upright" || state === "spilled") {
    return state === "upright" ? "🍿" : "🪣";
  }

  return "👥";
}
