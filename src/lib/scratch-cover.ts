/**
 * The scratch-cover artwork for the reveal screen, generated as an inline SVG
 * data URL — no binary asset in `public/`, colors come from the design
 * tokens' hex values (foil golds), and the hint text matches the app's voice.
 *
 * `react-scratchcard-v2` accepts any image URL for `Covers.image`, including
 * data URLs, so the foil renders straight from this string.
 */

export const FOIL_WIDTH = 320;
export const FOIL_HEIGHT = 448; // 320 * 88 / 63 ≈ 447.0 — card ratio 63:88

/** A tilted paw print at (x, y), drawn darker into the foil. */
function paw(x: number, y: number, rotate: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rotate})" fill="#a5762e" opacity="0.35">
    <ellipse cx="0" cy="4" rx="7" ry="5.5" />
    <circle cx="-6" cy="-4" r="2.4" />
    <circle cx="-2" cy="-6.5" r="2.4" />
    <circle cx="2" cy="-6.5" r="2.4" />
    <circle cx="6" cy="-4" r="2.4" />
  </g>`;
}

const PAWS = [
  paw(46, 70, -20),
  paw(250, 50, 18),
  paw(90, 170, 12),
  paw(235, 200, -14),
  paw(50, 300, 22),
  paw(255, 330, -10),
  paw(130, 395, 8),
  paw(40, 410, -18),
  paw(285, 120, 30),
  paw(20, 180, -6),
  paw(300, 260, 12),
  paw(110, 60, -30),
]
  .join("\n  ");

function foilSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${FOIL_WIDTH}" height="${FOIL_HEIGHT}" viewBox="0 0 ${FOIL_WIDTH} ${FOIL_HEIGHT}">
  <defs>
    <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#b8893d" />
      <stop offset="0.35" stop-color="#e0b45e" />
      <stop offset="0.62" stop-color="#c99a44" />
      <stop offset="1" stop-color="#b8893d" />
    </linearGradient>
    <radialGradient id="sheen" cx="0.25" cy="0.2" r="1">
      <stop offset="0" stop-color="#fff7f1" stop-opacity="0.45" />
      <stop offset="0.5" stop-color="#fff7f1" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#foil)" />
  <rect width="100%" height="100%" fill="url(#sheen)" />
  ${PAWS}
  <g transform="translate(${FOIL_WIDTH / 2} ${FOIL_HEIGHT / 2 - 60})" fill="#fff7f1" opacity="0.9">
    <ellipse cx="0" cy="8" rx="17" ry="13" />
    <circle cx="-14" cy="-10" r="5.5" />
    <circle cx="-5" cy="-16" r="5.5" />
    <circle cx="5" cy="-16" r="5.5" />
    <circle cx="14" cy="-10" r="5.5" />
  </g>
  <text
    x="${FOIL_WIDTH / 2}"
    y="${FOIL_HEIGHT / 2 + 34}"
    text-anchor="middle"
    font-family="'Be Vietnam Pro', system-ui, sans-serif"
    font-size="21"
    font-weight="600"
    fill="#fff7f1"
    opacity="0.95"
  >Cào để mở thẻ</text>
  <text
    x="${FOIL_WIDTH / 2}"
    y="${FOIL_HEIGHT / 2 + 62}"
    text-anchor="middle"
    font-family="'Be Vietnam Pro', system-ui, sans-serif"
    font-size="13"
    fill="#fff7f1"
    opacity="0.75"
  >Dùng ngón tay vuốt lên lớp vàng</text>
</svg>`;
}

export function foilCoverDataUrl(): string {
  return `data:image/svg+xml,${encodeURIComponent(foilSvg())}`;
}
