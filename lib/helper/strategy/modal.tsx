import { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";
import { useModalHelper } from "@/helper";

export type ModalHeaderRender = (actions: {
    closeModal?: () => void;
    title: Modal["title"];
}) => ReactNode;
export type ModalFooterRender = (actions: {
    closeModal?: () => void;
    confirmModal: () => void;
    loading: boolean;
}) => ReactNode;
export type ModalContentRender = () => ReactNode;

export type Modal = {
    id?: number;
    title?: string;
    type?: "primary";
    render: ModalContentRender;
    // all the action for current modal
    headerRender?: ModalHeaderRender;
    footerRender?: ModalFooterRender;
    onBeforeConfirm?: () => Promise<void> | void;
    onConfirm?: () => Promise<void> | void;
    className?: string;
};

function useInitState() {
    const idRef = useRef(0);
    const [modals, setModals] = useState<Modal[]>([]);

    return {
        idRef,
        modals,
        setModals,
    };
}

// 提取 useInitState 方法的类型
export type StateType = ReturnType<typeof useInitState>;
// all the action for modals
export type ActionType = ReturnType<typeof useAction>;

function useAction(state: StateType) {
    return {
        open: async (modal: Modal) => {
            state.idRef.current++;
            state.setModals((prev) => {
                // async code
                return prev.concat({ ...modal, id: state.idRef.current });
            });
            return {
                id: state.idRef.current,
            };
        },
        close: (id: number) => {
            state.setModals((prev) => prev.filter((item) => item.id !== id));
            state.idRef.current--;
        },
    };
}

function Modal({ modal, close }: { modal: Modal } & Pick<ActionType, "close">) {
    const { modalCustomizeRender } = useModalHelper();
    const [loading, setLoading] = useState(false);
    const closeModal = () => {
        close(modal.id!);
    };
    const confirmModal = async () => {
        setLoading(true);
        try {
            await modal.onBeforeConfirm?.();
            close(modal.id!);
            await modal.onConfirm?.();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {modalCustomizeRender({
                modal,
                closeModal,
                confirmModal,
                loading,
            })}
        </>
    );
}

const ModalStrategy: IStrategy<StateType, ActionType> = {
    name: "modal",
    description: "Modal desc",
    useAction,
    useInitState,
    useUI({ modals }: StateType, { close }: ActionType) {
        return modals.map((modal, index) => {
            return <Modal key={modal.id} modal={modal} close={close} />;
        });
    },
};

export default ModalStrategy;
