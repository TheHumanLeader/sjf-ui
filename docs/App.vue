<template>
  <div class="docs-shell">
    <header class="docs-topbar">
      <a class="brand" href="#/" aria-label="SJF-UI 首页">
        <span class="brand-mark">S</span>
        <span class="brand-copy">
          <strong>SJF-UI</strong>
          <small>Vapor UI</small>
        </span>
      </a>

      <nav class="top-nav" aria-label="顶部导航">
        <a :class="{ active: route === '/' }" href="#/">文档</a>
        <a :class="{ active: route.startsWith('/components') }" href="#/components">组件</a>
        <a :class="{ active: route.startsWith('/foundations') }" href="#/foundations">设计规范</a>
      </nav>

      <div class="top-actions">
        <label class="docs-search">
          <span aria-hidden="true">⌕</span>
          <input
            v-model="query"
            type="search"
            placeholder="搜索 SJF-UI..."
            aria-label="搜索文档"
            @keydown.enter="goFirstSearchResult"
          />
          <kbd>/</kbd>
        </label>

        <button
          class="theme-toggle"
          type="button"
          :title="currentTheme === 'pink' ? '切换到星空主题' : '切换到粉色主题'"
          @click="toggleTheme"
        >
          <span class="theme-toggle__dot" aria-hidden="true"></span>
          {{ currentTheme === 'pink' ? '粉色' : '星空' }}
        </button>

        <button class="theme-toggle docs-motion-toggle" type="button" aria-label="切换动画预览" @click="togglePreviewMotion">动画：{{ previewMotion === 'full' ? '完整' : previewMotion === 'system' ? '系统' : '减少' }}</button>
        <a class="icon-link" href="#/components" aria-label="组件总览">42</a>
        <span class="version-chip">v0.1</span>
        <a
          class="icon-link"
          href="https://github.com/TheHumanLeader/sjf-ui"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          GH
        </a>
      </div>
    </header>

    <aside class="docs-sidebar">
      <div class="sidebar-scroll">
        <section v-for="group in filteredNavigation" :key="group.title" class="nav-group">
          <h2>{{ group.title }}</h2>
          <a
            v-for="item in group.items"
            :key="item.path"
            :href="`#${item.path}`"
            :class="{ active: route === item.path }"
          >
            <span>{{ item.label }}</span>
            <small v-if="item.badge">{{ item.badge }}</small>
          </a>
        </section>
      </div>
    </aside>

    <main class="docs-main">
      <HomePage v-if="route === '/'" />
      <ComponentsPage v-else-if="route === '/components'" />
      <FoundationsPage v-else-if="route === '/foundations'" />
      <IconPage v-else-if="route === '/components/icon'" />
      <ListPage v-else-if="route === '/components/list'" />
      <LabelPage v-else-if="route === '/components/label'" />
      <FormPage v-else-if="route === '/components/form'" />
      <InputPage v-else-if="route === '/components/input'" />
      <ComponentPage v-else-if="componentEntry" :key="route" :entry="componentEntry" />
      <NotFoundPage v-else />
    </main>
  </div>
</template>

<script setup vapor lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { readStoredSjfTheme, setSjfTheme, type SjfThemeName } from '@/core/theme'
import HomePage from './pages/HomePage.vue'
import FoundationsPage from './pages/FoundationsPage.vue'
import IconPage from './pages/IconPage.vue'
import ListPage from './pages/ListPage.vue'
import LabelPage from './pages/LabelPage.vue'
import FormPage from './pages/FormPage.vue'
import InputPage from './pages/InputPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import ComponentPage from './pages/ComponentPage.vue'
import ComponentsPage from './pages/ComponentsPage.vue'
import { componentCatalog, componentGroups } from './catalog'
import { readPreviewMotion, applyPreviewMotion } from './preview'

interface NavigationItem {
  label: string
  path: string
  badge?: string
}

interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

const navigation: NavigationGroup[] = [
  { title: '开始', items: [{label:'SJF-UI',path:'/'},{label:'组件总览 · 42',path:'/components'},{label:'设计基础',path:'/foundations'}] },
  ...componentGroups,
]

const route = ref(readRoute())
const query = ref('')
const componentEntry = computed(() => componentCatalog.find(c => c.path === route.value))
const previewMotion = ref(readPreviewMotion())
function togglePreviewMotion() {
  previewMotion.value = previewMotion.value === 'full' ? 'system' : previewMotion.value === 'system' ? 'reduced' : 'full'
  applyPreviewMotion(previewMotion.value)
}
const currentTheme = ref<SjfThemeName>(readStoredSjfTheme())

const filteredNavigation = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return navigation

  return navigation
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${item.label} ${item.path}`.toLowerCase().includes(keyword),
      ),
    }))
    .filter((group) => group.items.length > 0)
})

function readRoute(): string {
  const value = window.location.hash.slice(1)
  return value || '/'
}

function syncRoute(): void {
  route.value = readRoute()
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function goFirstSearchResult(): void {
  const firstGroup = filteredNavigation.value[0]
  const first = firstGroup?.items[0]
  if (!first) return
  window.location.hash = first.path
  query.value = ''
}

function toggleTheme(): void {
  const next: SjfThemeName = currentTheme.value === 'pink' ? 'starry' : 'pink'
  currentTheme.value = next
  setSjfTheme(next)
}

function focusSearch(event: KeyboardEvent): void {
  if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
  const target = event.target as HTMLElement | null
  if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return
  event.preventDefault()
  document.querySelector<HTMLInputElement>('.docs-search input')?.focus()
}

onMounted(() => {
  window.addEventListener('hashchange', syncRoute)
  window.addEventListener('keydown', focusSearch)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncRoute)
  window.removeEventListener('keydown', focusSearch)
})
</script>
