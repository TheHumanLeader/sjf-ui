import type { SjfSize } from '../../core/size'
export interface SjfProgressProps {
  size?: SjfSize
  modelValue?: number
  max?: number
  indeterminate?: boolean
  label?: string
  showValue?: boolean
}
