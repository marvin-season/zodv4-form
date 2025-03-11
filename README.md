# AIO-Modal
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
  content: ['./src/**/*.tsx', './src/**/*.jsx', 'node_modules/aio-modal/**/*'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

```
## UseCase

```tsx
import { HelperProvider, useHelper } from "aio-modal";

function App() {
  return (
    <>
      <HelperProvider>
        <UseCase />
      </HelperProvider>
    </>
  );
}


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
```