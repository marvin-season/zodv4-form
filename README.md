# AIO-Modal

## Github
https://github.com/marvin-season/aio-modal

## Preview
https://marvin-season.github.io/danny-website/docs/react/advanced/use-helper

## install
```shell
pnpm add aio-modal
```

## config
**`node_modules/aio-modal/**/*`** in your tailwind config

```shell
export default {
  content: ['node_modules/aio-modal/**/*'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

```
## Context
```tsx
import { HelperProvider } from "aio-modal";

function App() {
  return (
    <>
      <HelperProvider>
          {'your comp'}
      </HelperProvider>
    </>
  );
}
```


## Warning

```tsx
function UseCase() {
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
        </>
    );
}
```

## Modal
```tsx
const openYourModal = async () =>  await helper.modal.open({
    title: "The InfiniteModal",
    render: InfiniteModal,
    headerRender: ({closeModal}) =>  <div className={"text-lg font-bold flex justify-between"}>
        <span>Custom Title</span>
        <span className={"cursor-pointer"} onClick={closeModal}>X</span>
    </div>,
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
```

## Notification
```tsx
const openYourNotification = async () => await helper.confirm.warning({
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
    }
});
```