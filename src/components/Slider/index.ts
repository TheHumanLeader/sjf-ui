import type { SjfFieldProps, SjfValue } from '../shared/control'
export interface SjfSliderProps extends SjfFieldProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  showValue?: boolean
}
