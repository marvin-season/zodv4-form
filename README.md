# AIO-Modal

## install
```shell
pnpm add ai-modal
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
```jsx
import { UseCase, HelperProvider } from "aio-modal";

function App() {
  return (
    <>
      <HelperProvider>
        <UseCase />
      </HelperProvider>
    </>
  );
}

export default App;

```