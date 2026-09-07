<template>
  <FieldShell v-bind="field" :filled="draft !== ''" :focused="focused"
    ><div class="sjf-control sjf-number" :style="style">
      <button
        type="button"
        aria-label="减少"
        :disabled="disabled || props.readonly || atMin"
        @mousedown.prevent
        @click="step(-1)"
      >
        −
      </button>
      <input
        v-bind="attrs"
        class="sjf-native"
        type="number"
        :value="draft"
        :min="props.min"
        :max="props.max"
        :step="props.step ?? 1"
        :name="props.name"
        :aria-label="props.label ?? '数值'"
        :aria-invalid="error || undefined"
        :disabled="disabled"
        :readonly="props.readonly"
        :required="required"
        :placeholder="props.placeholder"
        @input="draft = ($event.target as HTMLInputElement).value"
        @focus="focused = true"
        @blur="
          () => {
            focused = false
            commit()
          }
        "
        @keydown.enter="commit()"
        @keydown.up.prevent="step(1)"
        @keydown.down.prevent="step(-1)"
      />
      <button
        type="button"
        aria-label="增加"
        :disabled="disabled || props.readonly || atMax"
        @mousedown.prevent
        @click="step(1)"
      >
        +
      </button>
    </div></FieldShell
  >
</template>
<script setup vapor lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import FieldShell from '../shared/FieldShell.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import { clampSjfNumber, stepSjfNumber } from '../shared/models'
import type { SjfInputNumberProps } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfInputNumberProps>(), {
  disabled: undefined,
  required: undefined,
  error: undefined,
})
const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  change: [value: number | null]
}>()
const attrs = useAttrs()
const { style, field, disabled, required, error } = useSjfControl(props)
const model = useSjfValue<number | null>(
  () => props.modelValue,
  (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
  null,
)
const draft = ref(String(model.value ?? ''))
const focused = ref(false)
watch(model, (value) => {
  draft.value = String(value ?? '')
})
const atMin = computed(
  () => model.value !== null && model.value <= (props.min ?? -Infinity),
)
const atMax = computed(
  () => model.value !== null && model.value >= (props.max ?? Infinity),
)
function commit() {
  if (disabled.value || props.readonly) return
  const n = Number(draft.value)
  if (draft.value.trim() === '') model.value = null
  else if (Number.isFinite(n))
    model.value = clampSjfNumber(n, props.min, props.max)
  draft.value = String(model.value ?? '')
}
function step(direction: number) {
  if (disabled.value || props.readonly) return
  commit()
  const amount =
    Number.isFinite(props.step) && (props.step ?? 0) > 0 ? props.step! : 1
  model.value = stepSjfNumber(
    model.value,
    amount * direction,
    props.min,
    props.max,
  )
  draft.value = String(model.value)
}
</script>
<style scoped>
.sjf-number {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  width: 100%;
}
.sjf-number input {
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.sjf-number button {
  display: grid;
  place-items: center;
  min-width: 1.6em;
  min-height: 1.6em;
  border-radius: var(--sjf-c-rd);
  background: var(--md-sys-color-surface-container);
  font-size: 1.2em;
}
</style>
