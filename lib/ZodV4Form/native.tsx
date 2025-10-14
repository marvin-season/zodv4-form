import type { FC, InputHTMLAttributes } from 'react'

export type TFieldJSONSchema = {
  component?: string
  placeholder?: string
  label?: string
  description?: string
  [key: string]: any
}

export type INativeInputProps<T> = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'placeholder' | 'disabled' | 'required' | 'className'
> & {
  onChange?: (value: T) => void
  onValidate?: (name: string, value: T) => void
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

export const NativeNumberInput: React.FC<any> = ({
  value,
  onChange,
  onValidate,
  name,
}) => (
  <input
    name={name}
    type='number'
    value={value ?? ''}
    onChange={(e) => {
      onChange(Number(e.target.value))
      onValidate?.(name, Number(e.target.value))
    }}
    className={`
      w-full rounded-md border border-gray-300 px-3 py-2
      focus:ring-2 focus:ring-blue-500 focus:outline-none
    `}
  />
)

export const NativeInput: FC<INativeInputProps<string>> = ({
  value,
  onChange,
  name,
  onValidate,
}) => (
  <input
    name={name}
    value={value ?? ''}
    onChange={(e) => {
      onChange?.(e.target.value)
      onValidate?.(name, e.target.value)
    }}
    className={`
      w-full rounded-md border border-gray-300 px-3 py-2
      focus:ring-2 focus:ring-blue-500 focus:outline-none
    `}
  />
)

export const NativeCheckbox: React.FC<INativeInputProps<boolean>> = ({
  value,
  onChange,
}) => (
  <label className='flex cursor-pointer items-center gap-2'>
    <input
      type='checkbox'
      checked={value ?? false}
      onChange={(e) => onChange?.(e.target.checked)}
      className={`
        h-4 w-4 rounded border-gray-300 text-blue-600
        focus:ring-blue-500
      `}
    />
  </label>
)

export const NativeRadioGroup: React.FC<INativeInputProps<string>> = ({
  value,
  onChange,
  fieldJsonSchema,
  name,
}) => (
  <div className='flex flex-col gap-2'>
    {fieldJsonSchema.enum?.map((option: string) => (
      <label key={option} className='flex cursor-pointer items-center gap-2'>
        <input
          type='radio'
          name={name}
          value={option}
          checked={value === option}
          onChange={(e) => onChange?.(e.target.value)}
          className={`
            h-4 w-4 border-gray-300 text-blue-600
            focus:ring-blue-500
          `}
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
)

export const NativeSelect: React.FC<INativeInputProps<any>> = ({
  value,
  onChange,
  fieldJsonSchema,
}) => (
  <select
    value={value ?? ''}
    onChange={(e) => onChange?.(e.target.value)}
    className={`
      w-full rounded-md border border-gray-300 px-3 py-2
      focus:ring-2 focus:ring-blue-500 focus:outline-none
    `}
  >
    <option value=''>请选择...</option>
    {fieldJsonSchema.enum.map((option: string) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

export const NativeSubmitButton: React.FC<any> = ({ label = 'Submit' }) => (
  <button type='submit' className='rounded-md bg-blue-500 px-4 py-2 text-white'>
    {label}
  </button>
)

export const NativeResetButton: React.FC<any> = ({ label = 'Reset' }) => (
  <button type='reset' className='rounded-md border border-gray-300 px-4 py-2'>
    {label}
  </button>
)
