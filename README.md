# ZodV4Form

使用npm安装时需要设置源

```bash
npm config set registry https://registry.npmjs.org
```

<p align="center">
  <strong>基于 Zod v4 的 React 表单组件库</strong>
</p>

<p align="center">
  通过 Zod Schema 自动生成表单，内置验证和自定义组件支持
</p>

---

## 📦 安装

```bash
npm install zodv4-form zod@4.1.12 react react-dom
# 或
pnpm add zodv4-form zod@4.1.12 react react-dom
# 或
yarn add zodv4-form zod@4.1.12 react react-dom
```

**注意**：本库依赖 React 19+ 和 Zod 4.1.12+

## 🚀 快速开始

### 基础示例

```tsx
import { ZodV4Form, defineComponents } from "zodv4-form";
import { z } from "zod/v4";
// 全局组件映射
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
    // 单选枚举
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

## 📖 API 文档

### ZodV4Form 组件属性

| 属性名           | 类型                   | 必填 | 默认值   | 说明                                    |
| ---------------- | ---------------------- | ---- | -------- | --------------------------------------- |
| `schema`         | `ZodObject`            | ✅   | -        | Zod Schema 对象，定义表单结构和验证规则 |
| `onSubmit`       | `(data: T) => void`    | ✅   | -        | 表单提交回调函数，接收验证后的数据      |
| `defaultValues`  | `Partial<T>`           | ❌   | `{}`     | 表单默认值                              |
| `components`     | `TComponentMap`        | ❌   | 内置组件 | 自定义组件映射表                        |
| `className`      | `string`               | ❌   | `''`     | 表单容器的 CSS 类名                     |
| `fieldClassName` | `string`               | ❌   | `''`     | 表单字段容器的 CSS 类名                 |
| `renderFooter`   | `(props) => ReactNode` | ❌   | 默认按钮 | 自定义底部操作区域                      |
