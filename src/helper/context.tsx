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

export default function HelperProvider({ children }: { children: ReactNode }) {
    const strategies = useStrategies();
    const [actionContext, setActionContext] = useState<ContextProps>(
        {} as ContextProps,
    );

    return (
        <HelperContext.Provider value={actionContext}>
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
        </HelperContext.Provider>
    );
}

export const HelperContext = createContext<ContextProps>({} as ContextProps);

export function useHelper() {
    return useContext(HelperContext);
}
