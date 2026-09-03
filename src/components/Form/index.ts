import type { SjfSize } from '../../core/size'
import type { SjfLabelMode, SjfLabelOption } from '../Label'

export interface SjfFormProps {
  columns?: number
  gap?: SjfSize | 0
  size?: SjfSize
  labelMode?: SjfLabelMode
  labelOption?: SjfLabelOption
}

export interface SjfFormCellOption {
  colSpan?: number
  rowSpan?: number
}
