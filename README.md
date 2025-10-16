# ZodV4Form

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

```tsx
import { ZodV4Form, defineComponents } from 'zodv4-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  age: z.number().min(18),
})
const components = defineComponents({
  number: (props) => <input type='number' {...props} />,
})
createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ZodV4Form schema={schema} onSubmit={console.log} components={components} />
  </>,
)
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
