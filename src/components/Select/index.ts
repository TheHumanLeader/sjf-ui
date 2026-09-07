import type { SjfFieldProps, SjfValue } from '../shared/control'
export interface SjfSelectOption {
  label: string
  value: SjfValue
  disabled?: boolean
  icon?: string
}
export interface SjfSelectProps extends SjfFieldProps {
  modelValue?: SjfValue | SjfValue[] | null
  options?: readonly SjfSelectOption[]
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  emptyText?: string
}
