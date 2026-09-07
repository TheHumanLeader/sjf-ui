<template>
  <FieldShell v-bind="field" :filled="model.length > 0" :focused="focused"
    ><div class="sjf-control sjf-textarea" :style="style">
      <textarea
        v-bind="attrs"
        class="sjf-native"
        :style="{ resize: props.resize ?? 'vertical' }"
        :value="model"
        :rows="props.rows ?? 4"
        :maxlength="props.maxlength"
        :name="props.name"
        :placeholder="props.placeholder"
        :aria-label="props.label"
        :aria-invalid="error || undefined"
        :disabled="disabled"
        :required="required"
        :readonly="props.readonly"
        @input="model = ($event.target as HTMLTextAreaElement).value"
        @focus="focused = true"
        @blur="focused = false"
      /><span v-if="props.showCount" class="sjf-muted"
        >{{ model.length
        }}{{ props.maxlength ? ' / ' + props.maxlength : '' }}</span
      >
    </div></FieldShell
  >
</template>
<script setup vapor lang="ts">
import { ref, useAttrs } from 'vue'
import FieldShell from '../shared/FieldShell.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfTextareaProps } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfTextareaProps>(), {
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
.sjf-textarea {
  display: grid;
  gap: var(--sjf-c-gap);
  width: 100%;
}
.sjf-textarea > span {
  text-align: right;
  font-size: 0.85em;
}
.sjf-textarea textarea {
  min-height: 3em;
}
</style>
