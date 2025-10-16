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

  const component = fieldJsonSchema.component || fieldJsonSchema.type

  if (component && components[component]) {
    return { component: components[component] }
  }

  return {
    component: () => (
      <div>
        <mark>
          Unsupported type: <strong>{component}</strong>, Please use
          <strong> defineComponents</strong> to define a custom component.
        </mark>
      </div>
    ),
  }
}
