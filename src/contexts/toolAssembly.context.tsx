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
export type ActualStep = "categories" | "lists";

export type ListCategoryName =
	| "tool-item-categories"
	| "adaptive-item-categories"
	| "cutting-item-categories"
	| "tool-adaptive"
	| "tool-cutting"
	| null;

interface ToolItemStep {
	step: "modal";
	actualSubStep: ActualStep;
	listCategory: ListCategoryName;
	categoryId: number | null;
	searchId: number | null;
}

type StepState = ToolItemStep;

const initialStep: StepState = {
	step: "modal",
	actualSubStep: "categories",
	listCategory: null,
	categoryId: null,
	searchId: null,
};

type StepStateActions = "MODAL" | "CLOSE";

const reducer = (
	state: StepState,
	action: { type: StepStateActions; payload: Partial<StepState> }
): StepState => {
	switch (action.type) {
		case "MODAL":
			return { ...state, ...action.payload };
		case "CLOSE":
			return initialStep;

		default:
			throw new Error("WRONG ACTION");
	}
};

type ContextType = {
	toolAssembly: Tool_assembly | undefined;
	stepState: StepState;
	isOpen: boolean;
	onOpen: (
		actualStep?: ActualStep,
		listCategory?: ListCategoryName,
		searchId?: number | null
	) => void;
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
	onOpen: (
		actualStep?: ActualStep,
		listCategory?: ListCategoryName,
		searchId?: number | null
	) => {},
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
	const {
		isOpen,
		onOpen: onOpenModal,
		onClose: onCloseModal,
	} = useDisclosure();
	const [stepState, dispatchStepState] = useReducer(reducer, initialStep);
	const createToolAssemblyQuery = useCreateToolAssembly();
	const addToolItemToToolAssemblyQuery = useAddToolItem();

	const onOpen = (
		actualStep?: ActualStep,
		listCategory?: ListCategoryName,
		searchId?: number | null
	) => {
		dispatchStepState({
			type: "MODAL",
			payload: {
				actualSubStep: actualStep ?? initialStep.actualSubStep,
				listCategory: listCategory ?? initialStep.listCategory,
				searchId,
			},
		});
		onOpenModal();
	};

	const onClose = () => {
		onCloseModal();
		dispatchStepState({ type: "CLOSE", payload: {} });
	};

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
			order: 0,
			row: 0,
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
