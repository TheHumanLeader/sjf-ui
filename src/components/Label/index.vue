<template>
  <div
    class="sjf-label"
    :class="rootClasses"
    :style="rootStyle"
    :data-mode="resolvedMode"
    :data-size="effectiveSize"
  >
    <template v-if="resolvedMode === 'm3'">
      <div class="sjf-label__stack">
        <div class="sjf-label__m3-shell">
          <div class="sjf-label__m3-content">
            <slot />
          </div>

          <LabelCaption
            v-if="hasLabel"
            class="sjf-label__m3-caption"
            :text="props.label"
            :required="resolvedRequired"
            :disabled="resolvedDisabled"
            :error="resolvedError"
            :floating="true"
            :shrunk="isShrunk"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <LabelHelper
          v-if="resolvedHelper"
          class="sjf-label__helper-offset"
          :text="resolvedHelper"
          :error="resolvedError"
          :disabled="resolvedDisabled"
        />
      </div>
    </template>

    <template v-else-if="resolvedMode === 'horizontal'">
      <div class="sjf-label__horizontal">
        <div v-if="hasLabel" class="sjf-label__label-cell sjf-label__grid-label-cell">
          <LabelCaption
            :text="props.label"
            :required="resolvedRequired"
            :disabled="resolvedDisabled"
            :error="resolvedError"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <div class="sjf-label__body sjf-label__grid-control-cell">
          <slot />
          <LabelHelper
            v-if="resolvedHelper"
            :text="resolvedHelper"
            :error="resolvedError"
            :disabled="resolvedDisabled"
          />
        </div>
      </div>
    </template>

    <template v-else-if="resolvedMode === 'horizontal-box'">
      <div class="sjf-label__box sjf-label__box--horizontal">
        <div v-if="hasLabel" class="sjf-label__box-label sjf-label__grid-label-cell">
          <LabelCaption
            :text="props.label"
            :required="resolvedRequired"
            :disabled="resolvedDisabled"
            :error="resolvedError"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <div class="sjf-label__box-content sjf-label__grid-control-cell">
          <slot />
          <LabelHelper
            v-if="resolvedHelper"
            :text="resolvedHelper"
            :error="resolvedError"
            :disabled="resolvedDisabled"
          />
        </div>
      </div>
    </template>

    <template v-else-if="resolvedMode === 'vertical'">
      <div class="sjf-label__stack">
        <LabelCaption
          v-if="hasLabel"
          :text="props.label"
          :required="resolvedRequired"
          :disabled="resolvedDisabled"
          :error="resolvedError"
        >
          <slot name="label">{{ props.label }}</slot>
        </LabelCaption>

        <div class="sjf-label__body">
          <slot />
          <LabelHelper
            v-if="resolvedHelper"
            :text="resolvedHelper"
            :error="resolvedError"
            :disabled="resolvedDisabled"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="sjf-label__box sjf-label__box--vertical">
        <div v-if="hasLabel" class="sjf-label__box-label sjf-label__box-label--vertical">
          <LabelCaption
            :text="props.label"
            :required="resolvedRequired"
            :disabled="resolvedDisabled"
            :error="resolvedError"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <div class="sjf-label__box-content">
          <slot />
          <LabelHelper
            v-if="resolvedHelper"
            :text="resolvedHelper"
            :error="resolvedError"
            :disabled="resolvedDisabled"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup vapor lang="ts">
import { computed } from 'vue'
import { resolveSjfSizeRecipe, useSjfBaseSize } from '../../core/size'
import { useSjfFormContext } from '../Form/context'
import { SJF_LABEL_SIZE_RECIPE, type SjfLabelProps } from './index'
import LabelCaption from './cps/LabelCaption.vue'
import LabelHelper from './cps/LabelHelper.vue'

const props = defineProps<SjfLabelProps>()

const slots = defineSlots<{
  default?: () => unknown
  label?: () => unknown
}>()

const form = useSjfFormContext()
const globalBaseSize = useSjfBaseSize()
const ownOption = computed(() => props.labelOption ?? {})
const formOption = computed(() => form?.labelOption.value ?? {})

const resolvedMode = computed(() =>
  props.mode ?? ownOption.value.mode ?? formOption.value.mode ?? 'm3',
)
const effectiveSize = computed(() =>
  props.size ?? ownOption.value.size ?? formOption.value.size ?? form?.size.value ?? globalBaseSize.value,
)
const resolvedRequired = computed(() =>
  props.required ?? ownOption.value.required ?? formOption.value.required ?? false,
)
const resolvedDisabled = computed(() =>
  props.disabled ?? ownOption.value.disabled ?? formOption.value.disabled ?? false,
)
const resolvedError = computed(() =>
  props.error ?? ownOption.value.error ?? formOption.value.error ?? false,
)
const resolvedHelper = computed(() =>
  props.helper ?? ownOption.value.helper ?? formOption.value.helper ?? '',
)

const labelColSpan = computed(() => normalizeSpan(ownOption.value.colSpan ?? formOption.value.colSpan ?? 1))
const labelRowSpan = computed(() => normalizeSpan(ownOption.value.rowSpan ?? formOption.value.rowSpan ?? 1))
const controlColSpan = computed(() => normalizeSpan(props.colSpan ?? 1))
const controlRowSpan = computed(() => normalizeSpan(props.rowSpan ?? 1))

const isSplitGrid = computed(() =>
  Boolean(form) && (resolvedMode.value === 'horizontal' || resolvedMode.value === 'horizontal-box'),
)

const combinedColSpan = computed(() => {
  if (!form) return 1
  const columns = form.columns.value
  if (resolvedMode.value === 'm3') {
    return Math.min(columns, labelColSpan.value + controlColSpan.value)
  }
  return Math.min(columns, Math.max(labelColSpan.value, controlColSpan.value))
})

const combinedRowSpan = computed(() =>
  Math.max(labelRowSpan.value, controlRowSpan.value),
)

const hasLabel = computed(() => Boolean(props.label || slots.label))
const isShrunk = computed(() => Boolean(props.focused || props.filled))

const resolvedSize = computed(() =>
  resolveSjfSizeRecipe(effectiveSize.value, SJF_LABEL_SIZE_RECIPE),
)

const rootStyle = computed(() => ({
  '--sjf-label-font-size': resolvedSize.value.fontSize,
  '--sjf-label-floating-font-size': resolvedSize.value.floatingFontSize,
  '--sjf-label-helper-font-size': resolvedSize.value.helperFontSize,
  '--sjf-label-control-height': resolvedSize.value.controlHeight,
  '--sjf-label-gap': resolvedSize.value.gap,
  '--sjf-label-required-gap': resolvedSize.value.requiredGap,
  '--sjf-label-width': resolvedSize.value.labelWidth,
  '--sjf-label-radius': resolvedSize.value.radius,
  '--sjf-label-padding-x': resolvedSize.value.paddingX,
  '--sjf-label-padding-y': resolvedSize.value.paddingY,
  '--sjf-label-caption-padding-x': resolvedSize.value.captionPaddingX,
  '--sjf-label-line-width': resolvedSize.value.lineWidth,
  '--sjf-label-focus-line-width': resolvedSize.value.focusLineWidth,
  '--sjf-label-grid-label-col-span': String(labelColSpan.value),
  '--sjf-label-grid-label-row-span': String(labelRowSpan.value),
  '--sjf-label-grid-control-col-span': String(controlColSpan.value),
  '--sjf-label-grid-control-row-span': String(controlRowSpan.value),
  '--sjf-label-grid-combined-col-span': String(combinedColSpan.value),
  '--sjf-label-grid-combined-row-span': String(combinedRowSpan.value),
}))

const rootClasses = computed(() => ({
  'is-required': resolvedRequired.value,
  'is-disabled': resolvedDisabled.value,
  'is-error': resolvedError.value,
  'is-focused': Boolean(props.focused),
  'is-filled': Boolean(props.filled),
  'is-box': resolvedMode.value.includes('box'),
  'is-m3': resolvedMode.value === 'm3',
  'is-form-grid': Boolean(form),
  'is-split-grid': isSplitGrid.value,
  'is-form-box-group': Boolean(form?.boxGroup.value && resolvedMode.value === 'horizontal-box'),
}))

function normalizeSpan(value: number): number {
  if (!Number.isFinite(value)) return 1
  return Math.max(1, Math.floor(value))
}
</script>

<style scoped>
.sjf-label {
  --sjf-label-color: var(--md-sys-color-on-surface, #1d1b20);
  --sjf-label-muted-color: var(--md-sys-color-on-surface-variant, #49454f);
  --sjf-label-border-color: var(--md-sys-color-outline-variant, #cac4d0);
  --sjf-label-focus-color: var(--md-sys-color-primary, #b73e6f);
  --sjf-label-error-color: var(--md-sys-color-error, #ba1a1a);
  --sjf-label-surface: var(--md-sys-color-surface, #fff);
  --sjf-label-box-label-surface: color-mix(
    in srgb,
    var(--md-sys-color-surface-container, #f3edf7) 52%,
    var(--md-sys-color-surface, #fff)
  );
  --sjf-control-embedded: 0;

  min-width: 0;
  color: var(--sjf-label-color);
  font-size: var(--sjf-label-font-size);
}

.sjf-label.is-box,
.sjf-label.is-m3 {
  --sjf-control-embedded: 1;
}

.sjf-label.is-form-grid:not(.is-split-grid) {
  grid-column: span var(--sjf-label-grid-combined-col-span);
  grid-row: span var(--sjf-label-grid-combined-row-span);
}

.sjf-label.is-split-grid {
  display: contents;
}

.sjf-label.is-split-grid .sjf-label__horizontal,
.sjf-label.is-split-grid .sjf-label__box--horizontal {
  display: contents;
}

.sjf-label.is-split-grid .sjf-label__grid-label-cell {
  min-width: 0;
  grid-column: span var(--sjf-label-grid-label-col-span);
  grid-row: span var(--sjf-label-grid-label-row-span);
}

.sjf-label.is-split-grid .sjf-label__grid-control-cell {
  min-width: 0;
  grid-column: span var(--sjf-label-grid-control-col-span);
  grid-row: span var(--sjf-label-grid-control-row-span);
}

.sjf-label__stack,
.sjf-label__body,
.sjf-label__box-content {
  display: flex;
  flex-direction: column;
  gap: var(--sjf-label-gap);
}

.sjf-label__horizontal {
  display: grid;
  grid-template-columns: minmax(0, var(--sjf-label-width)) minmax(0, 1fr);
  align-items: start;
  gap: var(--sjf-label-gap);
}

.sjf-label__label-cell {
  min-height: var(--sjf-label-control-height);
  display: flex;
  align-items: center;
}

.sjf-label__m3-shell {
  position: relative;
  min-height: var(--sjf-label-control-height);
  box-sizing: border-box;
  border: var(--sjf-label-line-width) solid var(--sjf-label-border-color);
  border-radius: var(--sjf-label-radius);
  background: var(--sjf-label-surface);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.sjf-label__m3-content {
  min-height: var(--sjf-label-control-height);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-inline: var(--sjf-label-padding-x);
  padding-block: var(--sjf-label-padding-y);
}

.sjf-label.is-focused .sjf-label__m3-shell {
  border-color: var(--sjf-label-focus-color);
  box-shadow: inset 0 0 0 var(--sjf-label-focus-line-width)
    color-mix(in srgb, var(--sjf-label-focus-color) 28%, transparent);
}

.sjf-label.is-error .sjf-label__m3-shell {
  border-color: var(--sjf-label-error-color);
}

.sjf-label__m3-caption {
  position: absolute;
  inset-inline-start: var(--sjf-label-padding-x);
  top: 50%;
  transform: translateY(-50%);
  max-width: calc(100% - (var(--sjf-label-padding-x) * 2));
  padding-inline: 0;
  background: transparent;
  pointer-events: none;
  transition:
    top 150ms ease,
    transform 150ms ease,
    color 150ms ease,
    font-size 150ms ease,
    padding-inline 150ms ease,
    background-color 150ms ease;
}

.sjf-label__m3-caption.is-shrunk {
  top: 0;
  transform: translateY(-50%);
  padding-inline: var(--sjf-label-caption-padding-x);
  background: var(--sjf-label-surface);
}

.sjf-label.is-focused .sjf-label__m3-caption {
  color: var(--sjf-label-focus-color);
}

.sjf-label.is-error .sjf-label__m3-caption {
  color: var(--sjf-label-error-color);
}

.sjf-label__helper-offset {
  padding-inline: var(--sjf-label-padding-x);
}

.sjf-label__box {
  display: grid;
  overflow: hidden;
  border: var(--sjf-label-line-width) solid var(--sjf-label-border-color);
  border-radius: var(--sjf-label-radius);
  background: var(--sjf-label-surface);
  transition: border-color 150ms ease;
}

.sjf-label__box--horizontal {
  grid-template-columns: minmax(0, var(--sjf-label-width)) minmax(0, 1fr);
}

.sjf-label__box--vertical {
  grid-template-columns: 1fr;
}

.sjf-label__box-label {
  min-height: var(--sjf-label-control-height);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-inline: var(--sjf-label-padding-x);
  padding-block: var(--sjf-label-padding-y);
  background: var(--sjf-label-box-label-surface);
  border-inline-end: var(--sjf-label-line-width) solid var(--sjf-label-border-color);
}

.sjf-label__box-label--vertical {
  border-inline-end: 0;
  border-block-end: var(--sjf-label-line-width) solid var(--sjf-label-border-color);
}

.sjf-label__box-content {
  min-height: var(--sjf-label-control-height);
  box-sizing: border-box;
  justify-content: center;
  padding-inline: var(--sjf-label-padding-x);
  padding-block: var(--sjf-label-padding-y);
}

.sjf-label.is-form-box-group .sjf-label__box-label,
.sjf-label.is-form-box-group .sjf-label__box-content {
  border: 0;
  border-radius: 0;
}

.sjf-label.is-form-box-group .sjf-label__box-content {
  background: var(--sjf-label-surface);
}

.sjf-label.is-focused .sjf-label__box {
  border-color: var(--sjf-label-focus-color);
}

.sjf-label.is-error .sjf-label__box {
  border-color: var(--sjf-label-error-color);
}

.sjf-label.is-disabled {
  opacity: 0.64;
}
</style>
