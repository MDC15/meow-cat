import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FOIL_HEIGHT, FOIL_WIDTH, foilCoverDataUrl } from "./scratch-cover.ts";

describe("foilCoverDataUrl", () => {
  it("is an inline SVG data URL that an <img> can load", () => {
    const url = foilCoverDataUrl();
    assert.match(url, /^data:image\/svg\+xml,/);
    // Raw '#' inside a data URL truncates the URL — must be percent-encoded.
    assert.doesNotMatch(url, /#/);
  });

  it("carries the scratch hint and the foil palette", () => {
    const svg = decodeURIComponent(foilCoverDataUrl());
    assert.match(svg, /Cào để mở thẻ/);
    assert.match(svg, /#b8893d/);
    assert.match(svg, /#e0b45e/);
  });

  it("matches the card ratio 63:88", () => {
    assert.ok(Math.abs(FOIL_WIDTH / FOIL_HEIGHT - 63 / 88) < 0.01);
  });
});
