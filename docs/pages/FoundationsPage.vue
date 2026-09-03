<template>
  <div class="page page-narrow">
    <p class="page-kicker">FOUNDATIONS</p>
    <h1 class="page-title">设计基础</h1>
    <p class="page-subtitle">
      SJF-UI 默认提供 Material 3 颜色、自动前景色、Ordered Size 间距与通用布局。组件只描述语义和相对关系，不重复发明基础样式。
    </p>

    <section class="section">
      <div class="section-head">
        <h2>Ordered Size System</h2>
        <p>Size 是有序等级，不是五个互不相关的字符串。</p>
      </div>
      <article class="spec-card">
        <div class="mode-list">
          <span class="mode-pill">mn · mini</span>
          <span class="mode-pill">sm · small</span>
          <span class="mode-pill">nm · normal</span>
          <span class="mode-pill">md · medium</span>
          <span class="mode-pill">lg · large</span>
        </div>
        <div class="callout">
          组件只定义相对关系，例如主体 <span class="inline-code">0</span>、内部 gap
          <span class="inline-code">-1</span>、强调高度 <span class="inline-code">+1</span>。
          当全局基准 nm → md 时，整套关系同步上移。
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Material 3 Color</h2>
        <p>M3 提供语义角色；SJF 同时提供自动黑 / 白前景色，适合动态背景。</p>
      </div>

      <div class="grid-2 gap-nm">
        <article class="spec-card">
          <h3>语义 on-* 颜色</h3>
          <p>组件优先使用 Material 3 原生配对，例如 <span class="inline-code">primary + on-primary</span>。</p>
        </article>
        <article class="spec-card">
          <h3>自动黑 / 白字体</h3>
          <p><span class="inline-code">getSjfContrastText(bg)</span> 比较黑白两色的对比度，自动选择可读性更高的一种。</p>
        </article>
      </div>

      <div class="row wrap gap-sm" style="margin-top: 16px">
        <div class="foundation-swatch bg-primary-auto pd-nm rd-nm">primary · auto</div>
        <div class="foundation-swatch bg-primary-container-auto pd-nm rd-nm">primary-container · auto</div>
        <div class="foundation-swatch bg-secondary-auto pd-nm rd-nm">secondary · auto</div>
        <div class="foundation-swatch bg-tertiary-auto pd-nm rd-nm">tertiary · auto</div>
        <div class="foundation-swatch bg-error-auto pd-nm rd-nm">error · auto</div>
      </div>

      <div class="theme-preset-grid">
        <article class="theme-preset theme-preset--pink">
          <div class="theme-preset__visual" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
          <div>
            <strong>Pink · 默认主题</strong>
            <p>偏玫粉 / 樱粉的浅色办公主题。粉色负责强调，页面主体保持白与浅中性色。</p>
          </div>
        </article>

        <article class="theme-preset theme-preset--starry">
          <div class="theme-preset__visual" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
          <div>
            <strong>Starry · 星空主题</strong>
            <p>深夜蓝 surface、星光蓝 primary、冷青 tertiary，暗色环境下仍保持办公层级。</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Spacing Utilities</h2>
        <p>padding / margin / gap / radius / shadow / control height 全部复用同一条 Size 轴。</p>
      </div>
      <article class="spec-card">
        <div class="row wrap items-center gap-sm">
          <code class="inline-code">pd-nm</code>
          <code class="inline-code">pdx-md</code>
          <code class="inline-code">pdy-sm</code>
          <code class="inline-code">mg-nm</code>
          <code class="inline-code">gap-sm</code>
          <code class="inline-code">rd-nm</code>
          <code class="inline-code">shadow-sm</code>
          <code class="inline-code">control-h-nm</code>
        </div>
        <div class="callout">
          所有工具类同时提供 <span class="inline-code">sjf-</span> 前缀别名，例如
          <span class="inline-code">pd-nm</span> 与 <span class="inline-code">sjf-pd-nm</span> 等价。
          自定义注册 Size 后，运行时会同步 CSS Variables 并生成对应工具类。
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Layout Utilities</h2>
        <p>常用办公布局不需要每个页面重新写 display / align / justify。</p>
      </div>
      <article class="spec-card">
        <div class="grid-3 gap-sm">
          <div class="foundation-layout bg-surface-container rd-sm pd-sm center">grid-3</div>
          <div class="foundation-layout bg-surface-container rd-sm pd-sm center">gap-sm</div>
          <div class="foundation-layout bg-surface-container rd-sm pd-sm center">center</div>
        </div>
        <div class="row wrap gap-sm" style="margin-top: 12px">
          <code class="inline-code">row</code>
          <code class="inline-code">column</code>
          <code class="inline-code">items-center</code>
          <code class="inline-code">justify-between</code>
          <code class="inline-code">wrap</code>
          <code class="inline-code">grow</code>
          <code class="inline-code">grid-2 / 3 / 4 / auto</code>
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Form without FormItem</h2>
        <p>不要求用户多套一层 FormItem。</p>
      </div>
      <article class="spec-card">
        <p>
          Input、Select、Textarea、DatePicker 等输入类组件直接内置 Label。默认
          <span class="inline-code">labelMode="m3"</span>，需要传统办公布局时切换为 horizontal / vertical，
          需要描述表式结构时切换为 *-box。
        </p>
      </article>
    </section>
  </div>
</template>

<script setup vapor lang="ts"></script>

<style scoped>
.foundation-swatch {
  min-width: 150px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}

.foundation-layout {
  min-height: 72px;
  color: var(--md-sys-color-on-surface);
  font-size: 12px;
  font-weight: 700;
}
</style>
