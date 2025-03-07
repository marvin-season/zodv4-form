import NotificationStrategy from "./notification";
import ModalStrategy from "./modal";
import ConfirmStrategy from "./confirm";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

export interface IStrategy<
    S extends Record<string, any>,
    A extends Record<string, Function>,
> {
    name: "notification" | "modal" | "confirm";
    description: string;
    useInitState: () => S;
    useAction: (state: S) => A;
    useUI: (state: S, action: A) => ReactNode;
}

export function Strategy(
    item: IStrategy<any, any> & {
        setActionContext: Dispatch<SetStateAction<Record<string, any>>>;
    },
) {
    const state = item.useInitState();
    const action = item.useAction(state);

    useEffect(() => {
        item.setActionContext((prev) => {
            if (prev[item.name]) {
                return prev;
            }
            prev[item.name] = action;
            return prev;
        });
    }, []);

    return item.useUI(state, action);
}

export const useStrategies = () => {
    return [NotificationStrategy, ModalStrategy, ConfirmStrategy];
};
