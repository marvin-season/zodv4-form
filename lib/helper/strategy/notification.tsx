import { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";

type Notification = {
    id: number;
    type: "warning" | "success" | "error";
    message: string;
    className: string;
};

// 提取 useInitState 方法的类型
export type StateType = ReturnType<typeof useInitState>;
export type ActionType = ReturnType<typeof useAction>;

function useAction(state: StateType) {
    const remove = (id: number) => {
        state.setNotifications((prev) => prev.filter((item) => item.id !== id));
    };
    const warning = (message: string) => {
        state.idRef.current++;
        state.setNotifications((prev) => {
            return prev.concat({
                message,
                id: state.idRef.current,
                type: "warning",
                className: "bg-white",
            });
        });

        setTimeout(() => {
            remove(state.idRef.current);
        }, 3000);
    };
    return {
        remove,
        warning,
    };
}

function useInitState() {
    const idRef = useRef(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    return {
        idRef,
        setNotifications,
        notifications,
    };
}

function NotificationUI(props: StateType & ActionType) {
    return props?.notifications.map((notification, index) => {
        return (
            <div
                key={notification.id}
                className={`transition-all duration-500 shadow-[2px_2px_12px_rgba(0,0,0,0.25)] 
                    min-w-[320px] min-h-[40px] rounded-lg p-4 fixed top-0 right-20 z-999 opacity-80 hover:opacity-100 hover:z-1000
                    hover:translate-y-[-20px] hover:translate-x-[4px] ${notification.className}
                `}
                style={{
                    transform: `translateY(${40 + 40 * index}px)`,
                }}
            >
                <div className={"text-lg font-bold"}>Notification</div>
                <div className={"text-sm flex justify-between"}>
                    <span>{notification.message + notification.id}</span>
                    <button
                        className={"cursor-pointer"}
                        onClick={() => {
                            props.remove(notification.id);
                        }}
                    >
                        X
                    </button>
                </div>
            </div>
        );
    });
}

const NotificationStrategy: IStrategy<StateType, ActionType> = {
    name: "notification",
    description: "notification desc",
    useAction,
    useInitState,
    useUI(state: StateType, action: ActionType) {
        return <NotificationUI {...state} {...action} />;
    },
};

export default NotificationStrategy;
