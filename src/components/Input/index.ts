import type { SjfLabelOption } from '../Label'

export type SjfInputModelValue = string | number | null | undefined

export interface SjfInputProps {
  modelValue?: SjfInputModelValue
  label?: string
  labelOption?: SjfLabelOption
  colSpan?: number
  rowSpan?: number

  type?: string
  name?: string
  placeholder?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: boolean
}
