import { createRoot } from 'react-dom/client'
import { defineComponents, ZodV4Form } from './ZodV4Form'
import { z } from 'zod'

const schema = z.object({
  avatar: z
    .file()
    .refine((file) => file.size >= 1024 * 1024 * 5, {
      message: 'File size must be less than 5MB',
    })
    .meta({
      component: 'file',
    }),
  name: z.string().min(1),
  email: z.email(),
})
const components = defineComponents({
  file: (props) => {
    const { name, value, error, onValidate } = props
    return (
      <>
        <input
          type='file'
          name={name}
          onChange={async (e) => {
            const file = e.target.files?.[0]
            const isValid = await onValidate?.(name, file)
            console.log(isValid)
            if (!isValid) {
              e.target.value = ''
            }
          }}
        />
        {error && <p>{error}</p>}
      </>
    )
  },
})
createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ZodV4Form schema={schema} onSubmit={console.log} components={components} />
  </>,
)
