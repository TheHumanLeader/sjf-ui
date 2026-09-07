import type { SjfFieldProps, SjfValue } from '../shared/control'
export interface SjfTextareaProps extends SjfFieldProps {
  modelValue?: string
  rows?: number
  maxlength?: number
  showCount?: boolean
  resize?: 'none' | 'vertical' | 'both'
}
