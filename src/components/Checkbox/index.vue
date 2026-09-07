<template>
  <FieldShell v-bind="field" :filled="true" :focused="focused"
    ><label class="sjf-control sjf-choice" :style="style"
      ><input
        v-bind="attrs"
        type="checkbox"
        :checked="model"
        :indeterminate="props.indeterminate"
        :aria-checked="props.indeterminate ? 'mixed' : model"
        :aria-label="props.label"
        :name="props.name"
        :required="required"
        :disabled="disabled || props.readonly"
        @change="model = ($event.target as HTMLInputElement).checked"
        @focus="focused = true"
        @blur="focused = false"
      /><span
        ><slot>{{ props.text ?? '选中' }}</slot></span
      ></label
    ></FieldShell
  >
</template>
<script setup vapor lang="ts">
import { ref, useAttrs } from 'vue'
import FieldShell from '../shared/FieldShell.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfCheckboxProps } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfCheckboxProps>(), {
  disabled: undefined,
  required: undefined,
  error: undefined,
  modelValue: undefined,
})
const attrs = useAttrs()
const { size, style, field, disabled, required, error } = useSjfControl(props)
const focused = ref(false)
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()
const model = useSjfValue(
  () => props.modelValue,
  (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
  false,
)
</script>
<style scoped>
.sjf-choice {
  display: inline-flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  cursor: pointer;
  min-height: 1.5em;
}
.sjf-choice input {
  appearance: auto;
  accent-color: var(--md-sys-color-primary);
  width: 1.25em;
  height: 1.25em;
  flex: none;
}
.sjf-choice:has(input:disabled) {
  cursor: not-allowed;
}
.sjf-choice input:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 3px;
}
</style>
