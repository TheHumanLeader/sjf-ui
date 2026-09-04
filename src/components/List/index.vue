<template>
  <div
    class="sjf-list-frame"
    :class="{
      'has-height': hasBoundedHeight,
      'is-horizontal': props.horizontal,
      'is-vertical': !props.horizontal,
    }"
    :style="rootStyle"
  >
    <button
      v-if="hasBoundedHeight"
      class="sjf-list__pager is-previous"
      type="button"
      :disabled="!canPageBackward"
      :aria-label="props.horizontal ? '向左翻一页' : '向上翻一页'"
      @click="scrollPage(-1)"
    >
      <SJFIcon
        :name="props.horizontal ? 'chevron_left' : 'keyboard_arrow_up'"
        size="sm"
      />
    </button>

    <div
      v-bind="$attrs"
      ref="listViewport"
      class="sjf-list"
      :class="{
        'is-bounded': hasBoundedHeight,
        'is-horizontal': props.horizontal,
        'is-multiple': props.multiple,
      }"
      :data-size="effectiveSize"
      :data-type="resolvedType"
      :data-orientation="props.horizontal ? 'horizontal' : 'vertical'"
      :role="resolvedRole"
      :aria-label="props.ariaLabel"
      :aria-orientation="orientation"
      :aria-multiselectable="supportsMultiSelect ? Boolean(props.multiple) : undefined"
      @scroll.passive="updatePagingState"
      @wheel="handleWheel"
      @pointerdown="cancelScroll"
      @touchstart.passive="cancelScroll"
      @keydown="cancelScroll"
    >
      <div
        v-if="!props.multiple"
        class="sjf-list__active-indicator"
        :class="{
          'is-visible': activeIndicatorVisible,
          'is-ready': activeIndicatorReady,
        }"
        :style="activeIndicatorStyle"
        aria-hidden="true"
      ></div>

      <slot v-if="slots.default" />

      <template v-else>
        <template
          v-for="(item, index) in resolvedList"
          :key="getRenderKey(item, index)"
        >
          <slot
            name="item"
            :item="item"
            :index="index"
            :value="getItemValue(item, index)"
            :active="isActive(getItemValue(item, index))"
            :select="() => select(getItemValue(item, index))"
          >
            <SJFItem
              :title="getItemText(item, itemTitleField, index)"
              :subtitle="getItemText(item, itemSubtitleField, index)"
              :icon="getItemText(item, itemIconField, index)"
              :value="getItemValue(item, index)"
              :active="isActive(getItemValue(item, index))"
              :disabled="getItemDisabled(item, index)"
            />
          </slot>
        </template>
      </template>
    </div>

    <button
      v-if="hasBoundedHeight"
      class="sjf-list__pager is-next"
      type="button"
      :disabled="!canPageForward"
      :aria-label="props.horizontal ? '向右翻一页' : '向下翻一页'"
      @click="scrollPage(1)"
    >
      <SJFIcon
        :name="props.horizontal ? 'chevron_right' : 'keyboard_arrow_down'"
        size="sm"
      />
    </button>
  </div>
</template>

<script setup vapor lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  watch,
  type CSSProperties,
} from 'vue'
import { useSjfBaseSize } from '../../core/size'
import SJFIcon from '../Icon/index.vue'
import SJFItem from '../Item/index.vue'
import { SJF_LIST_CONTEXT_KEY } from './context'
import { createSjfListScroll, getSjfListWheelDelta } from './scroll'
import {
  getSjfListItemRole,
  getSjfListRole,
  resolveSjfListItemField,
  type SjfListItemField,
  type SjfListModelValue,
  type SjfListProps,
  type SjfListRole,
  type SjfListSelectPayload,
  type SjfListType,
} from './index'

defineOptions({ inheritAttrs: false })

const props = defineProps<SjfListProps>()
const emit = defineEmits<{
  'update:modelValue': [value: SjfListModelValue]
  select: [payload: SjfListSelectPayload]
}>()
const slots = defineSlots<{
  default?: () => unknown
  item?: (props: {
    item: unknown
    index: number
    value: unknown
    active: boolean
    select: () => boolean
  }) => unknown
}>()

const globalBaseSize = useSjfBaseSize()
const uncontrolledValue = shallowRef<SjfListModelValue>(props.multiple ? [] : null)
const listViewport = ref<HTMLElement | null>(null)
const canPageBackward = ref(false)
const canPageForward = ref(false)
const activeIndicatorVisible = ref(false)
const activeIndicatorReady = ref(false)
const activeIndicatorStyle = shallowRef<Record<string, string>>({})
let activeIndicatorWasPositioned = false
let activeIndicatorReadyFrame: number | undefined
let resizeObserver: ResizeObserver | undefined
let mutationObserver: MutationObserver | undefined

const resolvedList = computed(() => props.list ?? [])
const resolvedType = computed<SjfListType>(() => props.type ?? 'list')
const resolvedRole = computed<SjfListRole>(() => getSjfListRole(resolvedType.value))
const effectiveSize = computed(() => props.size ?? globalBaseSize.value)
const resolvedActiveColor = computed(() =>
  props.activeColor?.trim() || 'var(--md-sys-color-primary)',
)
const itemRole = computed(() => getSjfListItemRole(resolvedType.value))
const orientation = computed(() => props.horizontal ? 'horizontal' : 'vertical')
const supportsMultiSelect = computed(() =>
  resolvedRole.value === 'listbox' || resolvedRole.value === 'tree',
)
const resolvedHeight = computed(() => {
  if (typeof props.height === 'number') {
    return Number.isFinite(props.height) && props.height > 0 ? `${props.height}px` : undefined
  }
  return props.height?.trim() || undefined
})
const hasBoundedHeight = computed(() => Boolean(resolvedHeight.value))
const currentValue = computed(() =>
  props.modelValue === undefined ? uncontrolledValue.value : props.modelValue,
)

const itemTitleField = computed<SjfListItemField>(() => props.itemTitle ?? 'title')
const itemSubtitleField = computed<SjfListItemField>(() => props.itemSubtitle ?? 'subtitle')
const itemIconField = computed<SjfListItemField>(() => props.itemIcon ?? 'icon')
const itemValueField = computed<SjfListItemField>(() => props.itemValue ?? 'value')
const itemDisabledField = computed<SjfListItemField>(() => props.itemDisabled ?? 'disabled')

const rootStyle = computed<CSSProperties>(() => ({
  '--sjf-list-active-color': resolvedActiveColor.value,
  ...(resolvedHeight.value ? { '--sjf-list-height': resolvedHeight.value } : {}),
}))

function updatePagingState(): void {
  const viewport = listViewport.value
  if (!viewport || !hasBoundedHeight.value) {
    canPageBackward.value = false
    canPageForward.value = false
    return
  }

  const position = props.horizontal ? viewport.scrollLeft : viewport.scrollTop
  const viewportSize = props.horizontal ? viewport.clientWidth : viewport.clientHeight
  const scrollSize = props.horizontal ? viewport.scrollWidth : viewport.scrollHeight

  canPageBackward.value = position > 1
  canPageForward.value = position + viewportSize < scrollSize - 1
}

function updateActiveIndicator(): void {
  const viewport = listViewport.value
  if (!viewport || props.multiple) {
    resetActiveIndicator()
    return
  }

  const item = viewport.querySelector<HTMLElement>('.sjf-item[data-active="true"]')
  if (!item) {
    resetActiveIndicator()
    return
  }

  const viewportRect = viewport.getBoundingClientRect()
  const itemRect = item.getBoundingClientRect()
  const x = itemRect.left - viewportRect.left + viewport.scrollLeft
  const y = itemRect.top - viewportRect.top + viewport.scrollTop
  const radius = typeof getComputedStyle === 'undefined'
    ? 'var(--sjf-rd-sm, 6px)'
    : getComputedStyle(item).borderRadius

  const nextStyle = {
    '--sjf-list-active-x': `${x}px`,
    '--sjf-list-active-y': `${y}px`,
    '--sjf-list-active-width': `${itemRect.width}px`,
    '--sjf-list-active-height': `${itemRect.height}px`,
    '--sjf-list-active-radius': radius || 'var(--sjf-rd-sm, 6px)',
  }

  if (!sameStyleRecord(activeIndicatorStyle.value, nextStyle)) {
    activeIndicatorStyle.value = nextStyle
  }
  activeIndicatorVisible.value = true

  if (!activeIndicatorWasPositioned) {
    activeIndicatorWasPositioned = true
    activeIndicatorReady.value = false
    if (activeIndicatorReadyFrame !== undefined) cancelAnimationFrame(activeIndicatorReadyFrame)
    activeIndicatorReadyFrame = requestAnimationFrame(() => {
      activeIndicatorReadyFrame = undefined
      activeIndicatorReady.value = true
    })
  }
}

function sameStyleRecord(
  current: Record<string, string>,
  next: Record<string, string>,
): boolean {
  const keys = Object.keys(next)
  return keys.length === Object.keys(current).length
    && keys.every((key) => current[key] === next[key])
}

function resetActiveIndicator(): void {
  activeIndicatorVisible.value = false
  activeIndicatorReady.value = false
  activeIndicatorWasPositioned = false
  if (activeIndicatorReadyFrame !== undefined) {
    cancelAnimationFrame(activeIndicatorReadyFrame)
    activeIndicatorReadyFrame = undefined
  }
}

function updateLayoutState(): void {
  updatePagingState()
  updateActiveIndicator()
}

function scrollPage(direction: -1 | 1): void {
  const viewport = listViewport.value
  if (!viewport) return

  const distance = props.horizontal ? viewport.clientWidth : viewport.clientHeight
  smoothScroll.moveBy(direction * distance, scrollDuration('page'))
}

const smoothScroll = createSjfListScroll({
  read: () => {
    const viewport = listViewport.value
    return (props.horizontal ? viewport?.scrollLeft : viewport?.scrollTop) ?? 0
  },
  write: (position) => {
    const viewport = listViewport.value
    if (!viewport) return
    // Each frame is already eased; avoid a second, browser-controlled animation.
    viewport.scrollTo({
      ...(props.horizontal ? { left: position } : { top: position }),
      behavior: 'instant',
    })
    updatePagingState()
  },
  max: () => {
    const viewport = listViewport.value
    if (!viewport) return 0
    return props.horizontal
      ? viewport.scrollWidth - viewport.clientWidth
      : viewport.scrollHeight - viewport.clientHeight
  },
  now: () => performance.now(),
  requestFrame: (callback) => requestAnimationFrame(callback),
  cancelFrame: (id) => cancelAnimationFrame(id),
})

function cancelScroll(): void {
  smoothScroll.cancel()
}

function scrollDuration(input: 'page' | 'wheel'): number {
  // Keep a short, functional transition in reduced-motion mode, without effects.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return input === 'page' ? (reduced ? 180 : 320) : (reduced ? 120 : 160)
}

function handleWheel(event: WheelEvent): void {
  if (event.defaultPrevented) return
  const viewport = listViewport.value
  if (!viewport || (!hasBoundedHeight.value && !props.horizontal)) return
  if (event.ctrlKey || !event.cancelable) {
    cancelScroll()
    return
  }

  const pageSize = props.horizontal ? viewport.clientWidth : viewport.clientHeight
  const delta = getSjfListWheelDelta(event, Boolean(props.horizontal), pageSize)
  if (delta === 0) {
    cancelScroll()
    return
  }
  if (smoothScroll.moveBy(delta, scrollDuration('wheel'))) event.preventDefault()
}

watch(
  () => [props.horizontal, props.height, props.multiple, effectiveSize.value],
  () => {
    cancelScroll()
    void nextTick(updateLayoutState)
  },
)

watch(
  currentValue,
  () => {
    void nextTick(updateActiveIndicator)
  },
  { deep: true },
)

watch(
  resolvedList,
  () => {
    void nextTick(updateLayoutState)
  },
  { deep: true },
)

function isActive(value: unknown): boolean {
  const current = currentValue.value
  return Array.isArray(current)
    ? current.some((selected) => Object.is(selected, value))
    : Object.is(current, value)
}

function select(value: unknown): boolean {
  const wasActive = isActive(value)
  let next: SjfListModelValue
  let active: boolean

  if (props.multiple) {
    const values = Array.isArray(currentValue.value)
      ? [...currentValue.value]
      : currentValue.value == null
        ? []
        : [currentValue.value]

    next = wasActive
      ? values.filter((selected) => !Object.is(selected, value))
      : [...values, value]
    active = !wasActive
  } else {
    next = value
    active = true
  }

  if (props.modelValue === undefined) uncontrolledValue.value = next
  emit('update:modelValue', next)

  const index = resolvedList.value.findIndex((item, itemIndex) =>
    Object.is(getItemValue(item, itemIndex), value),
  )
  emit('select', {
    value,
    active,
    ...(index >= 0 ? { item: resolvedList.value[index], index } : {}),
  })
  return active
}

function getItemValue(item: unknown, index: number): unknown {
  return resolveSjfListItemField(item, itemValueField.value, index) ?? index
}

function getItemText(item: unknown, field: SjfListItemField, index: number): string | undefined {
  const value = resolveSjfListItemField(item, field, index)
  return value === null || value === undefined ? undefined : String(value)
}

function getItemDisabled(item: unknown, index: number): boolean {
  return Boolean(resolveSjfListItemField(item, itemDisabledField.value, index))
}

function getRenderKey(item: unknown, index: number): string | number | symbol {
  const value = getItemValue(item, index)
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol'
    ? value
    : index
}

provide(SJF_LIST_CONTEXT_KEY, {
  size: effectiveSize,
  activeColor: resolvedActiveColor,
  itemRole,
  isActive,
  select,
})

onMounted(() => {
  void nextTick(updateLayoutState)

  if (listViewport.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(updateLayoutState)
    resizeObserver.observe(listViewport.value)
  }

  if (listViewport.value && typeof MutationObserver !== 'undefined') {
    mutationObserver = new MutationObserver(updateLayoutState)
    mutationObserver.observe(listViewport.value, {
      attributes: true,
      attributeFilter: ['data-active'],
      childList: true,
      characterData: true,
      subtree: true,
    })
  }
})

onBeforeUnmount(() => {
  cancelScroll()
  resetActiveIndicator()
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
})
</script>

<style scoped>
.sjf-list-frame {
  min-width: 0;
  max-width: 100%;
}

.sjf-list-frame.has-height {
  block-size: var(--sjf-list-height);
  overflow: hidden;
}

.sjf-list-frame.has-height.is-vertical {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.sjf-list-frame.has-height.is-horizontal {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: stretch;
}

.sjf-list {
  --sjf-item-inline-size: 100%;

  position: relative;
  min-width: 0;
  display: grid;
  align-content: start;
  gap: 2px;
  color: var(--md-sys-color-on-surface);
}

.sjf-list :deep(.sjf-item) {
  position: relative;
  z-index: 1;
}

.sjf-list__active-indicator {
  position: absolute;
  inset: 0 auto auto 0;
  z-index: 0;
  width: var(--sjf-list-active-width, 0px);
  height: var(--sjf-list-active-height, 0px);
  border-radius: var(--sjf-list-active-radius, var(--sjf-rd-sm, 6px));
  background: color-mix(
    in srgb,
    var(--sjf-list-active-color, var(--md-sys-color-primary)) 14%,
    transparent
  );
  opacity: 0;
  pointer-events: none;
  transform: translate3d(
    var(--sjf-list-active-x, 0px),
    var(--sjf-list-active-y, 0px),
    0
  );
  transition: opacity var(--sjf-motion-fast, 120ms) var(--sjf-motion-ease-standard, ease);
}

.sjf-list__active-indicator.is-visible {
  opacity: 1;
}

.sjf-list__active-indicator.is-ready {
  transition:
    transform var(--sjf-motion-slow, 260ms) var(--sjf-motion-ease-standard, ease),
    width var(--sjf-motion-normal, 180ms) var(--sjf-motion-ease-standard, ease),
    height var(--sjf-motion-normal, 180ms) var(--sjf-motion-ease-standard, ease),
    border-radius var(--sjf-motion-normal, 180ms) var(--sjf-motion-ease-standard, ease),
    opacity var(--sjf-motion-fast, 120ms) var(--sjf-motion-ease-standard, ease);
}

.sjf-list:not(.is-multiple) :deep(.sjf-item.is-active) {
  background: transparent;
}

.sjf-list.is-multiple :deep(.sjf-item) {
  overflow: hidden;
  isolation: isolate;
}

.sjf-list.is-multiple :deep(.sjf-item)::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: color-mix(
    in srgb,
    var(--sjf-list-active-color, var(--md-sys-color-primary)) 14%,
    transparent
  );
  opacity: 0;
  pointer-events: none;
  transform: scale(0.08);
  transform-origin: center;
  transition:
    transform var(--sjf-motion-leave, 160ms) var(--sjf-motion-ease-leave, ease),
    opacity var(--sjf-motion-leave, 160ms) var(--sjf-motion-ease-leave, ease);
}

.sjf-list.is-multiple :deep(.sjf-item > *) {
  position: relative;
  z-index: 1;
}

.sjf-list.is-multiple :deep(.sjf-item.is-active) {
  background: transparent;
}

.sjf-list.is-multiple :deep(.sjf-item.is-active)::before {
  opacity: 1;
  transform: scale(1);
  transition:
    transform var(--sjf-motion-enter, 220ms) var(--sjf-motion-ease-enter, ease),
    opacity var(--sjf-motion-enter, 220ms) var(--sjf-motion-ease-enter, ease);
}

.sjf-list.is-bounded {
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

.sjf-list.is-bounded::-webkit-scrollbar {
  display: none;
}

.sjf-list.is-horizontal {
  --sjf-item-inline-size: max-content;

  display: flex;
  align-items: stretch;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
}

.sjf-list.is-horizontal :deep(.sjf-item) {
  flex: none;
}

.sjf-list.is-horizontal.is-bounded {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.sjf-list__pager {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  border-radius: var(--sjf-rd-sm, 6px);
  color: var(--md-sys-color-on-surface-variant);
  background: color-mix(in srgb, var(--md-sys-color-surface-container) 76%, transparent);
  transition:
    color var(--sjf-motion-fast, 120ms) var(--sjf-motion-ease-standard, ease),
    background-color var(--sjf-motion-fast, 120ms) var(--sjf-motion-ease-standard, ease);
}

.sjf-list-frame.is-vertical > .sjf-list__pager {
  width: 100%;
  min-height: 24px;
}

.sjf-list-frame.is-horizontal > .sjf-list__pager {
  min-width: 28px;
  height: 100%;
}

.sjf-list__pager:hover:not(:disabled),
.sjf-list__pager:focus-visible {
  color: var(--sjf-list-active-color, var(--md-sys-color-primary));
  background: color-mix(
    in srgb,
    var(--sjf-list-active-color, var(--md-sys-color-primary)) 10%,
    transparent
  );
}

.sjf-list__pager:disabled {
  opacity: 0.3;
}
</style>
