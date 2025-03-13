import { createContext, ReactNode, useContext, useState } from "react";
import { Strategy, useStrategies } from "./strategy";
import { ActionType as ModalActionType } from "./strategy/modal";
import { ActionType as NotificationActionType } from "./strategy/notification";
import { ActionType as ConfirmActionType } from "./strategy/confirm";

export interface ContextProps {
    modal: ModalActionType;
    notification: NotificationActionType;
    confirm: ConfirmActionType;
}

export default function ModalHelperProvider({ children }: { children: ReactNode }) {
    const strategies = useStrategies();
    const [actionContext, setActionContext] = useState<ContextProps>(
        {} as ContextProps,
    );

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

export const ModalHelperContext = createContext<ContextProps>({} as ContextProps);

export function useModalHelper() {
    return useContext(ModalHelperContext);
}
