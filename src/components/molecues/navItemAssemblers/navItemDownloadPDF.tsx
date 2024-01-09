import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import { useGetToolAssembly } from "@/hooks/toolAssembly";
import { checkToolAssemblyHaveItem } from "@/utils/client/checkToolAssemblyHaveItem";
import { useRouter } from "next/router";

import { useGetReport } from "@/hooks/reports";
import { GetReportSuccessResponse } from "@/pages/api/reports";
import { Button } from "@chakra-ui/react";
import {
	Document,
	PDFDownloadLink,
	Text as PDFText,
	Page,
	StyleSheet,
	View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#E4E4E4",
		width: "100%",
	},
	section: {
		margin: 10,
		padding: "20px",
	},
	product: {
		margin: "10px 0",
	},
	rowContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		margin: "10px 0",
	},
});

interface PDFFileProps {
	id: number | undefined;
	data: GetReportSuccessResponse;
}

function PDFFile({ id, data }: PDFFileProps) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<PDFText style={styles.section}>
					To see tool assembly visit http://localhost:3000/assembler?id={id}
				</PDFText>
				{data.item.adaptive_items.length > 0 ? (
					<View style={styles.section}>
						<PDFText>Adaptive Items</PDFText>
						{data.item.adaptive_items.map((item) => (
							<View key={item.id} style={styles.product}>
								<PDFText>
									{item.name} quantity: {item.quantity}
								</PDFText>
								{item.properties.map((property) => (
									<View key={property.id} style={styles.rowContainer}>
										<PDFText>
											{property.full_property_name} ({property.property_name}){" "}
										</PDFText>
										<PDFText>
											{property.value}{" "}
											{property.unit !== null ? property.unit : ""}
										</PDFText>
									</View>
								))}
							</View>
						))}
					</View>
				) : null}

				{data.item.tool_items.length > 0 ? (
					<View style={styles.section}>
						<PDFText>Tool Items</PDFText>
						{data.item.tool_items.map((item) => (
							<View key={item.id} style={styles.product}>
								<PDFText>
									{item.name} quantity: {item.quantity}
								</PDFText>
								{item.properties.map((property) => (
									<View key={property.id} style={styles.rowContainer}>
										<PDFText>
											{property.full_property_name} ({property.property_name}){" "}
										</PDFText>
										<PDFText>
											{property.value}{" "}
											{property.unit !== null ? property.unit : ""}
										</PDFText>
									</View>
								))}
							</View>
						))}
					</View>
				) : null}

				{data.item.cutting_items.length > 0 ? (
					<View style={styles.section}>
						<PDFText>Cutting Items</PDFText>
						{data.item.cutting_items.map((item) => (
							<View key={item.id} style={styles.product}>
								<PDFText>
									{item.name} quantity: {item.quantity}
								</PDFText>
								{item.properties.map((property) => (
									<View key={property.id} style={styles.rowContainer}>
										<PDFText>
											{property.full_property_name} ({property.property_name}){" "}
										</PDFText>
										<PDFText>
											{property.value}{" "}
											{property.unit !== null ? property.unit : ""}
										</PDFText>
									</View>
								))}
							</View>
						))}
					</View>
				) : null}

				{data.item.assembly_items.length > 0 ? (
					<View style={styles.section}>
						<PDFText>Assembly Items</PDFText>
						{data.item.assembly_items.map((item) => (
							<View key={item.assemblyItem.id} style={styles.rowContainer}>
								<PDFText>{item.assemblyItem.name}</PDFText>
								<PDFText>quantity: {item.quantity}</PDFText>
							</View>
						))}
					</View>
				) : null}
			</Page>
		</Document>
	);
}
export default function NavItemDownloadPDF() {
	const { toolAssemblyId } = useToolAssemblyContext();
	const { data } = useGetReport(toolAssemblyId, toolAssemblyId !== undefined);
	const toolAssembly = useGetToolAssembly(toolAssemblyId);
	const router = useRouter();

	const toolAssemblyData = toolAssembly.data?.item ?? undefined;

	const isAvailable =
		router.pathname.includes("/assembler") &&
		checkToolAssemblyHaveItem(toolAssemblyData);

	if (isAvailable === false || data === undefined) {
		return null;
	}

	return (
		<Button
			as={PDFDownloadLink}
			document={<PDFFile id={toolAssemblyId} data={data} />}
			fileName={`toolAssembly${toolAssemblyId}`}
		>
			Download
		</Button>
	);
}
