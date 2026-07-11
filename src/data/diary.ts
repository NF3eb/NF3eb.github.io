// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	{
		id: 1,
		content:
			"test",
		date: "2026-07-06",
		location:"Earth",
		mood:"MOOD",
		tags:["thisIsATag"],
	},
	{
		id: 2,
		content:
			"忙碌了两天的NF3eb师傅终于搭好了这个网站......",
		date: "2026-07-07",
	},
	{
		id: 3,
		content:
			"神秘GPT5.5在GPT5.6发布后突然降智并捏造根本无法生效的修改方案导致我做新页面做了一个下午",
		date: "2026-07-10",
	},
];

// 获取日记列表（按id倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = [...diaryData].sort(
		(a, b) => b.id - a.id,
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	for (const item of diaryData) {
		if (item.tags) {
			for (const tag of item.tags) {
				tags.add(tag);
			}
		}
	}
	return Array.from(tags).sort();
};
