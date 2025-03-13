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
import { ModalHelperProvider, useModalHelper } from "aio-modal";

function App() {
    const modalHelper = useModalHelper();
    return (
        <>
            <ModalHelperProvider>
                {'your comp'}
            </ModalHelperProvider>
        </>
    );
}
```


## Warning

```tsx
const openYourNotification = () => modalHelper.notification.warning("网络异常");
```

## Modal
```tsx
const openYourModal = async () =>  await modalHelper.modal.open({
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

## Confirm
```tsx
const openYourNotification = async () => await modalHelper.confirm.warning({
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