import {
	useAddAdaptiveItem,
	useAddCuttingItem,
	useAddToolItem,
	useCreateToolAssembly,
	useUpdateToolAssembly,
} from "@/hooks/toolAssembly";
import { PutToolAssemblyBody } from "@/pages/api/tool-assembly/[id]";
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
	| "adaptive-tool"
	| "tool-cutting"
	| "cutting-tool"
	| "adaptive-machine"
	| "adaptive-workpiece"
	| null;

interface ToolItemStep {
	step: "modal";
	actualSubStep: ActualStep;
	listCategory: ListCategoryName;
	categoryId: number | null;
	searchId: number | null;
	order: number | null;
	row: number | null;
}

type StepState = ToolItemStep;

const initialStep: StepState = {
	step: "modal",
	actualSubStep: "categories",
	listCategory: null,
	categoryId: null,
	searchId: null,
	order: null,
	row: null,
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

export type OnOpenFunctionType = (
	actualStep?: ActualStep,
	listCategory?: ListCategoryName,
	searchId?: number | null,
	order?: number | null,
	row?: number | null
) => void;

type ContextType = {
	toolAssemblyId: number | undefined;
	stepState: StepState;
	isOpen: boolean;
	onOpen: OnOpenFunctionType;
	onClose: () => void;
	dispatchStepState: Dispatch<{
		type: StepStateActions;
		payload: Partial<StepState>;
	}>;
	addToolItem: (toolItemId: number) => Promise<void>;
	addAdaptiveItem: (adaptiveItemId: number) => Promise<void>;
	addCuttingItem: (cuttingItemId: number) => Promise<void>;
	setToolAssemblyId: (id: number | undefined) => void;
	handleUpdateToolAssembly: (data: PutToolAssemblyBody) => Promise<void>;
};

const defaultCotnextValue: ContextType = {
	toolAssemblyId: undefined,
	stepState: initialStep,
	isOpen: false,
	onOpen: (
		actualStep?: ActualStep,
		listCategory?: ListCategoryName,
		searchId?: number | null
	) => {},
	onClose: () => {},
	dispatchStepState: () => {},
	addToolItem: async (toolItemId: number) => {},
	addAdaptiveItem: async (adaptiveItemId: number) => {},
	addCuttingItem: async (cuttingItemId: number) => {},
	setToolAssemblyId: (id: number | undefined) => {},
	handleUpdateToolAssembly: async (data: PutToolAssemblyBody) => {},
};

export const ToolAssemblyContext =
	createContext<ContextType>(defaultCotnextValue);

export const useToolAssemblyContext = () => useContext(ToolAssemblyContext);

export const ToolAssemblyContextProvider = ({ children }: ContainerProps) => {
	const [toolAssemblyId, setToolAsemblyId] = useState<number | undefined>(
		undefined
	);

	const {
		isOpen,
		onOpen: onOpenModal,
		onClose: onCloseModal,
	} = useDisclosure();
	const [stepState, dispatchStepState] = useReducer(reducer, initialStep);
	const createToolAssemblyQuery = useCreateToolAssembly();
	const addToolItemToToolAssemblyQuery = useAddToolItem();
	const addAdaptiveItemToToolAssemblyQuery = useAddAdaptiveItem();
	const addCuttingItemToToolAssemblyQuery = useAddCuttingItem();
	const updateToolAssembly = useUpdateToolAssembly();

	const onOpen = async (
		actualStep?: ActualStep,
		listCategory?: ListCategoryName,
		searchId?: number | null,
		order?: number | null,
		row?: number | null
	) => {
		if (toolAssemblyId === undefined) {
			await createToolAssembly();
		}

		dispatchStepState({
			type: "MODAL",
			payload: {
				actualSubStep: actualStep ?? initialStep.actualSubStep,
				listCategory: listCategory ?? initialStep.listCategory,
				searchId,
				order,
				row,
			},
		});
		onOpenModal();
	};

	const onClose = () => {
		onCloseModal();
		dispatchStepState({ type: "CLOSE", payload: {} });
	};

	const createToolAssembly = async (): Promise<void> => {
		const resp = await createToolAssemblyQuery.mutateAsync();
		setToolAsemblyId(resp.item.id);
	};

	const handleUpdateToolAssembly = async (
		data: PutToolAssemblyBody
	): Promise<void> => {
		await updateToolAssembly.mutateAsync({ id: toolAssemblyId, data });
	};

	const addToolItem = async (toolItemId: number) => {
		const toolAssemblerId = toolAssemblyId;

		if (toolAssemblerId === undefined) {
			throw new Error("No tool assembly");
		}

		await addToolItemToToolAssemblyQuery.mutateAsync({
			toolItemId: toolItemId,
			toolAssemblyId: toolAssemblerId,
			order: stepState.order ?? 0,
			row: stepState.row ?? 0,
		});

		onClose();
	};

	const addAdaptiveItem = async (
		adaptiveItemId: number,
		number_of_possible_connections?: number
	) => {
		const toolAssemblerId = toolAssemblyId;
		if (toolAssemblerId === undefined) {
			throw new Error("No tool assembly");
		}

		const row =
			stepState.row !== null &&
			(number_of_possible_connections ?? 0) > 1 &&
			stepState.listCategory === "adaptive-machine"
				? stepState.row + 1
				: stepState.row ?? 0;

		await addAdaptiveItemToToolAssemblyQuery.mutateAsync({
			adaptiveItemId: adaptiveItemId,
			toolAssemblyId: toolAssemblerId,
			order: stepState.order ?? 0,
			row: row,
		});

		onClose();
	};

	const addCuttingItem = async (cuttingItemId: number) => {
		const toolAssemblerId = toolAssemblyId;

		if (toolAssemblerId === undefined) {
			throw new Error("No tool assembly");
		}

		await addCuttingItemToToolAssemblyQuery.mutateAsync({
			cuttingItemId: cuttingItemId,
			toolAssemblyId: toolAssemblerId,
			order: stepState.order ?? 0,
			row: stepState.row ?? 0,
		});

		onClose();
	};

	return (
		<ToolAssemblyContext.Provider
			value={{
				toolAssemblyId,
				stepState,
				isOpen,
				onOpen,
				onClose,
				dispatchStepState,
				addToolItem,
				addAdaptiveItem,
				addCuttingItem,
				setToolAssemblyId: (id) => setToolAsemblyId(id),
				handleUpdateToolAssembly,
			}}
		>
			{children}
		</ToolAssemblyContext.Provider>
	);
};
