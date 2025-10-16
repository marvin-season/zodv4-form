import { createRoot } from 'react-dom/client'
import { defineComponents, ZodV4Form } from './ZodV4Form'
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
