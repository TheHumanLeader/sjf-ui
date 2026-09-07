import type { SjfSize } from '../../core/size'
import type { SjfOverlayPlacement } from '../../core/overlay'
export interface SjfPopoverProps {
  modelValue?: boolean
  size?: SjfSize
  title?: string
  label?: string
  placement?: SjfOverlayPlacement
  trigger?: 'click' | 'hover' | 'manual'
  disabled?: boolean
  tooltip?: boolean
}
