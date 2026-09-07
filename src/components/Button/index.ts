import type { SjfSize } from '../../core/size'
export interface SjfButtonProps {
  size?: SjfSize
  variant?: 'filled' | 'tonal' | 'outlined' | 'text'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: string
  block?: boolean
  danger?: boolean
}
