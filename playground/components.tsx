import { INativeInputProps } from '@/ZodV4Form'
import styles from './styles.module.css'

export function StringInput(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange, fieldJsonSchema } = props
  const inputType = fieldJsonSchema?.format === 'email' ? 'email' : 'text'

  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={inputType}
        name={name}
        value={value || ''}
        className={error ? styles.inputError : styles.input}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function FileInput(props: INativeInputProps<File>) {
  const { name, value, error, onValidate, onChange, isRequired } = props
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type='file'
        name={name}
        className={styles.fileInput}
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
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function RadioInput(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange, fieldJsonSchema } = props
  const { enum: options } = fieldJsonSchema
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.radioGroup}>
        {options?.map((option: string) => (
          <label key={option} className={styles.radioWrapper}>
            <input
              checked={value === option}
              type='radio'
              name={name}
              value={option}
              className={styles.radio}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <span className={styles.radioLabel}>{option}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function Select(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange, fieldJsonSchema } = props
  const { enum: options } = fieldJsonSchema
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        className={error ? styles.selectError : styles.select}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options?.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function TextArea(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange } = props
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value || ''}
        className={error ? styles.textareaError : styles.textarea}
        onChange={(e) => onChange?.(e.target.value)}
        rows={4}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function Checkbox(props: INativeInputProps<boolean>) {
  const { name, value, error, isRequired, onChange } = props
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.checkboxWrapper}>
        <input
          type='checkbox'
          name={name}
          checked={value || false}
          className={styles.checkbox}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className={styles.checkboxLabel}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </span>
      </label>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function NumberInput(props: INativeInputProps<number>) {
  const { name, value, error, isRequired, onChange } = props
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type='number'
        name={name}
        value={value || ''}
        className={error ? styles.inputError : styles.input}
        onChange={(e) => onChange?.(Number(e.target.value))}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function DateInput(props: INativeInputProps<Date | string>) {
  const { name, value, error, isRequired, onChange } = props
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return ''
    if (typeof date === 'string') return date.split('T')[0]
    return date.toISOString().split('T')[0]
  }
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type='date'
        name={name}
        value={formatDate(value)}
        className={error ? styles.inputError : styles.input}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function PasswordInput(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange } = props
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type='password'
        name={name}
        value={value || ''}
        className={error ? styles.inputError : styles.input}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function UrlInput(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange } = props
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type='url'
        name={name}
        value={value || ''}
        className={error ? styles.inputError : styles.input}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder='https://example.com'
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function ColorInput(props: INativeInputProps<string>) {
  const { name, value, error, isRequired, onChange } = props
  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label htmlFor={name} className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.colorInputWrapper}>
        <input
          type='color'
          name={name}
          value={value || '#000000'}
          className={styles.colorInput}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <span className={styles.colorValue}>{value || '#000000'}</span>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function RangeInput(props: INativeInputProps<number>) {
  const { name, value, error, isRequired, onChange, fieldJsonSchema } = props
  const min = (fieldJsonSchema as any).minimum || 0
  const max = (fieldJsonSchema as any).maximum || 100
  return (
    <div className={styles.fieldGroup}>
      <div className={styles.rangeWrapper}>
        {name && (
          <label htmlFor={name} className={styles.label}>
            {name}
            {isRequired && <span className={styles.required}>*</span>}
            <span className={styles.rangeValue}>{value}</span>
          </label>
        )}
        <input
          type='range'
          name={name}
          value={value || min}
          min={min}
          max={max}
          className={styles.range}
          onChange={(e) => onChange?.(Number(e.target.value))}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export function MultiSelect(props: INativeInputProps<string[]>) {
  const { name, value, error, isRequired, onChange, fieldJsonSchema } = props
  const options = (fieldJsonSchema as any).items?.enum || []

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentValue = value || []
    if (checked) {
      onChange?.([...currentValue, option])
    } else {
      onChange?.(currentValue.filter((v) => v !== option))
    }
  }

  return (
    <div className={styles.fieldGroup}>
      {name && (
        <label className={styles.label}>
          {name}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.multiSelectGroup}>
        {options.map((option: string) => (
          <label key={option} className={styles.checkboxWrapper}>
            <input
              type='checkbox'
              checked={(value || []).includes(option)}
              className={styles.checkbox}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
            />
            <span className={styles.checkboxLabel}>{option}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
