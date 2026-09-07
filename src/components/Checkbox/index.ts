import type { SjfFieldProps, SjfValue } from '../shared/control'
export interface SjfCheckboxProps extends SjfFieldProps {
  modelValue?: boolean
  indeterminate?: boolean
  text?: string
}
