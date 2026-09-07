import type { SjfSize } from '../../core/size'
export interface SjfSnackbarProps {
  modelValue?: boolean
  message?: string
  action?: string
  duration?: number
  size?: SjfSize
}
