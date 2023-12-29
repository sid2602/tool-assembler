import {
	ActualStep,
	ListCategoryName,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import AdaptiveItemsStep from "./steps/adaptiveItemsStep";
import ChoosePurposeStep from "./steps/choosePurposeStep";
import CuttingItemsStep from "./steps/cuttingItemsStep";
import ToolItemsStep from "./steps/toolItemsStep";

interface Props {}

const checkListCategory = (
	actualSubStep: ActualStep,
	listCategory: ListCategoryName,
	...categories: ListCategoryName[]
): boolean => {
	return (
		categories.some((item) => item === listCategory) &&
		actualSubStep === "lists"
	);
};

export default function ToolAssemblerModal({}: Props) {
	const { stepState, dispatchStepState, isOpen, onClose } =
		useToolAssemblyContext();

	const onCloseModal = () => {
		onClose();
	};

	const onCategorySelect = (
		listCategoryName: ListCategoryName,
		categoryId: number
	) => {
		dispatchStepState({
			type: "MODAL",
			payload: {
				step: "modal",
				actualSubStep: "lists",
				categoryId,
				listCategory: listCategoryName,
				order: stepState.order,
				row: stepState.row,
			},
		});
	};

	if (stepState.step !== "modal") {
		return null;
	}

	return (
		<Modal isOpen={isOpen} onClose={onCloseModal}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			{stepState.actualSubStep === "categories" && (
				<ChoosePurposeStep onCategorySelect={onCategorySelect} />
			)}

			{checkListCategory(
				stepState.actualSubStep,
				stepState.listCategory,
				"tool-item-categories",
				"cutting-tool",
				"adaptive-tool"
			) && (
				<ToolItemsStep
					listCategory={stepState.listCategory}
					categoryId={stepState.categoryId}
					searchId={stepState.searchId}
				/>
			)}

			{checkListCategory(
				stepState.actualSubStep,
				stepState.listCategory,
				"adaptive-item-categories",
				"tool-adaptive",
				"adaptive-machine",
				"adaptive-workpiece"
			) && (
				<AdaptiveItemsStep
					listCategory={stepState.listCategory}
					categoryId={stepState.categoryId}
					searchId={stepState.searchId}
				/>
			)}

			{checkListCategory(
				stepState.actualSubStep,
				stepState.listCategory,
				"cutting-item-categories",
				"tool-cutting"
			) && (
				<CuttingItemsStep
					listCategory={stepState.listCategory}
					categoryId={stepState.categoryId}
					searchId={stepState.searchId}
				/>
			)}
		</Modal>
	);
}
