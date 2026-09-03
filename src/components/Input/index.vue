<template>
  <SjfLabel
    :label="props.label"
    :helper="props.helper"
    :label-option="props.labelOption"
    :col-span="props.colSpan ?? 1"
    :row-span="props.rowSpan ?? 1"
    :size="props.size"
    :label-align="props.labelAlign"
    :content-align="props.contentAlign"
    :required="resolvedRequired"
    :disabled="resolvedDisabled"
    :error="resolvedError"
    :focused="focused"
    :filled="filled"
  >
    <template v-if="slots.label" #label>
      <slot name="label" />
    </template>

    <div
      class="sjf-input__control"
      :class="controlClasses"
      @mousedown="onControlMouseDown"
    >
      <span v-if="slots.prefix" class="sjf-input__prefix">
        <slot name="prefix" />
      </span>

      <input
        ref="inputRef"
        v-bind="attrs"
        class="sjf-input__native"
        :value="localValue"
        :type="resolvedType"
        :name="props.name"
        :placeholder="resolvedPlaceholder"
        :autocomplete="props.autocomplete"
        :required="resolvedRequired"
        :disabled="resolvedDisabled"
        :readonly="props.readonly ?? false"
        :maxlength="props.maxlength"
        :minlength="props.minlength"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @change="onChange"
      />

      <span v-if="slots.suffix" class="sjf-input__suffix">
        <slot name="suffix" />
      </span>

      <span v-if="props.showCount" class="sjf-input__count" aria-live="polite">
        {{ countText }}
      </span>

      <button
        v-if="canClear"
        class="sjf-input__action"
        type="button"
        aria-label="清空输入"
        title="清空"
        @mousedown.prevent
        @click="clear"
      >
        <span aria-hidden="true">×</span>
      </button>

      <button
        v-if="canTogglePassword"
        class="sjf-input__action sjf-input__password-action"
        type="button"
        :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
        :title="passwordVisible ? '隐藏密码' : '显示密码'"
        @mousedown.prevent
        @click="togglePassword"
      >
        {{ passwordVisible ? '隐藏' : '显示' }}
      </button>
    </div>
  </SjfLabel>
</template>

<script setup vapor lang="ts">
import { computed, nextTick, ref, useAttrs, watch } from 'vue'
import SjfLabel from '../Label/index.vue'
import { useSjfFormContext } from '../Form/context'
import type { SjfInputProps, SjfInputModelValue } from './index'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SjfInputProps>()
const slots = defineSlots<{
  label?: () => unknown
  prefix?: () => unknown
  suffix?: () => unknown
}>()
const attrs = useAttrs()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string, event: Event]
  change: [value: string, event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const form = useSjfFormContext()
const inputRef = ref<HTMLInputElement | null>(null)
const focused = ref(false)
const passwordVisible = ref(false)
const localValue = ref<SjfInputModelValue>(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) localValue.value = value
  },
)

watch(
  () => props.type,
  (value) => {
    if (value !== 'password') passwordVisible.value = false
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
const hasLabel = computed(() => Boolean(props.label || slots.label))
const resolvedPlaceholder = computed(() => {
  const placeholder = props.placeholder ?? ''
  if (resolvedMode.value !== 'm3' || !hasLabel.value) return placeholder
  return focused.value ? placeholder : ''
})
const resolvedType = computed(() => {
  if (props.type === 'password' && props.showPassword && passwordVisible.value) return 'text'
  return props.type ?? 'text'
})
const canClear = computed(() =>
  Boolean(props.clearable && filled.value && !resolvedDisabled.value && !props.readonly),
)
const canTogglePassword = computed(() =>
  Boolean(props.showPassword && props.type === 'password' && !resolvedDisabled.value),
)
const countText = computed(() => {
  const length = String(localValue.value ?? '').length
  return props.maxlength === undefined ? String(length) : `${length} / ${props.maxlength}`
})

const controlClasses = computed(() => ({
  'is-embedded': embedded.value,
  'is-focused': focused.value,
  'is-filled': filled.value,
  'is-disabled': resolvedDisabled.value,
  'is-readonly': Boolean(props.readonly),
  'is-error': resolvedError.value,
}))

function onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  localValue.value = value
  emit('update:modelValue', value)
  emit('input', value, event)
}

function onChange(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  emit('change', value, event)
}

function onFocus(event: FocusEvent): void {
  focused.value = true
  emit('focus', event)
}

function onBlur(event: FocusEvent): void {
  focused.value = false
  emit('blur', event)
}

function onControlMouseDown(event: MouseEvent): void {
  if (resolvedDisabled.value) return
  const target = event.target as HTMLElement | null
  if (target?.closest('button')) return
  if (target !== inputRef.value) {
    event.preventDefault()
    focus()
  }
}

function clear(): void {
  if (!canClear.value) return
  localValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  void nextTick(() => inputRef.value?.focus())
}

function togglePassword(): void {
  if (!canTogglePassword.value) return
  passwordVisible.value = !passwordVisible.value
  void nextTick(() => inputRef.value?.focus())
}

function focus(): void {
  inputRef.value?.focus()
}

function blur(): void {
  inputRef.value?.blur()
}

function select(): void {
  inputRef.value?.select()
}

defineExpose({
  focus,
  blur,
  select,
  input: inputRef,
})
</script>

<style scoped>
.sjf-input__control {
  width: 100%;
  min-width: 0;
  min-height: var(--sjf-label-control-height, 40px);
  display: flex;
  align-items: center;
  gap: var(--sjf-label-gap, 8px);
  box-sizing: border-box;
  border: var(--sjf-label-line-width, 1px) solid var(--md-sys-color-outline-variant, #cac4d0);
  border-radius: var(--sjf-label-radius, 8px);
  padding-inline: var(--sjf-label-padding-x, 12px);
  padding-block: var(--sjf-label-padding-y, 8px);
  background: var(--md-sys-color-surface-container-lowest, #fff);
  color: var(--md-sys-color-on-surface, #1d1b20);
  cursor: text;
}

.sjf-input__control.is-focused:not(.is-embedded) {
  border-color: var(--md-sys-color-primary, #b73e6f);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--md-sys-color-primary, #b73e6f) 12%, transparent);
}

.sjf-input__control.is-error:not(.is-embedded) {
  border-color: var(--md-sys-color-error, #ba1a1a);
}

.sjf-input__control.is-readonly:not(.is-embedded) {
  background: var(--md-sys-color-surface-container-low, #fff0f4);
}

.sjf-input__control.is-disabled {
  cursor: default;
  opacity: 0.64;
}

.sjf-input__control.is-embedded {
  min-height: auto;
  border: 0;
  border-radius: 0;
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.sjf-input__native {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  min-height: 1.5em;
  border: 0;
  outline: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: 1.5;
  text-align: var(--sjf-label-content-align, left);
}

.sjf-input__native::placeholder {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  opacity: 0.72;
}

.sjf-input__native:disabled {
  cursor: default;
}

.sjf-input__native:read-only {
  cursor: default;
}

.sjf-input__prefix,
.sjf-input__suffix {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--md-sys-color-on-surface-variant, #49454f);
  white-space: nowrap;
}

.sjf-input__count {
  flex: 0 0 auto;
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: var(--sjf-label-helper-font-size, 12px);
  line-height: 1;
  white-space: nowrap;
}

.sjf-input__action {
  flex: 0 0 auto;
  min-width: 24px;
  min-height: 24px;
  display: inline-grid;
  place-items: center;
  border: 0;
  border-radius: 999px;
  padding: 0 5px;
  background: transparent;
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font: inherit;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}

.sjf-input__action:hover,
.sjf-input__action:focus-visible {
  background: color-mix(in srgb, var(--md-sys-color-primary, #b73e6f) 10%, transparent);
  color: var(--md-sys-color-primary, #b73e6f);
}

.sjf-input__password-action {
  min-width: 36px;
}
</style>
