<template>
  <div class="page page-narrow">
    <p class="page-kicker">GENERAL · COMPONENT 002</p>
    <h1 class="page-title">List 列表</h1>
    <p class="page-subtitle">
      SJFList 是 Menu、Tree 与横向 Tabs 共用的排列和 active 基础。数据映射适合快速使用，SJFItem 插槽适合复杂内容。
    </p>

    <section class="section">
      <div class="section-head">
        <h2>最简单使用</h2>
        <p>字段 prop 指向数据 key；item-value 决定 v-model 中保存的 active 值。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>Data driven</strong>
          <code>active: {{ menuActive }}</code>
        </div>
        <div class="demo-stage list-stage">
          <SJFList
            v-model="menuActive"
            :list="menuItems"
            item-title="title"
            item-subtitle="subtitle"
            item-icon="icon"
            item-value="id"
            active-color="#b73e6f"
            aria-label="工作区菜单"
          />
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SJFList
  v-model="active"
  :list="list"
  item-title="title"
  item-subtitle="subtitle"
  item-icon="icon"
  item-value="id"
  active-color="#b73e6f"
  size="nm"
  :horizontal="false"
/&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Ordered Size</h2>
        <p>List 的 size 会传递给内部 SJFItem，统一改变行高、内边距、间距、文字和图标。</p>
      </div>

      <div class="hero-actions list-size-actions">
        <button
          v-for="size in sizes"
          :key="size"
          class="secondary-action list-size-button"
          :class="{ selected: listSize === size }"
          type="button"
          @click="listSize = size"
        >
          {{ size }}
        </button>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>Size inheritance</strong>
          <code>size="{{ listSize }}"</code>
        </div>
        <div class="demo-stage list-stage">
          <SJFList
            v-model="sizeActive"
            :list="sizeItems"
            item-title="title"
            item-subtitle="subtitle"
            item-icon="icon"
            item-value="id"
            :size="listSize"
            aria-label="尺寸演示"
          />
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Multiple Active</h2>
        <p>增加 multiple 后，v-model 使用数组；再次点击已激活项即可移除。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>Multi select</strong>
          <code>{{ multiActive.join(', ') || '(empty)' }}</code>
        </div>
        <div class="demo-stage list-stage">
          <SJFList
            v-model="multiActive"
            :list="filterItems"
            item-title="title"
            item-icon="icon"
            item-value="id"
            multiple
            aria-label="筛选条件"
          />
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Height · Page Scroll</h2>
        <p>设置 height 后限制总高度；按钮逐页切换、滚轮连续缓动，反向操作和触摸可随时接管。</p>
      </div>

      <div class="height-demo-grid">
        <article class="demo-card">
          <div class="demo-titlebar">
            <strong>Vertical</strong>
            <code>height="220px"</code>
          </div>
          <div class="demo-stage">
            <SJFList
              v-model="verticalPageActive"
              :list="pageItems"
              item-title="title"
              item-icon="icon"
              item-value="id"
              height="220px"
              aria-label="竖向分页列表"
            />
          </div>
        </article>

        <article class="demo-card">
          <div class="demo-titlebar">
            <strong>Horizontal</strong>
            <code>height="64px"</code>
          </div>
          <div class="demo-stage">
            <SJFList
              v-model="horizontalPageActive"
              :list="pageItems"
              item-title="title"
              item-icon="icon"
              item-value="id"
              height="64px"
              horizontal
              aria-label="横向分页列表"
            />
          </div>
        </article>
      </div>

      <div class="code-card">
        <pre><code>&lt;SJFList :list="items" height="220px" /&gt;

&lt;SJFList :list="items" height="64px" horizontal /&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Horizontal · Tabs</h2>
        <p>horizontal 只改变排列方向；使用 type="tabs" 时会自动生成 tablist / tab 语义。</p>
      </div>

      <article class="demo-card">
        <div class="demo-stage">
          <SJFList
            v-model="tabActive"
            :list="tabItems"
            item-title="title"
            item-icon="icon"
            item-value="id"
            horizontal
            type="tabs"
            aria-label="内容分类"
          />
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Tree · Composition</h2>
        <p>Tree 使用同一套 active 模型；展开状态由上层持有，节点仍然是 SJFItem。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>Project tree</strong>
          <code>active: {{ treeActive }}</code>
        </div>
        <div class="demo-stage list-stage">
          <SJFList
            v-model="treeActive"
            type="tree"
            aria-label="项目文件树"
          >
            <SJFItem
              value="src"
              title="src"
              icon="folder"
              :aria-expanded="treeOpen"
              @click="treeOpen = !treeOpen"
            >
              <template #append>
                <span
                  class="tree-chevron"
                  :class="{ 'is-open': treeOpen }"
                >
                  <SJFIcon name="chevron_right" size="sm" />
                </span>
              </template>
            </SJFItem>

            <div
              class="tree-branch"
              :class="{ 'is-open': treeOpen }"
              :aria-hidden="treeOpen ? undefined : 'true'"
              :inert="!treeOpen"
              role="group"
            >
              <div class="tree-children">
                <SJFItem value="components" title="components" icon="folder_open" />
                <SJFItem value="list" title="List" subtitle="index.vue" icon="description" />
                <SJFItem value="item" title="Item" subtitle="index.vue" icon="description" />
              </div>
            </div>

            <SJFItem value="docs" title="docs" icon="folder" />
          </SJFList>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SJFList v-model="active" type="tree"&gt;
  &lt;SJFItem value="src" :aria-expanded="open" @click="open = !open"&gt;
    &lt;template #content&gt;src&lt;/template&gt;
    &lt;template #append&gt;...&lt;/template&gt;
  &lt;/SJFItem&gt;

  &lt;div
    class="tree-branch"
    :class="{ 'is-open': open }"
    :inert="!open"
    role="group"
  &gt;
    &lt;div class="tree-children"&gt;
      &lt;SJFItem value="components" title="components" /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/SJFList&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Horizontal Tree · Drill Path</h2>
        <p>父节点保持在左侧，子节点组向右展开；适合工具栏、分类钻取和横向流程导航。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>Component path</strong>
          <code>active: {{ horizontalTreeActive }}</code>
        </div>
        <div class="demo-stage horizontal-tree-stage">
          <SJFList
            v-model="horizontalTreeActive"
            class="horizontal-tree"
            type="tree"
            horizontal
            aria-label="横向组件树"
          >
            <SJFItem
              value="components"
              title="components"
              icon="account_tree"
              :aria-expanded="horizontalTreeOpen"
              @click="horizontalTreeOpen = !horizontalTreeOpen"
            >
              <template #append>
                <span
                  class="tree-chevron"
                  :class="{ 'is-open': horizontalTreeOpen }"
                >
                  <SJFIcon name="chevron_right" size="sm" />
                </span>
              </template>
            </SJFItem>

            <div
              class="horizontal-tree-branch"
              :class="{ 'is-open': horizontalTreeOpen }"
              :aria-hidden="horizontalTreeOpen ? undefined : 'true'"
              :inert="!horizontalTreeOpen"
              role="group"
            >
              <div class="horizontal-tree-children">
                <span class="horizontal-tree-connector" aria-hidden="true" />
                <SJFItem value="icon" title="Icon" icon="category" />
                <SJFItem value="list" title="List" icon="view_list" />
                <SJFItem value="item" title="Item" icon="view_agenda" />
              </div>
            </div>
          </SJFList>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SJFList v-model="active" type="tree" horizontal&gt;
  &lt;SJFItem value="components" :aria-expanded="open" /&gt;
  &lt;div role="group" class="horizontal-tree-branch"&gt;
    &lt;SJFItem value="icon" title="Icon" /&gt;
    &lt;SJFItem value="list" title="List" /&gt;
  &lt;/div&gt;
&lt;/SJFList&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>SJFItem · Slots</h2>
        <p>复杂行可直接组合 prepend、content 与 append；这种方式也可嵌套为 Tree。</p>
      </div>

      <article class="demo-card">
        <div class="demo-stage list-stage">
          <SJFList aria-label="自定义列表">
            <SJFItem
              :active="customActive"
              @update:active="customActive = $event"
            >
              <template #prepend>
                <span class="custom-avatar">S</span>
              </template>
              <template #content>
                <strong class="custom-title">SJF Design System</strong>
                <small class="custom-subtitle">完全自定义 content</small>
              </template>
              <template #append>
                <span class="custom-meta">12 项</span>
              </template>
            </SJFItem>
          </SJFList>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SJFList&gt;
  &lt;SJFItem :active="active" @update:active="active = $event"&gt;
    &lt;template #prepend&gt;...&lt;/template&gt;
    &lt;template #content&gt;...&lt;/template&gt;
    &lt;template #append&gt;...&lt;/template&gt;
  &lt;/SJFItem&gt;
&lt;/SJFList&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>API</h2>
      </div>
      <div class="api-card">
        <table class="api-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td><code>list</code></td><td>unknown[]</td><td>简单数据列表</td></tr>
            <tr><td><code>itemTitle / itemSubtitle / itemIcon</code></td><td>key | resolver</td><td>字段映射</td></tr>
            <tr><td><code>itemValue</code></td><td>key | resolver</td><td>active 唯一值，默认 value</td></tr>
            <tr><td><code>modelValue</code></td><td>unknown | unknown[]</td><td>单选或多选 active 值</td></tr>
            <tr><td><code>multiple</code></td><td>boolean</td><td>启用多 active</td></tr>
            <tr><td><code>horizontal</code></td><td>boolean</td><td>横向 List，默认 false</td></tr>
            <tr><td><code>height</code></td><td>string | number</td><td>限制总高度，溢出时启用两端分页滚动</td></tr>
            <tr><td><code>size</code></td><td>SjfSize</td><td>mn | sm | nm | md | lg，内部 Item 自动继承</td></tr>
            <tr><td><code>activeColor</code></td><td>CSS color</td><td>active 前景色及状态底色</td></tr>
            <tr><td><code>type</code></td><td>list | menu | tree | tabs</td><td>自动映射 ARIA role</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup vapor lang="ts">
import { ref } from 'vue'
import SJFIcon from '@/components/Icon/index.vue'
import SJFItem from '@/components/Item/index.vue'
import SJFList from '@/components/List/index.vue'
import type { SjfBuiltinSize } from '@/core/size'

const menuItems = [
  { id: 'inbox', title: '收件箱', subtitle: '12 条未读消息', icon: 'inbox' },
  { id: 'starred', title: '已加星标', subtitle: '重要内容', icon: 'star' },
  { id: 'drafts', title: '草稿', subtitle: '3 个未完成项目', icon: 'draft' },
  { id: 'archive', title: '归档', subtitle: '历史内容', icon: 'archive' },
]

const filterItems = [
  { id: 'design', title: '设计', icon: 'palette' },
  { id: 'code', title: '开发', icon: 'code' },
  { id: 'review', title: '评审', icon: 'rate_review' },
]

const tabItems = [
  { id: 'overview', title: '概览', icon: 'dashboard' },
  { id: 'activity', title: '动态', icon: 'timeline' },
  { id: 'settings', title: '设置', icon: 'settings' },
]

const sizeItems = [
  { id: 'compact', title: '列表尺寸跟随 Size', subtitle: '行高、文字与图标使用同一等级', icon: 'format_size' },
  { id: 'inherit', title: 'Item 自动继承', subtitle: '也可以在单个 Item 上覆盖 size', icon: 'account_tree' },
]

const pageItems = [
  { id: 'overview', title: '概览', icon: 'dashboard' },
  { id: 'projects', title: '项目', icon: 'folder' },
  { id: 'team', title: '团队', icon: 'group' },
  { id: 'calendar', title: '日历', icon: 'calendar_month' },
  { id: 'files', title: '文件', icon: 'description' },
  { id: 'analytics', title: '分析', icon: 'monitoring' },
  { id: 'settings', title: '设置', icon: 'settings' },
  { id: 'archive', title: '归档', icon: 'archive' },
]

const menuActive = ref('inbox')
const multiActive = ref<string[]>(['design', 'code'])
const tabActive = ref('overview')
const customActive = ref(true)
const listSize = ref<SjfBuiltinSize>('nm')
const sizeActive = ref('compact')
const verticalPageActive = ref('overview')
const horizontalPageActive = ref('overview')
const treeActive = ref('components')
const treeOpen = ref(true)
const horizontalTreeActive = ref('list')
const horizontalTreeOpen = ref(true)
const sizes: SjfBuiltinSize[] = ['mn', 'sm', 'nm', 'md', 'lg']
</script>

<style scoped>
.list-stage {
  max-width: 440px;
}

.list-size-actions {
  margin: 0 0 14px;
}

.list-size-button {
  border: 1px solid var(--docs-border);
}

.list-size-button.selected {
  border-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-primary);
  background: var(--md-sys-color-primary-container);
}

.height-demo-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  align-items: start;
  gap: 16px;
}

.height-demo-grid .demo-card {
  min-width: 0;
}

.custom-avatar {
  width: 32px;
  height: 32px;
  display: inline-grid;
  place-items: center;
  border-radius: 10px;
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-weight: 800;
}

.tree-children {
  display: grid;
  gap: 2px;
  padding-left: calc(var(--sjf-pd-nm) + var(--sjf-icon-nm));
}

.tree-chevron {
  display: inline-grid;
  place-items: center;
  transition: transform var(--sjf-motion-slow, 260ms)
    var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1));
}

.tree-chevron.is-open {
  transform: rotate(90deg);
}

.tree-branch {
  min-width: 0;
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transform: translateY(-4px);
  transform-origin: top;
  visibility: hidden;
  transition:
    grid-template-rows var(--sjf-motion-slow, 260ms)
      var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1)),
    opacity var(--sjf-motion-normal, 180ms)
      var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1)),
    transform var(--sjf-motion-slow, 260ms)
      var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1)),
    visibility 0s linear var(--sjf-motion-slow, 260ms);
}

.tree-branch.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  transition-delay: 0s;
}

.tree-children {
  min-height: 0;
  overflow: hidden;
}

.horizontal-tree-stage {
  overflow-x: auto;
}

.horizontal-tree {
  min-width: max-content;
  align-items: center;
  gap: 0;
  padding: 4px;
}

.horizontal-tree :deep(.sjf-item) {
  border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 36%, transparent);
  background: var(--md-sys-color-surface);
}

.horizontal-tree :deep(.sjf-item:hover:not(:disabled)) {
  background: color-mix(in srgb, var(--md-sys-color-on-surface) 7%, transparent);
}

.horizontal-tree :deep(.sjf-item.is-active) {
  background: color-mix(
    in srgb,
    var(--sjf-list-active-color, var(--md-sys-color-primary)) 14%,
    var(--md-sys-color-surface)
  );
}

.horizontal-tree-branch {
  min-width: 0;
  display: grid;
  grid-template-columns: 0fr;
  opacity: 0;
  visibility: hidden;
  transition:
    grid-template-columns var(--sjf-motion-slow, 260ms)
      var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1)),
    opacity var(--sjf-motion-normal, 180ms)
      var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1)),
    visibility 0s linear var(--sjf-motion-slow, 260ms);
}

.horizontal-tree-branch.is-open {
  grid-template-columns: 1fr;
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}

.horizontal-tree-children {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
}

.horizontal-tree-connector {
  width: 22px;
  height: 1px;
  flex: none;
  margin-inline: 2px;
  background: color-mix(in srgb, var(--md-sys-color-outline) 55%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .tree-branch {
    transform: none;
    transition:
      grid-template-rows var(--sjf-motion-normal, 180ms)
        var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1)),
      visibility 0s linear var(--sjf-motion-normal, 180ms);
  }

  .tree-branch.is-open {
    transition-delay: 0s;
  }

  .tree-chevron {
    transition-duration: var(--sjf-motion-fast, 120ms);
  }

  .horizontal-tree-branch {
    transition:
      grid-template-columns var(--sjf-motion-normal, 180ms)
        var(--sjf-motion-ease-standard, cubic-bezier(0.2, 0, 0, 1)),
      visibility 0s linear var(--sjf-motion-normal, 180ms);
  }

  .horizontal-tree-branch.is-open {
    transition-delay: 0s;
  }
}

.custom-title,
.custom-subtitle {
  display: block;
}

.custom-title {
  font-size: 14px;
}

.custom-subtitle,
.custom-meta {
  color: var(--md-sys-color-on-surface-variant);
  font-size: 12px;
}

@media (max-width: 760px) {
  .height-demo-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
