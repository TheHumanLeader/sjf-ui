<template>
  <div class="sjf-control sjf-collapse" :style="style">
    <section v-for="(item, index) in props.items" :key="item.value">
      <h3>
        <button
          :id="id + '-h-' + index"
          type="button"
          :disabled="item.disabled"
          :aria-expanded="model.includes(item.value)"
          :aria-controls="id + '-p-' + index"
          @click="toggle(item.value)"
        >
          <span>{{ item.title }}</span
          ><SJFIcon
            name="expand_more"
            :size="size"
            :class="{ open: model.includes(item.value) }"
          />
        </button>
      </h3>
      <div
        :id="id + '-p-' + index"
        class="sjf-collapse-region"
        :class="{ open: model.includes(item.value) }"
        :inert="!model.includes(item.value)"
        role="region"
        :aria-labelledby="id + '-h-' + index"
      >
        <div>
          <div class="sjf-collapse-content">
            <slot :name="String(item.value)" :item="item">{{
              item.content
            }}</slot>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup vapor lang="ts">
import { useId } from 'vue'
import SJFIcon from '../Icon/index.vue'
import { useSjfControl, useSjfValue, type SjfValue } from '../shared/control'
import type { SjfCollapseProps } from './index'
const props = defineProps<SjfCollapseProps>()
const emit = defineEmits<{ 'update:modelValue': [value: SjfValue[]] }>()
const { style, size } = useSjfControl(props),
  id = 'sjf-collapse-' + useId()
const model = useSjfValue<SjfValue[]>(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  [],
)
function toggle(value: SjfValue) {
  model.value = model.value.includes(value)
    ? model.value.filter((v) => v !== value)
    : props.accordion
      ? [value]
      : [...model.value, value]
}
</script>
<style scoped>
.sjf-collapse {
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--sjf-c-rd);
  overflow: hidden;
}
.sjf-collapse section + section {
  border-top: 1px solid var(--md-sys-color-outline-variant);
}
.sjf-collapse h3 {
  margin: 0;
  font-size: inherit;
}
.sjf-collapse h3 button {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-pd);
  width: 100%;
  min-height: var(--sjf-c-h);
  padding: var(--sjf-c-pd);
  text-align: left;
}
.sjf-collapse h3 button > span:first-child {
  flex: 1;
}
.sjf-collapse .sjf-icon {
  transition: transform var(--sjf-motion-normal);
}
.sjf-collapse .sjf-icon.open {
  transform: rotate(180deg);
}
.sjf-collapse-region {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition:
    grid-template-rows var(--sjf-motion-slow) var(--sjf-motion-ease-standard),
    visibility 0s var(--sjf-motion-slow);
}
.sjf-collapse-region.open {
  grid-template-rows: 1fr;
  visibility: visible;
  transition-delay: 0s;
}
.sjf-collapse-region > div {
  min-height: 0;
  overflow: hidden;
}
.sjf-collapse-content {
  padding: 0 var(--sjf-c-pd) var(--sjf-c-pd);
  line-height: 1.75;
  color: var(--md-sys-color-on-surface-variant);
}
</style>
