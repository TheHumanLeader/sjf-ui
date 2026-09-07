import type { SjfSize } from '../../core/size'
import type { SjfValue } from '../shared/control'
export interface SjfBreadcrumb {
  label: string
  href?: string
}
export interface SjfBreadcrumbsProps {
  size?: SjfSize
  items: readonly SjfBreadcrumb[]
  label?: string
}
