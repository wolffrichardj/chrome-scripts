const cache = new Map();

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "getAudienceScore" || !message.title) {
    return;
  }

  getAudienceScore(message.title)
    .then((result) => sendResponse({ ok: true, result }))
    .catch((error) => sendResponse({ ok: false, error: error.message }));

  return true;
});

async function getAudienceScore(rawTitle) {
  const title = normalizeTitle(rawTitle);
  if (!title) {
    return null;
  }

  if (cache.has(title)) {
    return cache.get(title);
  }

  const lookupPromise = lookupAudienceScore(title);
  cache.set(title, lookupPromise);

  const result = await lookupPromise;
  cache.set(title, result);
  return result;
}

async function lookupAudienceScore(title) {
  const slugs = buildSlugCandidates(title);

  for (const slug of slugs) {
    const movieResult = await fetchAudienceScore(`https://www.rottentomatoes.com/m/${slug}`);
    if (movieResult) {
      return movieResult;
    }

    const tvResult = await fetchAudienceScore(`https://www.rottentomatoes.com/tv/${slug}`);
    if (tvResult) {
      return tvResult;
    }
  }

  return null;
}

async function fetchAudienceScore(url) {
  const response = await fetch(url, { credentials: "omit" });
  if (!response.ok) {
    return null;
  }

  const html = await response.text();

  const scoreMatch = html.match(/audiencescore="(\d+)"/i);
  if (!scoreMatch) {
    return null;
  }

  const stateMatch = html.match(/audiencestate="([a-z]+)"/i);

  return {
    score: Number(scoreMatch[1]),
    state: stateMatch?.[1] || "unknown",
    sourceUrl: url
  };
}

function normalizeTitle(rawTitle) {
  return String(rawTitle)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[:–—-]\s*Season\s*\d+/i, "")
    .replace(/\(\d{4}\)$/, "")
    .trim();
}

function buildSlugCandidates(title) {
  const cleaned = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ").filter(Boolean);
  if (!words.length) {
    return [];
  }

  const base = words.join("_");
  const candidates = new Set([base]);

  if (words[0] === "the" && words.length > 1) {
    candidates.add(words.slice(1).join("_"));
  }

  if (words[0] === "a" && words.length > 1) {
    candidates.add(words.slice(1).join("_"));
  }

  return [...candidates];
}
