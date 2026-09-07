<template>
  <div class="page">
    <p class="page-kicker">THE SJF TOOLKIT</p>
    <h1 class="page-title">组件，一览无余。</h1>
    <p class="page-subtitle">
      42
      个可组合的办公组件，共享尺寸、主题与动效。从一个按钮到一张数据表，始终保持一致。
    </p>
    <div class="catalog-tools">
      <input
        v-model="query"
        type="search"
        aria-label="筛选组件"
        placeholder="搜索组件名称或用途…"
      /><span>{{ filtered.length }} 个组件</span>
    </div>
    <section v-for="group in groups" :key="group" class="section">
      <div class="section-head">
        <h2>{{ group }}</h2>
      </div>
      <div class="catalog-grid">
        <a
          v-for="entry in filtered.filter((c) => c.group === group)"
          :key="entry.name"
          :href="'#' + entry.path"
          class="catalog-card"
          ><span class="catalog-mark">{{ entry.name.slice(0, 2) }}</span>
          <h3>
            {{ entry.name }} <small>{{ entry.label }}</small>
          </h3>
          <p>{{ entry.description }}</p>
          <span class="catalog-arrow" aria-hidden="true">↗</span></a
        >
      </div>
    </section>
    <p v-if="!filtered.length" class="callout">
      没有匹配组件，试试“选择”“表格”或英文名称。
    </p>
  </div>
</template>
<script setup vapor lang="ts">
import { computed, ref } from 'vue'
import { componentCatalog } from '../catalog'
const query = ref('')
const filtered = computed(() =>
  componentCatalog.filter((c) =>
    (c.name + c.label + c.description)
      .toLowerCase()
      .includes(query.value.toLowerCase().trim()),
  ),
)
const groups = computed(() =>
  Array.from(new Set(filtered.value.map((c) => c.group))),
)
</script>
<style scoped>
.catalog-tools {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 32px;
  font-size: 13px;
  color: var(--md-sys-color-on-surface-variant);
}
.catalog-tools input {
  flex: 1;
  max-width: 480px;
  padding: 14px 16px;
  border: 1px solid var(--docs-border);
  border-radius: 12px;
  background: var(--md-sys-color-surface-container-lowest);
  color: var(--md-sys-color-on-surface);
}
.catalog-tools input:focus {
  border-color: var(--md-sys-color-primary);
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: 16px;
}
.catalog-card {
  position: relative;
  display: block;
  padding: 22px;
  border: 1px solid var(--docs-border);
  border-radius: 15px;
  background: var(--md-sys-color-surface-container-lowest);
  transition:
    transform 180ms,
    border-color 180ms;
}
.catalog-card:hover {
  transform: translateY(-3px);
  border-color: var(--md-sys-color-primary);
}
.catalog-mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: 10px;
  font-weight: 700;
}
.catalog-card h3 {
  margin: 18px 0 8px;
  font-size: 16px;
}
.catalog-card h3 small {
  font-weight: 400;
  font-size: 12px;
  color: var(--md-sys-color-on-surface-variant);
}
.catalog-card p {
  margin: 0;
  font-size: 12px;
  line-height: 1.75;
  color: var(--md-sys-color-on-surface-variant);
}
.catalog-arrow {
  position: absolute;
  right: 22px;
  top: 26px;
  color: var(--md-sys-color-primary);
}
</style>
