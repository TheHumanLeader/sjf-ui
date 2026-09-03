import type { ObjectDirective } from 'vue'
import {
  applySjfOverlayPosition,
  autoUpdateSjfOverlay,
  computeSjfOverlayPosition,
  resolveSjfOverlayMount,
  scheduleSjfOverlayUpdate,
  type SjfOverlayOptions,
  type SjfOverlayPositionResult,
} from '../core/overlay'

export interface SjfOverlayAnchorDirectiveValue {
  /** Return the currently mounted floating panel. May return null while closed. */
  panel: () => HTMLElement | null
  /** Whether positioning/observation is active. */
  enabled?: boolean
  options?: SjfOverlayOptions
  /** Optional callback after the directive has applied the computed position. */
  onUpdate?: (result: SjfOverlayPositionResult) => void
}

interface DirectiveState {
  value: SjfOverlayAnchorDirectiveValue
  cleanup: (() => void) | null
  update: () => void
}

const states = new WeakMap<HTMLElement, DirectiveState>()

export const vSjfOverlayAnchor: ObjectDirective<HTMLElement, SjfOverlayAnchorDirectiveValue> = {
  mounted(el, binding) {
    const state = createState(el, binding.value)
    states.set(el, state)
    syncState(el, state)
  },

  updated(el, binding) {
    const state = states.get(el)
    if (!state) return
    state.value = binding.value
    syncState(el, state)
    scheduleSjfOverlayUpdate(state.update)
  },

  unmounted(el) {
    const state = states.get(el)
    state?.cleanup?.()
    states.delete(el)
  },
}

function createState(
  el: HTMLElement,
  value: SjfOverlayAnchorDirectiveValue,
): DirectiveState {
  const state: DirectiveState = {
    value,
    cleanup: null,
    update: () => {
      if (state.value.enabled === false) return
      const panel = state.value.panel()
      if (!panel) return

      const result = computeSjfOverlayPosition(
        el,
        panel,
        state.value.options,
        resolveSjfOverlayMount(),
      )
      applySjfOverlayPosition(panel, result)
      state.value.onUpdate?.(result)
    },
  }

  return state
}

function syncState(el: HTMLElement, state: DirectiveState): void {
  const enabled = state.value.enabled !== false

  if (!enabled) {
    state.cleanup?.()
    state.cleanup = null
    return
  }

  if (!state.cleanup) {
    state.cleanup = autoUpdateSjfOverlay(
      el,
      () => state.value.panel(),
      state.update,
    )
  }
}

export default vSjfOverlayAnchor
