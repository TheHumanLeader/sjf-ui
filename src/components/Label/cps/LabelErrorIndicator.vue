<template>
  <span
    class="sjf-label-error-indicator"
    tabindex="0"
    role="img"
    :aria-label="resolvedMessage"
  >
    <span class="sjf-label-error-indicator__mark" aria-hidden="true">!</span>
    <span class="sjf-label-error-indicator__tooltip" role="tooltip">
      {{ resolvedMessage }}
    </span>
  </span>
</template>

<script setup vapor lang="ts">
import { computed } from 'vue'

interface Props {
  message?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  message: '',
  disabled: false,
})

const resolvedMessage = computed(() => props.message || '字段内容有误')
</script>

<style scoped>
.sjf-label-error-indicator {
  position: relative;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  vertical-align: middle;
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

.sjf-label-error-indicator__tooltip {
  position: absolute;
  inset-inline-start: 50%;
  bottom: calc(100% + 8px);
  z-index: 30;
  min-width: max-content;
  max-width: min(280px, 70vw);
  padding: 6px 9px;
  border-radius: var(--sjf-label-radius, 8px);
  background: var(--md-sys-color-on-surface, #211a1d);
  color: var(--md-sys-color-surface, #fff8fa);
  box-shadow: var(--sjf-shadow-sm, 0 2px 8px rgb(0 0 0 / 14%));
  font-size: var(--sjf-label-helper-font-size, 12px);
  font-weight: 500;
  line-height: 1.35;
  text-align: start;
  white-space: normal;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate(-50%, 4px);
}

.sjf-label-error-indicator:hover .sjf-label-error-indicator__tooltip,
.sjf-label-error-indicator:focus-visible .sjf-label-error-indicator__tooltip {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}
</style>
