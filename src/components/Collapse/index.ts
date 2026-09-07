import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfCollapseItem {
  value: SjfValue
  title: string
  content?: string
  disabled?: boolean
}
export interface SjfCollapseProps {
  size?: SjfSize
  modelValue?: SjfValue[]
  items: readonly SjfCollapseItem[]
  accordion?: boolean
}
