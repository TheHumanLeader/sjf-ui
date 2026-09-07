<template>
  <nav
    class="sjf-control sjf-breadcrumbs"
    :style="style"
    :aria-label="props.label ?? '面包屑'"
  >
    <ol>
      <li v-for="(item, index) in props.items" :key="index">
        <span v-if="index" aria-hidden="true">/</span
        ><a
          v-if="item.href && index < props.items.length - 1"
          :href="safeHref(item.href)"
          >{{ item.label }}</a
        ><span
          v-else
          :aria-current="index === props.items.length - 1 ? 'page' : undefined"
          >{{ item.label }}</span
        >
      </li>
    </ol>
  </nav>
</template>
<script setup vapor lang="ts">
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfBreadcrumbsProps } from './index'
const props = defineProps<SjfBreadcrumbsProps>()
const { style } = useSjfControl(props)
function safeHref(href: string) {
  return /^(https?:|\/|#|\.\/|\.\.\/)/i.test(href.trim()) ? href : undefined
}
</script>
<style scoped>
.sjf-breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sjf-c-gap);
  list-style: none;
  padding: 0;
  margin: 0;
}
.sjf-breadcrumbs li {
  display: flex;
  gap: var(--sjf-c-gap);
  align-items: center;
  color: var(--md-sys-color-on-surface-variant);
}
.sjf-breadcrumbs a:hover {
  color: var(--md-sys-color-primary);
  text-decoration: underline;
}
.sjf-breadcrumbs [aria-current] {
  color: var(--md-sys-color-on-surface);
  font-weight: 600;
}
</style>
