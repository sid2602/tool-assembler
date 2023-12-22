import {
	Adaptive_item,
	Adaptive_item_category,
	PrismaClient,
	Tool_item,
	Tool_item_category,
} from "@prisma/client";
// import { createToolItemAndToolItemCategory } from "./seedData/tool_item";

const prisma = new PrismaClient();

interface ToolItem {
	category: Partial<Tool_item_category>;
	toolItems: Omit<Partial<Tool_item>, "id">[];
}

const drills: ToolItem = {
	category: {
		id: 0,
		name: "drill",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/drl_png.webp",
	},
	toolItems: [
		{
			name: "400.1-1250-075A1-NM N1DU",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427489_d50_0_0~tl04_00.png",
			DC: 12.5,
			LU: 75,
			LCF: 100.47,
			OAL: 150,
			DCON: "14",
			PL: 2.51,
			WT: 0.135,
			ULDR: 6,
		},
		{
			name: "452.1-0417-044A0-CM H10F",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427184_d50_0_1~tl04_00.png",
			DC: 4.168,
			LU: 44.45,
			LCF: 50.8,
			OAL: 101.6,
			DCON: "14",
			PL: 0.867,
			WT: 0.022,
			ULDR: 10.6646,
		},
	],
};

const millingCutters: ToolItem = {
	category: {
		id: 0,
		name: "Milling cutters",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/mil_png.webp",
	},
	toolItems: [
		{
			name: "162-090Q27-40",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427159_d50_0_0~tl04_00.png",
			DC: 90,
			LF: 75,
			LB: 48,
			BD: 72,
			BMC: "Steel",
			RMPX: "2,000 1/min",
			WT: 0.8366,
			HAND: "R",
			KAPR: 70,
			CICT: 11,
			MTP: "W",
			APMX: "9,8",
			ZEFP: 11,
			DCON: "27",
		},
		{
			name: "162-120Q27-60",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427159_d50_0_0~tl04_00.png",
			KAPR: 70,
			DC: 120,
			CICT: 11,
			MTP: "W",
			APMX: "14.7",
			ZEFP: 11,
			HAND: "R",
			DCON: "27",
			LF: 51,
			BMC: "Steel",
			RPMX: "2000 1/min",
			WT: 1.8,
		},
	],
};

interface AdaptiveItem {
	category: Partial<Adaptive_item_category>;
	adaptive_items: Omit<Partial<Adaptive_item>, "id">[];
}

const rotationSymetricalAdaptors: AdaptiveItem = {
	category: {
		id: 0,
		name: "Rotation symmetrical adaptors",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/adpcl_png.webp",
	},
	adaptive_items: [
		{
			name: "A1B05-40 27 100",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424022_d50_0_0~tl04_00.png",
			dcp: true,
			lf: 100,
			bd: 60,
			bdx: 63.5,
			lb: 80,
			lbx: 63.5,
			bhta: 0,
			rpm: "18000 1/min",
			bmc: "Steel",
			bbd: true,
			wt: 2.59,
		},
		{
			name: "392.54005C4027050",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view-on-item-level/preview-high/204032410_d50_0_0~tl04_04.jpg",
			bd: 60,
			bdx: 63.5,
			lb: 30.9,
			lbx: 50,
			bhta: 0,
			rpm: "18000 1/min",
			bmc: "Steel",
			bbd: true,
			wt: 1.463,
		},
	],
};

const collets: AdaptiveItem = {
	category: {
		id: 0,
		name: "drill",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/adpcl_png.webp",
	},
	adaptive_items: [
		{
			name: "393.14-25 140",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426884_d50_0_0~tl04_00.png",
			bd: 26,
			lf: 11.66,
			oal: 34,
			wt: 0.0562,
			lsc: 34,
		},
		{
			name: "C3-391.32-08 076",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202423385_d50_0_0~tl04_00.png",
			bd: 36,
			lf: 76,
			wt: 0.54,
			bmc: "Steel",
			bbd: true,
		},
	],
};

const tool_adaptive = [
	{ tool_name: "400.1-1250-075A1-NM N1DU", adaptive_name: "393.14-25 140" },
	{ tool_name: "452.1-0417-044A0-CM H10F", adaptive_name: "C3-391.32-08 076" },
	{ tool_name: "162-090Q27-40", adaptive_name: "A1B05-40 27 100" },
	{ tool_name: "162-090Q27-40", adaptive_name: "392.54005C4027050" },
	{ tool_name: "162-120Q27-60", adaptive_name: "A1B05-40 27 100" },
	{ tool_name: "162-120Q27-60", adaptive_name: "392.54005C4027050" },
];

async function main() {
	await prisma.tool_adaptive.deleteMany();

	await prisma.tool_item.deleteMany();
	await prisma.adaptive_item.deleteMany();

	await prisma.tool_item_category.deleteMany();
	await prisma.adaptive_item_category.deleteMany();

	//Tool items
	// await createToolItemAndToolItemCategory();
	const drillt_tool_item_category = await prisma.tool_item_category.upsert({
		where: {
			id: drills.category.id,
		},
		create: {
			name: drills.category.name ?? "",
			img: drills.category.img ?? "",
		},
		update: {},
	});

	for (let i = 0; i < drills.toolItems.length; i++) {
		await prisma.tool_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...drills.toolItems[i],
				name: drills.toolItems[i].name ?? "",
				img: drills.toolItems[i].img ?? "",
				category_id: drillt_tool_item_category.id,
			},
			update: {},
		});
	}

	const milling_category = await prisma.tool_item_category.upsert({
		where: {
			id: millingCutters.category.id,
		},
		create: {
			name: millingCutters.category.name ?? "",
			img: millingCutters.category.img ?? "",
		},
		update: {},
	});

	for (let i = 0; i < millingCutters.toolItems.length; i++) {
		await prisma.tool_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...millingCutters.toolItems[i],
				name: millingCutters.toolItems[i].name ?? "",
				img: millingCutters.toolItems[i].img ?? "",
				category_id: milling_category.id,
			},
			update: {},
		});
	}

	//adaptive items

	const collet_adaptive_item_category =
		await prisma.adaptive_item_category.upsert({
			where: {
				id: collets.category.id,
			},
			create: {
				name: collets.category.name ?? "",
				img: collets.category.img ?? "",
			},
			update: {},
		});

	for (let i = 0; i < collets.adaptive_items.length; i++) {
		await prisma.adaptive_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...collets.adaptive_items[i],
				name: collets.adaptive_items[i].name ?? "",
				img: collets.adaptive_items[i].img ?? "",
				category_id: collet_adaptive_item_category.id,
			},
			update: {},
		});
	}

	const rotational_category = await prisma.adaptive_item_category.upsert({
		where: {
			id: rotationSymetricalAdaptors.category.id,
		},
		create: {
			name: rotationSymetricalAdaptors.category.name ?? "",
			img: rotationSymetricalAdaptors.category.img ?? "",
		},
		update: {},
	});

	for (let i = 0; i < rotationSymetricalAdaptors.adaptive_items.length; i++) {
		await prisma.adaptive_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...rotationSymetricalAdaptors.adaptive_items[i],
				name: rotationSymetricalAdaptors.adaptive_items[i].name ?? "",
				img: rotationSymetricalAdaptors.adaptive_items[i].img ?? "",
				category_id: rotational_category.id,
			},
			update: {},
		});
	}

	//Tool adaptive

	for (let i = 0; i < tool_adaptive.length; i++) {
		const tool_item = await prisma.tool_item.findFirst({
			where: { name: tool_adaptive[i].tool_name },
		});

		if (tool_item === null) {
			continue;
		}

		const adaptive_item = await prisma.adaptive_item.findFirst({
			where: { name: tool_adaptive[i].adaptive_name },
		});

		if (adaptive_item === null) {
			continue;
		}

		await prisma.tool_adaptive.create({
			data: {
				adaptive_item_id: adaptive_item.id,
				tool_item_id: tool_item.id,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
