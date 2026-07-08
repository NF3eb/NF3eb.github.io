// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	设备: [
		{
			name: "小米 15",
			image: "/images/device/xiaomi15.png",
			specs: "12GB + 512GB",
			description: "",
			link: "https://www.mi.com/prod/xiaomi-15",
		},
		{
			name: "iPad 7(2019)",
			image: "/images/device/ipad7.png",
			specs: "128GB",
			description: "我不是音游吃wwwwwww",
			link: "https://support.apple.com/zh-cn/111911",
		},
		{
			name: "机械革命 翼龙15Pro",
			image: "/images/device/yilong15pro.webp",
			specs: "R7-8745H+780M RTX4060 16GB+1T+2T",
			description: "",
			link: "https://www.mechrevo.com/cn/products/yi-long-15-pro",
		},
	],
};
