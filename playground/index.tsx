import { createRoot } from 'react-dom/client'
import { defineComponents, ZodV4Form } from '../lib/ZodV4Form'
import { z } from 'zod'
import { FileInput, RadioInput, Select } from './components'

const schema = z.object({
  avatar: z
    .file()
    .refine((file) => file.size >= 1024 * 1024 * 5, {
      message: 'File size must be less than 5MB',
    })
    .meta({
      component: 'file',
    }),
  name: z.string().min(1).default('John Doe'),
  email: z.email().default('john.doe@example.com'),
  gender: z
    .enum(['male', 'female'])
    .meta({
      component: 'radio',
    })
    .default('male'),
  city: z
    .enum(['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'])
    .meta({
      component: 'select',
    })
    .default('Beijing'),
})
const components = defineComponents({
  file: FileInput,
  radio: RadioInput,
  select: Select,
})
createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ZodV4Form schema={schema} onSubmit={console.log} components={components} />
  </>,
)
