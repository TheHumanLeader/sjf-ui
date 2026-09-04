import type { SjfSize, SjfSizeRecipe } from '../../core/size'

export interface SjfItemProps {
  title?: string
  subtitle?: string
  icon?: string
  value?: unknown
  active?: boolean | null
  disabled?: boolean
  size?: SjfSize
  activeColor?: string
}

export const SJF_ITEM_SIZE_RECIPE = {
  minHeight: { domain: 'controlHeight', offset: 0 },
  paddingX: { domain: 'padding', offset: -1 },
  paddingY: { domain: 'padding', offset: -2 },
  gap: { domain: 'gap', offset: -1 },
  radius: { domain: 'radius', offset: -1 },
  titleFontSize: { domain: 'fontSize', offset: 0 },
  subtitleFontSize: { domain: 'fontSize', offset: -1 },
  iconSize: { domain: 'icon', offset: 0 },
} satisfies SjfSizeRecipe
