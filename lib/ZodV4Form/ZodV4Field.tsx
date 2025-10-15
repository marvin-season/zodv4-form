import { extractComponent } from './extract-component'
import { type TComponentMap } from './builtin-components'
import type { INativeInputProps } from './native'

export type ZodV4FieldProps<T = string> = INativeInputProps<T> & {
  components: TComponentMap
  isRequired?: boolean
  name: string
  updateField: (name: string, value: T) => void
  className?: string
  onValidate: (name: string, value: T) => void
}

export function ZodV4Field({
  name,
  fieldJsonSchema,
  components,
  isRequired,
  value,
  error,
  className,
  updateField,
  onValidate,
}: ZodV4FieldProps) {
  // 根据类型渲染对应的组件
  const { component: FieldComponent, isCustom } = extractComponent({
    fieldJsonSchema,
    components,
  })

  if (!FieldComponent) return null

  const { label, description } = fieldJsonSchema

  if (isCustom) {
    return (
      <FieldComponent
        name={name}
        label={label || name}
        description={description}
        value={value}
        error={error}
        isRequired={isRequired}
        onValidate={onValidate}
        onChange={(newValue) => {
          updateField(name, newValue)
        }}
        fieldJsonSchema={fieldJsonSchema}
      />
    )
  }

  return (
    <div key={name} className={`${className}`}>
      <label>
        {label || name}
        {isRequired && <span>*</span>}
      </label>

      {description && <p>{description}</p>}

      <FieldComponent
        name={name}
        value={value}
        error={error}
        onValidate={onValidate}
        onChange={(newValue) => {
          updateField(name, newValue)
        }}
        fieldJsonSchema={fieldJsonSchema}
      />

      {error && <p>{error}</p>}
    </div>
  )
}
