import {
	Adaptive_item,
	Adaptive_item_category,
	Assembly_item,
	Assembly_item_category,
	Cutting_item,
	Cutting_item_category,
	Dictonary,
	PrismaClient,
	Tool_item,
	Tool_item_category,
} from "@prisma/client";

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
			dc: 12.5,
			lu: 75,
			lcf: 100.47,
			oal: 150,
			dcon: "14",
			pl: 2.51,
			wt: 0.135,
			uldr: 6,
		},
		{
			name: "452.1-0417-044A0-CM H10F",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427184_d50_0_1~tl04_00.png",
			dc: 4.168,
			lu: 44.45,
			lcf: 50.8,
			oal: 101.6,
			dcon: "14",
			pl: 0.867,
			wt: 0.022,
			uldr: 10.6646,
		},
		{
			name: "460.1-0805-024A1-XM GC34",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426943_d50_0_0~tl04_00.png",
			dcon: "10",
			lu: 25.3,
			uldr: 3.1429,
			sig: 140,
			pl: 1.2,
			oal: 89,
			lf: 87.8,
			lcf: 47,
			rpmx: "11 862 1/min",
			wt: 0.0707,
		},
	],
};

const turningTools: ToolItem = {
	category: {
		id: 0,
		name: "Turning tools",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/trn_png.webp",
	},
	toolItems: [
		{
			name: "SL-SVXBL-40A-16-050 A",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view-on-item-level/preview/204081522_d50_0_0~tl04_04.jpg",
			mtp: "S",
			rmpx: "75",
			dmin: 50,
			lu: 15,
			hand: "L",
			dcon: "40",
			lf: 45,
			wf: 0.53,
			hf: 6,
			bd: 40,
			gamo: 2,
			lams: 0,
			bmc: "Steel",
			wt: 0.18,
		},
	],
};

const Cartridge: ToolItem = {
	category: {
		id: 0,
		name: "Cartridges",
		img: "https://cdn.sandvik.coromant.com/files/sitecollectionimages/tpchierarchy/blt_png.webp",
	},
	toolItems: [
		{
			name: "R826C-BF23STUC11HP",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424568_d50_0_0~tl04_00.png",
			mtp: "S",
			dmin: 56,
			hand: "R",
			lf: 23,
			wf: 10.5,
			oah: 23.5,
			oaw: 13.2,
			wt: 0.04,
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
			dc: 90,
			lf: 75,
			lb: 48,
			bd: 72,
			bmc: "Steel",
			rpmx: "2,000 1/min",
			wt: 0.8366,
			hand: "R",
			kapr: 70,
			cict: 11,
			mtp: "W",
			apmx: "9,8",
			zefp: 11,
			dcon: "27",
		},
		{
			name: "162-120Q27-60",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427159_d50_0_0~tl04_00.png",
			kapr: 70,
			dc: 120,
			cict: 11,
			mtp: "W",
			apmx: "14.7",
			zefp: 11,
			hand: "R",
			dcon: "27",
			lf: 51,
			bmc: "Steel",
			rpmx: "2000 1/min",
			wt: 1.8,
		},
		{
			name: "345-040A32-13M",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view-on-item-level/preview/202702493_d50_0_3~tl04_04.jpg",
			kapr: 45,
			dc: 40,
			dcx: 54.08,
			cict: 4,
			mtp: "S",
			apmx: "6",
			cpdf: true,
			zefp: 4,
			hand: "R",
			dcon: "32",
			lf: 120,
			lb: 40,
			gamf: 6.3297,
			gamp: 11.1679,
			bmc: "Steel",
			rpmx: "19600 1/min",
			wt: 0.854,
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
			can_have_tool_item: true,
			number_of_possible_connections: 1,

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
			can_have_tool_item: true,
			number_of_possible_connections: 1,

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
			can_have_tool_item: true,
			number_of_possible_connections: 1,
			bd: 26,
			lf: 11.66,
			oal: 34,
			wt: 0.0562,
			lsc: 34,
		},
		{
			name: "C3-391.32-08 076",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202423385_d50_0_0~tl04_00.png",
			can_have_tool_item: true,
			number_of_possible_connections: 1,

			bd: 36,
			lf: 76,
			wt: 0.54,
			bmc: "Steel",
			bbd: true,
		},
		{
			name: "393.14-50 320",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426884_d50_0_0~tl04_00.png",
			can_have_tool_item: true,
			number_of_possible_connections: 1,

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
			can_have_tool_item: true,
			number_of_possible_connections: 1,

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

const bridges: AdaptiveItem = {
	category: {
		id: 0,
		name: "Bridges",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424572_d50_0_0~tl04_00.png",
	},
	adaptive_items: [
		{
			can_have_tool_item: false,
			number_of_possible_connections: 2,
			name: "A33-R822XLS17-LJ030",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424572_d50_0_0~tl04_00.png",
			lf: 30,
			oah: 104,
			bmc: "Aluminium",
			wt: 1.024,
		},
	],
};

const slidges: AdaptiveItem = {
	category: {
		id: 0,
		name: "Slidges",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424631_d50_0_0~tl04_00.png",
	},
	adaptive_items: [
		{
			can_have_tool_item: true,
			number_of_possible_connections: 1,
			name: "S17-R820XL-40A-018",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424631_d50_0_0~tl04_00.png",
			lf: 18,
			wf: 11.8,
			oah: 104,
			oaw: 78.5,
			bmc: "Steel",
			wt: 0.804,
		},
		{
			can_have_tool_item: false,
			number_of_possible_connections: 1,
			name: "S17-R825XLA34-020",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202423932_d50_0_0~tl04_00.png",
			lf: 20,
			wf: 9,
			oah: 104,
			oaw: 72,
			bmc: "Aluminium",
			wt: 0.374,
		},
	],
};

const boringHeads: AdaptiveItem = {
	category: {
		id: 0,
		name: "Boring heads",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424573_d50_0_0~tl04_00.png",
	},
	adaptive_items: [
		{
			can_have_tool_item: true,
			number_of_possible_connections: 1,
			name: "A34-R826C-E024HP",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424573_d50_0_0~tl04_00.png",
			oal: 51,
			lf: 24,
			wf: 21,
			hf: 0,
			bmc: "Steel",
			wt: 0.665,
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
	{ tool_name: "SL-SVXBL-40A-16-050 A", adaptive_name: "S17-R820XL-40A-018" },
	{ tool_name: "R826C-BF23STUC11HP", adaptive_name: "A34-R826C-E024HP" },
];

const adaptive_matching = [
	{ machine_dir: "A416.2-LX25-32", workpiece_dir: "132L-1610050-B" },
	{ machine_dir: "AA3B27-40 32 090", workpiece_dir: "A416.2-LX25-32" },
	{ machine_dir: "A33-R822XLS17-LJ030", workpiece_dir: "S17-R820XL-40A-018" },
	{ machine_dir: "A33-R822XLS17-LJ030", workpiece_dir: "S17-R825XLA34-020" },
	{ machine_dir: "S17-R825XLA34-020", workpiece_dir: "A34-R826C-E024HP" },
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

const TurningInserts: CuttingItem = {
	category: {
		id: 0,
		name: "Turning inserts",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426004_d50_0_0~tl04_00.png",
	},
	cutting_items: [
		{
			name: "VBGT 16 04 01-UM 1115",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202426004_d50_0_0~tl04_00.png",
			ifs: 3,
			d1: 4.4,
			cedc: 2,
			ic: 9.525,
			sc: "V",
			le: 16.5063,
			re: 0.1,
			s: 4.7625,
			an: 5,
			wt: 0.007,
		},
		{
			name: "TCEX 11 03 00L-F 1125",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202424915_d50_0_0~tl04_00.png",
			ifs: 3,
			d1: 2.8,
			ic: 6.35,
			sc: "T",
			le: 10.74,
			re: 0.02,
			s: 3.175,
			an: 7,
			wt: 0.0013,
		},
	],
};

const tool_cutting = [
	{ tool_name: "345-040A32-13M", cutting_name: "345N-1305E-KW8 3220" },
	{ tool_name: "162-090Q27-40", cutting_name: "176M40-N100608E-PM 1130" },
	{ tool_name: "162-120Q27-60", cutting_name: "176M40-N100608E-PM 1130" },
	{ tool_name: "SL-SVXBL-40A-16-050 A", cutting_name: "VBGT 16 04 01-UM 1115" },
	{ tool_name: "R826C-BF23STUC11HP", cutting_name: "TCEX 11 03 00L-F 1125" },
];

interface AssemblyItem {
	category: Partial<Assembly_item_category>;
	assembly_items: Omit<Partial<Assembly_item>, "id">[];
}

const Screw: AssemblyItem = {
	category: {
		id: 0,
		name: "Screw",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
	},
	assembly_items: [
		//A33-R822XLS17-LJ030
		{
			name: "3212 010-462",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		{
			name: "3212 010-446",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		{
			name: "3214 010-355",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		{
			name: "3212 230-207",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		//S17-R820XL-40A-018
		{
			name: "3212 010-359",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		{
			name: "3214 010-303",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		//SL-SVXBL-40A-16-050 A
		{
			name: "5513 020-10",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203859111_d50_0_1~tl04_00.png",
		},
		//A34-R826C-E024HP
		{
			name: "5513 010-08",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203716261_d50_0_0~tl04_00.png",
		},
		{
			name: "3214 011-405",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		{
			name: "3212 010-360",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		//R826C-BF23STUC11HP
		{
			name: "5513 020-03",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203859111_d50_0_1~tl04_00.png",
		},
		//AA3B27-40 32 090
		{
			name: "5514 022-06",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203859111_d50_0_1~tl04_00.png",
		},
		{
			name: "3214 010-253",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203859111_d50_0_1~tl04_00.png",
		},
		//162-090Q27-40   162-120Q27-60
		{
			name: "5516 014-06",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203724501_d50_0_0~tl04_00.png",
		},
		////A1B05-40 27 100
		{
			name: "3212 020-512",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		//392.54005C4027050
		{
			name: "3212 020-514",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		{
			name: "3212 010-258",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427096_d50_0_0~tl04_00.png",
		},
		//345-040A32-13M
		{
			name: "416.1-834",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203859111_d50_0_1~tl04_00.png",
		},
		{
			name: "5512 090-11",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427104_d50_0_0~tl04_00.png",
		},
	],
};

const Washer: AssemblyItem = {
	category: {
		id: 0,
		name: "Washer",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427517_d50_0_1~tl04_00.png",
	},
	assembly_items: [
		//A33-R822XLS17-LJ030
		{
			name: "3411 013-105",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427517_d50_0_1~tl04_00.png",
		},
		{
			name: "3411 012-084",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427517_d50_0_1~tl04_00.png",
		},
		//A34-R826C-E024HP
		{
			name: "3411 010-064",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427517_d50_0_1~tl04_00.png",
		},
		//162-090Q27-40   162-120Q27-60
		{
			name: "5541 009-03",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203699577_d50_0_0~tl04_00.png",
		},
		{
			name: "5541 009-02",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203699577_d50_0_0~tl04_00.png",
		},
		//A1B05-40 27 100
		{
			name: "5541 015-03",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203699577_d50_0_0~tl04_00.png",
		},
		//392.54005C4027050
		{
			name: "5541 015-03",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203699577_d50_0_0~tl04_00.png",
		},
	],
};

const ORing: AssemblyItem = {
	category: {
		id: 0,
		name: "O-Ring",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427523_d50_0_1~tl04_00.png",
	},
	assembly_items: [
		//S17-R820XL-40A-018
		{
			name: "3671 010-113",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427523_d50_0_1~tl04_00.png",
		},
		//A34-R826C-E024HP
		{
			name: "3671 010-016",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427523_d50_0_1~tl04_00.png",
		},
	],
};

const Cover: AssemblyItem = {
	category: {
		id: 0,
		name: "Cover",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/205054612_d50_0_0~tl04_00.png",
	},
	assembly_items: [
		//S17-R820XL-40A-018
		{
			name: "5549 051-01",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/205054612_d50_0_0~tl04_00.png",
		},
	],
};

const Bush: AssemblyItem = {
	category: {
		id: 0,
		name: "Bush",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203700758_d50_0_0~tl04_00.png",
	},
	assembly_items: [
		//SL-SVXBL-40A-16-050 A
		{
			name: "5552 058-02",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203700758_d50_0_0~tl04_00.png",
		},
	],
};

const Nozzle: AssemblyItem = {
	category: {
		id: 0,
		name: "Nozzle",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203686381_d50_0_0~tl04_00.png",
	},
	assembly_items: [
		//R826C-BF23STUC11HP
		{
			name: "5691 026-13",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203686381_d50_0_0~tl04_00.png",
		},
	],
};

const Wedge: AssemblyItem = {
	category: {
		id: 0,
		name: "Wedge",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203699389_d50_0_0~tl04_00.png",
	},
	assembly_items: [
		//162-090Q27-40   162-120Q27-60
		{
			name: "5431 058-08",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/203699389_d50_0_0~tl04_00.png",
		},
	],
};

const Shim: AssemblyItem = {
	category: {
		id: 0,
		name: "Shim",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427078_d50_0_0~tl04_00.png",
	},
	assembly_items: [
		//345-040A32-13M
		{
			name: "5322 474-01",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/202427078_d50_0_0~tl04_00.png",
		},
	],
};

const Bit: AssemblyItem = {
	category: {
		id: 0,
		name: "Bit",
		img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/205003246_d50_0_0~tl04_00.png",
	},
	assembly_items: [
		//345-040A32-13M
		{
			name: "5680 084-02",
			img: "https://productinformation.sandvik.coromant.com/s3/documents/pictures/pict-3d-view/ext-preview/205003246_d50_0_0~tl04_00.png",
		},
	],
};

interface AssemblyTool {
	assembly_name: string;
	tool_name: string;
	quantity: number;
}

const assembly_tool: AssemblyTool[] = [
	{
		assembly_name: "5513 020-10",
		tool_name: "SL-SVXBL-40A-16-050 A",
		quantity: 1,
	},
	{
		assembly_name: "5552 058-02",
		tool_name: "SL-SVXBL-40A-16-050 A",
		quantity: 1,
	},
	{
		assembly_name: "5513 020-03",
		tool_name: "R826C-BF23STUC11HP",
		quantity: 1,
	},
	{
		assembly_name: "5691 026-13",
		tool_name: "R826C-BF23STUC11HP",
		quantity: 1,
	},

	{
		assembly_name: "5516 014-06",
		tool_name: "162-090Q27-40",
		quantity: 11,
	},
	{
		assembly_name: "5541 009-03",
		tool_name: "162-090Q27-40",
		quantity: 1,
	},
	{
		assembly_name: "5541 009-02",
		tool_name: "162-090Q27-40",
		quantity: 1,
	},
	{
		assembly_name: "5431 058-08",
		tool_name: "162-090Q27-40",
		quantity: 11,
	},

	{
		assembly_name: "5516 014-06",
		tool_name: "162-120Q27-60",
		quantity: 11,
	},
	{
		assembly_name: "5541 009-03",
		tool_name: "162-120Q27-60",
		quantity: 1,
	},
	{
		assembly_name: "5541 009-02",
		tool_name: "162-120Q27-60",
		quantity: 1,
	},
	{
		assembly_name: "5431 058-08",
		tool_name: "162-120Q27-60",
		quantity: 11,
	},
];

interface AdaptiveAssembly {
	assembly_name: string;
	adaptive_name: string;
	quantity: number;
}

const adaptive_assembly: AdaptiveAssembly[] = [
	{
		assembly_name: "3212 010-462",
		adaptive_name: "A33-R822XLS17-LJ030",
		quantity: 4,
	},
	{
		assembly_name: "3212 010-446",
		adaptive_name: "A33-R822XLS17-LJ030",
		quantity: 4,
	},
	{
		assembly_name: "3214 010-355",
		adaptive_name: "A33-R822XLS17-LJ030",
		quantity: 1,
	},
	{
		assembly_name: "3212 230-207",
		adaptive_name: "A33-R822XLS17-LJ030",
		quantity: 2,
	},
	{
		assembly_name: "3411 013-105",
		adaptive_name: "A33-R822XLS17-LJ030",
		quantity: 2,
	},
	{
		assembly_name: "3212 010-359",
		adaptive_name: "S17-R820XL-40A-018",
		quantity: 6,
	},

	{
		assembly_name: "3214 010-303",
		adaptive_name: "S17-R820XL-40A-018",
		quantity: 1,
	},
	{
		assembly_name: "3671 010-113",
		adaptive_name: "S17-R820XL-40A-018",
		quantity: 2,
	},
	{
		assembly_name: "5549 051-01",
		adaptive_name: "S17-R820XL-40A-018",
		quantity: 1,
	},
	{
		assembly_name: "5513 010-08",
		adaptive_name: "A34-R826C-E024HP",
		quantity: 1,
	},
	{
		assembly_name: "3214 011-405",
		adaptive_name: "A34-R826C-E024HP",
		quantity: 1,
	},
	{
		assembly_name: "3212 010-360",
		adaptive_name: "A34-R826C-E024HP",
		quantity: 2,
	},
	{
		assembly_name: "3411 010-064",
		adaptive_name: "A34-R826C-E024HP",
		quantity: 2,
	},
	{
		assembly_name: "3671 010-016",
		adaptive_name: "A34-R826C-E024HP",
		quantity: 1,
	},

	{
		assembly_name: "5514 022-06",
		adaptive_name: "AA3B27-40 32 090",
		quantity: 2,
	},
	{
		assembly_name: "3214 010-253",
		adaptive_name: "AA3B27-40 32 090",
		quantity: 4,
	},

	{
		assembly_name: "3212 020-512",
		adaptive_name: "A1B05-40 27 100",
		quantity: 1,
	},
	{
		assembly_name: "5541 015-03",
		adaptive_name: "A1B05-40 27 100",
		quantity: 1,
	},

	{
		assembly_name: "3212 020-514",
		adaptive_name: "392.54005C4027050",
		quantity: 1,
	},
	{
		assembly_name: "3212 010-258",
		adaptive_name: "392.54005C4027050",
		quantity: 2,
	},
	{
		assembly_name: "5541 015-03",
		adaptive_name: "392.54005C4027050",
		quantity: 1,
	},

	{
		assembly_name: "416.1-834",
		adaptive_name: "345-040A32-13M",
		quantity: 4,
	},
	{
		assembly_name: "5512 090-11",
		adaptive_name: "345-040A32-13M",
		quantity: 4,
	},
	{
		assembly_name: "5322 474-01",
		adaptive_name: "345-040A32-13M",
		quantity: 4,
	},
	{
		assembly_name: "345-040A32-13M",
		adaptive_name: "345-040A32-13M",
		quantity: 1,
	},
];

const dictonary: Omit<Partial<Dictonary>, "id">[] = [
	{
		property_name: "dcon",
		full_property_name: "Connection diameter",
		unit: "mm",
	},
	{ property_name: "lsc", full_property_name: "Clamping length", unit: "mm" },
	{ property_name: "lf", full_property_name: "Functional length", unit: "mm" },
	{ property_name: "oal", full_property_name: "Overall length", unit: "mm" },
	{ property_name: "bd", full_property_name: "Body diameter", unit: "mm" },
	{ property_name: "bdx", full_property_name: "Body diameter", unit: "mm" },
	{ property_name: "lb", full_property_name: "Body length", unit: "mm" },
	{ property_name: "lbx", full_property_name: "Body length", unit: "mm" },
	{
		property_name: "bhta",
		full_property_name: "Body half taper angle",
		unit: "mm",
	},
	{ property_name: "wt", full_property_name: "Weight of item", unit: "kg" },
	{
		property_name: "crks",
		full_property_name: "Connection retention knob thread size",
		unit: "mm",
	},
	{ property_name: "bbd", full_property_name: "Balanced by design" },
	{ property_name: "dcp", full_property_name: "Data chip pocket" },
	{ property_name: "oal", full_property_name: "Overall length", unit: "mm" },
	{ property_name: "lsc", full_property_name: "Clamping length", unit: "mm" },
	{ property_name: "bmc", full_property_name: "Body material code" },
	{
		property_name: "bhta",
		full_property_name: "Body half taper angle",
		unit: "mm",
	},
	{ property_name: "rpm", full_property_name: "Rotational speed maximum" },
	{ property_name: "hand", full_property_name: "Hand" },
	{ property_name: "mtp", full_property_name: "Clamping type code" },
	{
		property_name: "apmx",
		full_property_name: "Depth of cut maximum",
		unit: "mm",
	},
	{
		property_name: "zefp",
		full_property_name: "Peripheral effective cutting edge count",
	},
	{
		property_name: "gamp",
		full_property_name: "Axial rake angle",
		unit: "deg",
	},
	{
		property_name: "gamf",
		full_property_name: "Radial rake angle",
		unit: "deg",
	},
	{ property_name: "cdpf", full_property_name: "Cutting pitch differential" },
	{
		property_name: "kapr",
		full_property_name: "Tool cutting edge angle ",
		unit: "deg",
	},
	{ property_name: "ifs", full_property_name: "Insert mounting style code" },
	{
		property_name: "d1",
		full_property_name: "Fixing hole diameter",
		unit: "mm",
	},
	{ property_name: "cedc", full_property_name: "Cutting edge count" },
	{
		property_name: "gan",
		full_property_name: "Insert rake angle",
		unit: "deg",
	},
	{ property_name: "w1", full_property_name: "Insert width", unit: "mm" },
	{ property_name: "s", full_property_name: "Insert thickness", unit: "mm" },
	{
		property_name: "ic",
		full_property_name: "Inscribed circle diameter",
		unit: "mm",
	},
	{ property_name: "sc", full_property_name: "Insert shape code" },
	{
		property_name: "le",
		full_property_name: "Cutting edge effective length",
		unit: "mm",
	},
	{ property_name: "bs", full_property_name: "Wiper edge length", unit: "mm" },
	{ property_name: "bsr", full_property_name: "Wiper edge radius", unit: "mm" },
	{ property_name: "re", full_property_name: "Corner radius", unit: "mm" },
	{
		property_name: "krins",
		full_property_name: "Major cutting edge angle",
		unit: "deg",
	},
	{ property_name: "oah", full_property_name: "Overall height", unit: "mm" },
	{ property_name: "oaw", full_property_name: "Overall width", unit: "mm" },
	{ property_name: "wf", full_property_name: "Functional width", unit: "mm" },
	{
		property_name: "rmpx",
		full_property_name: "Maximum ramping angle",
		unit: "deg",
	},
	{
		property_name: "dmin",
		full_property_name: "Minimum bore diameter",
		unit: "mm",
	},
	{ property_name: "hf", full_property_name: "Functional height", unit: "mm" },
	{
		property_name: "gamo",
		full_property_name: "Orthogonal rake angle",
		unit: "deg",
	},
	{
		property_name: "lams",
		full_property_name: "Inclination angle",
		unit: "deg",
	},
	{
		property_name: "an",
		full_property_name: "Clearance angle major",
		unit: "deg",
	},
];

async function main() {
	await prisma.dictonary.deleteMany();

	await prisma.tool_assembly_tool_item.deleteMany();
	await prisma.tool_assembly_cutting_item.deleteMany();
	await prisma.tool_assembly_adaptive_item.deleteMany();

	await prisma.tool_cutting.deleteMany();
	await prisma.tool_adaptive.deleteMany();
	await prisma.adaptive_item_matching.deleteMany();
	await prisma.adaptive_assembly.deleteMany();
	await prisma.assembly_tool.deleteMany();

	await prisma.tool_item.deleteMany();
	await prisma.adaptive_item.deleteMany();
	await prisma.cutting_item.deleteMany();
	await prisma.assembly_item.deleteMany();

	await prisma.tool_item_category.deleteMany();
	await prisma.adaptive_item_category.deleteMany();
	await prisma.cutting_item_category.deleteMany();
	await prisma.assembly_item_category.deleteMany();

	await prisma.tool_assembly.deleteMany();

	//Tool items

	const turning_tool_item_category = await prisma.tool_item_category.upsert({
		where: { id: turningTools.category.id },
		create: {
			name: turningTools.category.name ?? "",
			img: turningTools.category.img ?? "",
		},
		update: {},
	});

	for (let i = 0; i < turningTools.toolItems.length; i++) {
		await prisma.tool_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...turningTools.toolItems[i],
				name: turningTools.toolItems[i].name ?? "",
				img: turningTools.toolItems[i].img ?? "",
				category_id: turning_tool_item_category.id,
			},
			update: {},
		});
	}

	const cartridge_tool_item_category = await prisma.tool_item_category.upsert({
		where: { id: Cartridge.category.id },
		create: {
			name: Cartridge.category.name ?? "",
			img: Cartridge.category.img ?? "",
		},
		update: {},
	});

	for (let i = 0; i < Cartridge.toolItems.length; i++) {
		await prisma.tool_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...Cartridge.toolItems[i],
				name: Cartridge.toolItems[i].name ?? "",
				img: Cartridge.toolItems[i].img ?? "",
				category_id: cartridge_tool_item_category.id,
			},
			update: {},
		});
	}

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

	const bridges_adaptive_item_category =
		await prisma.adaptive_item_category.upsert({
			where: {
				id: bridges.category.id,
			},
			create: {
				name: bridges.category.name ?? "",
				img: bridges.category.img ?? "",
			},
			update: {},
		});

	for (let i = 0; i < bridges.adaptive_items.length; i++) {
		await prisma.adaptive_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...bridges.adaptive_items[i],
				name: bridges.adaptive_items[i].name ?? "",
				img: bridges.adaptive_items[i].img ?? "",
				category_id: bridges_adaptive_item_category.id,
			},
			update: {},
		});
	}

	const slidges_adaptive_item_category =
		await prisma.adaptive_item_category.upsert({
			where: {
				id: slidges.category.id,
			},
			create: {
				name: slidges.category.name ?? "",
				img: slidges.category.img ?? "",
			},
			update: {},
		});

	for (let i = 0; i < slidges.adaptive_items.length; i++) {
		await prisma.adaptive_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...slidges.adaptive_items[i],
				name: slidges.adaptive_items[i].name ?? "",
				img: slidges.adaptive_items[i].img ?? "",
				category_id: slidges_adaptive_item_category.id,
			},
			update: {},
		});
	}

	const boring_heads_adaptive_item_category =
		await prisma.adaptive_item_category.upsert({
			where: {
				id: boringHeads.category.id,
			},
			create: {
				name: boringHeads.category.name ?? "",
				img: boringHeads.category.img ?? "",
			},
			update: {},
		});

	for (let i = 0; i < boringHeads.adaptive_items.length; i++) {
		await prisma.adaptive_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...boringHeads.adaptive_items[i],
				name: boringHeads.adaptive_items[i].name ?? "",
				img: boringHeads.adaptive_items[i].img ?? "",
				category_id: boring_heads_adaptive_item_category.id,
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

	const turning_inserts_cutting_item_category =
		await prisma.cutting_item_category.upsert({
			where: {
				id: TurningInserts.category.id,
			},
			create: {
				name: TurningInserts.category.name ?? "",
				img: TurningInserts.category.img ?? "",
			},
			update: {},
		});

	for (let i = 0; i < TurningInserts.cutting_items.length; i++) {
		await prisma.cutting_item.upsert({
			where: {
				id: 0,
			},
			create: {
				...TurningInserts.cutting_items[i],
				name: TurningInserts.cutting_items[i].name ?? "",
				img: TurningInserts.cutting_items[i].img ?? "",
				category_id: turning_inserts_cutting_item_category.id,
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

	//Assembly items
	const arrAssembly = [
		Screw,
		Washer,
		ORing,
		Cover,
		Bush,
		Nozzle,
		Wedge,
		Shim,
		Bit,
	];

	for (let i = 0; i < arrAssembly.length; i++) {
		const category = await prisma.assembly_item_category.upsert({
			where: {
				id: arrAssembly[i].category.id,
			},
			create: {
				name: arrAssembly[i].category.name ?? "",
				img: arrAssembly[i].category.img ?? "",
			},
			update: {},
		});

		for (let j = 0; j < arrAssembly[i].assembly_items.length; j++) {
			await prisma.assembly_item.upsert({
				where: {
					id: 0,
				},
				create: {
					...arrAssembly[i].assembly_items[j],
					name: arrAssembly[i].assembly_items[j].name ?? "",
					img: arrAssembly[i].assembly_items[j].img ?? "",
					category_id: category.id,
				},
				update: {},
			});
		}
	}

	//assembly tool

	for (let i = 0; i < assembly_tool.length; i++) {
		const tool_item = await prisma.tool_item.findFirst({
			where: { name: assembly_tool[i].tool_name },
		});

		if (tool_item === null) {
			continue;
		}

		const assembly_item = await prisma.assembly_item.findFirst({
			where: { name: assembly_tool[i].assembly_name },
		});

		if (assembly_item === null) {
			continue;
		}

		await prisma.assembly_tool.create({
			data: {
				quantity: assembly_tool[i].quantity,
				assembly_item_id: assembly_item.id,
				tool_item_id: tool_item.id,
			},
		});
	}

	//adaptive assembly

	for (let i = 0; i < adaptive_assembly.length; i++) {
		const adaptive_item = await prisma.adaptive_item.findFirst({
			where: { name: adaptive_assembly[i].adaptive_name },
		});

		if (adaptive_item === null) {
			continue;
		}

		const assembly_item = await prisma.assembly_item.findFirst({
			where: { name: adaptive_assembly[i].assembly_name },
		});

		if (assembly_item === null) {
			continue;
		}

		await prisma.adaptive_assembly.create({
			data: {
				quantity: adaptive_assembly[i].quantity,
				assembly_item_id: assembly_item.id,
				adaptive_item_id: adaptive_item.id,
			},
		});
	}

	//Dictonary
	for (let i = 0; i < dictonary.length; i++) {
		await prisma.dictonary.upsert({
			where: {
				id: 0,
			},
			create: {
				unit: null,
				unit_explanation: null,
				full_property_name: null,
				property_name: "",
				...dictonary[i],
			},
			update: {},
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
