<template>
  <SjfLabel
    :label="props.label"
    :label-option="props.labelOption"
    :helper="props.helper"
    :size="props.size"
    :mode="props.mode"
    :col-span="props.colSpan"
    :row-span="props.rowSpan"
    :required="props.required"
    :disabled="props.disabled"
    :error="props.error"
    :error-display="props.errorDisplay"
    :focused="props.focused"
    :filled="props.filled"
    :label-align="props.labelAlign"
    :content-align="props.contentAlign"
  >
    <div
      class="sjf-field"
      :class="{
        'is-embedded': embedded,
        'is-error': props.error,
        'is-disabled': props.disabled,
      }"
    >
      <slot />
    </div>
  </SjfLabel>
</template>
<script setup vapor lang="ts">
import { computed } from 'vue'
import SjfLabel from '../Label/index.vue'
import { useSjfFormContext } from '../Form/context'
import type { SjfLabelProps } from '../Label'
const props = withDefaults(defineProps<SjfLabelProps>(), {
  disabled: undefined,
  required: undefined,
  error: undefined,
})
const form = useSjfFormContext()
const embedded = computed(() => {
  const mode =
    props.mode ??
    props.labelOption?.mode ??
    form?.labelOption.value.mode ??
    'm3'
  return mode === 'm3' || mode.includes('box')
})
</script>
