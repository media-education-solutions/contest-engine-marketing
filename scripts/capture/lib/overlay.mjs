// Init scripts injected into every page of the capture browser. They draw over the
// PRODUCT app (not our site), so the marketing brand-token rule does not apply.
//
//  - cursorScript: headless screencasts have no OS cursor, so draw one.
//  - turnstileScript: collapse the Cloudflare test widget's red "For testing only"
//    label while leaving the widget running (the forms still need its token).

/** A black arrow with a white outline that follows the mouse and pulses on click. */
export const cursorScript = () => {
  // Top frame only. Init scripts also run inside iframes (the entry player), where mouse
  // coordinates are iframe-relative and would draw a second, misplaced cursor.
  if (window.top !== window) return;
  const SIZE = 28;
  let el = null;

  const ensure = () => {
    if (el?.isConnected) return el;
    if (!document.documentElement) return null;
    el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.setAttribute("data-capture-cursor", "");
    el.style.cssText =
      `position:fixed;left:0;top:0;width:${SIZE}px;height:${SIZE}px;pointer-events:none;` +
      "z-index:2147483647;opacity:0;transform-origin:2px 2px;will-change:transform;";
    el.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">' +
      '<path d="M3 2 L3 21 L8 16.5 L11.5 24 L15 22.5 L11.6 15.2 L18.5 15 Z" ' +
      'fill="#000" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></svg>';
    document.documentElement.appendChild(el);
    return el;
  };

  let x = 0;
  let y = 0;
  let scale = 1;
  const paint = () => {
    const node = ensure();
    if (!node) return;
    node.style.opacity = "1";
    node.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  };

  window.addEventListener(
    "mousemove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      paint();
    },
    true,
  );
  window.addEventListener(
    "mousedown",
    () => {
      scale = 0.78;
      paint();
    },
    true,
  );
  window.addEventListener(
    "mouseup",
    () => {
      scale = 1;
      paint();
    },
    true,
  );
};

/**
 * Hides the Turnstile widget without stopping it. Cloudflare renders its iframe inside
 * a (usually closed) shadow root, so plain CSS cannot reach it: force shadow roots open,
 * watch each one for a challenges.cloudflare.com iframe, then collapse its host (and the
 * host's parent when the host is the parent's only child, i.e. the app's bare container).
 */
export const turnstileScript = () => {
  const COLLAPSE =
    "height:0!important;min-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;";
  const isTurnstile = (n) => n?.tagName === "IFRAME" && /challenges\.cloudflare\.com/.test(n.src || "");
  const collapse = (host) => {
    host.style.cssText += COLLAPSE;
    const parent = host.parentElement;
    if (parent && parent.children.length === 1 && parent !== document.body) parent.style.cssText += COLLAPSE;
  };

  const attach = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function (init) {
    const root = attach.call(this, { ...init, mode: "open" });
    const check = () => {
      if (root.querySelector('iframe[src*="challenges.cloudflare.com"]')) collapse(root.host);
    };
    new MutationObserver(check).observe(root, { childList: true, subtree: true });
    check();
    return root;
  };

  // Non-shadow case: the iframe is a plain child of the container.
  new MutationObserver((records) => {
    for (const r of records) {
      for (const n of r.addedNodes) {
        if (isTurnstile(n) && n.parentElement) collapse(n.parentElement);
      }
    }
  }).observe(document, { childList: true, subtree: true });
};

/** Hide page scrollbars: headed Chrome draws them into the frames. Scrolling still works. */
export const scrollbarScript = () => {
  const add = () => {
    const style = document.createElement("style");
    style.textContent = "::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}";
    document.documentElement.appendChild(style);
  };
  if (document.documentElement) add();
  else document.addEventListener("DOMContentLoaded", add, { once: true });
};

/** Register all overlays on a browser context. */
export async function installOverlays(context) {
  await context.addInitScript(cursorScript);
  await context.addInitScript(turnstileScript);
  await context.addInitScript(scrollbarScript);
}

/** For stills: no stray cursor left over from the click that opened the page. */
export const hideCursor = (page) => page.addStyleTag({ content: "[data-capture-cursor]{display:none!important}" });
