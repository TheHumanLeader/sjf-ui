<template>
  <button
    class="sjf-control sjf-button"
    :class="[
      props.variant ?? 'filled',
      { 'is-block': props.block, 'is-danger': props.danger },
    ]"
    :style="style"
    :type="props.type ?? 'button'"
    :disabled="disabled || props.loading"
    :aria-busy="props.loading || undefined"
  >
    <span v-if="props.loading" class="sjf-spinner" aria-hidden="true"></span
    ><SJFIcon v-else-if="props.icon" :name="props.icon" :size="size" /><slot />
  </button>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import SJFIcon from '../Icon/index.vue'
import type { SjfButtonProps } from './index'
const props = withDefaults(defineProps<SjfButtonProps>(), {
  disabled: undefined,
})
const { size, style, disabled } = useSjfControl(props)
</script>
<style scoped>
.sjf-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sjf-c-gap);
  min-height: var(--sjf-c-h);
  padding: 0 var(--sjf-c-pd);
  border: 1px solid transparent;
  border-radius: var(--sjf-c-rd);
  font-weight: 600;
  white-space: nowrap;
  color: var(--md-sys-color-on-primary);
  background: var(--md-sys-color-primary);
}
.sjf-button.tonal {
  color: var(--md-sys-color-on-primary-container);
  background: var(--md-sys-color-primary-container);
}
.sjf-button.outlined,
.sjf-button.text {
  color: var(--md-sys-color-primary);
  background: transparent;
}
.sjf-button.outlined {
  border-color: var(--md-sys-color-outline);
}
.sjf-button:hover:not(:disabled) {
  box-shadow: inset 0 0 0 100vmax
    color-mix(in srgb, currentColor 9%, transparent);
}
.sjf-button:active:not(:disabled) {
  transform: translateY(1px);
}
.sjf-button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}
.sjf-button.is-block {
  width: 100%;
}
.sjf-button.is-danger {
  --md-sys-color-primary: var(--md-sys-color-error);
  --md-sys-color-on-primary: var(--md-sys-color-on-error);
}
</style>
