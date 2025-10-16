# ZodV4Form

[Github](https://github.com/marvin-season/zodv4-form)

```bash
npm config set registry https://registry.npmjs.org
```

```bash
npm install zodv4-form zod@4.1.12 react react-dom
```

## Motivation

Focused on headless form validation and UI.

---

## Basic Example

[Playground](https://github.com/marvin-season/zodv4-form/tree/main/playground/index.tsx)

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

## API Reference

| Props | Type | Default | Description |
| --- | --- | --- | --- |
| `schema` | `ZodObject` | - | Zod Schema object, defining the form structure and validation rules |
| `onSubmit` | `(data: T) => void` | - | Form submission callback function, receiving validated data |
| `defaultValues` | `Partial<T>` | `{}` | Form default values |
| `components` | `TComponentMap` | Built-in components | Custom component mapping table |
| `className` | `string` | `''` | CSS class name for the form container |
| `fieldClassName` | `string` | `''` | CSS class name for the form field container |
| `renderFooter` | `(props) => ReactNode` | Default buttons | Custom footer area |
| `renderFields` | `(props) => ReactNode` | - | Custom field rendering |
