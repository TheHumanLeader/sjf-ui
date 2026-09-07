<template>
  <FieldShell v-bind="field" :filled="true" :focused="focused"
    ><input
      v-bind="attrs"
      class="sjf-control sjf-native sjf-date-time"
      :style="style"
      type="time"
      :value="model"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :aria-label="props.label ?? '时间'"
      :name="props.name"
      :disabled="disabled"
      :required="required"
      :readonly="props.readonly"
      @input="model = ($event.target as HTMLInputElement).value"
      @focus="focused = true"
      @blur="focused = false"
  /></FieldShell>
</template>
<script setup vapor lang="ts">
import { ref, useAttrs } from 'vue'
import FieldShell from '../shared/FieldShell.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfTimePickerProps } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfTimePickerProps>(), {
  disabled: undefined,
  required: undefined,
  error: undefined,
})
const attrs = useAttrs()
const { size, style, field, disabled, required, error } = useSjfControl(props)
const focused = ref(false)
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const model = useSjfValue(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  '',
)
</script>
<style scoped>
.sjf-date-time {
  color-scheme: inherit;
  min-height: 1.6em;
}
.sjf-date-time::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.7;
}
</style>
