(() => {
  const DYNAMIC_WORD_ID = "dynamic-word";
  const JSON_PATH = "./data/new-words.json";
  const INTERVAL_MS = 3000;
  const FADE_DURATION_MS = 650;

  const wordEl = document.getElementById(DYNAMIC_WORD_ID);
  if (!wordEl) {
    console.warn("karyabaru: missing #dynamic-word element");
    return;
  }

  const getWords = async () => {
    const response = await fetch(JSON_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const words = payload?.words;
    if (!Array.isArray(words) || words.length === 0) {
      throw new Error("Invalid JSON: words must be a non-empty array");
    }

    const sanitized = words
      .filter((word) => typeof word === "string")
      .map((word) => word.trim())
      .filter(Boolean);

    if (sanitized.length === 0) {
      throw new Error("Invalid JSON: words contains no usable strings");
    }

    return sanitized;
  };

  const runRotation = (words) => {
    if (words.length <= 1) {
      wordEl.textContent = words[0] ?? wordEl.textContent;
      return;
    }

    let index = words.indexOf(wordEl.textContent?.trim() || "");
    if (index < 0) {
      index = 0;
      wordEl.textContent = words[0];
    }

    window.setInterval(() => {
      wordEl.classList.remove("fade-in");
      wordEl.classList.add("fade-out");

      window.setTimeout(() => {
        index = (index + 1) % words.length;
        wordEl.textContent = words[index];
        wordEl.classList.remove("fade-out");
        wordEl.classList.add("fade-in");
      }, FADE_DURATION_MS);
    }, INTERVAL_MS);
  };

  getWords()
    .then(runRotation)
    .catch((error) => {
      console.warn("karyabaru: failed to load rotating words JSON", error);
    });
})();
