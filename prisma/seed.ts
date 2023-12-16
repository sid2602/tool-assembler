import {
	Adaptive_item,
	Adaptive_item_category,
	PrismaClient,
	Tool_item,
	Tool_item_category,
} from "@prisma/client";
const prisma = new PrismaClient();

interface DrillToolItem {
	category: Partial<Tool_item_category>;
	toolItems: Omit<Partial<Tool_item>, "id">[];
}

const drills: DrillToolItem = {
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
			// DCON: 14,
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
			// DCON: 14,
			PL: 0.867,
			WT: 0.022,
			ULDR: 10.6646,
		},
	],
};

interface ColletAdaptiveItem {
	category: Partial<Adaptive_item_category>;
	adaptive_items: Omit<Partial<Adaptive_item>, "id">[];
}

const collets: ColletAdaptiveItem = {
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
];

async function main() {
	await prisma.tool_adaptive.deleteMany();

	await prisma.tool_item.deleteMany();
	await prisma.adaptive_item.deleteMany();

	await prisma.tool_item_category.deleteMany();
	await prisma.adaptive_item_category.deleteMany();

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
				// DC: drills.toolItems[i]?.DC ?? undefined,
				// LU: drills.toolItems[i]?.LU ?? undefined,
				// LCF: drills.toolItems[i]?.LCF ?? undefined,
				// OAL: drills.toolItems[i]?.OAL ?? undefined,
				// PL: drills.toolItems[i]?.PL ?? undefined,
				// WT: drills.toolItems[i]?.WT ?? undefined,
				// ULDR: drills.toolItems[i]?.ULDR ?? undefined,
			},
			update: {},
		});
	}

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

	// const adaptive_item_first = await prisma.adaptive_item.findFirst({});
	// if (adaptive_item_first === null) {
	// 	return;
	// }
	// const tool_item_first = await prisma.tool_item.findFirst({});
	// if (tool_item_first === null) {
	// 	return;
	// }

	// const many = await prisma.tool_adaptive.create({
	// 	data: {
	// 		adaptive_item_id: adaptive_item_first.id,
	// 		tool_item_id: tool_item_first.id,
	// 	},
	// });

	// const t = await prisma.adaptive_item.findMany({
	// 	include: {
	// 		connecting_tool_item: true,
	// 	},
	// });
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
