<template>
  <div class="page page-narrow">
    <p class="page-kicker">GENERAL · COMPONENT 001</p>
    <h1 class="page-title">Icon 图标</h1>
    <p class="page-subtitle">
      SJFIcon 为图标提供统一入口。Material Symbols 字体随组件库自托管，颜色继承上下文，尺寸接入 Ordered Size System。
    </p>

    <section class="section">
      <div class="section-head">
        <h2>Basic</h2>
        <p>用 Material Symbols ligature 名称直接渲染；数字开头的名称需要写在引号内。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>10k</strong>
          <code>type="material-symbols"</code>
        </div>
        <div class="demo-stage icon-hero">
          <SJFIcon name="10k" type="material-symbols" size="lg" label="10K" />
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SJFIcon name="10k" type="material-symbols" /&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Variants</h2>
        <p>同一个名称可以切换 Outlined、Rounded、Sharp，并使用 filled 表达选中态。</p>
      </div>

      <div class="icon-grid">
        <article v-for="item in variants" :key="item.variant" class="spec-card icon-sample">
          <SJFIcon name="favorite" :variant="item.variant" size="lg" />
          <strong>{{ item.label }}</strong>
          <code>{{ item.variant }}</code>
        </article>
        <article class="spec-card icon-sample is-accent">
          <SJFIcon name="favorite" filled size="lg" />
          <strong>Filled</strong>
          <code>filled</code>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Ordered Size</h2>
        <p>Icon 使用独立尺寸域，随全局 mn → lg 顺序解析。</p>
      </div>

      <article class="demo-card">
        <div class="demo-stage icon-size-row">
          <div v-for="size in sizes" :key="size" class="icon-size-item">
            <SJFIcon name="widgets" :size="size" />
            <code>{{ size }}</code>
          </div>
        </div>
      </article>
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
            <tr><td><code>name</code></td><td>string</td><td>Material Symbols 图标名称</td></tr>
            <tr><td><code>type</code></td><td>material-symbols</td><td>图标 provider</td></tr>
            <tr><td><code>variant</code></td><td>outlined | rounded | sharp</td><td>视觉风格</td></tr>
            <tr><td><code>filled</code></td><td>boolean</td><td>填充状态</td></tr>
            <tr><td><code>size</code></td><td>SjfSize</td><td>Ordered Size，默认继承全局</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>可访问名称；不传时作为装饰图标</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup vapor lang="ts">
import SJFIcon from '@/components/Icon/index.vue'
import type { SjfIconVariant } from '@/components/Icon'
import type { SjfBuiltinSize } from '@/core/size'

const variants: Array<{ label: string; variant: SjfIconVariant }> = [
  { label: 'Outlined', variant: 'outlined' },
  { label: 'Rounded', variant: 'rounded' },
  { label: 'Sharp', variant: 'sharp' },
]

const sizes: SjfBuiltinSize[] = ['mn', 'sm', 'nm', 'md', 'lg']
</script>

<style scoped>
.icon-hero {
  min-height: 180px;
  display: grid;
  place-items: center;
  color: var(--md-sys-color-primary);
}

.icon-hero .sjf-icon {
  font-size: 80px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sjf-gap-sm);
}

.icon-sample,
.icon-size-item {
  display: grid;
  place-items: center;
  gap: var(--sjf-gap-sm);
}

.icon-sample {
  min-height: 132px;
}

.icon-sample.is-accent {
  color: var(--md-sys-color-primary);
  background: var(--md-sys-color-primary-container);
}

.icon-size-row {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: clamp(20px, 6vw, 56px);
}

.icon-size-item {
  color: var(--md-sys-color-on-surface-variant);
}

@media (max-width: 760px) {
  .icon-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .icon-size-row {
    flex-wrap: wrap;
  }
}
</style>
