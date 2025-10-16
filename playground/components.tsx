import { INativeInputProps } from '@/ZodV4Form'

export function FileInput(props: INativeInputProps<File>) {
  const { name, value, error, onValidate, onChange } = props
  return (
    <>
      <input
        type='file'
        name={name}
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const isValid = await onValidate?.(name, file)
          if (!isValid) {
            e.target.value = ''
          } else {
            onChange?.(file)
          }
        }}
      />
      {error && <p>{error}</p>}
    </>
  )
}

export function RadioInput(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange, fieldJsonSchema } = props
  const { enum: options } = fieldJsonSchema
  return (
    <>
      {name && (
        <label htmlFor={name}>
          {name} {isRequired && <span>*</span>}
        </label>
      )}
      {options?.map((option: string) => (
        <label key={option}>
          <input
            checked={value === option}
            type='radio'
            name={name}
            value={option}
            onChange={(e) => onChange?.(e.target.value)}
          />
          {option}
        </label>
      ))}
      {error && <p>{error}</p>}
    </>
  )
}

export function Select(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange, fieldJsonSchema } = props
  const { enum: options } = fieldJsonSchema
  debugger
  return (
    <div>
      {name && <label htmlFor={name}>{name}:</label>}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options?.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p>{error}</p>}
    </div>
  )
}
