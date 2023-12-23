import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import ChoosePurposeStep from "./steps/choosePurposeStep";
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

	const onCategorySelect = (categoryId: number) => {
		dispatchStepState({
			type: "MODAL",
			payload: { step: "modal", actualSubStep: "lists", categoryId },
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

			{stepState.step === "modal" && stepState.actualSubStep === "lists" && (
				<ToolItemsStep
					categoryId={stepState.categoryId}
					onClick={addToolItem}
				/>
			)}
		</Modal>
	);
}
