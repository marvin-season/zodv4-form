import { ModalFooterRender } from "@/helper/strategy/modal.tsx";

export const InitModalFooterRender: ModalFooterRender = ({
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
