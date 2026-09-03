import type { SjfSize, SjfSizeRecipe } from '../../core/size'

export const SJF_LABEL_MODES = [
  'm3',
  'horizontal',
  'horizontal-box',
  'vertical',
  'vertical-box',
] as const

export type SjfLabelMode = (typeof SJF_LABEL_MODES)[number]

export interface SjfLabelProps {
  label?: string
  mode?: SjfLabelMode
  size?: SjfSize
  required?: boolean
  disabled?: boolean
  error?: boolean
  focused?: boolean
  filled?: boolean
  helper?: string
}

export const SJF_LABEL_SIZE_RECIPE = {
  fontSize: { domain: 'fontSize', offset: 0 },
  floatingFontSize: { domain: 'fontSize', offset: -1 },
  helperFontSize: { domain: 'fontSize', offset: -1 },
  controlHeight: { domain: 'controlHeight', offset: 0 },
  gap: { domain: 'gap', offset: -1 },
  requiredGap: { domain: 'gap', offset: -2 },
  labelWidth: { domain: 'labelWidth', offset: 0 },
  radius: { domain: 'radius', offset: -1 },
  paddingX: { domain: 'padding', offset: 0 },
  paddingY: { domain: 'padding', offset: -1 },
  captionPaddingX: { domain: 'padding', offset: -2 },
  lineWidth: { domain: 'lineWidth', offset: -1 },
  focusLineWidth: { domain: 'lineWidth', offset: 1 },
} satisfies SjfSizeRecipe
