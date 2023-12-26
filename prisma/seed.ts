import {
	Adaptive_item,
	Adaptive_item_category,
	Cutting_item,
	Cutting_item_category,
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
		{
			name: "460.1-0805-024A1-XM GC34",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426943_d50_0_0~tl04_00.png",
			DCON: "10",
			LU: 25.3,
			ULDR: 3.1429,
			SIG: 140,
			PL: 1.2,
			OAL: 89,
			LF: 87.8,
			LCF: 47,
			RPMX: "11 862 1/min",
			WT: 0.0707,
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
		{
			name: "345-040A32-13M",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view-on-item-level/preview/202702493_d50_0_3~tl04_04.jpg",
			KAPR: 45,
			DC: 40,
			DCX: 54.08,
			CICT: 4,
			MTP: "S",
			APMX: "6",
			CPDF: true,
			ZEFP: 4,
			HAND: "R",
			DCON: "32",
			LF: 120,
			LB: 40,
			GAMF: 6.3297,
			GAMP: 11.1679,
			BMC: "Steel",
			RPMX: "19600 1/min",
			WT: 0.854,
		},
	],
};

interface AdaptiveItem {
	category: Partial<Adaptive_item_category>;
	adaptive_items: Omit<Partial<Adaptive_item>, "id">[];
}

interface AdaptiveItemWithoutCategory {
	adaptive_items: Omit<Partial<Adaptive_item>, "id">[];
}

const rotationSymetricalAdaptors: AdaptiveItem = {
	category: {
		id: 0,
		name: "Rotation symmetrical adaptors",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/adprs_png.webp",
	},
	adaptive_items: [
		{
			name: "A1B05-40 27 100",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424022_d50_0_0~tl04_00.png",
			number_of_possible_tool_items: 1,
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
			number_of_possible_tool_items: 1,
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
		name: "Collets",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/adpcl_png.webp",
	},
	adaptive_items: [
		{
			name: "393.14-25 140",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426884_d50_0_0~tl04_00.png",
			number_of_possible_tool_items: 1,
			bd: 26,
			lf: 11.66,
			oal: 34,
			wt: 0.0562,
			lsc: 34,
		},
		{
			name: "C3-391.32-08 076",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202423385_d50_0_0~tl04_00.png",
			number_of_possible_tool_items: 1,
			bd: 36,
			lf: 76,
			wt: 0.54,
			bmc: "Steel",
			bbd: true,
		},
		{
			name: "393.14-50 320",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426884_d50_0_0~tl04_00.png",
			number_of_possible_tool_items: 1,
			dcon: "52",
			lsc: 60,
			lf: 21.08,
			oal: 60,
			bd: 52,
			wt: 0.3647,
		},
		{
			name: "132L-1610050-B",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426929_d50_0_0~tl04_00.png",
			number_of_possible_tool_items: 1,
			dcon: "25,4",
			lsc: 55,
			lf: 5,
			oal: 55,
			bd: 31.4,
			lb: 5,
			bhta: 0,
			wt: 0.193,
		},
	],
};

const adaptive_item_without_category: AdaptiveItemWithoutCategory = {
	adaptive_items: [
		{
			name: "AA3B27-40 32 090",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424168_d50_0_0~tl04_00.png",
			dcp: true,
			dcon: "31,75",
			crks: '5/8"-11',
			kapr: 0,
			lsc: 64,
			lf: 90,
			bd: 51,
			bdx: 63.5,
			lb: 67.902,
			lbx: 90,
			bhta: 0,
			bbd: true,
			wt: 1.51,
		},
		{
			name: "A416.2-LX25-32",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427348_d50_0_0~tl04_00.png",
			dcon: "31,75",
			lsc: 65,
			lf: 2.5,
			oal: 65,
			bd: 40,
			lb: 5,
			bhta: 0,
			wt: 0.145,
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
	{ tool_name: "345-040A32-13M", adaptive_name: "393.14-50 320" },
	{ tool_name: "460.1-0805-024A1-XM GC34", adaptive_name: "132L-1610050-B" },
];

const adaptive_matching = [
	{ machine_dir: "A416.2-LX25-32", workpiece_dir: "132L-1610050-B" },
	{ machine_dir: "AA3B27-40 32 090", workpiece_dir: "A416.2-LX25-32" },
];

interface CuttingItem {
	category: Partial<Cutting_item_category>;
	cutting_items: Omit<Partial<Cutting_item>, "id">[];
}

const millingInserts: CuttingItem = {
	category: {
		id: 0,
		name: "Milling inserts",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/inscmil_png.webp",
	},
	cutting_items: [
		{
			name: "176M40-N100608E-PM 1130",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426656_d50_0_0~tl04_00.png",
			ifs: 1,
			d1: 2.2,
			cedc: 1,
			gan: 0,
			w1: 9.78,
			s: 5.5,
			wt: 0.008,
		},
		{
			name: "345N-1305E-KW8 3220",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202425497_d50_0_0~tl04_00.png",
			ifs: 3,
			d1: 4.8,
			cedc: 2,
			ic: 13,
			sc: "S",
			le: 8.8,
			apmx: 6,
			bs: 8,
			bsr: 500,
			re: 1,
			krins: 45,
			gan: 22,
			s: 5.05,
			wt: 0.0102,
		},
	],
};

const tool_cutting = [
	{ tool_name: "345-040A32-13M", cutting_name: "345N-1305E-KW8 3220" },
	{ tool_name: "162-090Q27-40", cutting_name: "176M40-N100608E-PM 1130" },
	{ tool_name: "162-120Q27-60", cutting_name: "176M40-N100608E-PM 1130" },
];

async function main() {
	await prisma.tool_assembly_tool_item.deleteMany();
	await prisma.tool_assembly_cutting_item.deleteMany();
	await prisma.tool_assembly_adaptive_item.deleteMany();

	await prisma.tool_cutting.deleteMany();
	await prisma.tool_adaptive.deleteMany();
	await prisma.adaptive_item_matching.deleteMany();

	await prisma.tool_item.deleteMany();
	await prisma.adaptive_item.deleteMany();
	await prisma.cutting_item.deleteMany();

	await prisma.tool_item_category.deleteMany();
	await prisma.adaptive_item_category.deleteMany();
	await prisma.cutting_item_category.deleteMany();
	await prisma.tool_assembly.deleteMany();

	// //Tool items

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

	for (
		let i = 0;
		i < adaptive_item_without_category.adaptive_items.length;
		i++
	) {
		await prisma.adaptive_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...adaptive_item_without_category.adaptive_items[i],
				name: adaptive_item_without_category.adaptive_items[i].name ?? "",
				img: adaptive_item_without_category.adaptive_items[i].img ?? "",
			},
			update: {},
		});
	}

	//Adaptive matching

	for (let i = 0; i < adaptive_matching.length; i++) {
		const adaptive_item_machine = await prisma.adaptive_item.findFirst({
			where: { name: adaptive_matching[i].machine_dir },
		});

		if (adaptive_item_machine === null) {
			continue;
		}

		const adaptive_item_workiece = await prisma.adaptive_item.findFirst({
			where: { name: adaptive_matching[i].workpiece_dir },
		});

		if (adaptive_item_workiece === null) {
			continue;
		}

		await prisma.adaptive_item_matching.create({
			data: {
				machine_direction_adaptive_id: adaptive_item_machine.id,
				worpiece_direction_adaptive_id: adaptive_item_workiece.id,
			},
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

	// cutting items

	const miling_inserts_cutting_item_category =
		await prisma.cutting_item_category.upsert({
			where: {
				id: millingInserts.category.id,
			},
			create: {
				name: millingInserts.category.name ?? "",
				img: millingInserts.category.img ?? "",
			},
			update: {},
		});

	for (let i = 0; i < millingInserts.cutting_items.length; i++) {
		await prisma.cutting_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...millingInserts.cutting_items[i],
				name: millingInserts.cutting_items[i].name ?? "",
				img: millingInserts.cutting_items[i].img ?? "",
				category_id: miling_inserts_cutting_item_category.id,
			},
			update: {},
		});
	}

	//Tool cutting

	for (let i = 0; i < tool_cutting.length; i++) {
		const tool_item = await prisma.tool_item.findFirst({
			where: { name: tool_cutting[i].tool_name },
		});

		if (tool_item === null) {
			continue;
		}

		const cutting_item = await prisma.cutting_item.findFirst({
			where: { name: tool_cutting[i].cutting_name },
		});

		if (cutting_item === null) {
			continue;
		}

		await prisma.tool_cutting.create({
			data: {
				cutting_item_id: cutting_item.id,
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
