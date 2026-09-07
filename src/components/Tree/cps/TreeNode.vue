<template>
  <li
    :id="id"
    role="treeitem"
    :aria-selected="selected.includes(node.value)"
    :aria-expanded="
      node.children?.length ? expanded.includes(node.value) : undefined
    "
    :aria-disabled="node.disabled || undefined"
    :tabindex="!node.disabled && focusValue === node.value ? 0 : -1"
    :data-node="String(node.value)"
    @keydown.stop="emit('key', $event, node)"
    @focus.self="emit('focus', node.value)"
  >
    <div
      class="sjf-tree-row"
      :class="{
        active: selected.includes(node.value),
        disabled: node.disabled,
      }"
      :style="{
        paddingInlineStart: 'calc(var(--sjf-c-pd) * ' + (level - 1) + ')',
      }"
      @click.stop="select"
    >
      <button
        v-if="node.children?.length"
        type="button"
        tabindex="-1"
        :aria-label="
          (expanded.includes(node.value) ? '收起 ' : '展开 ') + node.label
        "
        :disabled="node.disabled"
        @mousedown.prevent
        @click.stop="emit('toggle', node.value)"
      >
        <SJFIcon
          name="chevron_right"
          :size="size"
          :class="{ rotated: expanded.includes(node.value) }"
        /></button
      ><span v-else class="sjf-tree-spacer"></span
      ><SJFIcon v-if="node.icon" :name="node.icon" :size="size" /><span>{{
        node.label
      }}</span>
    </div>
    <div
      v-if="node.children?.length"
      class="sjf-tree-branch"
      :class="{ open: expanded.includes(node.value) }"
      :inert="!expanded.includes(node.value)"
    >
      <ul role="group">
        <TreeNode
          v-for="child in node.children"
          :key="child.value"
          :node="child"
          :root-id="rootId"
          :level="level + 1"
          :size="size"
          :selected="selected"
          :expanded="expanded"
          :focus-value="focusValue"
          @select="emit('select', $event)"
          @toggle="emit('toggle', $event)"
          @focus="emit('focus', $event)"
          @key="(event, item) => emit('key', event, item)"
        />
      </ul>
    </div>
  </li>
</template>
<script setup vapor lang="ts">
import { computed } from 'vue'
import SJFIcon from '../../Icon/index.vue'
import type { SjfTreeNode } from '../index'
import type { SjfValue } from '../../shared/control'
import type { SjfSize } from '../../../core/size'
const props = defineProps<{
  node: SjfTreeNode
  rootId: string
  level: number
  size: SjfSize
  selected: SjfValue[]
  expanded: SjfValue[]
  focusValue: SjfValue | null
}>()
const emit = defineEmits<{
  select: [node: SjfTreeNode]
  toggle: [value: SjfValue]
  focus: [value: SjfValue]
  key: [event: KeyboardEvent, node: SjfTreeNode]
}>()
const id = computed(
  () =>
    props.rootId +
    '-' +
    encodeURIComponent(typeof props.node.value + ':' + props.node.value),
)
function select() {
  if (props.node.disabled) return
  document.getElementById(id.value)?.focus()
  emit('select', props.node)
}
</script>
<style scoped>
li {
  list-style: none;
  outline: 0;
}
.sjf-tree-row {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  min-height: var(--sjf-c-h);
  border-radius: var(--sjf-c-rd);
  padding-inline-end: var(--sjf-c-pd);
  cursor: pointer;
}
.sjf-tree-row:hover {
  background: var(--md-sys-color-surface-container);
}
.sjf-tree-row.active {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}
.sjf-tree-row.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
li:focus-visible > .sjf-tree-row {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: -2px;
}
.sjf-tree-row button {
  display: grid;
  place-items: center;
  flex: none;
}
.sjf-tree-spacer {
  width: var(--sjf-c-icon);
  flex: none;
}
.sjf-tree-row .sjf-icon {
  transition: transform var(--sjf-motion-normal);
}
.sjf-tree-row .rotated {
  transform: rotate(90deg);
}
.sjf-tree-branch {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
  transition:
    grid-template-rows var(--sjf-motion-slow) var(--sjf-motion-ease-standard),
    opacity var(--sjf-motion-normal),
    visibility 0s var(--sjf-motion-slow);
}
.sjf-tree-branch.open {
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}
.sjf-tree-branch > ul {
  overflow: hidden;
  min-height: 0;
  margin: 0;
  padding: 0;
}
</style>
