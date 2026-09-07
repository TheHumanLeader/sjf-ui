<template>
  <span class="sjf-control sjf-badge-wrap" :style="style"
    ><slot /><span
      v-if="visible"
      class="sjf-badge sjf-tone"
      :class="{ 'is-dot': props.dot, 'is-attached': !!slots.default }"
      :data-tone="props.tone ?? 'error'"
      :aria-label="props.dot ? '有新消息' : undefined"
      >{{ props.dot ? '' : text }}</span
    ></span
  >
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import { computed } from 'vue'
import type { SjfBadgeProps } from './index'
const props = defineProps<SjfBadgeProps>()
const slots = defineSlots<{ default?: () => unknown }>()
const { style } = useSjfControl(props)
const visible = computed(
  () =>
    props.dot ||
    (props.value !== undefined && (props.value !== 0 || props.showZero)),
)
const text = computed(() =>
  typeof props.value === 'number' && props.value > (props.max ?? 99)
    ? `${props.max ?? 99}+`
    : props.value,
)
</script>
<style scoped>
.sjf-badge-wrap {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}
.sjf-badge {
  display: inline-grid;
  place-items: center;
  min-width: 1.6em;
  height: 1.6em;
  padding: 0 0.4em;
  border-radius: 999px;
  font-size: 0.78em;
  font-weight: 700;
  background: var(--sjf-tone);
  color: var(--sjf-on-tone);
}
.sjf-badge.is-attached {
  position: absolute;
  inset: 0 0 auto auto;
  transform: translate(45%, -40%);
}
.sjf-badge.is-dot {
  min-width: 0.6em;
  width: 0.6em;
  height: 0.6em;
  padding: 0;
}
</style>
