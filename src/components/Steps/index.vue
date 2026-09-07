<template>
  <nav
    class="sjf-control sjf-steps"
    :style="style"
    :aria-label="props.label ?? '步骤'"
  >
    <ol :class="{ vertical: props.vertical }">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        :class="{ done: index < model, active: index === model }"
        :aria-current="index === model ? 'step' : undefined"
      >
        <button
          v-if="props.clickable"
          type="button"
          :disabled="item.disabled"
          @click="model = index"
        >
          <span class="sjf-step-number">{{
            index < model ? '✓' : index + 1
          }}</span
          ><span
            ><strong>{{ item.title }}</strong
            ><small>{{ item.description }}</small></span
          >
        </button>
        <div v-else class="sjf-step-copy">
          <span class="sjf-step-number">{{
            index < model ? '✓' : index + 1
          }}</span
          ><span
            ><strong>{{ item.title }}</strong
            ><small>{{ item.description }}</small></span
          >
        </div>
      </li>
    </ol>
  </nav>
</template>
<script setup vapor lang="ts">
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfStepsProps } from './index'
const props = defineProps<SjfStepsProps>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const { style } = useSjfControl(props)
const model = useSjfValue(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  0,
)
</script>
<style scoped>
.sjf-steps ol {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: var(--sjf-c-pd);
}
.sjf-steps li {
  flex: 1;
  border-bottom: 2px solid var(--md-sys-color-outline-variant);
  padding-bottom: var(--sjf-c-pd);
}
.sjf-steps li.active,
.sjf-steps li.done {
  border-color: var(--md-sys-color-primary);
}
.sjf-steps button,
.sjf-step-copy {
  display: flex;
  text-align: left;
  align-items: center;
  gap: var(--sjf-c-gap);
}
.sjf-step-number {
  display: grid;
  place-items: center;
  flex: none;
  width: var(--sjf-c-h);
  height: var(--sjf-c-h);
  border-radius: 50%;
  background: var(--md-sys-color-surface-container-high);
}
.active .sjf-step-number,
.done .sjf-step-number {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}
.sjf-steps small {
  display: block;
  color: var(--md-sys-color-on-surface-variant);
  margin-top: 0.3em;
}
.sjf-steps .vertical {
  flex-direction: column;
}
@media (max-width: 600px) {
  .sjf-steps ol {
    flex-direction: column;
  }
}
</style>
