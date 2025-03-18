import {
    Modal,
    ModalContentRender,
    ModalFooterRender,
    ModalHeaderRender,
} from "@/helper/strategy/modal.tsx";
import { ReactNode } from "react";

export interface ModalCustomize {
    headerRender?: ModalHeaderRender;
    render?: ModalContentRender;
    footerRender?: ModalFooterRender;
}

export type CloseModal = () => void;
export type ConfirmModal = () => void;

export interface ModalCustomizeRender<T extends Modal = Modal> {
    (attr: {
        loading: boolean;
        modal: T;
        closeModal: CloseModal;
        confirmModal: ConfirmModal;
    }): ReactNode;
}

const Direction = [0, 0, 1, 0, -1];

function transferToDirection(i: number) {
    const index = i % Direction.length;
    return [Direction[index], Direction[(index + 1) % Direction.length]];
}

export const initModalFooterRender: ModalFooterRender = ({
    closeModal,
    confirmModal,
    loading,
}) => (
    <div className={"flex justify-end gap-2 modal-footer"}>
        <button
            className={
                "cursor-pointer rounded border px-2.5 py-1.5 text-[#222] leading-4 text-sm"
            }
            onClick={closeModal}
        >
            取消
        </button>
        <button
            className={
                "cursor-pointer rounded bg-blue-500 hover:bg-blue-600 px-2.5 py-1.5 text-white leading-4 text-sm"
            }
            onClick={confirmModal}
        >
            {loading ? "loading" : "确认"}
        </button>
    </div>
);

export const initModalHeaderRender: ModalHeaderRender = ({
    title,
    closeModal,
}) => <div className={"text-lg font-bold modal-header"}>{title}</div>;

/**
 * @param loading current modal loading status
 * @param modal current modal
 * @param closeModal
 * @param confirmModal
 */
export const initModalCustomizeRender: ModalCustomizeRender = ({
    loading,
    modal,
    closeModal,
    confirmModal,
}) => {
    const [i1, i2] = transferToDirection(modal.id || 0);
    return (
        <div
            key={modal.id}
            className={`fixed inset-0 z-999 backdrop-blur backdrop-opacity-25 flex items-center justify-center modal-container-backdrop`}
            onClick={closeModal}
        >
            <div
                key={modal.id}
                style={{
                    transform: `translate(${20 * i1}px, ${20 * i2}px)`,
                }}
                className={`w-[800px] max-md:w-[500px] max-sm:w-4/5 min-h-[200px] z-999
                    bg-[#fefefe] border border-gray-200 rounded-2xl shadow-2xl p-4 
                    flex flex-col justify-between modal-container ${modal.className}
                `}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {modal.headerRender
                    ? modal.headerRender({ closeModal, title: modal.title })
                    : initModalHeaderRender({
                          closeModal,
                          title: modal.title,
                      })}

                <div className={"flex-1 modal-content"}>{modal.render()}</div>
                {/*footer*/}
                {modal.footerRender
                    ? modal.footerRender({ closeModal, confirmModal, loading })
                    : initModalFooterRender({
                          closeModal,
                          confirmModal,
                          loading,
                      })}
            </div>
        </div>
    );
};

export const initModalCustomize: ModalCustomize = {
    headerRender: initModalHeaderRender,
    footerRender: initModalFooterRender,
};
