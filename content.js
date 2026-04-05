/**
 * Link Color Coder - Content Script
 *
 * Colors each <a> element based on its href:
 *   - IP-based domain  → yellow  (checked first, takes priority)
 *   - https://         → green
 *   - http://          → red
 *   - other / relative → unchanged
 */

const IP_REGEX = /^https?:\/\/(\d{1,3}\.){3}\d{1,3}([\/:?#]|$)/;

function classifyLink(href) {
  if (!href) return null;

  // Relative or non-http URLs (mailto:, javascript:, etc.)
  if (!href.startsWith("http://") && !href.startsWith("https://")) return null;

  if (IP_REGEX.test(href)) return "lcc-ip";
  if (href.startsWith("https://")) return "lcc-secure";
  if (href.startsWith("http://")) return "lcc-insecure";

  return null;
}

function colorLinks(root) {
  root.querySelectorAll("a[href]").forEach((a) => {
    const cls = classifyLink(a.href);
    if (!cls) return;

    // Remove any previous lcc class before applying a new one
    a.classList.remove("lcc-secure", "lcc-insecure", "lcc-ip");
    a.classList.add(cls);
  });
}

// Inject styles once
const style = document.createElement("style");
style.textContent = `
  a.lcc-secure   { color: #1a9c2a !important; }
  a.lcc-insecure { color: #d93025 !important; }
  a.lcc-ip       { color: #e8a800 !important; }
`;
document.head.appendChild(style);

// Initial pass
colorLinks(document);

// Watch for dynamically added links (SPAs, infinite scroll, etc.)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      colorLinks(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
