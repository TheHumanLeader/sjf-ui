import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfTableColumn {
  key: string
  title: string
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  compare?: (a: unknown, b: unknown) => number
}
export interface SjfTableProps {
  size?: SjfSize
  rows: readonly Record<string, unknown>[]
  columns: readonly SjfTableColumn[]
  rowKey?: string
  selected?: SjfValue[]
  selectable?: boolean
  page?: number
  pageSize?: number
  paginated?: boolean
  loading?: boolean
  striped?: boolean
  height?: string | number
  caption?: string
}
