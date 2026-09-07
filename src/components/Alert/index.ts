import type { SjfSize } from '../../core/size'
import type { SjfTone } from '../shared/control'
export interface SjfAlertProps {
  size?: SjfSize
  title?: string
  tone?: SjfTone
  closable?: boolean
}
