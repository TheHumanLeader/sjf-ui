import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfTab {
  value: SjfValue
  label: string
  icon?: string
  disabled?: boolean
}
export interface SjfTabsProps {
  size?: SjfSize
  modelValue?: SjfValue
  items: readonly SjfTab[]
  label?: string
}
