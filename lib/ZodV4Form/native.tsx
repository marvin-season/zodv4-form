import { useMemo, type FC, type InputHTMLAttributes } from 'react'

export type TFieldJSONSchema = {
  component?: string
  placeholder?: string
  label?: string
  description?: string
  type?: string
  [key: string]: any
}

export type INativeInputProps<T> = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'placeholder' | 'disabled' | 'required' | 'className'
> & {
  onChange?: (value: T) => void
  onValidate?: (name: string, value: T) => Promise<boolean>
  readonly value?: T
  error?: string
  label?: string
  name: string
  description?: string
  options?: T[]
  isRequired?: boolean
  fieldJsonSchema?: any
}

export type NativeComponent<T> = React.ComponentType<INativeInputProps<T>>
// ============ 默认组件 ============

export const NativeInput: FC<INativeInputProps<string | number>> = ({
  value,
  onChange,
  name,
  fieldJsonSchema,
  onValidate,
  isRequired,
  error,
}) => {
  const isNumberInput = useMemo(
    () => fieldJsonSchema.type === 'number',
    [fieldJsonSchema.type],
  )

  const label: string = fieldJsonSchema.label || name

  return (
    <div>
      <label htmlFor={name}>
        {label}: {isRequired && <span>*</span>}
      </label>
      <input
        type={isNumberInput ? 'number' : 'text'}
        name={name}
        value={value ?? ''}
        onChange={(e) => {
          const newValue = isNumberInput
            ? Number(e.target.value)
            : e.target.value
          onChange?.(newValue)
          onValidate?.(name, newValue)
        }}
        className='native-input'
      />
      {error && <p>{error}</p>}
    </div>
  )
}
