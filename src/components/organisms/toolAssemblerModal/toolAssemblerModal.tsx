import { Modal, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import ChoosePurposeStep from "./steps/choosePurposeStep";
import ToolItemsStep from "./steps/toolItemsStep";

interface Props {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

type StepType = "choosePurposeStep" | "toolItemsStep";

export default function ToolAssemblerModal({ isOpen, onOpen, onClose }: Props) {
	const [step, setStep] = useState<StepType>("choosePurposeStep");
	const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

	const onCategorySelect = (categoryId: number) => {
		setCategoryId(categoryId);
		setStep("toolItemsStep");
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			{step === "choosePurposeStep" && (
				<ChoosePurposeStep onCategorySelect={onCategorySelect} />
			)}
			{step === "toolItemsStep" && <ToolItemsStep categoryId={categoryId} />}
		</Modal>
	);
}
