import { createContext, ReactNode, useContext, useState } from "react";
import { Strategy, useStrategies } from "./strategy";
import { ActionType as ModalActionType } from "./strategy/modal";
import { ActionType as NotificationActionType } from "./strategy/notification";
import { ActionType as ConfirmActionType } from "./strategy/confirm";
import {
    initModalCustomize,
    modalCustomizeRender,
    type ModalCustomize,
    type ModalCustomizeRender,
} from "@/helper/init/modal.tsx";

export interface ModalHelperConfig {}

export interface ContextProps {
    modal: ModalActionType;
    notification: NotificationActionType;
    confirm: ConfirmActionType;
    config?: ModalHelperConfig;
    modalCustomize: ModalCustomize | ModalCustomizeRender;
}

export default function ModalHelperProvider({
    children,
    modalCustomize,
}: {
    children: ReactNode;
    modalCustomize?: ModalCustomize | ModalCustomizeRender;
}) {
    const strategies = useStrategies();
    const [actionContext, setActionContext] = useState<ContextProps>({
        modalCustomize: modalCustomize
            ? typeof modalCustomize === "function"
                ? modalCustomize
                : Object.assign(modalCustomize, initModalCustomize)
            : modalCustomizeRender,
    } as ContextProps);

    return (
        <ModalHelperContext.Provider value={actionContext}>
            {strategies.map((item) => {
                return (
                    <Strategy
                        key={item.name}
                        {...item}
                        setActionContext={setActionContext}
                    />
                );
            })}
            {children}
        </ModalHelperContext.Provider>
    );
}

export const ModalHelperContext = createContext<ContextProps>(
    {} as ContextProps,
);

export function useModalHelper() {
    return useContext(ModalHelperContext);
}
