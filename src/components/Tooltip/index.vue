<template>
  <SJFPopover
    v-bind="forwarded"
    v-model="open"
    trigger="hover"
    tooltip
    :placement="props.placement ?? 'top'"
    ><template #trigger="binding"
      ><slot v-bind="binding"
        ><button
          class="sjf-tooltip-default"
          type="button"
          :disabled="props.disabled"
          v-bind="binding.attrs"
        >
          {{ props.label ?? '查看提示' }}
        </button></slot
      ></template
    >{{ props.text }}</SJFPopover
  >
</template>
<script setup vapor lang="ts">
import SJFPopover from '../Popover/index.vue'
import { computed } from 'vue'
import { useSjfValue } from '../shared/control'
import type { SjfTooltipProps } from './index'
const props = withDefaults(defineProps<SjfTooltipProps>(), {
  modelValue: undefined,
  disabled: undefined,
})
const forwarded = computed(() => {
  const { text, ...rest } = props
  return rest
})
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const open = useSjfValue(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  false,
)
</script>
<style scoped>
.sjf-tooltip-default {
  padding: 0.5em;
  border-bottom: 1px dashed var(--md-sys-color-outline);
  color: var(--md-sys-color-primary);
}
</style>
