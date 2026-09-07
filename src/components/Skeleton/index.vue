<template>
  <div
    class="sjf-control sjf-skeleton"
    :style="style"
    :class="{ animated: props.animated !== false }"
    role="status"
    :aria-label="props.label ?? '正在加载'"
  >
    <span v-if="props.avatar" class="sjf-skeleton-avatar"></span>
    <div class="sjf-skeleton-lines">
      <span
        v-for="i in count"
        :key="i"
        :style="{ width: i === count ? '65%' : '100%' }"
      ></span>
    </div>
  </div>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import { computed } from 'vue'
import type { SjfSkeletonProps } from './index'
const props = withDefaults(defineProps<SjfSkeletonProps>(), { animated: true })
const { style } = useSjfControl(props)
const count = computed(() =>
  Math.min(20, Math.max(1, Math.floor(props.rows ?? 3))),
)
</script>
<style scoped>
.sjf-skeleton {
  display: flex;
  gap: var(--sjf-c-pd);
  width: 100%;
}
.sjf-skeleton-lines {
  flex: 1;
  display: grid;
  gap: var(--sjf-c-pd);
}
.sjf-skeleton-lines span,
.sjf-skeleton-avatar {
  display: block;
  min-height: 1em;
  border-radius: var(--sjf-c-rd);
  background: var(--md-sys-color-surface-container-highest);
}
.sjf-skeleton-avatar {
  width: var(--sjf-c-h);
  height: var(--sjf-c-h);
  border-radius: 50%;
}
.sjf-skeleton.animated {
  animation: sjf-pulse 1.6s ease-in-out infinite;
}
@keyframes sjf-pulse {
  50% {
    opacity: 0.45;
  }
}
</style>
