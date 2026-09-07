<template>
  <SJFPopover v-bind="forwarded" v-model="open"
    ><template v-if="slots.trigger" #trigger="binding"
      ><slot name="trigger" v-bind="binding" /></template
    ><SJFMenu
      :items="props.items"
      :size="props.size"
      :label="props.label ?? '操作菜单'"
      @select="select"
  /></SJFPopover>
</template>
<script setup vapor lang="ts">
import SJFPopover from '../Popover/index.vue'
import { computed } from 'vue'
import SJFMenu from '../Menu/index.vue'
import { useSjfValue, type SjfValue } from '../shared/control'
import type { SjfDropdownProps } from './index'
const props = withDefaults(defineProps<SjfDropdownProps>(), {
  modelValue: undefined,
})
const forwarded = computed(() => {
  const { items, ...rest } = props
  return rest
})
const slots = defineSlots<{
  trigger?: (props: Record<string, unknown>) => unknown
}>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [value: SjfValue]
}>()
const open = useSjfValue(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  false,
)
function select(value: SjfValue) {
  open.value = false
  emit('select', value)
}
</script>
