import type { SjfSize } from '../../core/size'
export interface SjfDescriptionItem {
  label: string
  value?: string | number | null
  key?: string
  span?: number
}
export interface SjfDescriptionsProps {
  size?: SjfSize
  items: readonly SjfDescriptionItem[]
  columns?: number
  bordered?: boolean
}
