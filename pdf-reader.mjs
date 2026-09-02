const PDFJS_VERSION = "6.2.108";
const PDFJS_BASE_URL = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/legacy/build`;

export const PDF_LIMITS = Object.freeze({
  maxBytes: 25 * 1024 * 1024,
  maxPages: 120,
  minimumExtractedCharacters: 40
});

let pdfJsPromise;

function createPdfError(code, cause) {
  const error = new Error(code, cause ? { cause } : undefined);
  error.code = code;
  return error;
}

function ensureUint8ArrayToHex() {
  if (typeof Uint8Array === "undefined" || Uint8Array.prototype.toHex) return;

  Object.defineProperty(Uint8Array.prototype, "toHex", {
    configurable: true,
    writable: true,
    value() {
      return Array.from(this, (byte) => byte.toString(16).padStart(2, "0")).join("");
    }
  });
}

async function loadPdfJs() {
  ensureUint8ArrayToHex();

  if (!pdfJsPromise) {
    pdfJsPromise = import(`${PDFJS_BASE_URL}/pdf.min.mjs`)
      .then((pdfjsLib) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE_URL}/pdf.worker.min.mjs`;
        return pdfjsLib;
      })
      .catch((error) => {
        pdfJsPromise = undefined;
        throw createPdfError("PDF_LIBRARY_FAILED", error);
      });
  }

  return pdfJsPromise;
}

export function textItemsToText(items = []) {
  const lines = [];
  let currentLine = "";

  const flushLine = () => {
    const line = currentLine.replace(/\s+/g, " ").trim();
    if (line) lines.push(line);
    currentLine = "";
  };

  items.forEach((item) => {
    if (!item || typeof item.str !== "string") return;

    const fragment = item.str.replace(/\s+/g, " ").trim();
    if (fragment) {
      currentLine += `${currentLine ? " " : ""}${fragment}`;
    }
    if (item.hasEOL) flushLine();
  });

  flushLine();
  return lines.join("\n");
}

export async function extractPdfText(file, { onProgress, maxPages = PDF_LIMITS.maxPages } = {}) {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw createPdfError("PDF_INVALID_FILE");
  }

  const pdfjsLib = await loadPdfJs();
  let loadingTask;

  try {
    const data = new Uint8Array(await file.arrayBuffer());
    loadingTask = pdfjsLib.getDocument({
      data,
      enableScripting: false,
      isEvalSupported: false,
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    if (pdf.numPages > maxPages) throw createPdfError("PDF_TOO_LONG");

    const pages = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      onProgress?.({ pageNumber, pageCount: pdf.numPages });
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = textItemsToText(content.items);
      if (text) pages.push({ pageNumber, text });
      page.cleanup();
    }

    return { pageCount: pdf.numPages, pages };
  } catch (error) {
    if (error?.code) throw error;
    if (error?.name === "PasswordException") throw createPdfError("PDF_PASSWORD", error);
    throw createPdfError("PDF_LOAD_FAILED", error);
  } finally {
    if (loadingTask) {
      await loadingTask.destroy().catch(() => undefined);
    }
  }
}
