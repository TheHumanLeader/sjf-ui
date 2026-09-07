import { setSjfMotion, type SjfMotionPreference } from '@/core/motion'
export function readPreviewMotion(): SjfMotionPreference {
  try {
    const value = localStorage.getItem('sjf-docs-motion')
    if (value === 'system' || value === 'reduced') return value
  } catch {
    /* Storage is optional in embedded previews. */
  }
  return 'full'
}
export function applyPreviewMotion(value: SjfMotionPreference): void {
  setSjfMotion(value)
  try {
    localStorage.setItem('sjf-docs-motion', value)
  } catch {
    /* Keep in-memory preview working. */
  }
}
