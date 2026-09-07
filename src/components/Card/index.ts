import type { SjfSize } from '../../core/size'
export interface SjfCardProps {
  size?: SjfSize
  title?: string
  subtitle?: string
  variant?: 'outlined' | 'filled' | 'elevated'
}
