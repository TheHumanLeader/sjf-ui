<template>
  <FieldShell v-bind="field" :filled="true" :focused="focused"
    ><div class="sjf-control sjf-slider" :style="style">
      <input
        v-bind="attrs"
        type="range"
        :min="props.min ?? 0"
        :max="props.max ?? 100"
        :step="props.step ?? 1"
        :value="model"
        :name="props.name"
        :aria-label="props.label ?? '滑块'"
        :disabled="disabled || props.readonly"
        @input="model = Number(($event.target as HTMLInputElement).value)"
        @focus="focused = true"
        @blur="focused = false"
      /><output v-if="props.showValue">{{ model }}</output>
    </div></FieldShell
  >
</template>
<script setup vapor lang="ts">
import { ref, useAttrs } from 'vue'
import FieldShell from '../shared/FieldShell.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfSliderProps } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfSliderProps>(), {
  disabled: undefined,
  required: undefined,
  error: undefined,
})
const attrs = useAttrs()
const { size, style, field, disabled, required, error } = useSjfControl(props)
const focused = ref(false)
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const model = useSjfValue(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  props.min ?? 0,
)
</script>
<style scoped>
.sjf-slider {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-pd);
  width: 100%;
}
.sjf-slider input {
  appearance: auto;
  accent-color: var(--md-sys-color-primary);
  flex: 1;
  min-width: 0;
}
.sjf-slider output {
  font-variant-numeric: tabular-nums;
  min-width: 3ch;
}
</style>
