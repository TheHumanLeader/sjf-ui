import type { App, Plugin } from 'vue'
import { setSjfMotion, type SjfMotionPreference } from './core/motion'
import { sjfComponents } from './components/registry'
import { configureSjfUI, setSjfDefaultSize, type SjfUIConfig } from './core/config'
import { registerSjfSize, type RegisterSizeOptions, type SjfSize } from './core/size'
import { setSjfTheme, type SjfThemeName } from './core/theme'
import {
  getSjfOverlayDefaults,
  getSjfOverlayMountResolver,
  resolveSjfOverlayMount,
  setSjfOverlayDefaults,
  setSjfOverlayMount,
  type SjfOverlayDefaults,
  type SjfOverlayMountResolver,
} from './core/overlay'
import { vSjfOverlayAnchor } from './directives/overlayAnchor'

export type SjfUIApi = Plugin<[SjfUIConfig?]> & {
  configure: (config: SjfUIConfig) => void
  setDefaultSize: (size: SjfSize) => void
  registerSize: (name: SjfSize, options: RegisterSizeOptions) => void
  setTheme: (theme: SjfThemeName) => void
  setMotion: (preference: SjfMotionPreference) => void
  setOverlayMount: (resolver: SjfOverlayMountResolver) => void
  setOverlay: (options: Partial<SjfOverlayDefaults>) => void
  getOverlayMount: () => HTMLElement | null
  getOverlayMountResolver: () => SjfOverlayMountResolver
  getOverlay: () => Readonly<SjfOverlayDefaults>
}

export const SJFUI: SjfUIApi = {
  install(app: App, config?: SjfUIConfig) {
    for (const [name, component] of Object.entries(sjfComponents)) app.component(name, component)
    app.directive('sjf-overlay-anchor', vSjfOverlayAnchor)
    if (config) configureSjfUI(config)
  },

  configure: configureSjfUI,
  setDefaultSize: setSjfDefaultSize,
  registerSize: registerSjfSize,
  setTheme: setSjfTheme,
  setMotion: setSjfMotion,
  setOverlayMount: setSjfOverlayMount,
  setOverlay: setSjfOverlayDefaults,
  getOverlayMount: resolveSjfOverlayMount,
  getOverlayMountResolver: getSjfOverlayMountResolver,
  getOverlay: getSjfOverlayDefaults,
}

export default SJFUI
