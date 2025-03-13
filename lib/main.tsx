import ReactDOM from "react-dom/client";
import { ModalHelperProvider, UseCase } from "./main.ts";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ModalHelperProvider modalCustomize={{ headerRender: () => <div>header</div> }}>
        <UseCase />
    </ModalHelperProvider>,
);
