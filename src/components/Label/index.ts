export { default as SjfLabelContent } from './cps/LabelContent.vue'

import type { SjfSize, SjfSizeRecipe } from '../../core/size'

export const SJF_LABEL_MODES = [
  'm3',
  'horizontal',
  'horizontal-box',
  'vertical',
  'vertical-box',
] as const

export type SjfLabelMode = (typeof SJF_LABEL_MODES)[number]
export type SjfHorizontalAlign = 'left' | 'center' | 'right'

/**
 * Label defaults/options that can be provided by SjfForm or by an input-like component.
 * colSpan / rowSpan describe the Label cell itself when the mode participates in Form Grid.
 */
export interface SjfLabelOption {
  mode?: SjfLabelMode
  size?: SjfSize
  required?: boolean
  disabled?: boolean
  error?: boolean
  helper?: string
  colSpan?: number
  rowSpan?: number
  /** Horizontal alignment of the Label text/cell. */
  align?: SjfHorizontalAlign
}

export interface SjfLabelProps {
  label?: string
  labelOption?: SjfLabelOption

  /** Control/content cell span in SjfForm Grid. */
  colSpan?: number
  rowSpan?: number

  /** Direct props override labelOption, which overrides SjfForm labelOption. */
  mode?: SjfLabelMode
  size?: SjfSize
  required?: boolean
  disabled?: boolean
  error?: boolean
  helper?: string
  labelAlign?: SjfHorizontalAlign
  contentAlign?: SjfHorizontalAlign

  /** Runtime state normally supplied by the hosting input-like component. */
  focused?: boolean
  filled?: boolean
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
