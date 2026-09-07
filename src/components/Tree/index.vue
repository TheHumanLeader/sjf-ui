<template>
  <ul
    class="sjf-control sjf-tree"
    :style="style"
    role="tree"
    :aria-label="props.label ?? '树形列表'"
    :aria-multiselectable="props.multiple || undefined"
  >
    <TreeNode
      v-for="node in props.nodes"
      :key="node.value"
      :node="node"
      :root-id="id"
      :level="1"
      :size="size"
      :selected="selected"
      :expanded="expanded"
      :focus-value="actualFocus"
      @select="select"
      @toggle="toggle"
      @focus="focusValue = $event"
      @key="keydown"
    />
  </ul>
</template>
<script setup vapor lang="ts">
import { computed, ref, useId, nextTick } from 'vue'
import TreeNode from './cps/TreeNode.vue'
import { useSjfControl, useSjfValue, type SjfValue } from '../shared/control'
import type { SjfTreeProps, SjfTreeNode } from './index'
const props = defineProps<SjfTreeProps>()
const emit = defineEmits<{
  'update:modelValue': [value: SjfValue | SjfValue[] | null]
  'update:expanded': [value: SjfValue[]]
  select: [node: SjfTreeNode]
}>()
const { style, size } = useSjfControl(props)
const id = 'sjf-tree-' + useId(),
  focusValue = ref<SjfValue | null>(null)
const model = useSjfValue<SjfValue | SjfValue[] | null>(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  props.multiple ? [] : null,
)
const expanded = useSjfValue<SjfValue[]>(
  () => props.expanded,
  (v) => emit('update:expanded', v),
  [],
)
const selected = computed(() =>
  Array.isArray(model.value)
    ? model.value
    : model.value === null
      ? []
      : [model.value],
)
const visible = computed(() => {
  const rows: { node: SjfTreeNode; parent: SjfTreeNode | null }[] = []
  function walk(nodes: readonly SjfTreeNode[], parent: SjfTreeNode | null) {
    nodes.forEach((node) => {
      rows.push({ node, parent })
      if (expanded.value.includes(node.value) && node.children)
        walk(node.children, node)
    })
  }
  walk(props.nodes, null)
  return rows
})
const actualFocus = computed(() =>
  visible.value.some(
    (r) => r.node.value === focusValue.value && !r.node.disabled,
  )
    ? focusValue.value
    : (visible.value.find((r) => !r.node.disabled)?.node.value ?? null),
)
function select(node: SjfTreeNode) {
  if (node.disabled) return
  model.value = props.multiple
    ? selected.value.includes(node.value)
      ? selected.value.filter((v) => v !== node.value)
      : [...selected.value, node.value]
    : node.value
  emit('select', node)
}
function toggle(value: SjfValue) {
  expanded.value = expanded.value.includes(value)
    ? expanded.value.filter((v) => v !== value)
    : [...expanded.value, value]
}
function focus(node?: SjfTreeNode) {
  if (!node || node.disabled) return
  focusValue.value = node.value
  void nextTick(() =>
    document
      .getElementById(
        id + '-' + encodeURIComponent(typeof node.value + ':' + node.value),
      )
      ?.focus(),
  )
}
function keydown(event: KeyboardEvent, node: SjfTreeNode) {
  if (node.disabled) return
  const key = event.key
  if (
    ![
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Enter',
      ' ',
    ].includes(key)
  )
    return
  event.preventDefault()
  const rows = visible.value.filter((r) => !r.node.disabled),
    at = rows.findIndex((r) => r.node.value === node.value)
  if (key === 'Enter' || key === ' ') {
    select(node)
    return
  }
  if (key === 'ArrowRight') {
    if (node.children?.length) {
      if (!expanded.value.includes(node.value)) toggle(node.value)
      else focus(node.children.find((n) => !n.disabled))
    }
    return
  }
  if (key === 'ArrowLeft') {
    if (node.children?.length && expanded.value.includes(node.value))
      toggle(node.value)
    else focus(rows[at]?.parent ?? undefined)
    return
  }
  focus(
    rows[
      key === 'Home'
        ? 0
        : key === 'End'
          ? rows.length - 1
          : Math.max(
              0,
              Math.min(rows.length - 1, at + (key === 'ArrowDown' ? 1 : -1)),
            )
    ]?.node,
  )
}
</script>
<style scoped>
.sjf-tree {
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
}
</style>
