import { createContext, ReactNode, useContext, useState } from "react";
import { Strategy, useStrategies } from "./strategy";
import {
    ActionType as ModalActionType,
    ModalContentRender,
    ModalFooterRender,
    ModalHeaderRender,
} from "./strategy/modal";
import { ActionType as NotificationActionType } from "./strategy/notification";
import { ActionType as ConfirmActionType } from "./strategy/confirm";
import initModalCustomize from "@/helper/init/modal.tsx";

export interface ModalHelperConfig {}
export interface ModalCustomize {
    headerRender?: ModalHeaderRender;
    render?: ModalContentRender;
    footerRender?: ModalFooterRender;
}

export interface ContextProps {
    modal: ModalActionType;
    notification: NotificationActionType;
    confirm: ConfirmActionType;
    config?: ModalHelperConfig;
    modalCustomize: ModalCustomize;
}

export default function ModalHelperProvider({
    children,
    modalCustomize,
}: {
    children: ReactNode;
    modalCustomize?: ModalCustomize;
}) {
    const strategies = useStrategies();
    const [actionContext, setActionContext] = useState<ContextProps>({
        modalCustomize: { ...initModalCustomize, ...modalCustomize}
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
