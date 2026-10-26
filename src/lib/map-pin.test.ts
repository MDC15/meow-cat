import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MEO_PIN_ANCHOR, MEO_PIN_SIZE, meoPinHtml } from "./map-pin.ts";

const PHOTO =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsL";

describe("meoPinHtml", () => {
  it("embeds the photo as a bubble image", () => {
    const html = meoPinHtml(PHOTO, false);
    assert.match(html, /class="meo-pin"/);
    assert.match(html, /<img src="data:image\/jpeg;base64,/);
    assert.match(html, /alt=""/);
  });

  it("marks the focused pin", () => {
    assert.match(meoPinHtml(PHOTO, true), /class="meo-pin is-focus"/);
    assert.doesNotMatch(meoPinHtml(PHOTO, false), /is-focus/);
  });

  it("keeps quote characters inside the src attribute", () => {
    const hostile = 'data:image/jpeg;base64," onload="alert(1)';
    const html = meoPinHtml(hostile, false);
    assert.doesNotMatch(html, /onload="alert/);
    assert.match(html, /&quot;/);
  });

  it("reports the marker geometry used by divIcon", () => {
    assert.equal(MEO_PIN_SIZE, 40);
    assert.deepEqual(MEO_PIN_ANCHOR, [20, 20]);
  });
});
