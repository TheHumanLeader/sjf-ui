import type { SjfFieldProps } from '../shared/control'
export interface SjfInputNumberProps extends SjfFieldProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
}
