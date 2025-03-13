import { useModalHelper } from "./index";

const InfiniteModal = () => {
    const helper = useModalHelper();
    return (
        <button
            className={
                "cursor-pointer bg-blue-400 hover:bg-blue-500 text-white border-2 rounded-lg px-2 py-0.5"
            }
            onClick={async (e) => {
                const result = await helper.modal.open({
                    title: "The InfiniteModal",
                    render: InfiniteModal,
                    headerRender: ({ closeModal }) => (
                        <div
                            className={"text-lg font-bold flex justify-between"}
                        >
                            <span>Custom Title</span>
                            <span
                                className={"cursor-pointer"}
                                onClick={closeModal}
                            >
                                X
                            </span>
                        </div>
                    ),
                    footerRender: ({ closeModal, confirmModal, loading }) => {
                        return (
                            <div className={"flex gap-2"}>
                                <button onClick={closeModal}>cancel</button>
                                <button onClick={confirmModal}>
                                    {loading ? "loading" : "confirm"}
                                </button>
                            </div>
                        );
                    },
                    onBeforeConfirm: () => {
                        console.log("onBeforeConfirm");
                        return new Promise((resolve) =>
                            setTimeout(resolve, 1000),
                        );
                    },
                    onConfirm() {
                        console.log("onConfirm");
                    },
                });
            }}
        >
            modal
        </button>
    );
};

export default function UseCase() {
    const helper = useModalHelper();
    return (
        <>
            <button
                className={
                    "cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white border-2 rounded-lg px-2 py-0.5"
                }
                onClick={(e) => {
                    helper.notification.warning("网络异常");
                }}
            >
                警告
            </button>

            <InfiniteModal />
            <button
                id={"delete"}
                className={
                    "cursor-pointer bg-red-400 hover:bg-red-500 text-white border-2 rounded-lg px-2 py-0.5"
                }
                onClick={async (e) => {
                    const result = await helper.confirm.warning({
                        render: () => {
                            return <>hi</>;
                        },
                        onBeforeConfirm: () => {
                            console.log("onBeforeConfirm");
                            return new Promise((resolve) =>
                                setTimeout(resolve, 1000),
                            );
                        },
                        onConfirm() {
                            console.log("onConfirm");
                        },
                    });
                }}
            >
                删除
            </button>
        </>
    );
}
