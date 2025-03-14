import ReactDOM from "react-dom/client";
import { ModalHelperProvider, UseCase } from "./main.ts";
import "./main.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <ModalHelperProvider
        modalCustomizeRender={({ modal, closeModal, confirmModal, loading }) => {
            return (
                <div>
                    {modal.headerRender?.({ closeModal, title: modal.title })}
                    {modal.render()}
                    {modal.footerRender?.({
                        closeModal,
                        confirmModal,
                        loading,
                    })}
                </div>
            );
        }}
    >
        <UseCase />
    </ModalHelperProvider>,
);
