import { inject, type ComputedRef, type InjectionKey } from 'vue'
import type { SjfSize } from '../../core/size'
import type { SjfListItemRole } from './index'

export interface SjfListContext {
  size: ComputedRef<SjfSize>
  activeColor: ComputedRef<string>
  itemRole: ComputedRef<SjfListItemRole | undefined>
  isActive: (value: unknown) => boolean
  select: (value: unknown) => boolean
}

export const SJF_LIST_CONTEXT_KEY: InjectionKey<SjfListContext> = Symbol('sjf-list-context')

export function useSjfListContext(): SjfListContext | null {
  return inject(SJF_LIST_CONTEXT_KEY, null)
}
