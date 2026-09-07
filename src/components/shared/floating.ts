import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  watch,
  type Ref,
} from 'vue'
import {
  applySjfOverlayPosition,
  autoUpdateSjfOverlay,
  computeSjfOverlayPosition,
  resolveSjfOverlayMount,
  type SjfOverlayOptions,
} from '../../core/overlay'

const stack: symbol[] = []
export function useSjfFloating(
  open: Ref<boolean>,
  anchor: Ref<HTMLElement | null>,
  panel: Ref<HTMLElement | null>,
  close: () => void,
  options: () => SjfOverlayOptions = () => ({}),
) {
  const mount = shallowRef<HTMLElement | null>(null)
  const token = Symbol('floating')
  let stop: (() => void) | undefined
  let mounted = false
  let revision = 0
  function cleanup() {
    stop?.()
    stop = undefined
    const index = stack.indexOf(token)
    if (index >= 0) stack.splice(index, 1)
    document.removeEventListener('pointerdown', outside, true)
    document.removeEventListener('keydown', keydown, true)
  }
  function outside(event: PointerEvent) {
    if (stack.at(-1) !== token) return
    const path = event.composedPath()
    if (
      !path.includes(anchor.value as Node) &&
      !path.includes(panel.value as Node)
    )
      close()
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && stack.at(-1) === token) {
      event.preventDefault()
      event.stopPropagation()
      close()
      anchor.value
        ?.querySelector<HTMLElement>('button,input,[tabindex]')
        ?.focus()
    }
  }
  async function sync() {
    const current = ++revision
    if (!mounted) return
    cleanup()
    if (!open.value) return
    // Keep nested overlays inside the modal's accessible subtree. A manual
    // popover promotes the panel above native dialog clipping/top-layer rules.
    const modal = anchor.value?.closest<HTMLDialogElement>('dialog[open]')
    mount.value = modal ?? resolveSjfOverlayMount()
    await nextTick()
    if (current !== revision || !open.value || !mounted) return
    if (modal && panel.value && typeof panel.value.showPopover === 'function') {
      panel.value.setAttribute('popover', 'manual')
      if (!panel.value.matches(':popover-open')) panel.value.showPopover()
    }
    stack.push(token)
    stop = autoUpdateSjfOverlay(
      () => anchor.value,
      () => panel.value,
      () => {
        if (anchor.value && panel.value)
          applySjfOverlayPosition(
            panel.value,
            computeSjfOverlayPosition(
              anchor.value,
              panel.value,
              {
                ...options(),
                ...(modal ? { strategy: 'fixed' as const } : {}),
              },
              mount.value,
            ),
          )
      },
    )
    document.addEventListener('pointerdown', outside, true)
    document.addEventListener('keydown', keydown, true)
  }
  watch(open, sync)
  onMounted(() => {
    mounted = true
    mount.value = resolveSjfOverlayMount()
    void sync()
  })
  onBeforeUnmount(() => {
    mounted = false
    cleanup()
  })
  return { mount }
}
