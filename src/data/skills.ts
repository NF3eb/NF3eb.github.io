// Skill data configuration file
// Used to manage data for the skill display page
// "simple-icons:sqlite"镇bug塔QAQ
import { calculateExperience } from "@/utils/experience";
export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "programming" | "media" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	startDate: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	{
		id: "cpp",
		name: "C++",
		description:"我接触的第一门编程语言。",
		icon: "logos:c-plusplus",
		category: "programming",
		level: "intermediate",
		startDate: { years: 2021, months: 2 },
		projects: [],
		color: "#00599C",
	},
	{
		id: "c",
		name: "C",
		description:"我用于单片机与嵌入式开发的主要语言。",
		icon: "logos:c",
		category: "programming",
		level: "intermediate",
		startDate: { years: 2025, months: 8 },
		projects: [],
		color: "#A8B9CC",
	},
	{
		id: "python",
		name: "Python",
		description:"这玩意比C语言好用多了.jpg。",
		icon: "logos:python",
		category: "programming",
		level: "beginner",
		startDate: { years: 2026, months: 7 },
		projects: [],
		color: "#3776AB",
	},
	{
		id: "photoshop",
		name: "Adobe Photoshop",
		description:"专业的图像合成软件",
		icon: "skill-icons:photoshop",
		category: "media",
		level: "intermediate",
		startDate: { years: 2023, months: 12 },
		projects: [],
		color: "#31A8FF",
	},
	{
		id: "premiere",
		name: "Adobe Premiere",
		description:"专业的媒体处理软件。",
		icon: "skill-icons:premiere",
		category: "media",
		level: "intermediate",
		startDate: { years: 2024, months: 6 },
		projects: [],
		color: "#9999FF",
	},
	{
		id: "aftereffects",
		name: "Adobe After Effects",
		description:"专业的动画与特效制作软件。",
		icon: "skill-icons:aftereffects" ,
		category: "media",
		level: "beginner",
		startDate: { years: 2026, months: 1 },
		projects: [],
		color: "#9999FF",
	},
];