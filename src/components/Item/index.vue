<template>
  <button
    class="sjf-item"
    :class="{ 'is-active': resolvedActive, 'has-subtitle': hasSubtitle }"
    :style="rootStyle"
    :data-active="resolvedActive || undefined"
    :data-size="effectiveSize"
    :role="itemRole"
    :disabled="props.disabled"
    :aria-selected="ariaSelected"
    :aria-current="ariaCurrent"
    type="button"
    @click="handleClick"
  >
    <span
      v-if="hasPrepend"
      class="sjf-item__prepend"
      :class="{ 'is-icon-box': Boolean(props.icon) && !slots.prepend }"
      aria-hidden="true"
    >
      <slot name="prepend">
        <SJFIcon v-if="props.icon" :name="props.icon" :size="effectiveSize" />
      </slot>
    </span>

    <span class="sjf-item__content">
      <slot name="content">
        <slot>
          <span v-if="props.title" class="sjf-item__title">{{ props.title }}</span>
          <span v-if="props.subtitle" class="sjf-item__subtitle">{{ props.subtitle }}</span>
        </slot>
      </slot>
    </span>

    <span v-if="slots.append" class="sjf-item__append">
      <slot name="append" />
    </span>
  </button>
</template>

<script setup vapor lang="ts">
import { computed, type CSSProperties } from 'vue'
import { resolveSjfSizeRecipe, useSjfBaseSize } from '../../core/size'
import SJFIcon from '../Icon/index.vue'
import { useSjfListContext } from '../List/context'
import { SJF_ITEM_SIZE_RECIPE, type SjfItemProps } from './index'

const props = withDefaults(defineProps<SjfItemProps>(), {
  active: null,
})
const emit = defineEmits<{
  'update:active': [active: boolean]
  click: [event: MouseEvent]
  select: [active: boolean, event: MouseEvent]
}>()
const slots = defineSlots<{
  default?: () => unknown
  prepend?: () => unknown
  content?: () => unknown
  append?: () => unknown
}>()

const list = useSjfListContext()
const globalBaseSize = useSjfBaseSize()

const effectiveSize = computed(() => props.size ?? list?.size.value ?? globalBaseSize.value)
const resolvedActive = computed(() =>
  props.active !== null
    ? props.active
    : (props.value !== undefined && list ? list.isActive(props.value) : false),
)
const itemRole = computed(() => list?.itemRole.value)
const hasPrepend = computed(() => Boolean(slots.prepend || props.icon))
const hasSubtitle = computed(() => Boolean(props.subtitle))
const resolvedSize = computed(() =>
  resolveSjfSizeRecipe(effectiveSize.value, SJF_ITEM_SIZE_RECIPE),
)
const ariaSelected = computed(() =>
  itemRole.value === 'option' || itemRole.value === 'tab' || itemRole.value === 'treeitem'
    ? resolvedActive.value
    : undefined,
)
const ariaCurrent = computed(() =>
  itemRole.value === 'menuitem' && resolvedActive.value ? 'page' : undefined,
)

const rootStyle = computed<CSSProperties>(() => ({
  '--sjf-item-min-height': resolvedSize.value.minHeight,
  '--sjf-item-padding-x': resolvedSize.value.paddingX,
  '--sjf-item-padding-y': resolvedSize.value.paddingY,
  '--sjf-item-gap': resolvedSize.value.gap,
  '--sjf-item-radius': resolvedSize.value.radius,
  '--sjf-item-title-font-size': resolvedSize.value.titleFontSize,
  '--sjf-item-subtitle-font-size': resolvedSize.value.subtitleFontSize,
  '--sjf-icon-size': resolvedSize.value.iconSize,
  ...(props.activeColor?.trim()
    ? { '--sjf-list-active-color': props.activeColor.trim() }
    : {}),
}))

function handleClick(event: MouseEvent): void {
  emit('click', event)
  if (props.disabled) return

  const active = props.value !== undefined && list
    ? list.select(props.value)
    : !resolvedActive.value

  emit('update:active', active)
  emit('select', active, event)
}
</script>

<style scoped>
.sjf-item {
  width: var(--sjf-item-inline-size, 100%);
  min-width: 0;
  min-height: var(--sjf-item-min-height, 40px);
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--sjf-item-gap, 8px);
  padding: var(--sjf-item-padding-y, 4px) var(--sjf-item-padding-x, 8px);
  border-radius: var(--sjf-item-radius, 6px);
  color: inherit;
  text-align: left;
  transition:
    color var(--sjf-motion-duration-short, 120ms) var(--sjf-motion-easing-standard, ease),
    background-color var(--sjf-motion-duration-short, 120ms) var(--sjf-motion-easing-standard, ease);
}

.sjf-item:hover:not(:disabled) {
  background: color-mix(in srgb, currentColor 7%, transparent);
}

.sjf-item:focus-visible {
  box-shadow: inset 0 0 0 2px var(--sjf-list-active-color, var(--md-sys-color-primary));
}

.sjf-item.is-active {
  color: var(--sjf-list-active-color, var(--md-sys-color-primary));
  background: color-mix(
    in srgb,
    var(--sjf-list-active-color, var(--md-sys-color-primary)) 14%,
    transparent
  );
}

.sjf-item:disabled {
  opacity: 0.38;
}

.sjf-item__prepend,
.sjf-item__append {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.sjf-item__prepend.is-icon-box {
  inline-size: var(--sjf-icon-size, 24px);
  block-size: var(--sjf-icon-size, 24px);
}

.sjf-item__content {
  min-width: 0;
  display: grid;
  align-content: center;
  gap: 2px;
}

.sjf-item__title,
.sjf-item__subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sjf-item__title {
  font-size: var(--sjf-item-title-font-size, 14px);
  font-weight: 650;
  line-height: 1.35;
}

.sjf-item__subtitle {
  color: color-mix(in srgb, currentColor 72%, transparent);
  font-size: var(--sjf-item-subtitle-font-size, 12px);
  line-height: 1.35;
}

.sjf-item__append {
  justify-self: end;
  color: color-mix(in srgb, currentColor 72%, transparent);
}
</style>
