import {
	ListCategoryName,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import AdaptiveItemsStep from "./steps/adaptiveItemsStep";
import ChoosePurposeStep from "./steps/choosePurposeStep";
import CuttingItemsStep from "./steps/cuttingItemsStep";
import ToolItemsStep from "./steps/toolItemsStep";

interface Props {}

export default function ToolAssemblerModal({}: Props) {
	const {
		stepState,
		dispatchStepState,
		isOpen,
		onClose,
		addToolItem,
		addAdaptiveItem,
		addCuttingItem,
	} = useToolAssemblyContext();

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

	return (
		<Modal isOpen={isOpen} onClose={onCloseModal}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			{stepState.step === "modal" &&
				stepState.actualSubStep === "categories" && (
					<ChoosePurposeStep onCategorySelect={onCategorySelect} />
				)}

			{stepState.step === "modal" &&
				(stepState.listCategory === "tool-item-categories" ||
					stepState.listCategory === "cutting-tool") &&
				stepState.actualSubStep === "lists" && (
					<ToolItemsStep
						listCategory={stepState.listCategory}
						categoryId={stepState.categoryId}
						onClick={addToolItem}
						searchId={stepState.searchId}
					/>
				)}

			{stepState.step === "modal" &&
				(stepState.listCategory === "adaptive-item-categories" ||
					stepState.listCategory === "tool-adaptive") &&
				stepState.actualSubStep === "lists" && (
					<AdaptiveItemsStep
						listCategory={stepState.listCategory}
						categoryId={stepState.categoryId}
						searchId={stepState.searchId}
						onClick={addAdaptiveItem}
					/>
				)}

			{stepState.step === "modal" &&
				(stepState.listCategory === "cutting-item-categories" ||
					stepState.listCategory === "tool-cutting") &&
				stepState.actualSubStep === "lists" && (
					<CuttingItemsStep
						listCategory={stepState.listCategory}
						categoryId={stepState.categoryId}
						searchId={stepState.searchId}
						onClick={addCuttingItem}
					/>
				)}
		</Modal>
	);
}
