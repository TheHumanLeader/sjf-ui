import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfPaginationProps {
  size?: SjfSize
  modelValue?: number
  total: number
  pageSize?: number
  disabled?: boolean
  label?: string
}
