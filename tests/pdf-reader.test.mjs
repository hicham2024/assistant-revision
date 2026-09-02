import test from "node:test";
import assert from "node:assert/strict";

import { PDF_LIMITS, textItemsToText } from "../pdf-reader.mjs";

test("textItemsToText preserves PDF line endings and normalizes spaces", () => {
  const text = textItemsToText([
    { str: "La   photosynthèse", hasEOL: false },
    { str: "transforme la lumière.", hasEOL: true },
    { str: "Elle produit", hasEOL: false },
    { str: "de l'oxygène.", hasEOL: false }
  ]);

  assert.equal(
    text,
    "La photosynthèse transforme la lumière.\nElle produit de l'oxygène."
  );
});

test("textItemsToText ignores non-text items and empty lines", () => {
  const text = textItemsToText([
    null,
    { type: "beginMarkedContent" },
    { str: "   ", hasEOL: true },
    { str: "Chapitre 1", hasEOL: true }
  ]);

  assert.equal(text, "Chapitre 1");
});

test("PDF limits protect the browser from oversized courses", () => {
  assert.equal(PDF_LIMITS.maxBytes, 25 * 1024 * 1024);
  assert.equal(PDF_LIMITS.maxPages, 120);
  assert.ok(PDF_LIMITS.minimumExtractedCharacters >= 40);
});
