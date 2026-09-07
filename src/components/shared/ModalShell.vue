<template>
  <Teleport v-if="mount" :to="mount"
    ><dialog
      ref="dialog"
      class="sjf-control sjf-modal"
      :class="[
        props.drawer ? 'sjf-modal-drawer' : '',
        props.side ?? 'right',
        { 'is-closing': closing },
      ]"
      :style="[
        style,
        {
          width:
            typeof props.width === 'number'
              ? props.width + 'px'
              : (props.width ??
                (props.drawer
                  ? 'min(420px, 90vw)'
                  : 'min(520px, calc(100vw - 32px))')),
        },
      ]"
      :aria-labelledby="id"
      @cancel.prevent="dismiss('escape')"
      @click="backdrop"
      @close="nativeClose"
    >
      <header class="sjf-modal-header">
        <h2 :id="id">
          {{ props.title ?? (props.drawer ? '详细信息' : '对话框') }}
        </h2>
        <button
          v-if="props.closable !== false"
          type="button"
          aria-label="关闭"
          :disabled="props.loading"
          @click="dismiss('close')"
        >
          <SJFIcon name="close" :size="size" />
        </button>
      </header>
      <div class="sjf-modal-body"><slot /></div>
      <footer v-if="slots.footer" class="sjf-modal-footer">
        <slot name="footer" />
      </footer></dialog
  ></Teleport>
</template>
<script setup vapor lang="ts">
import { ref, shallowRef, watch, onMounted, onBeforeUnmount, useId } from 'vue'
import SJFIcon from '../Icon/index.vue'
import { resolveSjfOverlayMount } from '../../core/overlay'
import { prefersSjfReducedMotion } from '../../core/motion'
import { useSjfControl } from './control'
import type { SjfDialogProps } from '../Dialog'
const props = withDefaults(
  defineProps<SjfDialogProps & { drawer?: boolean; side?: 'left' | 'right' }>(),
  { closable: true, closeOnBackdrop: true },
)
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  cancel: [reason: string]
}>()
const slots = defineSlots<{ default?: () => unknown; footer?: () => unknown }>()
const { size, style } = useSjfControl(props)
const mount = shallowRef<HTMLElement | null>(null),
  dialog = ref<HTMLDialogElement | null>(null),
  closing = ref(false)
const id = 'sjf-modal-' + useId()
let timer: ReturnType<typeof setTimeout> | undefined
let savedFocus: HTMLElement | null = null
onMounted(() => {
  mount.value = resolveSjfOverlayMount()
})
watch(
  [() => props.modelValue, dialog],
  () => {
    if (timer) clearTimeout(timer)
    const el = dialog.value
    if (!el) return
    if (props.modelValue) {
      closing.value = false
      if (!el.open) {
        savedFocus = document.activeElement as HTMLElement | null
        el.showModal()
      }
    } else if (el.open) {
      closing.value = true
      timer = setTimeout(
        () => {
          el.close()
          closing.value = false
          if (savedFocus?.isConnected) savedFocus.focus()
        },
        prefersSjfReducedMotion() ? 1 : 160,
      )
    }
  },
  { flush: 'post' },
)
function dismiss(reason: string) {
  if (props.loading || props.persistent) return
  emit('cancel', reason)
  emit('update:modelValue', false)
}
function backdrop(event: MouseEvent) {
  if (props.closeOnBackdrop === false || event.target !== dialog.value) return
  const r = dialog.value!.getBoundingClientRect()
  if (
    event.clientX < r.left ||
    event.clientX > r.right ||
    event.clientY < r.top ||
    event.clientY > r.bottom
  )
    dismiss('backdrop')
}
function nativeClose() {
  if (props.modelValue) emit('update:modelValue', false)
}
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  dialog.value?.close()
})
</script>
<style scoped>
.sjf-modal {
  position: fixed;
  inset: 0;
  margin: auto;
  max-width: calc(100vw - 24px);
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: calc(var(--sjf-c-rd) * 2);
  background: var(--md-sys-color-surface-container-lowest);
  color: var(--md-sys-color-on-surface);
  box-shadow: var(--sjf-shadow-lg);
  overflow: auto;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 160ms,
    transform 160ms;
}
.sjf-modal[open] {
  animation: sjf-modal-in var(--sjf-motion-enter) var(--sjf-motion-ease-enter);
}
.sjf-modal::backdrop {
  background: rgb(0 0 0 / 0.4);
}
.sjf-modal.is-closing {
  opacity: 0;
  transform: translateY(12px);
}
.sjf-modal-header {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-pd);
  padding: calc(var(--sjf-c-pd) * 1.5);
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
}
.sjf-modal-header h2 {
  flex: 1;
  margin: 0;
  font-size: 1.25em;
}
.sjf-modal-header button {
  display: grid;
  place-items: center;
  border-radius: var(--sjf-c-rd);
}
.sjf-modal-body {
  padding: calc(var(--sjf-c-pd) * 1.5);
  line-height: 1.7;
  min-width: 0;
}
.sjf-modal-body > :first-child {
  margin-top: 0;
}
.sjf-modal-body > :last-child {
  margin-bottom: 0;
}
.sjf-modal-body > :deep(.sjf-label + .sjf-label) {
  margin-top: 16px;
}
.sjf-modal-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--sjf-c-gap);
  padding: var(--sjf-c-pd);
  border-top: 1px solid var(--md-sys-color-outline-variant);
}
.sjf-modal-drawer {
  height: 100dvh;
  max-height: 100dvh;
  border-radius: 0;
  margin: 0 0 0 auto;
  inset: 0 0 0 auto;
}
.sjf-modal-drawer.left {
  margin: 0 auto 0 0;
  inset: 0 auto 0 0;
}
.sjf-modal-drawer[open] {
  animation-name: sjf-drawer-in;
}
.sjf-modal-drawer.left[open] {
  animation-name: sjf-drawer-left-in;
}
@keyframes sjf-modal-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
}
@keyframes sjf-drawer-in {
  from {
    transform: translateX(100%);
  }
}
@keyframes sjf-drawer-left-in {
  from {
    transform: translateX(-100%);
  }
}
</style>
