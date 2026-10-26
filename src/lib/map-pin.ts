/**
 * Photo-bubble marker HTML for the map screen, consumed by Leaflet's
 * `divIcon`. Pure string building so `node --test` can verify escaping and
 * class structure without a browser.
 *
 * `photo` is the card's data-URL photo. Leaflet inserts this HTML with
 * `innerHTML`, so a quote character inside the URL must not be able to break
 * out of the `src` attribute — escape it, keep the rest verbatim.
 */
export const MEO_PIN_SIZE = 40;
export const MEO_PIN_ANCHOR: [number, number] = [MEO_PIN_SIZE / 2, MEO_PIN_SIZE / 2];

export function meoPinHtml(photo: string, focused: boolean): string {
  const src = String(photo ?? "").replaceAll('"', "&quot;");
  const cls = focused ? "meo-pin is-focus" : "meo-pin";
  return `<span class="${cls}"><img src="${src}" alt="" draggable="false" /></span>`;
}
