import fs from "node:fs";
import path from "node:path";
import { ROOT_DIR } from "./utils.js";
import {parse} from "acorn";
/**
 * 一次性读取 siteConfig.ts，缓存原始内容
 * 所有配置解析共享同一次文件读取
 */
let _cachedContent = null;

function readSiteConfig() {
	if (_cachedContent) return _cachedContent;
	const configPath = path.join(ROOT_DIR, "src/config/siteConfig.ts");
	_cachedContent = fs.readFileSync(configPath, "utf-8");
	return _cachedContent;
}

/**
 * 提取语言设置
 */
export function getLang() {
	const content = readSiteConfig();
	const match = content.match(/const SITE_LANG = ["'](.+?)["']/);
	return match ? match[1] : "zh_CN";
}

/**
 * 提取字体配置（只返回 enableCompress=true 且有 localFonts 的字体）
 */
// export function getFontConfigs() {
// 	// const content = readSiteConfig();

// 	const configPath = path.join(ROOT_DIR, "astro.config.mjs");
// 	const content = fs.readFileSync(configPath, "utf-8");

// 	const fontConfigMatch = content.match(/font:\s*\{([\s\S]*?)\n\t\},/);
// 	if (!fontConfigMatch) {
// 		console.log("⚠ Font config not found, using default settings");
// 		return [];
// 	}

// 	const fontConfigStr = fontConfigMatch[1];
// 	const fonts = [];
// 	const fontTypes = ["asciiFont", "cjkFont"];

// 	for (const fontType of fontTypes) {
// 		const regex = new RegExp(`${fontType}:\\s*\\{([\\s\\S]*?)\\}`, "m");
// 		const match = fontConfigStr.match(regex);
// 		if (!match) continue;

// 		const config = match[1];

// 		// const compressMatch = config.match(/enableCompress:\s*(true|false)/);
// 		// const enableCompress = compressMatch ? compressMatch[1] === "true" : false;

// 		const localFontsMatch = config.match(/localFonts:\s*\[(.*?)\]/s);
// 		let localFonts = [];
// 		if (localFontsMatch?.[1].trim()) {
// 			localFonts =
// 				localFontsMatch[1]
// 					.match(/["']([^"']+)["']/g)
// 					?.map((s) => s.replace(/["']/g, "")) || [];
// 		}

// 		// if (enableCompress && localFonts.length > 0) {
// 		if (localFonts.length > 0) {
// 			fonts.push({ type: fontType, files: localFonts/*, enableCompress*/ });
// 		}
// 	}

// 	return fonts;
// }


export function getFontConfigs() {

	const configPath = path.join(ROOT_DIR, "astro.config.mjs");
	const content = fs.readFileSync(configPath, "utf8");


	const ast = parse(content, {
		sourceType: "module",
		ecmaVersion: "latest",
	});


	const fonts = [];


	// 找 fonts 数组
	const fontsArray = findFontsArray(ast);


	if (!fontsArray) {
		return fonts;
	}


	for (const item of fontsArray.elements) {


		// 只处理对象
		if (
			!item ||
			item.type !== "ObjectExpression"
		) {
			continue;
		}


		// 判断 provider 是否 local()
		const provider = getProperty(
			item,
			"provider"
		);


		if (
			!provider ||
			!isLocalProvider(provider.value)
		) {
			continue;
		}



		const name = getLiteralProperty(
			item,
			"name"
		);



		const files = [];


		const options = getProperty(
			item,
			"options"
		);


		if (options) {

			const variants = getProperty(
				options.value,
				"variants"
			);


			if (variants) {

				for (const variant of variants.value.elements) {

					const src = getProperty(
						variant,
						"src"
					);


					if (!src) {
						continue;
					}


					for (const element of src.value.elements) {

						const srcPath = element.value;

						const fileName =
							path.basename(srcPath);

						const ext =
							path.extname(fileName);

						const baseName =
							path.basename(
								fileName,
								ext
							);


						files.push({
							src: srcPath,
							absolutePath:
								path.resolve(
									ROOT_DIR,
									srcPath
								),
							fileName,
							baseName,
							ext,
							woff2Name:
								`${baseName}.woff2`,
						});
					}
				}
			}
		}



		if (files.length) {

			fonts.push({
				name,
				type: "cjkFont",
				files,
			});

		}

	}


	console.dir(fonts, {
		depth: null
	});


	return fonts;
}






// ----------------------------
// 工具函数
// ----------------------------


// 查找 fonts 数组
function findFontsArray(node) {

	if (!node || typeof node !== "object") {
		return null;
	}


	if (
		node.type === "Property" &&
		node.key.name === "fonts" &&
		node.value.type === "ArrayExpression"
	) {
		return node.value;
	}



	for (const key in node) {

		const result = findFontsArray(
			node[key]
		);

		if (result) {
			return result;
		}
	}


	return null;
}



// 获取对象属性
function getProperty(obj, name) {

	if (
		!obj ||
		obj.type !== "ObjectExpression"
	) {
		return null;
	}


	return obj.properties.find(
		p =>
			p.key.name === name
	);
}



// 获取字符串属性
function getLiteralProperty(obj, name) {

	const prop = getProperty(
		obj,
		name
	);


	return prop?.value?.value ?? null;
}



// 判断 provider.fontProviders.local()
function isLocalProvider(node) {


	return (
		node.type === "CallExpression" &&

		node.callee.type === "MemberExpression" &&

		node.callee.object.name === "fontProviders" &&

		node.callee.property.name === "local"
	);
}

/**
 * 检查番剧页面是否启用
 */
export function isAnimePageEnabled() {
	const content = readSiteConfig();
	const match = content.match(/featurePages:\s*\{([\s\S]*?)\}/);
	if (!match) return false;
	const animeMatch = match[1].match(/anime:\s*(true|false)/);
	return animeMatch ? animeMatch[1] === "true" : false;
}

/**
 * 获取番剧模式
 */
export function getAnimeMode() {
	const content = readSiteConfig();
	const match = content.match(/anime:\s*\{[\s\S]*?mode:\s*["']([^"']+)["']/);
	return match ? match[1] : "bangumi";
}

/**
 * 获取 Bangumi 用户 ID
 */
export function getBangumiUserId() {
	const content = readSiteConfig();
	const match = content.match(
		/bangumi:\s*\{[\s\S]*?userId:\s*["']([^"']+)["']/,
	);
	return match ? match[1] : null;
}

/**
 * 获取音乐播放器配置（从 musicConfig.ts 读取）
 */
export function getMusicConfig() {
	const configPath = path.join(ROOT_DIR, "src/config/musicConfig.ts");
	if (!fs.existsSync(configPath)) return null;
	const content = fs.readFileSync(configPath, "utf-8");

	const enableMatch = content.match(
		/musicPlayerConfig:\s*MusicPlayerConfig\s*=\s*\{[\s\S]*?enable:\s*(true|false)/,
	);
	if (!enableMatch || enableMatch[1] === "false") {
		return null;
	}

	const configMatch = content.match(
		/musicPlayerConfig:\s*MusicPlayerConfig\s*=\s*\{([\s\S]*?)\};/,
	);
	if (!configMatch) return null;

	const configStr = configMatch[1];
	const extract = (field) => {
		const m = configStr.match(new RegExp(`${field}:\\s*["']([^"']+)["']`));
		return m ? m[1] : null;
	};

	return {
		mode: extract("mode") || "meting",
		meting_api:
			extract("meting_api") ||
			"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
		id: extract("id") || "14164869977",
		server: extract("server") || "netease",
		type: extract("type") || "playlist",
	};
}

/**
 * 获取合并配置（一次读取，返回所有需要的信息）
 */
export function getConfig() {
	return {
		lang: getLang(),
		fonts: getFontConfigs(),
		animeEnabled: isAnimePageEnabled(),
		animeMode: getAnimeMode(),
		bangumiUserId: getBangumiUserId(),
		musicConfig: getMusicConfig(),
	};
}
