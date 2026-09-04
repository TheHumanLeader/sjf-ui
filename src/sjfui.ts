import type { App, Plugin } from 'vue'
import SjfIcon from './components/Icon/index.vue'
import SjfItem from './components/Item/index.vue'
import SjfList from './components/List/index.vue'
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
  setOverlayMount: (resolver: SjfOverlayMountResolver) => void
  setOverlay: (options: Partial<SjfOverlayDefaults>) => void
  getOverlayMount: () => HTMLElement | null
  getOverlayMountResolver: () => SjfOverlayMountResolver
  getOverlay: () => Readonly<SjfOverlayDefaults>
}

export const SJFUI: SjfUIApi = {
  install(app: App, config?: SjfUIConfig) {
    app.component('SJFIcon', SjfIcon)
    app.component('SJFItem', SjfItem)
    app.component('SJFList', SjfList)
    app.directive('sjf-overlay-anchor', vSjfOverlayAnchor)
    if (config) configureSjfUI(config)
  },

  configure: configureSjfUI,
  setDefaultSize: setSjfDefaultSize,
  registerSize: registerSjfSize,
  setTheme: setSjfTheme,
  setOverlayMount: setSjfOverlayMount,
  setOverlay: setSjfOverlayDefaults,
  getOverlayMount: resolveSjfOverlayMount,
  getOverlayMountResolver: getSjfOverlayMountResolver,
  getOverlay: getSjfOverlayDefaults,
}

export default SJFUI
