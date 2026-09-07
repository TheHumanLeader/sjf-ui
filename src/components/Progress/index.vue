<template>
  <div class="sjf-control sjf-progress" :style="style">
    <div v-if="props.label || props.showValue" class="sjf-progress-caption">
      <span>{{ props.label }}</span
      ><span v-if="props.showValue && !props.indeterminate"
        >{{ percent }}%</span
      >
    </div>
    <progress
      class="sjf-progress-native"
      :max="100"
      :value="props.indeterminate ? undefined : percent"
      :aria-label="props.label ?? '进度'"
    ></progress>
  </div>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import { computed } from 'vue'
import type { SjfProgressProps } from './index'
const props = defineProps<SjfProgressProps>()
const { style } = useSjfControl(props)
const percent = computed(() =>
  Math.round(
    Math.max(
      0,
      Math.min(
        100,
        ((props.modelValue ?? 0) / Math.max(1, props.max ?? 100)) * 100,
      ),
    ),
  ),
)
</script>
<style scoped>
.sjf-progress {
  display: grid;
  gap: var(--sjf-c-gap);
  width: 100%;
}
.sjf-progress-caption {
  display: flex;
  justify-content: space-between;
  gap: var(--sjf-c-gap);
}
.sjf-progress-native {
  appearance: none;
  width: 100%;
  height: var(--sjf-c-gap);
  border: 0;
  border-radius: 999px;
  overflow: hidden;
  background: var(--md-sys-color-surface-container-highest);
  accent-color: var(--md-sys-color-primary);
}
.sjf-progress-native::-webkit-progress-bar {
  background: var(--md-sys-color-surface-container-highest);
}
.sjf-progress-native::-webkit-progress-value {
  background: var(--md-sys-color-primary);
  border-radius: 999px;
  transition: width var(--sjf-motion-normal);
}
.sjf-progress-native::-moz-progress-bar {
  background: var(--md-sys-color-primary);
}
</style>
