<template>
  <dl
    class="sjf-control sjf-descriptions"
    :class="{ bordered: props.bordered }"
    :style="[style, { '--sjf-desc-columns': String(columns) }]"
  >
    <div
      v-for="(item, index) in props.items"
      :key="item.key ?? index"
      :style="{
        gridColumn: 'span ' + Math.min(columns, Math.max(1, item.span ?? 1)),
      }"
    >
      <dt>{{ item.label }}</dt>
      <dd>
        <slot :name="item.key ?? String(index)" :item="item">{{
          item.value ?? '—'
        }}</slot>
      </dd>
    </div>
  </dl>
</template>
<script setup vapor lang="ts">
import { computed } from 'vue'
import { useSjfControl } from '../shared/control'
import type { SjfDescriptionsProps } from './index'
const props = defineProps<SjfDescriptionsProps>()
const { style } = useSjfControl(props)
const columns = computed(() =>
  Math.min(6, Math.max(1, Math.floor(props.columns ?? 2))),
)
</script>
<style scoped>
.sjf-descriptions {
  display: grid;
  grid-template-columns: repeat(var(--sjf-desc-columns), minmax(0, 1fr));
  margin: 0;
  gap: var(--sjf-c-pd);
}
.sjf-descriptions > div {
  display: grid;
  grid-template-columns: minmax(5em, 30%) minmax(0, 1fr);
  gap: var(--sjf-c-gap);
  padding: var(--sjf-c-gap);
}
.sjf-descriptions dt {
  color: var(--md-sys-color-on-surface-variant);
}
.sjf-descriptions dd {
  margin: 0;
  overflow-wrap: anywhere;
}
.sjf-descriptions.bordered {
  gap: 1px;
  background: var(--md-sys-color-outline-variant);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--sjf-c-rd);
  overflow: hidden;
}
.sjf-descriptions.bordered > div {
  background: var(--md-sys-color-surface-container-lowest);
  padding: var(--sjf-c-pd);
}
@media (max-width: 600px) {
  .sjf-descriptions {
    grid-template-columns: 1fr;
  }
  .sjf-descriptions > div {
    grid-column: span 1 !important;
  }
}
</style>
