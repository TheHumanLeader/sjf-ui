import { computed, shallowRef } from 'vue'
import { getSjfSizeValue, useSjfBaseSize, type SjfSize } from '../../core/size'
import { useSjfFormContext } from '../Form/context'
import type { SjfLabelProps } from '../Label'

export interface SjfFieldProps extends SjfLabelProps {
  name?: string
  readonly?: boolean
  placeholder?: string
}
export type SjfValue = string | number
export type SjfTone = 'primary' | 'neutral' | 'success' | 'warning' | 'error'

export function useSjfControl(
  props: {
    size?: SjfSize
    disabled?: boolean
    required?: boolean
    error?: boolean
    labelOption?: SjfLabelProps['labelOption']
  } & Partial<SjfFieldProps>,
) {
  const form = useSjfFormContext()
  const base = useSjfBaseSize()
  const size = computed(() => props.size ?? form?.size.value ?? base.value)
  const disabled = computed(
    () =>
      props.disabled ??
      props.labelOption?.disabled ??
      form?.labelOption.value.disabled ??
      false,
  )
  const required = computed(
    () =>
      props.required ??
      props.labelOption?.required ??
      form?.labelOption.value.required ??
      false,
  )
  const error = computed(
    () =>
      props.error ??
      props.labelOption?.error ??
      form?.labelOption.value.error ??
      false,
  )
  const style = computed(() => ({
    '--sjf-c-h': getSjfSizeValue('controlHeight', size.value),
    '--sjf-c-pd': getSjfSizeValue('padding', size.value),
    '--sjf-c-gap': getSjfSizeValue('gap', size.value, -1),
    '--sjf-c-rd': getSjfSizeValue('radius', size.value, -1),
    '--sjf-c-font': getSjfSizeValue('fontSize', size.value),
    '--sjf-c-icon': getSjfSizeValue('icon', size.value),
  }))
  const field = computed(() => ({
    label: props.label,
    helper: props.helper,
    labelOption: props.labelOption,
    mode: props.mode,
    colSpan: props.colSpan,
    rowSpan: props.rowSpan,
    labelAlign: props.labelAlign,
    contentAlign: props.contentAlign,
    errorDisplay: props.errorDisplay,
    size: size.value,
    disabled: disabled.value,
    required: required.value,
    error: error.value,
  }))
  return { size, disabled, required, error, style, field }
}

export function useSjfValue<T>(
  read: () => T | undefined,
  emit: (value: T) => void,
  initial: T,
) {
  const local = shallowRef<T>(initial)
  return computed<T>({
    get: () => (read() === undefined ? local.value : (read() as T)),
    set: (value) => {
      local.value = value
      emit(value)
    },
  })
}
