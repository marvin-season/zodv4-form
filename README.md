# ZodV4Form 组件使用说明书

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

## 🎨 导入样式

在你的应用入口文件中导入样式：

```typescript
import "zodv4-form/styles";
```

## 🚀 快速开始

### 基础示例

```tsx
import ZodV4Form from "zodv4-form";
import { z } from "zod/v4";

const schema = z.object({
    username: z.string().min(3, "用户名至少3个字符"),
    email: z.string().email("请输入有效的邮箱地址"),
    age: z.number().min(18, "年龄必须大于18岁"),
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

## 🎯 高级功能

### 1. 设置默认值

```tsx
const defaultValues = {
  username: '张三',
  email: 'zhangsan@example.com',
  age: 25,
}

<ZodV4Form
  schema={schema}
  onSubmit={handleSubmit}
  defaultValues={defaultValues}
/>
```

### 2. Schema 中定义默认值

```tsx
const schema = z.object({
    username: z.string().default("游客"),
    email: z.string().email(),
    newsletter: z.boolean().default(true),
});
```

### 3. 添加字段描述和标签

```tsx
const schema = z.object({
    email: z
        .string()
        .email()
        .label("电子邮箱")
        .description("我们不会与任何人分享您的邮箱"),
    password: z
        .string()
        .min(8)
        .label("密码")
        .description("至少8个字符，包含字母和数字"),
});
```

### 4. 支持的字段类型

#### 文本输入框（String）

```tsx
const schema = z.object({
    name: z.string().label("姓名"),
});
```

#### 数字输入框（Number）

```tsx
const schema = z.object({
    age: z.number().min(0).max(150).label("年龄"),
});
```

#### 复选框（Boolean）

```tsx
const schema = z.object({
    agree: z.boolean().label("同意服务条款"),
});
```

#### 单选按钮（Radio）

```tsx
const schema = z.object({
    gender: z.enum(["男", "女", "其他"]).label("性别").component("radio"),
});
```

#### 下拉选择（Select）

```tsx
const schema = z.object({
    city: z
        .enum(["北京", "上海", "广州", "深圳"])
        .label("城市")
        .component("select"),
});
```

### 5. 自定义组件

#### 定义自定义组件

```tsx
import { defineComponents } from "zodv4-form";

const CustomInput = ({ value, onChange, label, error }) => {
    return (
        <div className="custom-field">
            <label>{label}</label>
            <input
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className={error ? "error" : ""}
            />
            {error && <span className="error-msg">{error}</span>}
        </div>
    );
};

const customComponents = defineComponents({
    customInput: CustomInput,
});
```

#### 使用自定义组件

```tsx
const schema = z.object({
  specialField: z.string()
    .component('customInput')
    .label('特殊字段'),
})

<ZodV4Form
  schema={schema}
  onSubmit={handleSubmit}
  components={customComponents}
/>
```

#### 自定义组件接口

```typescript
interface INativeInputProps<T> {
    name: string;
    value?: T;
    error?: string;
    label?: string;
    description?: string;
    isRequired?: boolean;
    fieldJsonSchema?: any;
    onChange?: (value: T) => void;
    onValidate?: (name: string, value: T) => void;
}
```

### 6. 自定义表单底部

```tsx
<ZodV4Form
    schema={schema}
    onSubmit={handleSubmit}
    renderFooter={({ onReset }) => (
        <div className="custom-footer">
            <button type="submit" className="btn-primary">
                提交表单
            </button>
            <button type="button" onClick={onReset} className="btn-secondary">
                重置
            </button>
            <button type="button" className="btn-cancel">
                取消
            </button>
        </div>
    )}
/>
```

### 7. 自定义样式

```tsx
<ZodV4Form
    schema={schema}
    onSubmit={handleSubmit}
    className="my-form-container"
    fieldClassName="my-field-wrapper"
/>
```

## 🌟 完整示例

```tsx
import ZodV4Form from "zodv4-form";
import { z } from "zod/v4";
import { defineComponents } from "zodv4-form";

// 定义 Schema
const userSchema = z.object({
    username: z
        .string()
        .min(3, "用户名至少3个字符")
        .max(20, "用户名最多20个字符")
        .label("用户名")
        .description("请输入您的用户名"),

    email: z.string().email("请输入有效的邮箱地址").label("电子邮箱"),

    age: z
        .number()
        .min(18, "必须年满18岁")
        .max(120, "请输入有效的年龄")
        .label("年龄"),

    gender: z.enum(["男", "女", "其他"]).label("性别").component("radio"),

    city: z
        .enum(["北京", "上海", "广州", "深圳", "其他"])
        .label("所在城市")
        .component("select"),

    newsletter: z
        .boolean()
        .default(false)
        .label("订阅新闻邮件")
        .description("接收最新的产品更新和优惠信息"),
});

function UserRegistrationForm() {
    const handleSubmit = (data) => {
        console.log("提交的数据:", data);
        // 这里处理表单提交逻辑
        // 例如：发送到服务器
    };

    const defaultValues = {
        newsletter: true,
        city: "北京",
    };

    return (
        <div className="container">
            <h1>用户注册表单</h1>
            <ZodV4Form
                schema={userSchema}
                onSubmit={handleSubmit}
                defaultValues={defaultValues}
                className="registration-form"
                renderFooter={({ onReset }) => (
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">
                            注册
                        </button>
                        <button
                            type="button"
                            onClick={onReset}
                            className="btn-reset"
                        >
                            清空
                        </button>
                    </div>
                )}
            />
        </div>
    );
}

export default UserRegistrationForm;
```

## 🔧 内置组件列表

| 组件名               | 类型    | 说明       |
| -------------------- | ------- | ---------- |
| `NativeInput`        | string  | 文本输入框 |
| `NativeNumberInput`  | number  | 数字输入框 |
| `NativeCheckbox`     | boolean | 复选框     |
| `NativeRadioGroup`   | enum    | 单选按钮组 |
| `NativeSelect`       | enum    | 下拉选择框 |
| `NativeSubmitButton` | -       | 提交按钮   |
| `NativeResetButton`  | -       | 重置按钮   |

## 📝 表单验证

表单验证完全由 Zod Schema 定义：

```tsx
const schema = z
    .object({
        // 字符串验证
        username: z
            .string()
            .min(3, "至少3个字符")
            .max(20, "最多20个字符")
            .regex(/^[a-zA-Z0-9_]+$/, "只能包含字母、数字和下划线"),

        // 邮箱验证
        email: z.string().email("无效的邮箱格式"),

        // 数字验证
        age: z
            .number()
            .int("必须是整数")
            .positive("必须是正数")
            .min(18, "必须年满18岁"),

        // 自定义验证
        password: z
            .string()
            .min(8, "密码至少8个字符")
            .refine(
                (val) =>
                    /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val),
                "密码必须包含大写字母、小写字母和数字",
            ),

        // 条件验证
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "两次密码输入不一致",
        path: ["confirmPassword"],
    });
```

## 🎨 样式定制

本库使用 Tailwind CSS 构建，默认提供基础样式。你可以通过以下方式自定义样式：

### 1. 覆盖默认样式

```css
/* 覆盖输入框样式 */
.your-form input {
    border-radius: 8px;
    border-color: #e2e8f0;
}

/* 覆盖错误提示样式 */
.your-form .text-red-600 {
    color: #dc2626;
    font-weight: 600;
}
```

### 2. 使用自定义 className

```tsx
<ZodV4Form
    schema={schema}
    onSubmit={handleSubmit}
    className="custom-form"
    fieldClassName="custom-field"
/>
```

## 🔍 TypeScript 支持

本库完全使用 TypeScript 编写，提供完整的类型支持：

```tsx
import ZodV4Form from "zodv4-form";
import { z } from "zod/v4";

const schema = z.object({
    username: z.string(),
    age: z.number(),
});

// TypeScript 会自动推断类型
type FormData = z.infer<typeof schema>;
// { username: string; age: number }

function handleSubmit(data: FormData) {
    // data 拥有完整的类型提示
    console.log(data.username); // ✅
    console.log(data.age); // ✅
}

<ZodV4Form schema={schema} onSubmit={handleSubmit} />;
```

## 🐛 常见问题

### Q: 如何处理嵌套对象？

A: 目前版本暂不支持嵌套对象，推荐使用扁平化的 Schema 结构。

### Q: 如何实现字段之间的联动？

A: 可以通过自定义组件实现，在自定义组件中访问 `fieldJsonSchema` 进行条件渲染。

### Q: 如何异步验证？

A: 可以使用 Zod 的 `.refine()` 方法配合异步函数：

```tsx
const schema = z.object({
    email: z
        .string()
        .email()
        .refine(async (email) => {
            const exists = await checkEmailExists(email);
            return !exists;
        }, "该邮箱已被注册"),
});
```

### Q: 如何禁用某个字段？

A: 通过自定义组件实现，或者在 Schema 中添加元数据：

```tsx
const schema = z.object({
    username: z.string().disabled(true), // 需要自定义组件支持
});
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<p align="center">Made with ❤️ by ZodV4Form Team</p>
