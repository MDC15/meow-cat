//#region node_modules/.nitro/vite/services/ssr/assets/breed-match-BYJ9Zy-e.js
var FALLBACK_BREEDS = [
	{
		breed: "Siamese",
		country: "Thailand",
		origin: "Natural",
		coat: "Short",
		pattern: "Colorpoint"
	},
	{
		breed: "Thai",
		country: "Thailand",
		origin: "Natural",
		coat: "Short",
		pattern: "Colorpoint"
	},
	{
		breed: "Ragdoll",
		country: "United States",
		origin: "Crossbreed",
		coat: "Long",
		pattern: "Colorpoint"
	},
	{
		breed: "Birman",
		country: "France",
		origin: "Natural",
		coat: "Semi-long",
		pattern: "Colorpoint"
	},
	{
		breed: "Persian (Traditional Persian Cat)",
		country: "Greater Iran",
		origin: "Natural",
		coat: "Long",
		pattern: "All"
	},
	{
		breed: "Maine Coon",
		country: "United States",
		origin: "Natural",
		coat: "Long",
		pattern: "All"
	},
	{
		breed: "Russian Blue",
		country: "Russia",
		origin: "Natural",
		coat: "Short",
		pattern: "Solid"
	},
	{
		breed: "American Shorthair",
		country: "United States",
		origin: "Natural",
		coat: "Short",
		pattern: "All"
	},
	{
		breed: "British Shorthair",
		country: "United Kingdom",
		origin: "Natural",
		coat: "Short",
		pattern: "All"
	},
	{
		breed: "European Shorthair",
		country: "Finland and Sweden",
		origin: "Natural",
		coat: "Short",
		pattern: "All"
	},
	{
		breed: "Bombay",
		country: "United States",
		origin: "Crossbreed",
		coat: "Short",
		pattern: "Solid"
	},
	{
		breed: "Turkish Angora",
		country: "Turkey",
		origin: "Natural",
		coat: "Semi-long",
		pattern: "All"
	},
	{
		breed: "Turkish Van",
		country: "Turkey",
		origin: "Natural",
		coat: "Semi-long",
		pattern: "Van"
	},
	{
		breed: "Japanese Bobtail",
		country: "Japan",
		origin: "Natural",
		coat: "Short",
		pattern: "All"
	},
	{
		breed: "Egyptian Mau",
		country: "Egypt",
		origin: "Natural",
		coat: "Short",
		pattern: "Spotted"
	},
	{
		breed: "Abyssinian",
		country: "Ethiopia",
		origin: "Natural",
		coat: "Short",
		pattern: "Ticked"
	},
	{
		breed: "Bengal",
		country: "United States",
		origin: "Hybrid",
		coat: "Short",
		pattern: "Spotted"
	},
	{
		breed: "Burmese",
		country: "Burma and Thailand",
		origin: "Natural",
		coat: "Short",
		pattern: "Solid"
	},
	{
		breed: "Havana Brown",
		country: "United Kingdom",
		origin: "Natural",
		coat: "Short",
		pattern: "Solid"
	},
	{
		breed: "Sphynx",
		country: "Canada",
		origin: "Mutation",
		coat: "Hairless",
		pattern: "All"
	},
	{
		breed: "Norwegian Forest cat",
		country: "Norway",
		origin: "Natural",
		coat: "Long",
		pattern: "All"
	},
	{
		breed: "Siberian",
		country: "Russia",
		origin: "Natural",
		coat: "Semi-long",
		pattern: "All"
	},
	{
		breed: "Scottish Fold",
		country: "United Kingdom",
		origin: "Mutation",
		coat: "Short",
		pattern: "All"
	},
	{
		breed: "Singapura",
		country: "Singapore",
		origin: "Natural",
		coat: "Short",
		pattern: "Ticked"
	}
];
var BREED_VI = {
	Siamese: "Mèo Xiêm",
	Thai: "Mèo Thái",
	Ragdoll: "Ragdoll",
	Birman: "Birman",
	"Persian (Traditional Persian Cat)": "Mèo Ba Tư",
	"Maine Coon": "Maine Coon",
	"Russian Blue": "Mèo Nga xanh",
	"American Shorthair": "Mèo Mỹ lông ngắn",
	"British Shorthair": "Mèo Anh lông ngắn",
	"European Shorthair": "Mèo châu Âu lông ngắn",
	Bombay: "Bombay",
	"Turkish Angora": "Angora Thổ Nhĩ Kỳ",
	"Turkish Van": "Van Thổ Nhĩ Kỳ",
	"Japanese Bobtail": "Mèo Nhật đuôi cụt",
	"Egyptian Mau": "Egyptian Mau",
	Abyssinian: "Abyssinian",
	Bengal: "Bengal",
	Burmese: "Burmese",
	"Havana Brown": "Havana Brown",
	Sphynx: "Sphynx",
	"Norwegian Forest cat": "Mèo rừng Na Uy",
	Siberian: "Mèo Siberia",
	"Scottish Fold": "Scottish Fold",
	Singapura: "Singapura"
};
var COUNTRY_VI = {
	Thailand: "Thái Lan",
	"United States": "Hoa Kỳ",
	"United Kingdom": "Anh",
	Russia: "Nga",
	France: "Pháp",
	Egypt: "Ai Cập",
	Turkey: "Thổ Nhĩ Kỳ",
	"Greater Iran": "Ba Tư",
	"Iran (Persia)": "Ba Tư",
	Japan: "Nhật Bản",
	Norway: "Na Uy",
	Canada: "Canada",
	Ethiopia: "Ethiopia",
	Singapore: "Singapore",
	"Burma and Thailand": "Miến Điện và Thái Lan",
	"Finland and Sweden": "Bắc Âu"
};
var BIG_CATS = {
	"lion,": {
		en: "Lion",
		vi: "Sư tử",
		query: "Sư tử"
	},
	"tiger,": {
		en: "Tiger",
		vi: "Hổ",
		query: "Hổ"
	},
	leopard: {
		en: "Leopard",
		vi: "Báo hoa mai",
		query: "Báo hoa mai"
	},
	"snow leopard": {
		en: "Snow leopard",
		vi: "Báo tuyết",
		query: "Báo tuyết"
	},
	jaguar: {
		en: "Jaguar",
		vi: "Báo đốm",
		query: "Báo đốm Mỹ"
	},
	cheetah: {
		en: "Cheetah",
		vi: "Báo săn",
		query: "Báo săn"
	},
	cougar: {
		en: "Cougar",
		vi: "Sư tử núi",
		query: "Sư tử núi"
	},
	lynx: {
		en: "Lynx",
		vi: "Linh miêu",
		query: "Linh miêu"
	}
};
function bigCatProfile(label) {
	const key = label.toLowerCase();
	return Object.entries(BIG_CATS).find(([prefix]) => key.startsWith(prefix))?.[1] ?? {
		en: "Wild felid",
		vi: "Mèo lớn",
		query: "Họ Mèo"
	};
}
function breedViName(en) {
	if (BREED_VI[en]) return BREED_VI[en];
	const base = en.split("(")[0]?.split(",")[0]?.trim() ?? en;
	return BREED_VI[base] ?? base;
}
function findBreed(breeds, name) {
	const needle = name.toLowerCase();
	return breeds.find((breed) => breed.breed.toLowerCase() === needle) ?? breeds.find((breed) => breed.breed.toLowerCase().startsWith(needle));
}
function mustBreed(breeds, name) {
	return findBreed(breeds, name) ?? {
		breed: name,
		country: "",
		origin: "Natural",
		coat: "Short",
		pattern: "All"
	};
}
function matchBreed(breeds, scan) {
	if (scan.isBigCat) return null;
	const label = scan.felineLabel.toLowerCase();
	const { dominant, shares, pointed, contrast, colorful } = scan;
	if (label.includes("siamese") || pointed > .16) {
		if (shares.white > .42) return mustBreed(breeds, "Ragdoll");
		return mustBreed(breeds, "Siamese");
	}
	if (label.includes("persian")) return mustBreed(breeds, "Persian (Traditional Persian Cat)");
	if (label.includes("egyptian")) return contrast > .12 ? mustBreed(breeds, "Egyptian Mau") : mustBreed(breeds, "Abyssinian");
	if (colorful >= 3 && shares.orange > .15 && shares.black > .12 && shares.white > .12) return mustBreed(breeds, "Japanese Bobtail");
	if (shares.white > .33 && shares.orange > .22) return mustBreed(breeds, "Turkish Van");
	if (shares.white > .33 && (shares.black > .2 || shares.grey > .2)) return mustBreed(breeds, "British Shorthair");
	if (label.includes("tabby") || label.includes("tiger cat") || contrast > .14 && (dominant === "orange" || dominant === "brown")) {
		if (dominant === "orange" || shares.orange > .35) return mustBreed(breeds, "Maine Coon");
		if (dominant === "grey") return mustBreed(breeds, "American Shorthair");
		return mustBreed(breeds, "European Shorthair");
	}
	if (dominant === "black" && shares.black > .55) return mustBreed(breeds, "Bombay");
	if (dominant === "grey") return mustBreed(breeds, "Russian Blue");
	if (dominant === "white" || dominant === "cream" && shares.white > .35) return mustBreed(breeds, "Turkish Angora");
	if (dominant === "cream") return mustBreed(breeds, "Persian (Traditional Persian Cat)");
	if (dominant === "brown" && contrast < .12) return mustBreed(breeds, "Burmese");
	return mustBreed(breeds, "American Shorthair");
}
function countryVi(country) {
	const raw = country.match(/founding stock from ([^)]+)/i)?.[1]?.trim() || country || "Không rõ";
	return COUNTRY_VI[raw] ?? raw;
}
function originVi(origin) {
	const value = origin.toLowerCase();
	if (!value) return "Không rõ";
	if (value.includes("hybrid")) return "Lai với mèo hoang";
	if (value.includes("mutation")) return "Đột biến";
	if (value.includes("cross")) return "Lai tạo";
	if (value.includes("natural")) return "Tự nhiên";
	return origin;
}
function coatVi(coat) {
	const value = coat.toLowerCase();
	if (!value) return "Không rõ";
	if (value.includes("hairless")) return "Không lông";
	if (value.includes("semi")) return "Nửa dài";
	if (value.includes("long")) return "Dài";
	if (value.includes("rex")) return "Xoăn";
	if (value.includes("short")) return "Ngắn";
	return coat;
}
function patternVi(pattern) {
	const value = pattern.toLowerCase();
	if (!value) return "Đa dạng";
	if (value.includes("colorpoint")) return "Point — tai và mặt đậm";
	if (value.includes("spotted") || value.includes("marbled")) return "Đốm";
	if (value.includes("ticked")) return "Ticked";
	if (value.includes("tabby") || value.includes("striped")) return "Mướp";
	if (value.includes("van")) return "Van — trắng, màu ở đầu và đuôi";
	if (value.includes("bi-") || value.includes("tri-") || value.includes("bicolor")) return "Hai hoặc ba màu";
	if (value.includes("solid")) return "Trơn";
	if (value.includes("all")) return "Nhiều kiểu";
	return pattern;
}
function rarityOf(breed, bigCat) {
	if (bigCat) return "legendary";
	const origin = (breed?.origin ?? "").toLowerCase();
	const coat = (breed?.coat ?? "").toLowerCase();
	if (origin.includes("hybrid")) return "legendary";
	if (coat.includes("hairless") || origin.includes("mutation")) return "rare";
	if (origin.includes("cross")) return "uncommon";
	return "common";
}
function clampStat(value) {
	return Math.max(1, Math.min(5, Math.round(value)));
}
function statsFor(breed, rarity) {
	const coat = (breed?.coat ?? "").toLowerCase();
	const pattern = (breed?.pattern ?? "").toLowerCase();
	const name = breed?.breed ?? "";
	const energy = coat.includes("hairless") ? 4 : coat.includes("short") ? 5 : coat.includes("long") ? 3 : 4;
	const voice = pattern.includes("colorpoint") || name.includes("Siamese") ? 5 : 3;
	const affection = name.includes("Ragdoll") || name.includes("Birman") || pattern.includes("colorpoint") ? 5 : 4;
	const scarcity = {
		common: 2,
		uncommon: 3,
		rare: 4,
		legendary: 5
	}[rarity];
	return {
		affection: clampStat(affection),
		energy: clampStat(energy),
		voice: clampStat(voice),
		scarcity
	};
}
function localBlurb(breed) {
	return `${breedViName(breed.breed)} xuất xứ ${countryVi(breed.country)}. Lông ${coatVi(breed.coat).toLowerCase()}, hoa văn ${patternVi(breed.pattern).toLowerCase()}. Nguồn gốc giống: ${originVi(breed.origin).toLowerCase()}.`;
}
var RARITY_VI = {
	common: "Thường",
	uncommon: "Ít gặp",
	rare: "Hiếm",
	legendary: "Huyền thoại"
};
//#endregion
export { coatVi as a, matchBreed as c, rarityOf as d, statsFor as f, breedViName as i, originVi as l, RARITY_VI as n, countryVi as o, bigCatProfile as r, localBlurb as s, FALLBACK_BREEDS as t, patternVi as u };
