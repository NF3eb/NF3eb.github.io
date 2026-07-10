import fs from "node:fs";
import path from "node:path";

import localGameList from "../data/game";
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";

export interface RawGameItem {
	title?: string;
	cover?: string;
	link?: string;
	description?: string;
	playtime?: string;
	rankingplaytime?: number;
	duration?: string;
	genre?: string[];
}

export interface GameItem {
	title: string;
	cover: string;
	link: string;
	description: string;
	playtime: string;
	rankingplaytime: number;
	duration: string;
	genre: string[];
}

export type GameSourceConfig =
	| { type: "local"; data: GameItem[] }
	| {
			type: "json";
			filename: string;
			fetchOnDev?: boolean;
			emptyDescription?: string;
	  };

export function loadGameData(filename: string): GameItem[] {
	const dataPath = path.join(process.cwd(), `src/data/${filename}`);

	if (!fs.existsSync(dataPath)) {
		console.warn(`[Game] Data file not found: ${dataPath}`);
		return [];
	}

	try {
		const fileContent = fs.readFileSync(dataPath, "utf-8");
		const rawData = JSON.parse(fileContent) as RawGameItem[];

		return rawData.map((item) => ({
			title: item.title || "Unknown",
			cover: item.cover || "",
			link: item.link || "",
			description: item.description || "",
			playtime: item.playtime || "",
			rankingplaytime: item.rankingplaytime || 0,
			duration: item.duration || "",
			genre: Array.isArray(item.genre) ? item.genre : [],
		}));
	} catch (error) {
		console.error(`[Game] Failed to parse ${filename}:`, error);
		return [];
	}
}

export function getGameSourceConfigs(): Record<string, GameSourceConfig> {
	return {
		local: {
			type: "local",
			data: localGameList,
		},
		bilibili: {
			type: "json",
			filename: "bilibili-data.json",
			fetchOnDev: undefined,
			emptyDescription: i18n(I18nKey.gameEmptyBilibili),
		},
		bangumi: {
			type: "json",
			filename: "bangumi-data.json",
			fetchOnDev: undefined,
			emptyDescription: i18n(I18nKey.gameEmptyBangumi),
		},
	};
}

export function getGameList(
	mode: string,
	sourceConfigs: Record<string, GameSourceConfig>,
): { gameList: GameItem[]; currentConfig: GameSourceConfig | undefined } {
	let gameList: GameItem[] = [];
	const currentConfig = sourceConfigs[mode];

	if (currentConfig) {
		if (currentConfig.type === "local") {
			gameList = currentConfig.data;
		} else if (currentConfig.type === "json") {
			const isDev = import.meta.env.DEV;
			const shouldFetchOnDev = currentConfig.fetchOnDev ?? false;
			const skipLoad = isDev && !shouldFetchOnDev;

			if (skipLoad) {
				console.log(`[Dev] Skipping ${mode} data load (fetchOnDev is off).`);
				gameList = [];
			} else {
				gameList = loadGameData(currentConfig.filename);
			}
		}
	} else {
		console.warn(`[Game] Unknown or unconfigured mode: ${mode}`);
	}

	return { gameList, currentConfig };
}
