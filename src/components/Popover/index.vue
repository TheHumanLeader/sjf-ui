<template>
  <span
    ref="anchor"
    class="sjf-control sjf-popover-trigger"
    :style="style"
    @click="clicked"
    @mouseenter="enter"
    @mouseleave="leave"
    @focusin="enter"
    @focusout="leave"
    ><slot name="trigger" :open="open" :toggle="toggle" :attrs="triggerAttrs"
      ><SJFButton
        variant="outlined"
        :size="size"
        :disabled="disabled"
        v-bind="triggerAttrs"
        >{{ props.label ?? '打开浮层' }}</SJFButton
      ></slot
    ></span
  >
  <Teleport v-if="mount" :to="mount"
    ><Transition name="sjf-pop"
      ><div
        v-if="open"
        :id="id"
        ref="panel"
        class="sjf-control sjf-panel sjf-popover"
        :class="{ 'sjf-tooltip-panel': props.tooltip }"
        :style="style"
        :role="props.tooltip ? 'tooltip' : 'dialog'"
        :aria-label="
          props.tooltip ? undefined : (props.title ?? props.label ?? '浮层')
        "
        @mouseenter="enter"
        @mouseleave="leave"
      >
        <strong v-if="props.title">{{ props.title }}</strong
        ><slot :close="close" /></div></Transition
  ></Teleport>
</template>
<script setup vapor lang="ts">
import { computed, ref, useId, onBeforeUnmount, watch, nextTick } from 'vue'
import SJFButton from '../Button/index.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import { useSjfFloating } from '../shared/floating'
import type { SjfPopoverProps } from './index'
const props = withDefaults(defineProps<SjfPopoverProps>(), {
  modelValue: undefined,
  disabled: undefined,
})
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const { style, size, disabled } = useSjfControl(props)
const open = useSjfValue(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  false,
)
const anchor = ref<HTMLElement | null>(null),
  panel = ref<HTMLElement | null>(null),
  id = 'sjf-popover-' + useId()
let timer: ReturnType<typeof setTimeout> | undefined
const { mount } = useSjfFloating(open, anchor, panel, close, () => ({
  placement: props.placement ?? 'bottom-start',
}))
const triggerAttrs = computed(() =>
  props.tooltip
    ? { 'aria-describedby': open.value ? id : undefined }
    : {
        'aria-expanded': open.value,
        'aria-controls': id,
        'aria-haspopup': 'dialog' as const,
      },
)
function close() {
  open.value = false
}
function toggle() {
  if (!disabled.value) open.value = !open.value
}
function clicked() {
  if ((props.trigger ?? 'click') === 'click') toggle()
}
function enter() {
  if (timer) clearTimeout(timer)
  if (props.trigger === 'hover' && !disabled.value) open.value = true
}
function leave() {
  if (props.trigger === 'hover') {
    if (timer) clearTimeout(timer)
    timer = setTimeout(close, 120)
  }
}
watch(disabled, (value) => {
  if (value) close()
})
// A click-opened interactive popup owns keyboard focus until dismissed.
watch(
  panel,
  async (element) => {
    if (!element || !open.value || props.trigger === 'hover' || props.tooltip)
      return
    await nextTick()
    if (!open.value || panel.value !== element) return
    const first = element.querySelector<HTMLElement>(
      'button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]',
    )
    if (first) first.focus()
    else {
      element.tabIndex = -1
      element.focus()
    }
  },
  { flush: 'post' },
)
watch(
  open,
  (value) => {
    if (!value && panel.value?.contains(document.activeElement))
      anchor.value
        ?.querySelector<HTMLElement>('button,input,[tabindex]')
        ?.focus()
  },
  { flush: 'sync' },
)
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>
<style scoped>
.sjf-popover-trigger {
  display: inline-flex;
  vertical-align: middle;
}
.sjf-popover {
  max-width: min(360px, calc(100vw - 24px));
  min-width: 10rem;
  padding: var(--sjf-c-pd);
  line-height: 1.65;
}
.sjf-popover > strong {
  display: block;
  margin-bottom: var(--sjf-c-gap);
}
.sjf-tooltip-panel {
  min-width: 0;
  background: var(
    --md-sys-color-inverse-surface,
    var(--md-sys-color-on-surface)
  );
  color: var(--md-sys-color-inverse-on-surface, var(--md-sys-color-surface));
  font-size: 0.85em;
  padding: var(--sjf-c-gap) var(--sjf-c-pd);
}
</style>
