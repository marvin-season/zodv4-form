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

[Playground](./lib/playground.tsx)

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
