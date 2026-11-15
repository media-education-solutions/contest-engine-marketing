// Paced input helpers so a recording reads like a person using the app: the cursor
// glides, typing is visible, and scrolls ease instead of jumping.

/** @param {import("@playwright/test").Page} page */
export function createPacer(page) {
  let pos = null;
  let recorder = null;

  /** Called by capture.mjs once the screencast starts, so waits can be cut out of it. */
  const attach = (recording) => {
    recorder = recording;
  };

  /**
   * Run `fn` (a slow wait, e.g. a page load) without recording it. The clip hard-cuts across
   * it. A nudge of the cursor afterwards forces a repaint, because the screencast only
   * emits frames when the page changes.
   */
  async function skipWhile(fn) {
    recorder?.pauseCapture();
    try {
      await fn();
    } finally {
      recorder?.resumeCapture();
      if (pos) await page.mouse.move(pos.x + 2, pos.y + 2);
    }
  }

  const pause = (ms) => page.waitForTimeout(ms);

  async function centerOf(locator) {
    const box = await locator.boundingBox();
    if (!box) throw new Error("moveTo: element has no bounding box (is it visible and in view?)");
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  }

  /** Glide the cursor to the center of `target` (a locator or {x, y}). */
  async function moveTo(target, { steps = 25 } = {}) {
    const { x, y } = "x" in target ? target : await centerOf(target);
    await page.mouse.move(x, y, { steps });
    pos = { x, y };
  }

  /** Park the cursor somewhere neutral so the overlay exists from the first frame. */
  async function park(x, y) {
    await page.mouse.move(x, y);
    pos = { x, y };
  }

  async function click(locator, { settle = 350 } = {}) {
    await moveTo(locator);
    await pause(150);
    await locator.click({ delay: 90 });
    await pause(settle);
  }

  async function typeSlow(text, { delay = 45 } = {}) {
    await page.keyboard.type(text, { delay });
  }

  /** Pointer-sensor drag-and-drop needs stepped moves; a bare dragTo may not register. */
  async function drag(from, to, { steps = 30 } = {}) {
    await moveTo(from);
    await pause(150);
    await page.mouse.down();
    await pause(120);
    await moveTo(to, { steps });
    await pause(150);
    await page.mouse.up();
    await pause(400);
  }

  /**
   * Ease-scroll so `locator` sits at `align` (0 = top, 0.5 = middle) of its scroll container:
   * the nearest scrollable ancestor (e.g. an open side sheet), else the window.
   */
  async function scrollTo(locator, { ms = 900, align = 0.5 } = {}) {
    const handle = await locator.elementHandle();
    if (!handle) throw new Error("scrollTo: element not found");
    await handle.evaluate(
      (el, { ms, align }) =>
        new Promise((resolve) => {
          let scroller = el.parentElement;
          while (scroller && scroller !== document.body) {
            const { overflowY } = getComputedStyle(scroller);
            if (/(auto|scroll)/.test(overflowY) && scroller.scrollHeight > scroller.clientHeight) break;
            scroller = scroller.parentElement;
          }
          const useWindow = !scroller || scroller === document.body;
          const view = useWindow
            ? { top: 0, height: window.innerHeight, from: window.scrollY, max: document.documentElement.scrollHeight - window.innerHeight }
            : (() => {
                const r = scroller.getBoundingClientRect();
                return { top: r.top, height: scroller.clientHeight, from: scroller.scrollTop, max: scroller.scrollHeight - scroller.clientHeight };
              })();
          const rect = el.getBoundingClientRect();
          const to = Math.max(0, Math.min(view.max, view.from + rect.top - view.top - (view.height - rect.height) * align));
          const start = performance.now();
          const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
          const tick = (now) => {
            const t = Math.min(1, (now - start) / ms);
            const y = view.from + (to - view.from) * ease(t);
            if (useWindow) window.scrollTo(0, y);
            else scroller.scrollTop = y;
            if (t < 1) requestAnimationFrame(tick);
            else resolve();
          };
          requestAnimationFrame(tick);
        }),
      { ms, align },
    );
    await pause(250);
  }

  return { pause, moveTo, park, click, typeSlow, drag, scrollTo, attach, skipWhile, get pos() { return pos; } };
}
