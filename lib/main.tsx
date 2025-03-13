import ReactDOM from "react-dom/client";
import { ModalHelperProvider, UseCase, useModalHelper } from "./main.ts";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ModalHelperProvider>
        <UseCase />
    </ModalHelperProvider>,
);
