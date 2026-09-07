<template>
  <div class="sjf-control sjf-tabs" :style="style">
    <SJFList
      type="tabs"
      horizontal
      :size="size"
      :aria-label="props.label ?? '标签页'"
      :model-value="active"
      @update:model-value="select"
      @keydown="keydown"
      ><SJFItem
        v-for="(tab, index) in props.items"
        :id="id + '-tab-' + index"
        :key="tab.value"
        :value="tab.value"
        :title="tab.label"
        :icon="tab.icon"
        :disabled="tab.disabled"
        :aria-controls="id + '-panel-' + index"
        :tabindex="active === tab.value ? 0 : -1"
    /></SJFList>
    <div
      v-for="(tab, index) in props.items"
      v-show="active === tab.value"
      :id="id + '-panel-' + index"
      :key="tab.value"
      class="sjf-tab-panel"
      role="tabpanel"
      tabindex="0"
      :aria-labelledby="id + '-tab-' + index"
    >
      <slot :name="String(tab.value)" :item="tab"
        ><slot :item="tab">{{ tab.label }}</slot></slot
      >
    </div>
  </div>
</template>
<script setup vapor lang="ts">
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfTabsProps } from './index'
import { computed, useId, nextTick } from 'vue'
import SJFList from '../List/index.vue'
import SJFItem from '../Item/index.vue'
import type { SjfValue } from '../shared/control'
const props = defineProps<SjfTabsProps>()
const emit = defineEmits<{
  'update:modelValue': [value: SjfValue]
  change: [value: SjfValue]
}>()
const { style, size } = useSjfControl(props)
const id = 'sjf-tabs-' + useId()
const model = useSjfValue<SjfValue>(
  () => props.modelValue,
  (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
  props.items.find((t) => !t.disabled)?.value ?? '',
)
const active = computed(() =>
  props.items.some((t) => t.value === model.value && !t.disabled)
    ? model.value
    : props.items.find((t) => !t.disabled)?.value,
)
function select(value: unknown) {
  if (props.items.some((t) => t.value === value && !t.disabled))
    model.value = value as SjfValue
}
function keydown(event: KeyboardEvent) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const items = props.items.filter((t) => !t.disabled)
  if (!items.length) return
  const i = items.findIndex((t) => t.value === active.value)
  const tab =
    event.key === 'Home'
      ? items[0]
      : event.key === 'End'
        ? items.at(-1)!
        : items[
            (i + (event.key === 'ArrowLeft' ? -1 : 1) + items.length) %
              items.length
          ]
  model.value = tab.value
  void nextTick(() =>
    document.getElementById(id + '-tab-' + props.items.indexOf(tab))?.focus(),
  )
}
</script>
<style scoped>
.sjf-tabs {
  min-width: 0;
}
.sjf-tab-panel {
  padding-block: var(--sjf-c-pd);
  line-height: 1.7;
}
.sjf-tab-panel:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
  border-radius: var(--sjf-c-rd);
}
</style>
