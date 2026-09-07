<template>
  <div
    class="sjf-control sjf-table"
    :style="style"
    :aria-busy="props.loading || undefined"
  >
    <div
      class="sjf-table-scroll"
      :style="{
        maxHeight:
          typeof props.height === 'number' ? props.height + 'px' : props.height,
      }"
      tabindex="0"
      :aria-label="props.caption ?? '数据表格'"
    >
      <table>
        <caption v-if="props.caption" class="sjf-sr-only">
          {{
            props.caption
          }}
        </caption>
        <thead>
          <tr>
            <th v-if="props.selectable" class="sjf-table-check">
              <input
                type="checkbox"
                aria-label="选择本页全部"
                :checked="allSelected"
                :indeterminate="someSelected && !allSelected"
                :disabled="!displayed.length || props.loading"
                @change="togglePage"
              />
            </th>
            <th
              v-for="column in props.columns"
              :key="column.key"
              :style="{
                width:
                  typeof column.width === 'number'
                    ? column.width + 'px'
                    : column.width,
                textAlign: column.align,
              }"
              :aria-sort="
                column.sortable
                  ? sortKey === column.key
                    ? direction === 1
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                  : undefined
              "
              scope="col"
            >
              <button
                v-if="column.sortable"
                type="button"
                @click="sort(column.key)"
              >
                {{ column.title }}
                <span aria-hidden="true">{{
                  sortKey === column.key ? (direction === 1 ? '↑' : '↓') : '↕'
                }}</span></button
              ><span v-else>{{ column.title }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in displayed"
            :key="entry.key"
            :class="{
              'is-selected': selected.includes(entry.key),
              'is-stripe': props.striped && index % 2 === 1,
            }"
            @click="emit('rowClick', entry.row)"
          >
            <td v-if="props.selectable" class="sjf-table-check">
              <input
                type="checkbox"
                :aria-label="'选择行 ' + String(entry.key)"
                :checked="selected.includes(entry.key)"
                :disabled="props.loading"
                @click.stop
                @change="toggleRow(entry.key)"
              />
            </td>
            <td
              v-for="column in props.columns"
              :key="column.key"
              :style="{ textAlign: column.align }"
            >
              <slot
                :name="'cell-' + column.key"
                :row="entry.row"
                :value="entry.row[column.key]"
                :index="entry.index"
                >{{ entry.row[column.key] ?? '—' }}</slot
              >
            </td>
          </tr>
          <tr v-if="props.loading || !displayed.length">
            <td
              :colspan="
                Math.max(1, props.columns.length + (props.selectable ? 1 : 0))
              "
            >
              <SJFSkeleton v-if="props.loading" :rows="3" /><SJFEmpty
                v-else
                title="没有匹配的数据"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <SJFPagination
      v-if="props.paginated"
      :model-value="page"
      :total="props.rows.length"
      :page-size="pageSize"
      :size="size"
      :disabled="props.loading"
      @update:model-value="pageModel = $event"
    />
  </div>
</template>
<script setup vapor lang="ts">
import { computed, ref } from 'vue'
import SJFPagination from '../Pagination/index.vue'
import SJFEmpty from '../Empty/index.vue'
import SJFSkeleton from '../Skeleton/index.vue'
import { useSjfControl, useSjfValue, type SjfValue } from '../shared/control'
import { sjfPageCount } from '../shared/models'
import type { SjfTableProps } from './index'
const props = defineProps<SjfTableProps>()
const emit = defineEmits<{
  'update:selected': [value: SjfValue[]]
  'update:page': [value: number]
  sort: [value: { key: string | null; direction: 'asc' | 'desc' | null }]
  rowClick: [row: Record<string, unknown>]
}>()
const { style, size } = useSjfControl(props)
const selected = useSjfValue<SjfValue[]>(
  () => props.selected,
  (v) => emit('update:selected', v),
  [],
)
const pageModel = useSjfValue(
  () => props.page,
  (v) => emit('update:page', v),
  1,
)
const sortKey = ref<string | null>(null),
  direction = ref(1)
const pageSize = computed(() =>
  Math.max(
    1,
    Math.floor(Number.isFinite(props.pageSize) ? props.pageSize! : 10),
  ),
)
const page = computed(() =>
  Math.max(
    1,
    Math.min(
      sjfPageCount(props.rows.length, pageSize.value),
      Math.floor(pageModel.value) || 1,
    ),
  ),
)
const ordered = computed(() => {
  const rows = props.rows.map((row, index) => ({
    row,
    index,
    key: (typeof row[props.rowKey ?? 'id'] === 'string' ||
    typeof row[props.rowKey ?? 'id'] === 'number'
      ? row[props.rowKey ?? 'id']
      : index) as SjfValue,
  }))
  const column = props.columns.find((c) => c.key === sortKey.value)
  if (column)
    rows.sort((a, b) => {
      const x = a.row[column.key],
        y = b.row[column.key]
      const compared = column.compare
        ? column.compare(x, y)
        : x == null
          ? y == null
            ? 0
            : 1
          : y == null
            ? -1
            : typeof x === 'number' && typeof y === 'number'
              ? x - y
              : String(x).localeCompare(String(y), undefined, { numeric: true })
      return compared * direction.value || a.index - b.index
    })
  return rows
})
const displayed = computed(() =>
  props.loading
    ? []
    : props.paginated
      ? ordered.value.slice(
          (page.value - 1) * pageSize.value,
          page.value * pageSize.value,
        )
      : ordered.value,
)
const allSelected = computed(
  () =>
    displayed.value.length > 0 &&
    displayed.value.every((e) => selected.value.includes(e.key)),
)
const someSelected = computed(() =>
  displayed.value.some((e) => selected.value.includes(e.key)),
)
function toggleRow(key: SjfValue) {
  selected.value = selected.value.includes(key)
    ? selected.value.filter((v) => v !== key)
    : [...selected.value, key]
}
function togglePage() {
  const keys = displayed.value.map((e) => e.key)
  selected.value = allSelected.value
    ? selected.value.filter((v) => !keys.includes(v))
    : [...new Set([...selected.value, ...keys])]
}
function sort(key: string) {
  if (sortKey.value !== key) {
    sortKey.value = key
    direction.value = 1
  } else if (direction.value === 1) direction.value = -1
  else sortKey.value = null
  pageModel.value = 1
  emit('sort', {
    key: sortKey.value,
    direction: sortKey.value ? (direction.value === 1 ? 'asc' : 'desc') : null,
  })
}
</script>
<style scoped>
.sjf-table {
  display: grid;
  gap: var(--sjf-c-pd);
  min-width: 0;
}
.sjf-table-scroll {
  overflow: auto;
  max-width: 100%;
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--sjf-c-rd);
}
.sjf-table-scroll:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}
.sjf-table table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  font-variant-numeric: tabular-nums;
}
.sjf-table th,
.sjf-table td {
  padding: var(--sjf-c-pd);
  text-align: left;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  white-space: nowrap;
}
.sjf-table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--md-sys-color-surface-container);
  font-weight: 600;
}
.sjf-table th button {
  display: inline-flex;
  gap: var(--sjf-c-gap);
  align-items: center;
}
.sjf-table tbody tr:last-child td {
  border-bottom: 0;
}
.sjf-table tr.is-stripe {
  background: var(--md-sys-color-surface-container-low);
}
.sjf-table tr.is-selected {
  background: var(--md-sys-color-primary-container);
}
.sjf-table input[type='checkbox'] {
  appearance: auto;
  accent-color: var(--md-sys-color-primary);
  width: 1.15em;
  height: 1.15em;
}
.sjf-table .sjf-table-check {
  width: 1%;
  padding-inline: var(--sjf-c-pd);
}
</style>
