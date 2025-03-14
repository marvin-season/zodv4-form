import { createContext, ReactNode, useContext, useState } from "react";
import { Strategy, useStrategies } from "./strategy";
import { ActionType as ModalActionType } from "./strategy/modal";
import { ActionType as NotificationActionType } from "./strategy/notification";
import { ActionType as ConfirmActionType } from "./strategy/confirm";
import {
    initModalCustomizeRender,
    type ModalCustomizeRender,
} from "@/helper/init/modal.tsx";

export interface ModalHelperConfig {}

export interface ContextProps {
    modal: ModalActionType;
    notification: NotificationActionType;
    confirm: ConfirmActionType;
    config?: ModalHelperConfig;
    modalCustomizeRender: ModalCustomizeRender;
}

export default function ModalHelperProvider({
    children,
    modalCustomizeRender,
}: {
    children: ReactNode;
    modalCustomizeRender?: ModalCustomizeRender;
}) {
    const strategies = useStrategies();
    const [actionContext, setActionContext] = useState<ContextProps>({
        modalCustomizeRender: modalCustomizeRender || initModalCustomizeRender,
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
