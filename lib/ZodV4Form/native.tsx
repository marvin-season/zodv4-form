import { useMemo, type FC, type InputHTMLAttributes } from 'react'

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

export const NativeInput: FC<INativeInputProps<string | number>> = ({
  value,
  onChange,
  name,
  fieldJsonSchema,
  onValidate,
}) => {
  const isNumberInput = useMemo(
    () => fieldJsonSchema.type === 'number',
    [fieldJsonSchema.type],
  )
  return (
    <input
      type={isNumberInput ? 'number' : 'text'}
      name={name}
      value={value ?? ''}
      onChange={(e) => {
        const newValue = isNumberInput ? Number(e.target.value) : e.target.value
        onChange?.(newValue)
        onValidate?.(name, newValue)
      }}
      className='native-input'
    />
  )
}
export const NativeCheckbox: React.FC<INativeInputProps<boolean>> = ({
  value,
  onChange,
}) => (
  <label className='native-checkbox'>
    <input
      type='checkbox'
      checked={value ?? false}
      onChange={(e) => onChange?.(e.target.checked)}
      className='native-checkbox-input'
    />
  </label>
)

export const NativeRadioGroup: React.FC<INativeInputProps<string>> = ({
  value,
  onChange,
  fieldJsonSchema,
  name,
}) => (
  <div className='native-radio-group'>
    {fieldJsonSchema.enum?.map((option: string) => (
      <label key={option} className='native-radio-group-item'>
        <input
          type='radio'
          name={name}
          value={option}
          checked={value === option}
          onChange={(e) => onChange?.(e.target.value)}
          className='native-radio-group-item-input'
        />
        <span className='native-radio-group-item-label'>{option}</span>
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
    className='native-select'
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
  <button type='submit' className='native-submit-button'>
    {label}
  </button>
)

export const NativeResetButton: React.FC<any> = ({ label = 'Reset' }) => (
  <button type='reset' className='native-reset-button'>
    {label}
  </button>
)
