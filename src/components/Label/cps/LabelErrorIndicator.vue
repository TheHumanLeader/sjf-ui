<template>
  <SJFTooltip
    :text="resolvedMessage"
    :disabled="props.disabled"
    placement="top"
  >
    <template #default="{ attrs }">
      <span
        class="sjf-label-error-indicator"
        :tabindex="props.disabled ? -1 : 0"
        role="img"
        :aria-label="resolvedMessage"
        v-bind="attrs"
      >
        <span class="sjf-label-error-indicator__mark" aria-hidden="true"
          >!</span
        >
      </span>
    </template>
  </SJFTooltip>
</template>

<script setup vapor lang="ts">
import { computed } from 'vue'
import SJFTooltip from '../../Tooltip/index.vue'
const props = withDefaults(
  defineProps<{ message?: string; disabled?: boolean }>(),
  { message: '', disabled: false },
)
const resolvedMessage = computed(() => props.message || '字段内容有误')
</script>

<style scoped>
.sjf-label-error-indicator {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-radius: 999px;
}
.sjf-label-error-indicator:focus-visible {
  outline: 2px solid var(--md-sys-color-error);
  outline-offset: 3px;
}
.sjf-label-error-indicator__mark {
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  border-radius: 999px;
  background: var(--sjf-label-error-color, #ba1a1a);
  color: var(--md-sys-color-on-error, #fff);
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  cursor: help;
}
</style>
