import type { SjfSize } from '../../core/size'
export interface SjfDialogProps {
  modelValue?: boolean
  title?: string
  size?: SjfSize
  width?: string | number
  persistent?: boolean
  closable?: boolean
  closeOnBackdrop?: boolean
  loading?: boolean
  confirmText?: string
  cancelText?: string
  closeOnConfirm?: boolean
}
