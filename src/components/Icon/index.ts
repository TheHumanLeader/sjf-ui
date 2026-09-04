import type { SjfSize, SjfSizeRecipe } from '../../core/size'

export const SJF_ICON_TYPES = ['material-symbols'] as const
export const SJF_ICON_VARIANTS = ['outlined', 'rounded', 'sharp'] as const

export type SjfIconType = (typeof SJF_ICON_TYPES)[number]
export type SjfIconVariant = (typeof SJF_ICON_VARIANTS)[number]

export interface SjfIconProps {
  /** Material Symbols ligature name, for example "10k" or "search". */
  name: string
  /** Icon provider. Kept explicit so more providers can be added without changing the component API. */
  type?: SjfIconType
  variant?: SjfIconVariant
  /** Use the filled Material Symbols axis. */
  filled?: boolean
  /** Ordered SJF size. Falls back to the global base size. */
  size?: SjfSize
  /** Accessible name. Without a label the icon is decorative. */
  label?: string
}

export const SJF_ICON_SIZE_RECIPE = {
  iconSize: { domain: 'icon', offset: 0 },
} satisfies SjfSizeRecipe
