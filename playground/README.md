<image src="./index.png" width="80%" alt="index" />

## Basic Example

```tsx
import { ZodV4Form } from 'zodv4-form'
import { z } from 'zod'

const components = defineComponents({
  file: FileInput,
  radio: RadioInput,
  select: Select,
})

const App = () => (
  <ZodV4Form
    schema={z.object({
      email: z.email(),
    })}
    onSubmit={console.log}
    components={components}
  />
)
```

better ts support for components, you can use the `declare module 'zod'` to declare the schema meta.

```ts
declare module 'zod' {
  interface GlobalMeta {
    component?: keyof typeof components
  }
}
```
