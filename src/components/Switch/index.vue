<template>
  <FieldShell v-bind="field" :filled="true" :focused="focused"
    ><label class="sjf-control sjf-switch" :style="style"
      ><input
        v-bind="attrs"
        class="sjf-sr-only"
        type="checkbox"
        role="switch"
        :checked="model"
        :aria-checked="model"
        :aria-label="props.label"
        :name="props.name"
        :required="required"
        :disabled="disabled || props.readonly"
        @change="model = ($event.target as HTMLInputElement).checked"
        @focus="focused = true"
        @blur="focused = false"
      /><span class="sjf-switch-track" :class="{ on: model }" aria-hidden="true"
        ><span></span></span
      ><span>{{
        model ? (props.onText ?? '开启') : (props.offText ?? '关闭')
      }}</span></label
    ></FieldShell
  >
</template>
<script setup vapor lang="ts">
import { ref, useAttrs } from 'vue'
import FieldShell from '../shared/FieldShell.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfSwitchProps } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfSwitchProps>(), {
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
.sjf-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  cursor: pointer;
}
.sjf-switch-track {
  display: block;
  width: calc(var(--sjf-c-h) * 1.1);
  height: calc(var(--sjf-c-h) * 0.65);
  padding: 3px;
  border: 1px solid var(--md-sys-color-outline);
  border-radius: 999px;
  background: var(--md-sys-color-surface-container-highest);
}
.sjf-switch-track > span {
  display: block;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--md-sys-color-outline);
  transition:
    transform var(--sjf-motion-normal) var(--sjf-motion-ease-standard),
    background-color var(--sjf-motion-normal);
}
.sjf-switch-track.on {
  background: var(--md-sys-color-primary);
  border-color: transparent;
}
.sjf-switch-track.on > span {
  transform: translateX(calc(var(--sjf-c-h) * 0.45));
  background: var(--md-sys-color-on-primary);
}
.sjf-switch:has(input:focus-visible) .sjf-switch-track {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 3px;
}
.sjf-switch:has(input:disabled) {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
