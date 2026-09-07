import type { SjfFieldProps, SjfValue } from '../shared/control'
export interface SjfTimePickerProps extends SjfFieldProps {
  modelValue?: string
  min?: string
  max?: string
  step?: number
}
