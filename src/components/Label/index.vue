<template>
  <div
    class="sjf-label"
    :class="rootClasses"
    :style="sizeStyle"
    :data-mode="props.mode"
    :data-size="effectiveSize"
  >
    <template v-if="props.mode === 'm3'">
      <div class="sjf-label__stack">
        <div class="sjf-label__m3-shell">
          <div class="sjf-label__m3-content">
            <slot />
          </div>

          <LabelCaption
            v-if="hasLabel"
            class="sjf-label__m3-caption"
            :text="props.label"
            :required="props.required"
            :disabled="props.disabled"
            :error="props.error"
            :floating="true"
            :shrunk="isShrunk"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <LabelHelper
          v-if="props.helper"
          class="sjf-label__helper-offset"
          :text="props.helper"
          :error="props.error"
          :disabled="props.disabled"
        />
      </div>
    </template>

    <template v-else-if="props.mode === 'horizontal'">
      <div class="sjf-label__horizontal">
        <div v-if="hasLabel" class="sjf-label__label-cell">
          <LabelCaption
            :text="props.label"
            :required="props.required"
            :disabled="props.disabled"
            :error="props.error"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <div class="sjf-label__body">
          <slot />
          <LabelHelper
            v-if="props.helper"
            :text="props.helper"
            :error="props.error"
            :disabled="props.disabled"
          />
        </div>
      </div>
    </template>

    <template v-else-if="props.mode === 'horizontal-box'">
      <div class="sjf-label__box sjf-label__box--horizontal">
        <div v-if="hasLabel" class="sjf-label__box-label">
          <LabelCaption
            :text="props.label"
            :required="props.required"
            :disabled="props.disabled"
            :error="props.error"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <div class="sjf-label__box-content">
          <slot />
          <LabelHelper
            v-if="props.helper"
            :text="props.helper"
            :error="props.error"
            :disabled="props.disabled"
          />
        </div>
      </div>
    </template>

    <template v-else-if="props.mode === 'vertical'">
      <div class="sjf-label__stack">
        <LabelCaption
          v-if="hasLabel"
          :text="props.label"
          :required="props.required"
          :disabled="props.disabled"
          :error="props.error"
        >
          <slot name="label">{{ props.label }}</slot>
        </LabelCaption>

        <div class="sjf-label__body">
          <slot />
          <LabelHelper
            v-if="props.helper"
            :text="props.helper"
            :error="props.error"
            :disabled="props.disabled"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="sjf-label__box sjf-label__box--vertical">
        <div v-if="hasLabel" class="sjf-label__box-label sjf-label__box-label--vertical">
          <LabelCaption
            :text="props.label"
            :required="props.required"
            :disabled="props.disabled"
            :error="props.error"
          >
            <slot name="label">{{ props.label }}</slot>
          </LabelCaption>
        </div>

        <div class="sjf-label__box-content">
          <slot />
          <LabelHelper
            v-if="props.helper"
            :text="props.helper"
            :error="props.error"
            :disabled="props.disabled"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup vapor lang="ts">
import { computed } from 'vue'
import { resolveSjfSizeRecipe, useSjfBaseSize } from '../../core/size'
import { SJF_LABEL_SIZE_RECIPE, type SjfLabelProps } from './index'
import LabelCaption from './cps/LabelCaption.vue'
import LabelHelper from './cps/LabelHelper.vue'

const props = withDefaults(defineProps<SjfLabelProps>(), {
  label: '',
  mode: 'm3',
  required: false,
  disabled: false,
  error: false,
  focused: false,
  filled: false,
  helper: '',
})

const slots = defineSlots<{
  default?: () => unknown
  label?: () => unknown
}>()

const globalBaseSize = useSjfBaseSize()
const effectiveSize = computed(() => props.size ?? globalBaseSize.value)
const hasLabel = computed(() => Boolean(props.label || slots.label))
const isShrunk = computed(() => props.focused || props.filled)

const resolvedSize = computed(() =>
  resolveSjfSizeRecipe(effectiveSize.value, SJF_LABEL_SIZE_RECIPE),
)

const sizeStyle = computed(() => ({
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
}))

const rootClasses = computed(() => ({
  'is-required': props.required,
  'is-disabled': props.disabled,
  'is-error': props.error,
  'is-focused': props.focused,
  'is-filled': props.filled,
  'is-box': props.mode.includes('box'),
}))
</script>

<style scoped>
.sjf-label {
  --sjf-label-color: var(--md-sys-color-on-surface, #1d1b20);
  --sjf-label-muted-color: var(--md-sys-color-on-surface-variant, #49454f);
  --sjf-label-border-color: var(--md-sys-color-outline-variant, #cac4d0);
  --sjf-label-focus-color: var(--md-sys-color-primary, #4f64d9);
  --sjf-label-error-color: var(--md-sys-color-error, #ba1a1a);
  --sjf-label-surface: var(--md-sys-color-surface, #fff);
  --sjf-label-box-label-surface: color-mix(
    in srgb,
    var(--md-sys-color-surface-container, #f3edf7) 52%,
    var(--md-sys-color-surface, #fff)
  );
  --sjf-control-embedded: 0;

  color: var(--sjf-label-color);
  font-size: var(--sjf-label-font-size);
}

.sjf-label.is-box {
  --sjf-control-embedded: 1;
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
  box-shadow: inset 0 0 0 var(--sjf-label-focus-line-width) color-mix(in srgb, var(--sjf-label-focus-color) 28%, transparent);
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
