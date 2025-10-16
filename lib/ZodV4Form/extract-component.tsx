import { type TFieldJSONSchema } from './native'
import { defaultComponents, type TComponentMap } from './default-components'

interface ExtractComponentParams<T> {
  (params: { fieldJsonSchema: TFieldJSONSchema; components: T }): {
    component: T[keyof T]
  }
}

export const extractComponent: ExtractComponentParams<TComponentMap> = (
  params,
) => {
  const { fieldJsonSchema } = params

  const components = Object.assign(defaultComponents, params.components)

  if (fieldJsonSchema.type && !components[fieldJsonSchema.type]) {
    return {
      component: () => (
        <div>
          <mark>
            Unsupported type: <strong>{fieldJsonSchema.type}</strong>, Please
            use
            <strong> defineComponents</strong> to define a custom component.
          </mark>
        </div>
      ),
    }
  }
  const { component = 'string' } = fieldJsonSchema

  const CustomComponent = components[component]
  return {
    component: CustomComponent,
  }
}
