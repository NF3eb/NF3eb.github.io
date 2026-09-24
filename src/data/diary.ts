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
	// {
	// 	id: 1,
	// 	content:
	// 		"test",
	// 	date: "2026-07-06",
	// 	location:"Earth",
	// 	mood:"MOOD",
	// 	tags:["thisIsATag"],
	//  images: ["/images/diary/test.jpg"],
	// },
	{
		id: 1,
		content:
			"忙碌了两天的NF3eb师傅终于搭好了这个网站......",
		date: "2026-07-07",
	},
	{
		id: 2,
		content:
			"神秘GPT5.5在GPT5.6发布后突然降智并捏造根本无法生效的修改方案导致我做新页面做了一个下午",
		date: "2026-07-10",
	},
	{
		id: 3,
		content:
			"摸索一小时终于学会如何在文章里面插入图片了......",
		date: "2026-07-14 01:07:53",
	},
	{
		id: 4,
		content:
			"日更好累......开个MC新坑",
		date: "2026-07-15 23:20:53",
	},
	{
		id: 5,
		content:
			"成功带坏舍友打乌蒙",
		date: "2026-08-03",
		tags:["awmc"],
		images: ["/images/diary/20260803wm0.jpg","/images/diary/20260803wm1.jpg"],
	},
	{
		id: 6,
		content:
			"7000分",
		date: "2026-08-15",
		tags:["awmc"],
		images: ["/images/diary/20260815wm0.jpg"],
	},
	{
		id: 7,
		content:
			"第一个🐦➕",
		date: "2026-08-18",
		tags:["awmc"],
		images: ["/images/albums/wm/20260818wm0.png"],
	},
	{
		id: 8,
		content:
			"第一个🐦",
		date: "2026-08-19",
		tags:["awmc"],
		images: ["/images/albums/wm/20260819wm0.jpg"],
	},
	{
		id: 9,
		content:
			"w0紫框确认",
		date: "2026-08-25",
		tags:["awmc"],
		images: ["/images/diary/20260825wm0.jpg"],
	},
	{
		id: 10,
		content:
			"已逃离原生紫框",
		date: "2026-09-21",
		tags:["awmc"],
		images: ["/images/diary/20260921wm0.jpg"],
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
