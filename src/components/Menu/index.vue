<template>
  <SJFList
    class="sjf-control"
    :style="style"
    type="menu"
    :size="size"
    :model-value="model"
    :horizontal="props.horizontal"
    :aria-label="props.label ?? '菜单'"
    @update:model-value="select"
    @keydown="keydown"
    ><SJFItem
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :title="item.label"
      :icon="item.icon"
      :disabled="item.disabled"
      :tabindex="focusTarget === item.value ? 0 : -1"
      @focus="focusValue = item.value"
  /></SJFList>
</template>
<script setup vapor lang="ts">
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfMenuProps } from './index'
import { computed, ref } from 'vue'
import SJFList from '../List/index.vue'
import SJFItem from '../Item/index.vue'
import type { SjfValue } from '../shared/control'
const props = defineProps<SjfMenuProps>()
const emit = defineEmits<{
  'update:modelValue': [value: SjfValue | null]
  select: [value: SjfValue]
}>()
const { style, size } = useSjfControl(props)
const model = useSjfValue<SjfValue | null>(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  null,
)
const focusValue = ref<SjfValue | null>(null)
const firstValue = computed(() => props.items.find((i) => !i.disabled)?.value)
const focusTarget = computed(() =>
  props.items.some((i) => i.value === focusValue.value && !i.disabled)
    ? focusValue.value
    : firstValue.value,
)
function select(value: unknown) {
  if (!props.items.some((i) => i.value === value && !i.disabled)) return
  model.value = value as SjfValue
  emit('select', value as SjfValue)
}
function keydown(e: KeyboardEvent) {
  const next = props.horizontal ? 'ArrowRight' : 'ArrowDown',
    prev = props.horizontal ? 'ArrowLeft' : 'ArrowUp'
  if (![next, prev, 'Home', 'End'].includes(e.key)) return
  e.preventDefault()
  const menu = e.currentTarget as HTMLElement
  const items = Array.from(
    menu.querySelectorAll<HTMLButtonElement>(
      '[role="menuitem"]:not(:disabled)',
    ),
  )
  if (!items.length) return
  const at = items.indexOf(document.activeElement as HTMLButtonElement)
  const index =
    e.key === 'Home'
      ? 0
      : e.key === 'End'
        ? items.length - 1
        : (at + (e.key === next ? 1 : -1) + items.length) % items.length
  items[index].focus()
}
</script>
<style scoped>
.sjf-control {
  min-width: 0;
}
</style>
