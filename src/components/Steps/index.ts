import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfStep {
  title: string
  description?: string
  disabled?: boolean
}
export interface SjfStepsProps {
  size?: SjfSize
  modelValue?: number
  items: readonly SjfStep[]
  vertical?: boolean
  clickable?: boolean
  label?: string
}
