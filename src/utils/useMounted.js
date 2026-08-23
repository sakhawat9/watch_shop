import { useEffect, useState } from "react";

/**
 * True only after the first client render.
 *
 * `Store.js` builds its initial state by reading cookies at module scope. On
 * the server `js-cookie` has no document to read, so the store always starts
 * empty there, while the browser starts with the visitor's real cart and
 * wishlist. Anything derived from that state therefore differs between the
 * server HTML and the first client render, which React reports as a hydration
 * error (#418/#423) and recovers from by throwing away the server markup.
 *
 * Gating cookie-derived output on this hook keeps the server and first client
 * render identical, then fills in the real values on the next paint.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
