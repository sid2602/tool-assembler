import {
	useAddToolItem,
	useCreateToolAssembly,
	useGetToolAssembly,
} from "@/hooks/toolAssembly";
import { Tool_assembly } from "@/pages/api/tool-assembly/[id]";
import { useDisclosure } from "@chakra-ui/react";

import {
	Dispatch,
	createContext,
	useContext,
	useReducer,
	useState,
} from "react";

type ContainerProps = {
	children: React.ReactNode;
};

interface ToolItemStep {
	step: "toolItem";
	actualSubStep: "categories" | "lists";
	categoryId: number | null;
}

type StepState = ToolItemStep;

const initialStep: StepState = {
	step: "toolItem",
	actualSubStep: "categories",
	categoryId: null,
};

type StepStateActions = "TOOL_ITEM";

const reducer = (
	state: StepState,
	action: { type: StepStateActions; payload: Partial<StepState> }
): StepState => {
	switch (action.type) {
		case "TOOL_ITEM":
			return { ...state, ...action.payload };

		default:
			throw new Error("WRONG ACTION");
	}
};

type ContextType = {
	toolAssembly: Tool_assembly | undefined;
	stepState: StepState;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	dispatchStepState: Dispatch<{
		type: StepStateActions;
		payload: Partial<StepState>;
	}>;
	addToolItem: (toolItemId: number) => void;
};

const defaultCotnextValue: ContextType = {
	toolAssembly: undefined,
	stepState: initialStep,
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
	dispatchStepState: () => {},
	addToolItem: (toolItemId: number) => {},
};

export const ToolAssemblyContext =
	createContext<ContextType>(defaultCotnextValue);

export const useToolAssemblyContext = () => useContext(ToolAssemblyContext);

export const ToolAssemblyContextProvider = ({ children }: ContainerProps) => {
	const [toolAssemblyId, setToolAsemblyId] = useState<number | undefined>(
		undefined
	);

	const toolAssemblyQuery = useGetToolAssembly(toolAssemblyId);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [stepState, dispatchStepState] = useReducer(reducer, initialStep);
	const createToolAssemblyQuery = useCreateToolAssembly();
	const addToolItemToToolAssemblyQuery = useAddToolItem();

	const createToolAssembly = async (): Promise<number> => {
		const resp = await createToolAssemblyQuery.mutateAsync();
		setToolAsemblyId(resp.item.id);
		return resp.item.id;
	};

	const addToolItem = async (toolItemId: number) => {
		const id = await createToolAssembly();

		await addToolItemToToolAssemblyQuery.mutateAsync({
			toolItemId: toolItemId,
			toolAssemblyId: id,
		});

		onClose();
	};

	return (
		<ToolAssemblyContext.Provider
			value={{
				toolAssembly: toolAssemblyQuery.data?.item ?? undefined,
				stepState,
				isOpen,
				onOpen,
				onClose,
				dispatchStepState,
				addToolItem,
			}}
		>
			{children}
		</ToolAssemblyContext.Provider>
	);
};
