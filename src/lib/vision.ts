import type { CoatColor, CoatRead } from "@/lib/breed-match";

type Prediction = { className: string; probability: number };

const DOMESTIC = ["tabby", "tiger cat", "persian cat", "siamese cat", "egyptian cat"];
const BIG = ["cougar", "lynx", "leopard", "snow leopard", "jaguar", "lion,", "tiger,", "cheetah"];

const LABEL_VI: Record<string, string> = {
  "tabby, tabby cat": "mèo mướp",
  "tiger cat": "mèo vằn",
  "persian cat": "mèo Ba Tư",
  "siamese cat, siamese": "mèo Xiêm",
  "egyptian cat": "mèo Ai Cập",
  "cougar, puma, catamount, mountain lion, painter, panther": "sư tử núi",
  "lynx, catamount": "linh miêu",
  "leopard, panthera pardus": "báo",
  "snow leopard, ounce, panthera uncia": "báo tuyết",
  "jaguar, panther, panthera onca, felis onca": "báo đốm",
  "lion, king of beasts, panthera leo": "sư tử",
  "tiger, panthera tigris": "hổ",
  "cheetah, chetah, acinonyx jubatus": "báo săn",
};

export type VisionResult = {
  isCat: boolean;
  isBigCat: boolean;
  felineLabel: string;
  labelVi: string;
  score: number;
  model: boolean;
  topLabel: string;
  coat: CoatRead;
};

let modelPromise: Promise<{
  classify: (img: HTMLCanvasElement, topk?: number) => Promise<Prediction[]>;
}> | null = null;

export function loadModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      const tf = await import("@tensorflow/tfjs");
      await tf.ready();
      const mobilenet = await import("@tensorflow-models/mobilenet");
      return mobilenet.load({ version: 2, alpha: 0.5 });
    })().catch((error) => {
      modelPromise = null;
      throw error;
    });
  }
  return modelPromise;
}

function felineKind(className: string): "domestic" | "big" | null {
  const name = className.toLowerCase();
  if (DOMESTIC.some((prefix) => name.startsWith(prefix))) return "domestic";
  if (BIG.some((prefix) => name.startsWith(prefix))) return "big";
  return null;
}

function labelVi(className: string) {
  return LABEL_VI[className.toLowerCase()] ?? className.split(",")[0] ?? className;
}

function bucketOf(r: number, g: number, b: number): CoatColor {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const light = (max + min) / 2 / 255;
  const sat = max === 0 ? 0 : (max - min) / max;
  if (light < 0.16) return "black";
  if (light > 0.84 && sat < 0.16) return "white";
  if (sat < 0.16) return light > 0.62 ? "cream" : "grey";
  if (r > g && g >= b && r - b > 28 && r > 120) return "orange";
  if (r > 110 && g > 70 && b < 90) return "brown";
  if (light > 0.72) return "cream";
  return "brown";
}

export function readCoat(canvas: HTMLCanvasElement): CoatRead {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const empty: CoatRead = {
    dominant: "brown",
    shares: { black: 0, white: 0, orange: 0, cream: 0, grey: 0, brown: 1 },
    pointed: 0,
    contrast: 0,
    colorful: 1,
  };
  if (!ctx) return empty;
  const { width, height } = canvas;
  const pixels = ctx.getImageData(0, 0, width, height).data;
  const shares: Record<CoatColor, number> = { black: 0, white: 0, orange: 0, cream: 0, grey: 0, brown: 0 };
  let count = 0;
  let lightSum = 0;
  let lightSq = 0;
  let cornerLight = 0;
  let cornerCount = 0;
  let centerLight = 0;
  let centerCount = 0;
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.36;
  const ry = height * 0.36;
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const dist = dx * dx + dy * dy;
      if (dist > 1) continue;
      const index = (y * width + x) * 4;
      const r = pixels[index] ?? 0;
      const g = pixels[index + 1] ?? 0;
      const b = pixels[index + 2] ?? 0;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const light = (max + min) / 2 / 255;
      shares[bucketOf(r, g, b)] += 1;
      count += 1;
      lightSum += light;
      lightSq += light * light;
      if (Math.abs(dx) > 0.72 || Math.abs(dy) > 0.72) {
        cornerLight += light;
        cornerCount += 1;
      } else if (dist < 0.16) {
        centerLight += light;
        centerCount += 1;
      }
    }
  }
  if (count === 0) return empty;
  (Object.keys(shares) as CoatColor[]).forEach((key) => {
    shares[key] = shares[key] / count;
  });
  const dominant = (Object.keys(shares) as CoatColor[]).reduce((best, key) =>
    shares[key] > shares[best] ? key : best,
  );
  const mean = lightSum / count;
  const contrast = Math.sqrt(Math.max(0, lightSq / count - mean * mean));
  const pointed =
    centerCount > 0 && cornerCount > 0 ? Math.max(0, centerLight / centerCount - cornerLight / cornerCount) : 0;
  const colorful = (Object.values(shares) as number[]).filter((share) => share > 0.12).length;
  return { dominant, shares, pointed, contrast, colorful };
}

export async function analyzeCanvas(canvas: HTMLCanvasElement): Promise<VisionResult> {
  const coat = readCoat(canvas);
  try {
    const model = await Promise.race([
      loadModel(),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("model timeout")), 28000);
      }),
    ]);
    const predictions = await model.classify(canvas, 8);
    const felines = predictions.filter((item) => felineKind(item.className));
    const best = felines[0];
    const sum = felines.reduce((total, item) => total + item.probability, 0);
    const top = predictions[0];
    const isCat = Boolean(best && (felineKind(top?.className ?? "") || best.probability >= 0.06 || sum >= 0.12));
    const kind = best ? felineKind(best.className) : null;
    return {
      isCat,
      isBigCat: kind === "big",
      felineLabel: best?.className ?? top?.className ?? "",
      labelVi: best ? labelVi(best.className) : top ? labelVi(top.className) : "không rõ",
      score: best?.probability ?? 0,
      model: true,
      topLabel: top?.className ?? "không rõ",
      coat,
    };
  } catch {
    return {
      isCat: true,
      isBigCat: false,
      felineLabel: "",
      labelVi: "ước lượng màu lông",
      score: 0,
      model: false,
      topLabel: "",
      coat,
    };
  }
}

export function drawContain(source: CanvasImageSource, sourceWidth: number, sourceHeight: number, mirror: boolean) {
  const scale = Math.min(1, 640 / Math.max(sourceWidth, sourceHeight, 1));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không tạo được ảnh");
  if (mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(source, 0, 0, width, height);
  return canvas;
}

export function canvasFromDataUrl(dataUrl: string) {
  return new Promise<HTMLCanvasElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      try {
        resolve(drawContain(image, image.naturalWidth || image.width, image.naturalHeight || image.height, false));
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = () => reject(new Error("Không đọc được ảnh"));
    image.src = dataUrl;
  });
}

export function suggestName(seed: string) {
  const names = ["Mướp", "Bông", "Mochi", "Gạo", "Sữa", "Hạt Dẻ", "Mây", "Tôm", "Bí Ngô", "Đậu", "Cốm", "Muối"];
  let hash = 0;
  for (const char of seed) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return names[hash % names.length] ?? "Mướp";
}
