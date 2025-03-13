import { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";
import { useModalHelper } from "@/helper";

export type ModalHeaderRender = (actions: {
    closeModal?: () => void;
}) => ReactNode;
export type ModalFooterRender = (actions: {
    closeModal?: () => void;
    confirmModal: () => void;
    loading: boolean;
}) => ReactNode;
export type ModalContentRender = () => ReactNode;

type Modal = {
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
const Direction = [0, 1, -1];

function transferToDirection(i: number) {
    const index = i % Direction.length;
    return [Direction[index], Direction[(index + 1) % Direction.length]];
}

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
        },
    };
}

function Modal({ modal, close }: { modal: Modal } & Pick<ActionType, "close">) {
    const [i1, i2] = transferToDirection(modal.id || 0);
    const [loading, setLoading] = useState(false);
    const { modalCustomize } = useModalHelper();
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
        <div
            key={modal.id}
            className={`fixed inset-0 z-999 backdrop-blur backdrop-opacity-25 flex items-center justify-center modal-container-backdrop`}
            onClick={closeModal}
        >
            <div
                key={modal.id}
                style={{
                    transform: `translate(${20 * i1}px, ${20 * i2}px)`,
                }}
                className={`w-[800px] max-md:w-[500px] max-sm:w-4/5 min-h-[200px] z-999
                    bg-[#fefefe] border border-gray-200 rounded-2xl shadow-2xl p-4 
                    flex flex-col justify-between modal-container ${modal.className}
                `}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {modal.headerRender ? (
                    modal.headerRender({ closeModal })
                ) : (
                    <div className={"text-lg font-bold modal-header"}>
                        {modal.title}
                    </div>
                )}

                <div className={"flex-1 modal-content"}>{modal.render()}</div>
                {/*footer*/}
                {modal.footerRender
                    ? modal.footerRender({ closeModal, confirmModal, loading })

                    : modalCustomize.footerRender

                      ? modalCustomize.footerRender({
                            closeModal,
                            confirmModal,
                            loading,
                        })
                      : null}
            </div>
        </div>
    );
}

function ModalUI({ modals, close, open }: StateType & ActionType) {
    return modals.map((modal, index) => {
        return <Modal key={modal.id} modal={modal} close={close} />;
    });
}

const ModalStrategy: IStrategy<StateType, ActionType> = {
    name: "modal",
    description: "Modal desc",
    useAction,
    useInitState,
    useUI(state: StateType, action: ActionType) {
        return <ModalUI {...state} {...action} />;
    },
};

export default ModalStrategy;
