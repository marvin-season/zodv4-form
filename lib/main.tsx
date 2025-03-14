import ReactDOM from "react-dom/client";
import { ModalHelperProvider, UseCase } from "./main.ts";
import "./main.css";
const A = () => <div>header</div>;
ReactDOM.createRoot(document.getElementById("root")!).render(
    <ModalHelperProvider>
        <UseCase />
    </ModalHelperProvider>,
);
