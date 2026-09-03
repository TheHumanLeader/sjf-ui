import { inject, type ComputedRef, type InjectionKey } from 'vue'
import type { SjfHorizontalAlign, SjfLabelOption } from '../Label'
import type { SjfSize } from '../../core/size'

export interface SjfFormContext {
  columns: ComputedRef<number>
  size: ComputedRef<SjfSize | undefined>
  labelOption: ComputedRef<SjfLabelOption>
  contentAlign: ComputedRef<SjfHorizontalAlign>
  boxGroup: ComputedRef<boolean>
}

export const SJF_FORM_CONTEXT_KEY: InjectionKey<SjfFormContext> = Symbol('sjf-form-context')

export function useSjfFormContext(): SjfFormContext | null {
  return inject(SJF_FORM_CONTEXT_KEY, null)
}
