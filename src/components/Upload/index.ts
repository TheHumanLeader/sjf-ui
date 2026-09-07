import type { SjfFieldProps } from '../shared/control'
export interface SjfUploadProps extends SjfFieldProps {
  modelValue?: File[]
  accept?: string
  multiple?: boolean
  maxSize?: number
  limit?: number
}
export interface SjfUploadRejection {
  file: File
  reason: string
}
