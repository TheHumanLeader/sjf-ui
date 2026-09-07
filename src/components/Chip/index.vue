<template>
  <span
    class="sjf-control sjf-chip"
    :class="{ selected: active, disabled: disabled }"
    :style="style"
    ><button
      v-if="props.selectable"
      type="button"
      :aria-pressed="active"
      :disabled="disabled"
      @click="active = !active"
    >
      <SJFIcon v-if="props.icon" :name="props.icon" :size="size" /><slot>{{
        props.label
      }}</slot></button
    ><span v-else class="sjf-chip-copy"
      ><SJFIcon v-if="props.icon" :name="props.icon" :size="size" /><slot>{{
        props.label
      }}</slot></span
    ><button
      v-if="props.closable"
      type="button"
      :disabled="disabled"
      :aria-label="'移除 ' + (props.label ?? '标签')"
      @click="emit('close')"
    >
      <SJFIcon name="close" size="mn" /></button
  ></span>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import SJFIcon from '../Icon/index.vue'
import { useSjfValue } from '../shared/control'
import type { SjfChipProps } from './index'
const props = withDefaults(defineProps<SjfChipProps>(), {
  disabled: undefined,
  modelValue: undefined,
})
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; close: [] }>()
const { size, style, disabled } = useSjfControl(props)
const active = useSjfValue(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  false,
)
</script>
<style scoped>
.sjf-chip {
  display: inline-flex;
  align-items: center;
  min-height: calc(var(--sjf-c-h) * 0.8);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--sjf-c-rd);
}
.sjf-chip button,
.sjf-chip-copy {
  display: inline-flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  padding: 0.25em var(--sjf-c-gap);
  min-height: inherit;
}
.sjf-chip.selected {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-color: transparent;
}
.sjf-chip.disabled {
  opacity: 0.5;
}
</style>
