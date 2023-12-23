import {
	CategoryName,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import AdaptiveItemsStep from "./steps/adaptiveItemsStep";
import ChoosePurposeStep from "./steps/choosePurposeStep";
import CuttingItemsStep from "./steps/cuttingItemsStep";
import ToolItemsStep from "./steps/toolItemsStep";

interface Props {}

type StepType = "choosePurposeStep" | "toolItemsStep";

export default function ToolAssemblerModal({}: Props) {
	const { stepState, dispatchStepState, isOpen, onClose, addToolItem } =
		useToolAssemblyContext();

	const onCloseModal = () => {
		onClose();
		dispatchStepState({ type: "CLOSE", payload: {} });
	};

	const onCategorySelect = (categoryName: CategoryName, categoryId: number) => {
		dispatchStepState({
			type: "MODAL",
			payload: {
				step: "modal",
				actualSubStep: "lists",
				categoryId,
				category: categoryName,
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
				stepState.category === "tool-item-categories" &&
				stepState.actualSubStep === "lists" && (
					<ToolItemsStep
						categoryId={stepState.categoryId}
						onClick={addToolItem}
					/>
				)}

			{stepState.step === "modal" &&
				stepState.category === "adaptive-item-categories" &&
				stepState.actualSubStep === "lists" && (
					<AdaptiveItemsStep
						categoryId={stepState.categoryId}
						onClick={addToolItem}
					/>
				)}

			{stepState.step === "modal" &&
				stepState.category === "cutting-item-categories" &&
				stepState.actualSubStep === "lists" && (
					<CuttingItemsStep
						categoryId={stepState.categoryId}
						onClick={addToolItem}
					/>
				)}
		</Modal>
	);
}
