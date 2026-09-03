<template>
  <div
    class="sjf-form"
    :class="{ 'is-box-group': boxGroup }"
    :style="formStyle"
    :data-columns="resolvedColumns"
    :data-label-mode="resolvedLabelOption.mode ?? 'm3'"
  >
    <slot />
  </div>
</template>

<script setup vapor lang="ts">
import { computed, provide } from 'vue'
import { getSjfSizeValue, useSjfBaseSize } from '../../core/size'
import { SJF_FORM_CONTEXT_KEY } from './context'
import type { SjfFormProps } from './index'

const props = defineProps<SjfFormProps>()

const globalBaseSize = useSjfBaseSize()
const resolvedColumns = computed(() => Math.max(1, Math.floor(props.columns ?? 1)))
const effectiveSize = computed(() => props.size ?? globalBaseSize.value)

const resolvedLabelOption = computed(() => ({
  ...(props.labelOption ?? {}),
  ...(props.labelMode !== undefined ? { mode: props.labelMode } : {}),
  ...(props.size !== undefined && props.labelOption?.size === undefined ? { size: props.size } : {}),
}))

const boxMode = computed(() => {
  const mode = resolvedLabelOption.value.mode ?? 'm3'
  return mode === 'horizontal-box' || mode === 'vertical-box'
})

const boxGroup = computed(() => boxMode.value && (props.gap === undefined || props.gap === 0))
const horizontalBoxGroup = computed(() =>
  boxGroup.value && (resolvedLabelOption.value.mode ?? 'm3') === 'horizontal-box',
)

const gapValue = computed(() => {
  if (horizontalBoxGroup.value) return '0px'
  if (boxGroup.value) {
    return getSjfSizeValue('lineWidth', effectiveSize.value, -1)
  }
  if (props.gap === 0) return '0px'
  return getSjfSizeValue('gap', props.gap ?? effectiveSize.value)
})

const lineWidth = computed(() => getSjfSizeValue('lineWidth', effectiveSize.value, -1))
const radius = computed(() => getSjfSizeValue('radius', effectiveSize.value, -1))

const formStyle = computed(() => ({
  '--sjf-form-columns': String(resolvedColumns.value),
  '--sjf-form-gap': gapValue.value,
  '--sjf-form-line-width': lineWidth.value,
  '--sjf-form-radius': radius.value,
}))

provide(SJF_FORM_CONTEXT_KEY, {
  columns: resolvedColumns,
  size: computed(() => props.size),
  labelOption: resolvedLabelOption,
  boxGroup,
})
</script>

<style scoped>
.sjf-form {
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(var(--sjf-form-columns), minmax(0, 1fr));
  grid-auto-flow: row;
  align-items: stretch;
  gap: var(--sjf-form-gap);
}

/*
 * horizontal-box uses a true single-line grid instead of a 1px colored gap.
 * Every cell draws only its right/bottom edge; the form pseudo-element draws
 * the outer frame. Adjacent cells therefore never stack two borders.
 */
.sjf-form.is-box-group[data-label-mode='horizontal-box'] {
  position: relative;
  overflow: hidden;
  border-radius: var(--sjf-form-radius);
  background: var(--md-sys-color-surface, #fff);
}

.sjf-form.is-box-group[data-label-mode='horizontal-box']::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  border: var(--sjf-form-line-width) solid var(--md-sys-color-outline-variant, #cac4d0);
  border-radius: inherit;
}

.sjf-form.is-box-group[data-label-mode='horizontal-box']
  :deep(.sjf-label.is-form-box-group .sjf-label__box-label),
.sjf-form.is-box-group[data-label-mode='horizontal-box']
  :deep(.sjf-label.is-form-box-group .sjf-label__box-content) {
  border: 0;
  border-inline-end: var(--sjf-form-line-width) solid var(--md-sys-color-outline-variant, #cac4d0);
  border-block-end: var(--sjf-form-line-width) solid var(--md-sys-color-outline-variant, #cac4d0);
  border-radius: 0;
}

/* Keep the current gap-as-line implementation for vertical-box until its
 * cells are promoted to the same split-grid model. */
.sjf-form.is-box-group:not([data-label-mode='horizontal-box']) {
  overflow: hidden;
  border: var(--sjf-form-line-width) solid var(--md-sys-color-outline-variant, #cac4d0);
  border-radius: var(--sjf-form-radius);
  background: var(--md-sys-color-outline-variant, #cac4d0);
}
</style>
