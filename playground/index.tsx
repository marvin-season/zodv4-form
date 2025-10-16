import { createRoot } from 'react-dom/client'
import { defineComponents, ZodV4Form } from '../lib/ZodV4Form'
import { z } from 'zod'
import {
  StringInput,
  FileInput,
  RadioInput,
  Select,
  TextArea,
  Checkbox,
  NumberInput,
  DateInput,
  PasswordInput,
  UrlInput,
  ColorInput,
  RangeInput,
  MultiSelect,
} from './components'
import styles from './styles.module.css'

const components = defineComponents({
  string: StringInput,
  file: FileInput,
  radio: RadioInput,
  select: Select,
  textarea: TextArea,
  checkbox: Checkbox,
  number: NumberInput,
  date: DateInput,
  password: PasswordInput,
  url: UrlInput,
  color: ColorInput,
  range: RangeInput,
  multiselect: MultiSelect,
})

declare module 'zod' {
  interface GlobalMeta {
    component?: keyof typeof components
  }
}

const schema = z.object({
  // 文件上传
  avatar: z
    .file()
    .refine((file) => file.size <= 1024 * 1024 * 5, {
      message: 'File size must be less than 5MB',
    })
    .meta({
      component: 'file',
    }),
  // 文本输入
  name: z.string().min(1).default('John Doe'),

  // 邮箱
  email: z.email().default('john.doe@example.com'),

  // 密码
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .meta({
      component: 'password',
    })
    .default('12345678'),

  // 单选框
  gender: z
    .enum(['male', 'female'])
    .meta({
      component: 'radio',
    })
    .default('male'),

  // 下拉选择
  city: z
    .enum(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'])
    .meta({
      component: 'select',
    })
    .default('Beijing'),

  // 文本区域
  bio: z
    .string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be less than 500 characters')
    .meta({
      component: 'textarea',
    })
    .default('Tell us about yourself...'),

  // 布尔值/复选框
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the terms',
    })
    .meta({
      component: 'checkbox',
    })
    .default(true),

  // 数字输入
  age: z
    .number()
    .min(18, 'You must be at least 18 years old')
    .max(100, 'Age must be less than 100')
    .meta({
      component: 'number',
    })
    .default(25),

  // 日期选择
  birthday: z
    .string()
    .refine(
      (dateStr) => {
        const date = new Date(dateStr)
        return date < new Date()
      },
      {
        message: 'Birthday must be in the past',
      },
    )
    .meta({
      component: 'date',
    })
    .default('2025-01-01'),

  // URL 输入
  website: z
    .url('Please enter a valid URL')
    .meta({
      component: 'url',
    })
    .optional(),

  // 颜色选择器
  favoriteColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format')
    .meta({
      component: 'color',
    })
    .default('#3b82f6'),

  // 范围滑块
  satisfaction: z
    .number()
    .min(0)
    .max(10)
    .meta({
      component: 'range',
    })
    .default(7),

  // 多选
  hobbies: z
    .array(
      z.enum(['Reading', 'Gaming', 'Cooking', 'Sports', 'Music', 'Travel']),
    )
    .min(1, 'Please select at least one hobby')
    .meta({
      component: 'multiselect',
    })
    .default(['Reading', 'Gaming']),
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <div className={styles.formContainer}>
    <h1 className={styles.formTitle}>Playground Form</h1>

    <ZodV4Form schema={schema} onSubmit={console.log} components={components} />
  </div>,
)
