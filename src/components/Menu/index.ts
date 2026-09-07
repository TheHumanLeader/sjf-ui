import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfMenuItem {
  value: SjfValue
  label: string
  icon?: string
  disabled?: boolean
}
export interface SjfMenuProps {
  size?: SjfSize
  modelValue?: SjfValue | null
  items: readonly SjfMenuItem[]
  horizontal?: boolean
  label?: string
}
