import type { SjfFieldProps, SjfValue } from '../shared/control'
export interface SjfRadioProps extends SjfFieldProps {
  modelValue?: SjfValue | null
  value: SjfValue
  text?: string
}
