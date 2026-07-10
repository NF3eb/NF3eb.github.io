// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Evans的小屋",
		imgurl: "https://img.evanser.top/page-img/%E5%A4%B4%E5%83%8F.png",
		desc: "学生时代开始的blog",
		siteurl: "https://www.evanser.top/",
		tags: ["硬件工程","计算机体系结构","生活记录"],
	},
	{
		id: 2,
		title: "柒世纪视频组",
		imgurl: "https://7thcv.cn/%E8%A7%86%E9%A2%91%E7%BB%84%E5%90%88%E7%85%A72025.png",
		desc: "一个专注于MAD与三维动画创作研究的学生社团。",
		siteurl: "https://7thcv.cn/",
		tags: ["媒体制作"],
	},
	{
		id: 3,
		title: "Lucian",
		imgurl: "https://lucian-prog.github.io/images/avatar.png",
		desc: "记录数字 IC、计算机体系结构与硬件工程学习过程",
		siteurl: "https://lucian-prog.github.io/",
		tags: ["硬件工程","计算机体系结构","数字 IC"],
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
