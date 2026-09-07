import type { SjfSize } from '../../core/size'
import type { SjfTone } from '../shared/control'
export interface SjfBadgeProps {
  size?: SjfSize
  value?: string | number
  max?: number
  dot?: boolean
  showZero?: boolean
  tone?: SjfTone
}
