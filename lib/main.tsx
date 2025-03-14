import ReactDOM from "react-dom/client";
import { ModalHelperProvider, UseCase } from "./main.ts";
import "./main.css";
// const A = () => <div>header</div>;
ReactDOM.createRoot(document.getElementById("root")!).render(
    <ModalHelperProvider
        modalCustomize={({ modal, closeModal, confirmModal, loading }) => {
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
