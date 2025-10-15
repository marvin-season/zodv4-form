# ZodV4Form

```bash
npm config set registry https://registry.npmjs.org
```

```bash
npm install zodv4-form zod@4.1.12 react react-dom
```

## Motivation

Focused on form validation and UI.

---

## Basic Example

```tsx
import { ZodV4Form, defineComponents } from "zodv4-form";
import { z } from "zod/v4";

const customComponents = defineComponents({
    slider: (props) => {
        const { fieldJsonSchema, onChange, value } = props;
        const enumValues = fieldJsonSchema.enum as string[];
        const marks = Object.fromEntries(
            enumValues?.map((item, index) => [index, item]) ?? [],
        );

        return (
            <Slider
                value={enumValues.indexOf(value)}
                min={0}
                max={enumValues.length - 1}
                step={1}
                marks={marks}
                onChange={(value) => onChange?.(enumValues[value])}
            />
        );
    },
});
const schema = z.object({
    framework: z.enum(["react", "vue", "angular"]).default("react").meta({
        component: "slider",
    }),

    // Email
    email: z.email().default("test@gmail.com"),
});

function App() {
    const handleSubmit = (data) => {
        console.log("表单数据:", data);
    };

    return <ZodV4Form schema={schema} onSubmit={handleSubmit} />;
}
```

## API Reference

| Props            | Type                   | Default             | Description                                                         |
| ---------------- | ---------------------- | ------------------- | ------------------------------------------------------------------- |
| `schema`         | `ZodObject`            | -                   | Zod Schema object, defining the form structure and validation rules |
| `onSubmit`       | `(data: T) => void`    | -                   | Form submission callback function, receiving validated data         |
| `defaultValues`  | `Partial<T>`           | `{}`                | Form default values                                                 |
| `components`     | `TComponentMap`        | Built-in components | Custom component mapping table                                      |
| `className`      | `string`               | `''`                | CSS class name for the form container                               |
| `fieldClassName` | `string`               | `''`                | CSS class name for the form field container                         |
| `renderFooter`   | `(props) => ReactNode` | Default buttons     | Custom footer area                                                  |
| `renderFields`   | `(props) => ReactNode` | -                   | Custom field rendering                                              |

## License

MIT
