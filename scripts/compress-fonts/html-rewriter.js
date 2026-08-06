import fs from "node:fs";
import path from "node:path";
import { ROOT_DIR, readFilesRecursively } from "./utils.js";
import { getFontConfigs } from "./config-parser.js";

/**
 * 更新 dist 中的 HTML，将 ttf 引用替换为 woff2
 */
export async function updateHtmlFontReferences() {
	console.log("[html-rewriter] started");

	try {
		const fonts = getFontConfigs();

		const distDir = path.join(ROOT_DIR, "dist/");
		const Files = readFilesRecursively(distDir).filter((f) =>
			f.endsWith(".html"),
		);
		if (Files.length === 0) {
			console.warn("⚠ No HTML files found in dist");
			return;
		}

		const deleteList = [];
		// 遍历所有字体
		for (const fontConfig of fonts) {
			for (const file of fontConfig.files) {
				const name=fontConfig.name;
				const woff2File = file.woff2Name;
				let hashName = null;
				const indexFile = path.join(ROOT_DIR, "dist/404.html");
				const indexContent = fs.readFileSync(indexFile, "utf8");
				
				//检测woff2文件是否被成功生成
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

				//获取 哈希值->字体 的映射向量
				const fontFacePattern = /@font-face\s*\{[^}]*\}/gs;
				let match;
				while ((match = fontFacePattern.exec(indexContent)) !== null) {
					const block = match[0];
					// fallback 字体没有 src:url
					if (!block.includes("src:url")) {
						continue;
					}
					// 提取 family
					const familyMatch = block.match(
						/font-family\s*:\s*["']?([^;"'}]+)["']?/,
					);
					if (!familyMatch) {
						continue;
					}
					const familyBase = familyMatch[1].replace(/-[0-9a-f]{16}$/, "");
					if (familyBase !== name) {
						continue;
					}
					// 提取 hash.ttf
					const srcMatch = block.match(
						/src:url\(["']\/_astro\/fonts\/([^"']+\.ttf)["']\)/,
					);
					if (!srcMatch) {
						continue;
					}
					hashName = srcMatch[1];
					break;
				}
				if (!hashName) {
					console.warn(`⚠ Cannot find hash font for ${name}`);
					continue;
				}else{
					deleteList.push(hashName);
				}
				console.log(`${name} -> ${hashName}`);//已经找到 哈希值->字体 的映射向量

				//遍历所有文件并替换引用
				for (const File of Files) {
					let Content = fs.readFileSync(File, "utf8");
					const originalContent = Content;

					Content = Content.replaceAll(
						hashName,
						woff2File,
					);
				
					Content = Content.replace(
        				new RegExp(
         				   `url\\((["'])?/_astro/fonts/${woff2File.replace(".", "\\.")}\\1\\)\\s*format\\((["'])truetype\\2\\)`,
        				    "g"
       					),
       					`url("/_astro/fonts/${woff2File}") format("woff2")`
    				);
				
					Content = Content.replace(
        				new RegExp(
         				   `href=(["'])/_astro/fonts/${woff2File.replace(".", "\\.")}\\1([^>]*?)type=(["'])font/ttf\\3`,
        				    "g"
        				),
        				`href="/_astro/fonts/${woff2File}"$2type="font/woff2"`
    				);
					if (Content !== originalContent) {
						fs.writeFileSync(File, Content);
							console.log(
							`✓ Updated File: ${File} (${woff2File})`,
						);
					}
				}
			}
		}

		//删除原来的ttf字体文件
		const astroFontDir = path.join(ROOT_DIR, "dist/_astro/fonts");
		for (const hashName of deleteList) {
   			const file = path.join(astroFontDir, hashName);
   			if (fs.existsSync(file)) {
   		    	fs.unlinkSync(file);
        		console.log(`🗑 Deleted ${hashName}`);
    		}
		}
	} catch (error) {
		console.error("⚠ HTML font reference update failed:", error.message);
	}
}