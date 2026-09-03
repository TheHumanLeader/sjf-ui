import type { SjfSize } from '../../core/size'
import type {
  SjfHorizontalAlign,
  SjfLabelErrorDisplay,
  SjfLabelOption,
} from '../Label'

export type SjfInputModelValue = string | number | null | undefined

export interface SjfInputProps {
  modelValue?: SjfInputModelValue

  // Label / Form integration
  label?: string
  helper?: string
  labelOption?: SjfLabelOption
  colSpan?: number
  rowSpan?: number
  size?: SjfSize
  labelAlign?: SjfHorizontalAlign
  contentAlign?: SjfHorizontalAlign
  errorDisplay?: SjfLabelErrorDisplay

  // Native input essentials
  type?: string
  name?: string
  placeholder?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  maxlength?: number
  minlength?: number

  // SJF interaction helpers
  clearable?: boolean
  showPassword?: boolean
  showCount?: boolean
}

export interface SjfInputExpose {
  focus: () => void
  blur: () => void
  select: () => void
  input: HTMLInputElement | null
}
