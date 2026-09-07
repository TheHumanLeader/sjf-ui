<template>
  <FieldShell
    v-bind="field"
    :filled="selected.length > 0 || open"
    :focused="focused || open"
  >
    <div ref="anchor" class="sjf-control sjf-select" :style="style">
      <input
        ref="input"
        v-bind="attrs"
        class="sjf-native"
        role="combobox"
        aria-autocomplete="list"
        :aria-label="props.label ?? '选择选项'"
        :aria-expanded="open"
        :aria-controls="id"
        :aria-activedescendant="
          open && cursor >= 0 ? id + '-' + cursor : undefined
        "
        :value="open && props.searchable ? query : summary"
        :placeholder="props.placeholder ?? '请选择'"
        :readonly="!props.searchable || props.readonly"
        :disabled="disabled"
        :aria-required="required"
        :aria-invalid="error || undefined"
        @click="show()"
        @input="
          ($event) => {
            query = ($event.target as HTMLInputElement).value
            show()
          }
        "
        @keydown="keydown"
        @focus="focused = true"
        @blur="focused = false"
      />
      <button
        v-if="
          props.clearable && selected.length && !disabled && !props.readonly
        "
        type="button"
        aria-label="清空选择"
        @mousedown.prevent
        @click="
          () => {
            model = props.multiple ? [] : null
            input?.focus()
          }
        "
      >
        <SJFIcon name="close" size="mn" />
      </button>
      <button
        type="button"
        :aria-label="open ? '收起选项' : '展开选项'"
        :disabled="disabled || props.readonly"
        :aria-expanded="open"
        @click="
          () => {
            open ? close() : show()
            input?.focus()
          }
        "
      >
        <SJFIcon name="expand_more" :size="size" />
      </button>
      <input
        v-for="(value, index) in selected"
        :key="index"
        type="hidden"
        :name="props.name"
        :value="value"
        :disabled="disabled"
      />
    </div>
    <Teleport v-if="mount" :to="mount"
      ><Transition name="sjf-pop"
        ><div
          v-if="open"
          :id="id"
          ref="panel"
          class="sjf-control sjf-panel sjf-select-panel"
          :style="style"
          role="listbox"
          :aria-label="props.label ?? '选项'"
          :aria-multiselectable="props.multiple || undefined"
        >
          <div
            v-for="(option, index) in filtered"
            :id="id + '-' + index"
            :key="option.value"
            role="option"
            :aria-selected="selected.includes(option.value)"
            :aria-disabled="option.disabled || undefined"
            class="sjf-select-option"
            :class="{
              'is-current': cursor === index,
              'is-selected': selected.includes(option.value),
            }"
            @pointerdown.prevent
            @mouseenter="cursor = index"
            @click="choose(option)"
          >
            <SJFIcon
              v-if="option.icon"
              :name="option.icon"
              :size="size"
            /><span>{{ option.label }}</span
            ><SJFIcon
              v-if="selected.includes(option.value)"
              name="check"
              :size="size"
            />
          </div>
          <div v-if="!filtered.length" class="sjf-select-empty">
            {{ props.emptyText ?? '没有匹配选项' }}
          </div>
        </div></Transition
      ></Teleport
    >
  </FieldShell>
</template>
<script setup vapor lang="ts">
import { computed, ref, useAttrs, useId, watch, nextTick } from 'vue'
import FieldShell from '../shared/FieldShell.vue'
import SJFIcon from '../Icon/index.vue'
import { useSjfControl, useSjfValue, type SjfValue } from '../shared/control'
import { useSjfFloating } from '../shared/floating'
import type { SjfSelectProps, SjfSelectOption } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfSelectProps>(), {
  disabled: undefined,
  required: undefined,
  error: undefined,
})
const emit = defineEmits<{
  'update:modelValue': [value: SjfValue | SjfValue[] | null]
  change: [value: SjfValue | SjfValue[] | null]
}>()
const { style, field, size, disabled, required, error } = useSjfControl(props)
const attrs = useAttrs(),
  id = 'sjf-select-' + useId()
const model = useSjfValue<SjfValue | SjfValue[] | null>(
  () => props.modelValue,
  (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
  props.multiple ? [] : null,
)
const selected = computed<SjfValue[]>(() =>
  Array.isArray(model.value)
    ? model.value
    : model.value === null
      ? []
      : [model.value],
)
const summary = computed(() =>
  selected.value
    .map(
      (value) =>
        props.options?.find((o) => o.value === value)?.label ?? String(value),
    )
    .join('、'),
)
const open = ref(false),
  focused = ref(false),
  query = ref(''),
  cursor = ref(-1)
const anchor = ref<HTMLElement | null>(null),
  panel = ref<HTMLElement | null>(null),
  input = ref<HTMLInputElement | null>(null)
const filtered = computed(() =>
  (props.options ?? []).filter((option) =>
    option.label.toLocaleLowerCase().includes(query.value.toLocaleLowerCase()),
  ),
)
const { mount } = useSjfFloating(open, anchor, panel, close, () => ({
  matchWidth: true,
}))
watch(filtered, () => {
  cursor.value = filtered.value.findIndex((o) => !o.disabled)
})
watch(disabled, (value) => {
  if (value) close()
})
function close() {
  open.value = false
  query.value = ''
}
function show() {
  if (disabled.value || props.readonly) return
  if (!open.value) {
    open.value = true
    cursor.value = filtered.value.findIndex(
      (o) => selected.value.includes(o.value) && !o.disabled,
    )
    if (cursor.value < 0)
      cursor.value = filtered.value.findIndex((o) => !o.disabled)
  }
}
function choose(option: SjfSelectOption) {
  if (disabled.value || props.readonly || option.disabled) return
  model.value = props.multiple
    ? selected.value.includes(option.value)
      ? selected.value.filter((v) => v !== option.value)
      : [...selected.value, option.value]
    : option.value
  if (!props.multiple) close()
  input.value?.focus()
}
function keydown(event: KeyboardEvent) {
  if (disabled.value || props.readonly) return
  if (event.key === 'Tab') {
    close()
    return
  }
  if (event.key === 'Escape') {
    close()
    return
  }
  if (event.key === 'Enter') {
    event.preventDefault()
    if (!open.value) {
      show()
      return
    }
    const option = filtered.value[cursor.value]
    if (option) choose(option)
    return
  }
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
  if (!open.value && !event.key.startsWith('Arrow')) return
  event.preventDefault()
  const wasOpen = open.value
  show()
  const indices = filtered.value
    .map((o, i) => (o.disabled ? -1 : i))
    .filter((i) => i >= 0)
  if (!indices.length) return
  if (!wasOpen) {
    if (event.key === 'ArrowUp' && !selected.value.length)
      cursor.value = indices.at(-1)!
    return
  }
  const at = indices.indexOf(cursor.value)
  cursor.value =
    event.key === 'Home'
      ? indices[0]
      : event.key === 'End'
        ? indices.at(-1)!
        : indices[
            (at + (event.key === 'ArrowUp' ? -1 : 1) + indices.length) %
              indices.length
          ]
  void nextTick(() =>
    panel.value
      ?.querySelector('#' + CSS.escape(id + '-' + cursor.value))
      ?.scrollIntoView({ block: 'nearest' }),
  )
}
</script>
<style scoped>
.sjf-select {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  width: 100%;
  min-width: 0;
}
.sjf-select button {
  flex: none;
  display: grid;
  place-items: center;
}
.sjf-select-panel {
  max-height: min(320px, 60vh);
  min-width: 12rem;
}
.sjf-select-option {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  min-height: var(--sjf-c-h);
  padding: var(--sjf-c-gap);
  border-radius: var(--sjf-c-rd);
  cursor: pointer;
}
.sjf-select-option > span:not(.sjf-icon) {
  flex: 1;
}
.sjf-select-option.is-current {
  background: var(--md-sys-color-surface-container);
}
.sjf-select-option.is-selected {
  color: var(--md-sys-color-primary);
  background: var(--md-sys-color-primary-container);
}
.sjf-select-option[aria-disabled='true'] {
  opacity: 0.4;
  cursor: not-allowed;
}
.sjf-select-empty {
  padding: var(--sjf-c-pd);
  color: var(--md-sys-color-on-surface-variant);
}
</style>
