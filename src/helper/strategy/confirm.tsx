import React, { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/shift-away.css"; // 过渡动画

type Confirm = {
    id?: number;
    type?: "danger" | "warning";
    render: () => ReactNode;
    onBeforeConfirm?: () => Promise<void> | void;
    onConfirm?: () => Promise<void> | void;
    className?: string;
    target?: React.RefObject<Element> | Element | null;
};

function useInitState() {
    const idRef = useRef(0);
    const [confirm, setConfirm] = useState<Confirm>();

    return {
        idRef,
        confirm,
        setConfirm,
    };
}

// 提取 useInitState 方法的类型
export type StateType = ReturnType<typeof useInitState>;
export type ActionType = ReturnType<typeof useAction>;

function useAction(state: StateType) {
    return {
        warning: async (confirm: Confirm) => {
            state.idRef.current++;
            state.setConfirm({
                id: state.idRef.current,
                target: document.activeElement,
                ...confirm,
            });
            return {
                id: state.idRef.current,
            };
        },
        close: () => {
            state.setConfirm(undefined);
        },
    };
}

function ConfirmUI(props: StateType & ActionType): ReactNode {
    // only one
    const [loading, setLoading] = useState(false);
    if (!props.confirm) {
        return null;
    }
    return (
        <Tippy
            animation="shift-away"
            className="backdrop-blur backdrop-opacity-80 p-2 rounded-lg shadow text-sm w-[100px]"
            content={
                <div className={"flex gap-2 justify-between"}>
                    {props.confirm.render()}
                    <button
                        onClick={async () => {
                            setLoading(true);
                            try {
                                await props.confirm.onBeforeConfirm?.();
                                props.close();
                                props.confirm.onConfirm?.();
                            } catch (e) {
                            } finally {
                                setLoading(false);
                            }
                            props.close();
                        }}
                        className={"text-red-400 text-sm"}
                    >
                        {loading ? "loading" : "确认"}
                    </button>
                </div>
            }
            interactive
            reference={props.confirm.target}
            placement={"top-start"} // 将弹窗位置设置为底部
            visible={!!props.confirm}
            onClickOutside={() => {
                props.close();
            }} // 点击外部关闭弹窗
        />
    );
}

const ConfirmStrategy: IStrategy<StateType, ActionType> = {
    name: "confirm",
    description: "Confirm desc",
    useAction,
    useInitState,
    useUI(state: StateType, action: ActionType) {
        return <ConfirmUI {...state} {...action} />;
    },
};

export default ConfirmStrategy;
