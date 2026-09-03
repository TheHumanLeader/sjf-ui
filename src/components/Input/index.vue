<template>
  <SjfLabel
    :label="props.label"
    :label-option="props.labelOption"
    :col-span="props.colSpan ?? 1"
    :row-span="props.rowSpan ?? 1"
    :label-align="props.labelAlign"
    :content-align="props.contentAlign"
    :required="resolvedRequired"
    :disabled="resolvedDisabled"
    :error="resolvedError"
    :focused="focused"
    :filled="filled"
  >
    <input
      class="sjf-input__native"
      :class="{ 'is-embedded': embedded }"
      :value="localValue"
      :type="props.type ?? 'text'"
      :name="props.name"
      :placeholder="props.placeholder ?? ''"
      :autocomplete="props.autocomplete"
      :required="resolvedRequired"
      :disabled="resolvedDisabled"
      :readonly="props.readonly ?? false"
      @focus="focused = true"
      @blur="focused = false"
      @input="onInput"
    />
  </SjfLabel>
</template>

<script setup vapor lang="ts">
import { computed, ref, watch } from 'vue'
import SjfLabel from '../Label/index.vue'
import { useSjfFormContext } from '../Form/context'
import type { SjfInputProps, SjfInputModelValue } from './index'

const props = defineProps<SjfInputProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const form = useSjfFormContext()
const focused = ref(false)
const localValue = ref<SjfInputModelValue>(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) localValue.value = value
  },
)

const resolvedMode = computed(() =>
  props.labelOption?.mode ?? form?.labelOption.value.mode ?? 'm3',
)
const resolvedRequired = computed(() =>
  props.required ?? props.labelOption?.required ?? form?.labelOption.value.required ?? false,
)
const resolvedDisabled = computed(() =>
  props.disabled ?? props.labelOption?.disabled ?? form?.labelOption.value.disabled ?? false,
)
const resolvedError = computed(() =>
  props.error ?? props.labelOption?.error ?? form?.labelOption.value.error ?? false,
)

const embedded = computed(() =>
  resolvedMode.value === 'm3' || resolvedMode.value.includes('box'),
)

const filled = computed(() => String(localValue.value ?? '').length > 0)

function onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  localValue.value = value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.sjf-input__native {
  width: 100%;
  min-width: 0;
  min-height: var(--sjf-label-control-height, 40px);
  border: var(--sjf-label-line-width, 1px) solid var(--md-sys-color-outline-variant, #cac4d0);
  border-radius: var(--sjf-label-radius, 8px);
  padding-inline: var(--sjf-label-padding-x, 12px);
  padding-block: var(--sjf-label-padding-y, 8px);
  outline: 0;
  background: var(--md-sys-color-surface-container-lowest, #fff);
  color: var(--md-sys-color-on-surface, #1d1b20);
  font: inherit;
  text-align: var(--sjf-label-content-align, left);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.sjf-input__native:focus {
  border-color: var(--md-sys-color-primary, #b73e6f);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--md-sys-color-primary, #b73e6f) 12%, transparent);
}

.sjf-input__native.is-embedded {
  min-height: auto;
  border: 0;
  border-radius: 0;
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.sjf-input__native.is-embedded:focus {
  border: 0;
  box-shadow: none;
}

.sjf-input__native:disabled {
  cursor: default;
  opacity: 0.64;
}
</style>
