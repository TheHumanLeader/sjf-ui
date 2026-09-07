<template>
  <nav
    class="sjf-control sjf-pagination"
    :style="style"
    :aria-label="props.label ?? '分页'"
  >
    <button
      type="button"
      aria-label="上一页"
      :disabled="disabled || page <= 1"
      @click="go(page - 1)"
    >
      <SJFIcon name="chevron_left" :size="size" /></button
    ><template v-for="item in items" :key="item"
      ><button
        v-if="typeof item === 'number'"
        type="button"
        :aria-label="'第 ' + item + ' 页'"
        :aria-current="item === page ? 'page' : undefined"
        :disabled="disabled"
        @click="go(item)"
      >
        {{ item }}</button
      ><span v-else aria-hidden="true">…</span></template
    ><button
      type="button"
      aria-label="下一页"
      :disabled="disabled || page >= count"
      @click="go(page + 1)"
    >
      <SJFIcon name="chevron_right" :size="size" /></button
    ><span class="sjf-muted">{{ Math.max(0, props.total) }} 条</span>
  </nav>
</template>
<script setup vapor lang="ts">
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfPaginationProps } from './index'
import { computed } from 'vue'
import SJFIcon from '../Icon/index.vue'
import { sjfPageCount, sjfPageItems } from '../shared/models'
const props = withDefaults(defineProps<SjfPaginationProps>(), {
  disabled: undefined,
})
const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()
const { style, size, disabled } = useSjfControl(props)
const model = useSjfValue(
  () => props.modelValue,
  (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
  1,
)
const count = computed(() => sjfPageCount(props.total, props.pageSize ?? 10))
const page = computed(() =>
  Math.min(count.value, Math.max(1, Math.floor(model.value) || 1)),
)
const items = computed(() => sjfPageItems(page.value, count.value))
function go(value: number) {
  if (!disabled.value) model.value = Math.max(1, Math.min(count.value, value))
}
</script>
<style scoped>
.sjf-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sjf-c-gap);
  font-variant-numeric: tabular-nums;
}
.sjf-pagination button {
  display: grid;
  place-items: center;
  min-width: var(--sjf-c-h);
  height: var(--sjf-c-h);
  padding-inline: var(--sjf-c-gap);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--sjf-c-rd);
}
.sjf-pagination button[aria-current] {
  color: var(--md-sys-color-on-primary);
  background: var(--md-sys-color-primary);
  border-color: transparent;
}
.sjf-pagination button:hover:not(:disabled):not([aria-current]) {
  background: var(--md-sys-color-surface-container);
}
.sjf-pagination > span {
  padding-inline: var(--sjf-c-gap);
}
</style>
