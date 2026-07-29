import fs from "node:fs";
import path from "node:path";
import { ROOT_DIR, readFilesRecursively } from "./utils.js";
import { getFontConfigs } from "./config-parser.js";

/**
 * 更新 dist 中的 CSS/HTML，将 ttf 引用替换为 woff2
 */
export async function updateFileFontReferences() {
	console.log("[file-rewriter] started");

	try {
		const fonts = getFontConfigs();

		const distDir = path.join(ROOT_DIR, "dist/");
		const Files = readFilesRecursively(distDir).filter((f) =>
			f.endsWith(".css") || f.endsWith(".html"),
		);

		if (Files.length === 0) {
			console.warn("⚠ No CSS/HTML files found in dist");
			return;
		}

		// 处理配置中的字体
		for (const fontConfig of fonts) {
			for (const file of fontConfig.files) {
				const name=fontConfig.name;
				const baseName = file.baseName;
				const woff2File = file.woff2Name;

				const distWoff2 = path.join(
					ROOT_DIR,
					`dist/_astro/fonts/${woff2File}`,
				);
				
				const hasWoff2 = fs.existsSync(distWoff2);
				if (!hasWoff2) {
					console.log(
						`⚠ No woff2 found for ${baseName}, keeping ttf reference`,
					);
					continue;
				}

				for (const File of Files) {
					let Content = fs.readFileSync(File, "utf-8");
					const originalContent = Content;

					const fontFacePattern = /@font-face\s*\{[^}]*\}/gs;

					Content = Content.replace(fontFacePattern, (block) => {
						// 提取 font-family
						const familyMatch = block.match(
							/font-family\s*:\s*["']?([^;"'}]+)["']?/,
						);

						if (!familyMatch) return block;

						const family = familyMatch[1];

						// Astro 会在 font-family 后附加一段 hash，例如：
						// MarukoGothicCJKsc-Medium-d7eefb91b0e1b4cf
						// Loli-2e2a7b7cb5d9e781
						const familyBase = family.replace(/-[0-9a-f]{16}$/, "");

						// 当前 @font-face 不是正在处理的字体
						if (familyBase !== name) {
							return block;
						}

						// 已经存在 woff2，则无需重复处理
						if (block.includes(".woff2")) {
							return block;
						}

						// 替换 src
						return block.replace(
							/src\s*:\s*url\((["']?)([^)"']+\.ttf)\1\)\s*format\((["'])truetype\3\)/,
							`src:url("/_astro/fonts/${woff2File}") format("woff2")`,
						);
					});
					Content = Content.replace(fontFacePattern, (block) => {
						// 提取 font-family
						const familyMatch = block.match(
							/font-family\s*:\s*["']?([^;"'}]+)["']?/,
						);

						if (!familyMatch) return block;

						const family = familyMatch[1];

						// Astro 会在 font-family 后附加一段 hash，例如：
						// MarukoGothicCJKsc-Medium-d7eefb91b0e1b4cf
						// Loli-2e2a7b7cb5d9e781
						const familyBase = family.replace(/-[0-9a-f]{16}$/, "");

						// 当前 @font-face 不是正在处理的字体
						if (familyBase !== name) {
							return block;
						}

						// 已经存在 woff2，则无需重复处理
						if (block.includes(".woff2")) {
							return block;
						}

						// 替换 src
						return block.replace(
							/href=(["'])\/_astro\/fonts\/[^"']+\.ttf\1/g,
							`href="/_astro/fonts/${woff2File}"`,
						);
					});
					Content = Content.replace(fontFacePattern, (block) => {
						// 提取 font-family
						const familyMatch = block.match(
							/font-family\s*:\s*["']?([^;"'}]+)["']?/,
						);

						if (!familyMatch) return block;

						const family = familyMatch[1];

						// Astro 会在 font-family 后附加一段 hash，例如：
						// MarukoGothicCJKsc-Medium-d7eefb91b0e1b4cf
						// Loli-2e2a7b7cb5d9e781
						const familyBase = family.replace(/-[0-9a-f]{16}$/, "");

						// 当前 @font-face 不是正在处理的字体
						if (familyBase !== name) {
							return block;
						}

						// 已经存在 woff2，则无需重复处理
						if (block.includes(".woff2")) {
							return block;
						}

						// 替换 src
						return block.replace(
							/type=(["'])font\/ttf\1/g,
							'type="font/woff2"',
						);
						
					});					
					if (Content !== originalContent) {
						fs.writeFileSync(File, Content);
						console.log(
							`✓ Updated File: ${File} (${woff2File})`,
						);
					}
				}
			}
		}
	} catch (error) {
		console.error("⚠ CSS/HTML font reference update failed:", error.message);
	}
}
