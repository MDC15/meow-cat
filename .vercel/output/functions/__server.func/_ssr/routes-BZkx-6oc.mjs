import { o as __toESM } from "../_runtime.mjs";
import { U as isRedirect, b as require_jsx_runtime, q as require_react, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as RARITY_VI } from "./breed-match-BYJ9Zy-e.mjs";
import { a as MapPin, c as Camera, i as Map, l as Aperture, n as Trash2, o as ImagePlus, r as SwitchCamera, s as Cat } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BZkx-6oc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var useAlbum = create()(persist((set) => ({
	cards: [],
	quota: false,
	add: (card) => set((state) => ({
		cards: [card, ...state.cards].slice(0, 24),
		quota: false
	})),
	remove: (id) => set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
	rename: (id, name) => set((state) => ({ cards: state.cards.map((card) => card.id === id ? {
		...card,
		name
	} : card) })),
	setPlace: (id, lat, lng, place) => set((state) => ({ cards: state.cards.map((card) => card.id === id ? {
		...card,
		lat,
		lng,
		place
	} : card) })),
	clearQuota: () => set({ quota: false })
}), {
	name: "locket-meo-album",
	skipHydration: true,
	storage: createJSONStorage(() => ({
		getItem: (key) => localStorage.getItem(key),
		setItem: (key, value) => {
			try {
				localStorage.setItem(key, value);
			} catch {
				useAlbum.setState({ quota: true });
			}
		},
		removeItem: (key) => localStorage.removeItem(key)
	}))
}));
var STATS = [
	["affection", "Tình cảm"],
	["energy", "Năng lượng"],
	["voice", "Hay kêu"],
	["scarcity", "Độ hiếm"]
];
function formatWhen(stamp) {
	return new Intl.DateTimeFormat("vi-VN", {
		day: "2-digit",
		month: "short"
	}).format(stamp);
}
function CatCard({ card, variant = "full" }) {
	if (variant === "mini") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-ratio relative w-full overflow-hidden rounded-2xl bg-ink text-left shadow-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: card.photo,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg leading-tight text-balance text-surface",
					children: card.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-gold",
					children: card.breedVi
				})]
			})
		]
	});
	const foil = card.rarity === "legendary" || card.rarity === "rare";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `card-rise overflow-hidden rounded-3xl bg-ink text-surface shadow-xl ${foil ? "foil" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-52",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: card.photo,
					alt: `Ảnh ${card.name}`,
					className: "h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-xs text-gold",
					children: RARITY_VI[card.rarity]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-3 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-3xl leading-none text-balance",
					children: card.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-gold",
					children: card.breedVi
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 line-clamp-4 text-sm leading-snug text-pretty text-surface/80",
					children: card.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-surface/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-surface/50",
						children: "Xuất xứ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: card.country })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-surface/50",
						children: "Lông"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: card.coat })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-4 gap-2",
					children: STATS.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 h-1 overflow-hidden rounded-full bg-surface/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-gold",
							style: { width: `${card.stats[key] * 20}%` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-tight text-surface/70",
						children: label
					})] }, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-center gap-1 text-xs text-surface/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-3 shrink-0 text-gold",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: card.place ?? "Chưa ghim bản đồ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto shrink-0 tabular-nums",
							children: formatWhen(card.createdAt)
						})
					]
				})
			]
		})]
	});
}
function AlbumScreen({ focusId, onFocus, onPin, onShoot }) {
	const cards = useAlbum((state) => state.cards);
	const remove = useAlbum((state) => state.remove);
	const rename = useAlbum((state) => state.rename);
	const [confirmId, setConfirmId] = (0, import_react.useState)(null);
	const focus = cards.find((card) => card.id === focusId) ?? null;
	if (focus) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-4 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onFocus(null),
						className: "h-11 text-sm text-muted",
						children: "Album"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-xl",
						children: focus.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-12" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-full max-w-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatCard, { card: focus })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-xs text-muted",
						children: ["Đổi tên", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: focus.name,
							maxLength: 24,
							onChange: (event) => rename(focus.id, event.target.value.slice(0, 24)),
							className: "mt-1 h-12 w-full rounded-2xl border border-line bg-surface px-3 text-base"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-pretty text-muted",
						children: focus.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid grid-cols-2 gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Giống",
								value: focus.breedEn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Xuất xứ",
								value: focus.country
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Nguồn gốc",
								value: focus.origin
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Hoa văn",
								value: focus.pattern
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Độ hiếm",
								value: RARITY_VI[focus.rarity]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Nhận dạng",
								value: focus.checkLine
							})
						]
					}),
					focus.wikiUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: focus.wikiUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-3 inline-block text-sm text-ginger",
						children: ["Đọc ", focus.wikiTitle ?? "Wikipedia"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: ["Nguồn: ", focus.sourceNote]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPin(focus.id),
					className: "flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "size-4",
						"aria-hidden": "true"
					}), focus.place ? "Đổi vị trí" : "Ghim bản đồ"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (confirmId === focus.id) {
							remove(focus.id);
							onFocus(null);
							setConfirmId(null);
						} else setConfirmId(focus.id);
					},
					className: "flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
						className: "size-4",
						"aria-hidden": "true"
					}), confirmId === focus.id ? "Xoá hẳn" : "Xoá"]
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "px-4 pt-4 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-3xl leading-none",
				children: "Album"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: cards.length === 0 ? "Chưa có thẻ nào" : `${cards.length} thẻ trong máy này`
			})]
		}), cards.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, {
					className: "size-10 text-ginger",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Chụp một con mèo. Ảnh được nhận dạng trên máy, thông tin giống lấy từ catfact.ninja và Wikipedia."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onShoot,
					className: "h-12 rounded-full bg-ginger px-5 text-ginger-ink",
					children: "Mở máy ảnh"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-y-auto px-4 pt-2 pb-4",
			children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onFocus(card.id),
				className: "text-left",
				"aria-label": card.name,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatCard, {
					card,
					variant: "mini"
				})
			}, card.id))
		})]
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-pretty",
			children: value
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var COLORS = [
	"black",
	"white",
	"orange",
	"cream",
	"grey",
	"brown"
];
function num(value, min, max, fallback) {
	if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
	return Math.min(max, Math.max(min, value));
}
function parseScan(input) {
	if (!input || typeof input !== "object") throw new Error("Thiếu dữ liệu ảnh");
	const raw = input;
	const sharesRaw = raw.shares ?? {};
	const shares = Object.fromEntries(COLORS.map((color) => [color, num(sharesRaw[color], 0, 1, 0)]));
	const dominant = COLORS.includes(raw.dominant) ? raw.dominant : "brown";
	const lat = raw.lat == null ? null : num(raw.lat, -90, 90, NaN);
	const lng = raw.lng == null ? null : num(raw.lng, -180, 180, NaN);
	if (Number.isNaN(lat) || Number.isNaN(lng)) throw new Error("Toạ độ không hợp lệ");
	return {
		felineLabel: typeof raw.felineLabel === "string" ? raw.felineLabel.slice(0, 80) : "",
		score: num(raw.score, 0, 1, 0),
		isBigCat: raw.isBigCat === true,
		dominant,
		pointed: num(raw.pointed, 0, 1, 0),
		contrast: num(raw.contrast, 0, 1, 0),
		colorful: num(raw.colorful, 0, 6, 1),
		shares,
		lat,
		lng
	};
}
function parseLatLng(input) {
	if (!input || typeof input !== "object") throw new Error("Thiếu toạ độ");
	const raw = input;
	const lat = num(raw.lat, -90, 90, NaN);
	const lng = num(raw.lng, -180, 180, NaN);
	if (Number.isNaN(lat) || Number.isNaN(lng)) throw new Error("Toạ độ không hợp lệ");
	return {
		lat,
		lng
	};
}
var lookupPlace = createServerFn({ method: "POST" }).validator(parseLatLng).handler(createSsrRpc("8b41c5d9b0f87525baf2d01de2637430a3da2ae60105b745646eecc7820d8954"));
var sampleCatPhoto = createServerFn({ method: "POST" }).validator((input) => {
	const nonce = input?.nonce;
	return { nonce: typeof nonce === "number" ? nonce : Date.now() };
}).handler(createSsrRpc("006874dbf101912e330638c1022b46acd82c56e2c5ee09540782feef194ecd7f"));
var buildCatCard = createServerFn({ method: "POST" }).validator(parseScan).handler(createSsrRpc("41871e1edb4f61fecbef2bf762e53337eb4a94f92fafc81ef27663013258d6ed"));
var DOMESTIC = [
	"tabby",
	"tiger cat",
	"persian cat",
	"siamese cat",
	"egyptian cat"
];
var BIG = [
	"cougar",
	"lynx",
	"leopard",
	"snow leopard",
	"jaguar",
	"lion,",
	"tiger,",
	"cheetah"
];
var LABEL_VI = {
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
	"cheetah, chetah, acinonyx jubatus": "báo săn"
};
var modelPromise = null;
function loadModel() {
	if (!modelPromise) modelPromise = (async () => {
		await (await import("../_libs/@tensorflow/tfjs+[...].mjs").then((n) => n.t)).ready();
		return (await import("../_libs/@tensorflow-models/mobilenet.mjs").then((n) => n.t)).load({
			version: 2,
			alpha: .5
		});
	})().catch((error) => {
		modelPromise = null;
		throw error;
	});
	return modelPromise;
}
function felineKind(className) {
	const name = className.toLowerCase();
	if (DOMESTIC.some((prefix) => name.startsWith(prefix))) return "domestic";
	if (BIG.some((prefix) => name.startsWith(prefix))) return "big";
	return null;
}
function labelVi(className) {
	return LABEL_VI[className.toLowerCase()] ?? className.split(",")[0] ?? className;
}
function bucketOf(r, g, b) {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const light = (max + min) / 2 / 255;
	const sat = max === 0 ? 0 : (max - min) / max;
	if (light < .16) return "black";
	if (light > .84 && sat < .16) return "white";
	if (sat < .16) return light > .62 ? "cream" : "grey";
	if (r > g && g >= b && r - b > 28 && r > 120) return "orange";
	if (r > 110 && g > 70 && b < 90) return "brown";
	if (light > .72) return "cream";
	return "brown";
}
function readCoat(canvas) {
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	const empty = {
		dominant: "brown",
		shares: {
			black: 0,
			white: 0,
			orange: 0,
			cream: 0,
			grey: 0,
			brown: 1
		},
		pointed: 0,
		contrast: 0,
		colorful: 1
	};
	if (!ctx) return empty;
	const { width, height } = canvas;
	const pixels = ctx.getImageData(0, 0, width, height).data;
	const shares = {
		black: 0,
		white: 0,
		orange: 0,
		cream: 0,
		grey: 0,
		brown: 0
	};
	let count = 0;
	let lightSum = 0;
	let lightSq = 0;
	let cornerLight = 0;
	let cornerCount = 0;
	let centerLight = 0;
	let centerCount = 0;
	const cx = width / 2;
	const cy = height / 2;
	const rx = width * .36;
	const ry = height * .36;
	for (let y = 0; y < height; y += 4) for (let x = 0; x < width; x += 4) {
		const dx = (x - cx) / rx;
		const dy = (y - cy) / ry;
		const dist = dx * dx + dy * dy;
		if (dist > 1) continue;
		const index = (y * width + x) * 4;
		const r = pixels[index] ?? 0;
		const g = pixels[index + 1] ?? 0;
		const b = pixels[index + 2] ?? 0;
		const light = (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255;
		shares[bucketOf(r, g, b)] += 1;
		count += 1;
		lightSum += light;
		lightSq += light * light;
		if (Math.abs(dx) > .72 || Math.abs(dy) > .72) {
			cornerLight += light;
			cornerCount += 1;
		} else if (dist < .16) {
			centerLight += light;
			centerCount += 1;
		}
	}
	if (count === 0) return empty;
	Object.keys(shares).forEach((key) => {
		shares[key] = shares[key] / count;
	});
	const dominant = Object.keys(shares).reduce((best, key) => shares[key] > shares[best] ? key : best);
	const mean = lightSum / count;
	const contrast = Math.sqrt(Math.max(0, lightSq / count - mean * mean));
	return {
		dominant,
		shares,
		pointed: centerCount > 0 && cornerCount > 0 ? Math.max(0, centerLight / centerCount - cornerLight / cornerCount) : 0,
		contrast,
		colorful: Object.values(shares).filter((share) => share > .12).length
	};
}
async function analyzeCanvas(canvas) {
	const coat = readCoat(canvas);
	try {
		const predictions = await (await Promise.race([loadModel(), new Promise((_, reject) => {
			setTimeout(() => reject(/* @__PURE__ */ new Error("model timeout")), 28e3);
		})])).classify(canvas, 8);
		const felines = predictions.filter((item) => felineKind(item.className));
		const best = felines[0];
		const sum = felines.reduce((total, item) => total + item.probability, 0);
		const top = predictions[0];
		return {
			isCat: Boolean(best && (felineKind(top?.className ?? "") || best.probability >= .06 || sum >= .12)),
			isBigCat: (best ? felineKind(best.className) : null) === "big",
			felineLabel: best?.className ?? top?.className ?? "",
			labelVi: best ? labelVi(best.className) : top ? labelVi(top.className) : "không rõ",
			score: best?.probability ?? 0,
			model: true,
			topLabel: top?.className ?? "không rõ",
			coat
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
			coat
		};
	}
}
function drawContain(source, sourceWidth, sourceHeight, mirror) {
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
function canvasFromDataUrl(dataUrl) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => {
			try {
				resolve(drawContain(image, image.naturalWidth || image.width, image.naturalHeight || image.height, false));
			} catch (error) {
				reject(error);
			}
		};
		image.onerror = () => reject(/* @__PURE__ */ new Error("Không đọc được ảnh"));
		image.src = dataUrl;
	});
}
function suggestName(seed) {
	const names = [
		"Mướp",
		"Bông",
		"Mochi",
		"Gạo",
		"Sữa",
		"Hạt Dẻ",
		"Mây",
		"Tôm",
		"Bí Ngô",
		"Đậu",
		"Cốm",
		"Muối"
	];
	let hash = 0;
	for (const char of seed) hash = hash * 33 + char.charCodeAt(0) >>> 0;
	return names[hash % names.length] ?? "Mướp";
}
var STEPS = [
	"Đang soi bộ lông…",
	"Hỏi catfact.ninja…",
	"Tra Wikipedia tiếng Việt…",
	"Ghim OpenStreetMap…"
];
function locate() {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			resolve(null);
			return;
		}
		navigator.geolocation.getCurrentPosition((position) => resolve({
			lat: position.coords.latitude,
			lng: position.coords.longitude
		}), () => resolve(null), {
			enableHighAccuracy: false,
			timeout: 8e3,
			maximumAge: 12e4
		});
	});
}
function CameraScreen({ onOpenAlbum }) {
	const videoRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const [facing, setFacing] = (0, import_react.useState)("environment");
	const [camOn, setCamOn] = (0, import_react.useState)(false);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [step, setStep] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [vision, setVision] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const addCard = useAlbum((state) => state.add);
	const quota = useAlbum((state) => state.quota);
	const build = useServerFn(buildCatCard);
	const sample = useServerFn(sampleCatPhoto);
	(0, import_react.useEffect)(() => {
		let stream = null;
		let dead = false;
		setCamOn(false);
		(async () => {
			if (!navigator.mediaDevices?.getUserMedia) return;
			try {
				stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
						facingMode: facing,
						width: { ideal: 1280 },
						height: { ideal: 1600 }
					}
				});
				if (dead) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}
				const video = videoRef.current;
				if (!video) return;
				video.srcObject = stream;
				await video.play();
				setCamOn(true);
			} catch {
				if (!dead) setCamOn(false);
			}
		})();
		return () => {
			dead = true;
			stream?.getTracks().forEach((track) => track.stop());
		};
	}, [facing]);
	(0, import_react.useEffect)(() => {
		if (phase !== "loading") return;
		setStep(0);
		const timer = window.setInterval(() => setStep((value) => (value + 1) % STEPS.length), 1600);
		return () => window.clearInterval(timer);
	}, [phase]);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const timer = window.setTimeout(() => setToast(null), 2800);
		return () => window.clearTimeout(timer);
	}, [toast]);
	async function mint(canvas, seen, where) {
		const facts = await build({ data: {
			felineLabel: seen.felineLabel,
			score: seen.score,
			isBigCat: seen.isBigCat,
			dominant: seen.coat.dominant,
			pointed: seen.coat.pointed,
			contrast: seen.coat.contrast,
			colorful: seen.coat.colorful,
			shares: seen.coat.shares,
			lat: where?.lat ?? null,
			lng: where?.lng ?? null
		} });
		const photo = canvas.toDataURL("image/jpeg", .66);
		const checkLine = !seen.model ? "Ước lượng theo màu lông — model nhận dạng không tải được" : seen.score === 0 ? "Bạn xác nhận đây là mèo" : `MobileNet: ${seen.labelVi} · ${Math.round(seen.score * 100)}%`;
		const card = {
			id: crypto.randomUUID(),
			createdAt: Date.now(),
			photo,
			name: suggestName(photo.slice(-24)),
			...facts,
			checkLine,
			lat: where?.lat ?? null,
			lng: where?.lng ?? null
		};
		setName(card.name);
		setDraft(card);
		setPhase("reveal");
	}
	async function run(canvas, forceCat = false) {
		setError(null);
		setPhase("loading");
		canvasRef.current = canvas;
		try {
			const [seenRaw, where] = await Promise.all([analyzeCanvas(canvas), locate()]);
			const seen = forceCat ? {
				...seenRaw,
				isCat: true,
				isBigCat: false,
				score: seenRaw.isCat ? seenRaw.score : 0
			} : seenRaw;
			setVision(seen);
			if (!seen.isCat) {
				setPhase("reject");
				return;
			}
			await mint(canvas, seen, where);
		} catch (err) {
			setPhase("idle");
			setError(err instanceof Error ? err.message : "Không tạo được thẻ");
		}
	}
	function shoot() {
		const video = videoRef.current;
		if (!video || !video.videoWidth) {
			setError("Camera chưa sẵn sàng. Hãy chọn ảnh hoặc mèo mẫu.");
			return;
		}
		try {
			run(drawContain(video, video.videoWidth, video.videoHeight, facing === "user"));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Không chụp được");
		}
	}
	async function onFile(file) {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setError("Chọn file ảnh JPEG hoặc PNG.");
			return;
		}
		try {
			await run(await canvasFromDataUrl(await fileToDataUrl(file)));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Không đọc được ảnh");
		}
	}
	async function onSample() {
		setError(null);
		setPhase("loading");
		try {
			const { dataUrl } = await sample({ data: { nonce: Date.now() } });
			const canvas = await canvasFromDataUrl(dataUrl);
			canvasRef.current = canvas;
			const [seen, where] = await Promise.all([analyzeCanvas(canvas), locate()]);
			setVision(seen);
			if (!seen.isCat) {
				setPhase("reject");
				return;
			}
			await mint(canvas, seen, where);
		} catch (err) {
			setPhase("idle");
			setError(err instanceof Error ? err.message : "Không lấy được mèo mẫu");
		}
	}
	function save() {
		if (!draft) return;
		const cleaned = name.trim().slice(0, 24) || draft.name;
		addCard({
			...draft,
			name: cleaned
		});
		setDraft(null);
		setPhase("idle");
		setToast("Đã cất vào album");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex h-full flex-col bg-ink text-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between px-4 pt-4 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-2xl leading-none",
					children: "Locket Mèo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-surface/70",
					children: "Một lần chụp, một thẻ bài"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-36 text-right text-xs text-surface/60",
					children: "Ảnh nhận dạng ngay trên máy"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-4 min-h-0 flex-1 overflow-hidden rounded-3xl bg-ink ring-1 ring-surface/15",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						playsInline: true,
						muted: true,
						autoPlay: true,
						className: `h-full w-full object-cover ${facing === "user" ? "mirror" : ""} ${camOn ? "" : "opacity-0"}`
					}),
					!camOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, {
							className: "size-12 text-gold",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-pretty text-surface/80",
							children: "Bật camera, tải một ảnh mèo, hoặc dùng mèo mẫu từ The Cat API."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute top-4 left-4 size-6 border-t-2 border-l-2 border-surface/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute top-4 right-4 size-6 border-t-2 border-r-2 border-surface/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-4 left-4 size-6 border-b-2 border-l-2 border-surface/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute right-4 bottom-4 size-6 border-r-2 border-b-2 border-surface/80" })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 pt-3 text-center text-sm text-gold",
				children: error
			}),
			quota && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 pt-2 text-center text-sm text-gold",
				children: "Bộ nhớ trình duyệt đầy. Xoá bớt thẻ trong album."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between px-6 pt-4 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void onSample(),
						className: "flex w-16 flex-col items-center gap-1 text-xs text-surface/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-14 items-center justify-center rounded-full bg-surface/10 text-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), "Mẫu"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: shoot,
						disabled: phase === "loading",
						"aria-label": "Chụp mèo",
						className: "flex size-20 items-center justify-center rounded-full bg-ginger text-ginger-ink ring-4 ring-surface/90 disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, {
							className: "size-8",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-16 flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							"aria-label": "Chọn ảnh từ máy",
							className: "flex size-12 items-center justify-center rounded-full bg-surface/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFacing((value) => value === "user" ? "environment" : "user"),
							"aria-label": "Đổi camera",
							className: "flex size-12 items-center justify-center rounded-full bg-surface/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchCamera, {
								className: "size-5",
								"aria-hidden": "true"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (event) => {
					onFile(event.target.files?.[0]);
					event.target.value = "";
				}
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onOpenAlbum,
				className: "absolute inset-x-4 bottom-24 rounded-full bg-surface px-4 py-3 text-sm text-ink shadow-lg",
				children: [toast, ". Mở album"]
			}),
			phase === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-ink/90 px-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, {
						className: "size-10 animate-pulse text-gold",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-2xl text-balance",
						children: STEPS[step]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-surface/70",
						children: "Ảnh không được gửi đi để nhận dạng."
					})
				]
			}),
			phase === "reject" && vision && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-20 flex flex-col bg-bg px-5 py-6 text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-3xl text-balance",
						children: "Không thấy mèo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-pretty text-muted",
						children: [
							"Bộ nhận dạng nghi đây là “",
							vision.topLabel,
							"”. Chụp lại gần mặt mèo hơn, hoặc cứ tạo thẻ nếu bạn chắc."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPhase("idle"),
							className: "h-12 flex-1 rounded-full border border-line bg-surface",
							children: "Chụp lại"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								const canvas = canvasRef.current;
								if (canvas) run(canvas, true);
							},
							className: "h-12 flex-1 rounded-full bg-ginger text-ginger-ink",
							children: "Vẫn tạo thẻ"
						})]
					})
				]
			}),
			phase === "reveal" && draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-20 flex flex-col bg-bg text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-xl",
							children: "Thẻ mới"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPhase("idle"),
							className: "h-11 px-2 text-sm text-muted",
							children: "Bỏ"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 flex-1 overflow-y-auto px-6 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-full max-w-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatCard, { card: {
								...draft,
								name: name.trim() || draft.name
							} })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 px-4 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs text-muted",
								children: ["Tên trên thẻ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									maxLength: 24,
									onChange: (event) => setName(event.target.value),
									className: "mt-1 h-12 w-full rounded-2xl border border-line bg-surface px-3 text-base text-ink"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									draft.checkLine,
									". Nguồn: ",
									draft.sourceNote,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: save,
								className: "h-12 w-full rounded-full bg-ginger text-ginger-ink",
								children: "Cất vào album"
							})
						]
					})
				]
			})
		]
	});
}
function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Không đọc được file"));
		reader.readAsDataURL(file);
	});
}
function resolveLeaflet(mod) {
	const record = mod;
	if (record.default && typeof record.default.map === "function") return record.default;
	return mod;
}
function MapScreen({ focusId, pinning, onFocus, onPinned }) {
	const cards = useAlbum((state) => state.cards);
	const setPlace = useAlbum((state) => state.setPlace);
	const hostRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const apiRef = (0, import_react.useRef)(null);
	const markersRef = (0, import_react.useRef)([]);
	const fitted = (0, import_react.useRef)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)(null);
	const placeOf = useServerFn(lookupPlace);
	const focus = cards.find((card) => card.id === focusId) ?? null;
	const pinnedCount = cards.filter((card) => card.lat != null && card.lng != null).length;
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		if (!host) return;
		let dead = false;
		(async () => {
			const api = resolveLeaflet(await import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())));
			if (dead || !hostRef.current) return;
			const map = api.map(host, {
				zoomControl: true,
				attributionControl: true
			}).setView([16.05, 107.8], 5);
			api.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
				attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
			}).addTo(map);
			mapRef.current = map;
			apiRef.current = api;
			setReady(true);
			window.setTimeout(() => map.invalidateSize(), 180);
		})();
		return () => {
			dead = true;
			mapRef.current?.remove();
			mapRef.current = null;
			apiRef.current = null;
			setReady(false);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const api = apiRef.current;
		if (!map || !api) return;
		markersRef.current.forEach((marker) => marker.remove());
		const points = [];
		const markers = [];
		for (const card of cards) {
			if (card.lat == null || card.lng == null) continue;
			const focused = card.id === focusId;
			const marker = api.marker([card.lat, card.lng], { icon: api.divIcon({
				className: "meo-pin-wrap",
				html: `<span class="meo-pin${focused ? " is-focus" : ""}"></span>`,
				iconSize: [22, 22],
				iconAnchor: [11, 11]
			}) }).addTo(map);
			marker.on("click", () => onFocus(card.id));
			markers.push(marker);
			points.push([card.lat, card.lng]);
		}
		markersRef.current = markers;
		if (!fitted.current && points.length > 0) {
			map.fitBounds(api.latLngBounds(points).pad(.35), {
				maxZoom: 14,
				animate: false
			});
			fitted.current = true;
		}
	}, [
		cards,
		focusId,
		ready,
		onFocus
	]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || !ready) return;
		const handler = (event) => {
			if (!pinning || !focusId) return;
			(async () => {
				setNote("Đang hỏi địa danh…");
				const { place } = await placeOf({ data: {
					lat: event.latlng.lat,
					lng: event.latlng.lng
				} });
				setPlace(focusId, event.latlng.lat, event.latlng.lng, place);
				setNote(place ? `Đã ghim tại ${place}` : "Đã ghim toạ độ");
				onPinned();
			})();
		};
		map.on("click", handler);
		return () => {
			map.off("click");
		};
	}, [
		focusId,
		pinning,
		ready,
		onPinned,
		placeOf,
		setPlace
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: hostRef,
				className: "absolute inset-0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 z-10 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto rounded-2xl bg-surface/95 px-3 py-2 shadow-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-lg leading-tight",
							children: "Bản đồ mèo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: pinnedCount === 0 ? "Chưa có thẻ nào được ghim" : `${pinnedCount} vị trí · OpenStreetMap`
						}),
						pinning && focus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-ginger",
							children: [
								"Chạm bản đồ để ghim “",
								focus.name,
								"”."
							]
						}),
						note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: note
						})
					]
				})
			}),
			focus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onFocus(focus.id),
				className: "absolute inset-x-3 bottom-3 z-10 flex items-center gap-3 rounded-2xl bg-surface p-2 text-left shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: focus.photo,
					alt: "",
					className: "size-14 rounded-xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-serif text-lg leading-tight",
						children: focus.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-3 text-ginger",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: focus.place ?? "Chưa có địa danh"
						})]
					})]
				})]
			})
		]
	});
}
function Home() {
	const [tab, setTab] = (0, import_react.useState)("camera");
	const [focusId, setFocusId] = (0, import_react.useState)(null);
	const [pinning, setPinning] = (0, import_react.useState)(false);
	const count = useAlbum((state) => state.cards.length);
	(0, import_react.useEffect)(() => {
		useAlbum.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex h-dvh max-w-lg flex-col overflow-hidden bg-bg text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1",
			children: [
				tab === "camera" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraScreen, { onOpenAlbum: () => setTab("album") }),
				tab === "album" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumScreen, {
					focusId,
					onFocus: setFocusId,
					onShoot: () => setTab("camera"),
					onPin: (id) => {
						setFocusId(id);
						setPinning(true);
						setTab("map");
					}
				}),
				tab === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapScreen, {
					focusId,
					pinning,
					onFocus: setFocusId,
					onPinned: () => setPinning(false)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "nav-safe grid grid-cols-3 border-t border-line bg-surface",
			"aria-label": "Chính",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
					active: tab === "camera",
					label: "Chụp",
					onClick: () => setTab("camera"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
						className: "size-5",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
					active: tab === "album",
					label: count > 0 ? `Album ${count}` : "Album",
					onClick: () => setTab("album"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, {
						className: "size-5",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
					active: tab === "map",
					label: "Bản đồ",
					onClick: () => setTab("map"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, {
						className: "size-5",
						"aria-hidden": "true"
					})
				})
			]
		})]
	});
}
function TabButton({ active, label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-current": active ? "page" : void 0,
		className: `flex h-16 flex-col items-center justify-center gap-0.5 text-xs ${active ? "text-ginger" : "text-muted"}`,
		children: [children, label]
	});
}
//#endregion
export { Home as component };
