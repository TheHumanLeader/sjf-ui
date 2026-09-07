<template>
  <div class="sjf-control sjf-empty" :style="style">
    <SJFIcon :name="props.icon ?? 'inbox'" size="lg" /><strong>{{
      props.title ?? '暂无数据'
    }}</strong>
    <p v-if="props.description">{{ props.description }}</p>
    <slot />
  </div>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import SJFIcon from '../Icon/index.vue'
import type { SjfEmptyProps } from './index'
const props = defineProps<SjfEmptyProps>()
const { style } = useSjfControl(props)
</script>
<style scoped>
.sjf-empty {
  display: grid;
  place-items: center;
  align-content: center;
  gap: var(--sjf-c-pd);
  padding: calc(var(--sjf-c-pd) * 3);
  color: var(--md-sys-color-on-surface-variant);
  text-align: center;
}
.sjf-empty p {
  margin: 0;
  line-height: 1.6;
}
.sjf-empty strong {
  color: var(--md-sys-color-on-surface);
}
</style>
