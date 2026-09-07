<template>
  <div
    class="sjf-control sjf-divider"
    :class="{ vertical: props.vertical }"
    :style="style"
    role="separator"
    :aria-orientation="props.vertical ? 'vertical' : 'horizontal'"
  >
    <span v-if="props.label">{{ props.label }}</span>
  </div>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import type { SjfDividerProps } from './index'
const props = defineProps<SjfDividerProps>()
const { style } = useSjfControl(props)
</script>
<style scoped>
.sjf-divider {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-pd);
  margin-block: var(--sjf-c-pd);
  color: var(--md-sys-color-on-surface-variant);
}
.sjf-divider::before,
.sjf-divider::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}
.sjf-divider.vertical {
  display: inline-block;
  align-self: stretch;
  width: 1px;
  min-height: 1em;
  margin: 0 var(--sjf-c-gap);
  background: var(--md-sys-color-outline-variant);
}
.sjf-divider.vertical::before,
.sjf-divider.vertical::after {
  display: none;
}
</style>
