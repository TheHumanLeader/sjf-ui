import { registerSjfSize, setSjfBaseSize, type RegisterSizeOptions, type SjfSize } from '../size'
import { setSjfTheme, type SjfThemeName } from '../theme'
import {
  setSjfOverlayDefaults,
  setSjfOverlayMount,
  type SjfOverlayDefaults,
  type SjfOverlayMountResolver,
} from '../overlay'

export interface SjfUIOverlayConfig extends Partial<SjfOverlayDefaults> {
  mount?: SjfOverlayMountResolver
}

export interface SjfUIConfig {
  defaultSize?: SjfSize
  theme?: SjfThemeName
  overlay?: SjfUIOverlayConfig
}

export function configureSjfUI(config: SjfUIConfig): void {
  if (config.defaultSize !== undefined) {
    setSjfBaseSize(config.defaultSize)
  }

  if (config.theme !== undefined) {
    setSjfTheme(config.theme)
  }

  if (config.overlay) {
    const { mount, ...overlayDefaults } = config.overlay
    if (mount) setSjfOverlayMount(mount)
    if (Object.keys(overlayDefaults).length > 0) {
      setSjfOverlayDefaults(overlayDefaults)
    }
  }
}

export function setSjfDefaultSize(size: SjfSize): void {
  setSjfBaseSize(size)
}

export function registerSjfDefaultSize(name: SjfSize, options: RegisterSizeOptions): void {
  registerSjfSize(name, options)
}
