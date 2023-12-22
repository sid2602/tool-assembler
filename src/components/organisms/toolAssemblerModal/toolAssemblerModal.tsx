import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import ChoosePurposeStep from "./steps/choosePurposeStep";
import ToolItemsStep from "./steps/toolItemsStep";

interface Props {}

type StepType = "choosePurposeStep" | "toolItemsStep";

export default function ToolAssemblerModal({}: Props) {
	const { stepState, dispatchStepState, isOpen, onClose, addToolItem } =
		useToolAssemblyContext();

	const onCategorySelect = (categoryId: number) => {
		dispatchStepState({
			type: "TOOL_ITEM",
			payload: { step: "toolItem", actualSubStep: "lists", categoryId },
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			{stepState.step === "toolItem" &&
				stepState.actualSubStep === "categories" && (
					<ChoosePurposeStep onCategorySelect={onCategorySelect} />
				)}

			{stepState.step === "toolItem" && stepState.actualSubStep === "lists" && (
				<ToolItemsStep
					categoryId={stepState.categoryId}
					onClick={addToolItem}
				/>
			)}
		</Modal>
	);
}
