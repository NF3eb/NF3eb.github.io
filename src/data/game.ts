// 本地游戏数据配置
export interface GameItem {
	title: string;
	cover: string;
	description: string;
	genre: string[];
	playtime: string;// 此时间用于界面展示
	rankingplaytime:number;// 此时间用于实际排序
	duration: string;
	link: string;
}

const localGameList: GameItem[] = [
	{
		title: "APEX Legends",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/1172470/0bd74245b869287a2dc7f682e6013f7ed08d98e3/header.jpg?t=1778502442",
		description: "这垃圾游戏怎么这么好玩",
		genre: ["射击游戏","FPS","大逃杀"],
		playtime: "722.6h",
		rankingplaytime:722.6,
		duration: "2022.8-至今",
		link: "https://store.steampowered.com/app/1172470",
	},
	{
		title: "Factorio",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/427520/header.jpg?t=1763986204",
		description: "I can do this all day",
		genre: ["沙盒","工厂"],
		playtime: "143.1h",
		rankingplaytime:143.1,
		duration: "2026.1-2026.2",
		link: "https://store.steampowered.com/app/427520/",
	},
	{
		title: "Slay the spire",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/646570/header.jpg?t=1774015376",
		description: "冷知识：这个网站的图标其实是故障机器人",
		genre: ["卡牌","回合制","Rougelike"],
		playtime: "73.2h",
		rankingplaytime:73.2,
		duration: "2025.9-至今",
		link: "https://store.steampowered.com/app/646570",
	},
	{
		title: "Slay the spire 2",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/2868840/b0958d387dc366211e0f353443710cfcf9fdb020/header.jpg?t=1776735385",
		description: "回响形态了 回响形态",
		genre: ["卡牌","回合制","Rougelike"],
		playtime: "123.7h",
		rankingplaytime:123.7,
		duration: "2026.3-至今",
		link: "https://store.steampowered.com/app/2868840",
	},
	{
		title: "Minecraft",
		cover: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg",
		description: "我的世界",
		genre: ["沙盒"],
		playtime: "≈600h",
		rankingplaytime:600,
		duration: "2016-至今",
		link: "https://www.minecraft.net/",
	},
	{
		title: "Mindustry",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/1127400/98714db25e9ef5a6ea3d39cd0709a60aae41e8dd/header.jpg?t=1776201279",
		description: "自动化，塔防与RTS",
		genre: ["沙盒","工厂"],
		playtime: "≈300h",
		rankingplaytime:300,
		duration: "2021.5-2025.9",
		link: "https://github.com/Anuken/Mindustry",
	},
	{
		title: "幻兽帕鲁",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/1623730/1b0709ec8de093a97a0bf43e799933eae4faef35/header_schinese.jpg?t=1783654507",
		description: "你不干有的是帕鲁干",
		genre: ["沙盒","生存建造","捉宠"],
		playtime: "91.9h",
		rankingplaytime:91.9 ,
		duration: "2024.1-2026.4",
		link: "https://store.steampowered.com/app/1623730",
	},
	{
		title: "卡拉比丘",
		cover: "/assets/game/CalabiYau.png",
		description: "卡拉比丘似了喵",
		genre: ["射击游戏","TPS"],
		playtime: "≈50h",
		rankingplaytime:50,
		duration: "2025.10-至今",
		link: "https://klbq.idreamsky.com/?nav=home",
	},
	{
		title: "Sephiria",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/2436940/cb7dc6f4ed2f0012eb557365966be9b69815f7ae/header.jpg?t=1783515618",
		description: "像素风动作Rougelike",
		genre: ["动作游戏","Rougelike"],
		playtime: "27.7h",
		rankingplaytime:27.7,
		duration: "2026.3-2026.4",
		link: "https://store.steampowered.com/app/2436940",
	},
	{
		title: "EverSpace",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/396750/header.jpg?t=1778565150",
		description: "玩多了好晕QAQ",
		genre: ["射击游戏","太空"],
		playtime: "25.5h",
		rankingplaytime:25.5,
		duration: "2022.12-2024.3",
		link: "https://store.steampowered.com/app/396750",
	},
	{
		title: "Titanfall®2",
		cover: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/1237970/header.jpg?t=1779987598",
		description: "我不要当薯条......",
		genre: ["射击游戏","FPS"],
		playtime: "27.4h",
		rankingplaytime:27.4,
		duration: "2022.12-2023.11",
		link: "https://store.steampowered.com/app/1237970",
	},
];
export function getGamesList(): GameItem[] {
	return localGameList;
}

export function getSortedGamesList(): GameItem[] {
	return [...localGameList].sort((a, b) => {
		return b.rankingplaytime - a.rankingplaytime;
	});
}

export default getSortedGamesList();
