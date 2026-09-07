import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfTreeNode {
  value: SjfValue
  label: string
  icon?: string
  disabled?: boolean
  children?: readonly SjfTreeNode[]
}
export interface SjfTreeProps {
  size?: SjfSize
  nodes: readonly SjfTreeNode[]
  modelValue?: SjfValue | SjfValue[] | null
  expanded?: SjfValue[]
  multiple?: boolean
  label?: string
}
