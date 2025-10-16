import { NativeInput, type NativeComponent } from './native'
export type TComponentType = 'string' | 'checkbox' | 'radio' | 'select'

export type TComponentMap<T = any> = Record<string, NativeComponent<T>> &
  Partial<Record<TComponentType, NativeComponent<T>>>

export function defineComponents<T extends TComponentMap>(components: T) {
  return components as T
}

export const defaultComponents = defineComponents({
  // 类型级别的映射
  string: NativeInput,
})
