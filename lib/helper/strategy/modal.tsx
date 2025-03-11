import { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";

type Modal = {
    id?: number;
    title?: string;
    type?: "primary";
    render: () => ReactNode;
    footerRender?: (actions: {
        closeModal?: () => void;
        confirmModal: () => void;
        loading: boolean;
    }) => ReactNode;
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
            className={
                "fixed inset-0 z-999 backdrop-blur flex items-center justify-center"
            }
            onClick={closeModal}
        >
            <div
                key={modal.id}
                style={{
                    transform: `translate(${20 * i1}px, ${20 * i2}px)`,
                }}
                className={`w-[800px] max-md:w-[500px] max-sm:w-4/5 min-h-[200px] z-999
                    bg-[#fefefe] border border-gray-200 rounded-2xl shadow-2xl p-4 flex flex-col justify-between ${modal.className}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={"text-lg font-bold"}>{modal.title}</div>
                <div className={"flex-1"}>{modal.render()}</div>
                {/*footer*/}
                {modal.footerRender ? (
                    modal.footerRender({ closeModal, confirmModal, loading })
                ) : (
                    <div className={"flex justify-end gap-2"}>
                        <button
                            className={
                                "cursor-pointer rounded border px-2.5 py-1.5 text-[#222] leading-4 text-sm"
                            }
                            onClick={() => {
                                close(modal.id!);
                            }}
                        >
                            取消
                        </button>
                        <button
                            className={
                                "cursor-pointer rounded bg-blue-500 hover:bg-blue-600 px-2.5 py-1.5 text-white leading-4 text-sm"
                            }
                            onClick={confirmModal}
                        >
                            {loading ? "loading" : "确认"}
                        </button>
                    </div>
                )}
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
