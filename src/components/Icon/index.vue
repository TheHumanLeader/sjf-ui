<template>
  <span
    class="sjf-icon"
    :class="iconClasses"
    :style="iconStyle"
    :data-type="props.type"
    :data-variant="props.variant"
    :data-size="effectiveSize"
    :role="accessibleLabel ? 'img' : undefined"
    :aria-label="accessibleLabel"
    :aria-hidden="accessibleLabel ? undefined : true"
  >{{ props.name }}</span>
</template>

<script setup vapor lang="ts">
import '@material-symbols/font-400'
import { computed } from 'vue'
import { resolveSjfSizeRecipe, useSjfBaseSize } from '../../core/size'
import { SJF_ICON_SIZE_RECIPE, type SjfIconProps } from './index'

const props = withDefaults(defineProps<SjfIconProps>(), {
  type: 'material-symbols',
  variant: 'outlined',
  filled: false,
})

const globalBaseSize = useSjfBaseSize()
const effectiveSize = computed(() => props.size ?? globalBaseSize.value)
const accessibleLabel = computed(() => props.label?.trim() || undefined)
const resolvedSize = computed(() =>
  resolveSjfSizeRecipe(effectiveSize.value, SJF_ICON_SIZE_RECIPE),
)

const iconClasses = computed(() => [
  `is-${props.type}`,
  `material-symbols-${props.variant}`,
  { 'is-filled': props.filled },
])

const iconStyle = computed(() => ({
  '--sjf-icon-size': resolvedSize.value.iconSize,
  fontVariationSettings: `'FILL' ${props.filled ? 1 : 0}`,
}))
</script>

<style scoped>
.sjf-icon {
  inline-size: var(--sjf-icon-size, 24px);
  block-size: var(--sjf-icon-size, 24px);
  aspect-ratio: 1;
  flex: none;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  overflow: hidden;
  color: inherit;
  font-size: var(--sjf-icon-size, 24px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  text-align: center;
  user-select: none;
  vertical-align: -0.125em;
}
</style>
