import { useHelper } from "./index";

const InfiniteModal = () => {
    const helper = useHelper();
    return <button
        className={
            "cursor-pointer bg-blue-400 hover:bg-blue-500 text-white border-2 rounded-lg px-2 py-0.5"
        }
        onClick={async (e) => {
            const result = await helper.modal.open({
                render: InfiniteModal,
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
    </button>;
};

export default function UseCase() {
    const helper = useHelper();
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
