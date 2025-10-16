import { extractComponent } from './extract-component'
import { type TComponentMap } from './default-components'
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
  const { component: FieldComponent } = extractComponent({
    fieldJsonSchema,
    components,
  })

  if (!FieldComponent) return null

  const { label, description } = fieldJsonSchema

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
