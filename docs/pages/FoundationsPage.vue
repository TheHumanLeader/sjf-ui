<template>
  <div class="page page-narrow">
    <p class="page-kicker">FOUNDATIONS</p>
    <h1 class="page-title">设计基础</h1>
    <p class="page-subtitle">
      SJF-UI 的组件不各自决定尺寸和颜色。所有组件共享 Size 与 Material 3 Theme，表单类组件统一建立在 Label 布局能力之上。
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
        <p>不重新发明颜色语义，只规范怎么使用。</p>
      </div>
      <div class="grid-2">
        <article class="spec-card">
          <h3>核心角色</h3>
          <p><span class="inline-code">primary</span>、<span class="inline-code">surface</span>、<span class="inline-code">on-surface</span>、<span class="inline-code">outline-variant</span>、<span class="inline-code">error</span>。</p>
        </article>
        <article class="spec-card">
          <h3>办公化约束</h3>
          <p>主色只用于真正强调；大面积背景使用 surface 系列；边界以 outline-variant 为主；避免无意义装饰性色块。</p>
        </article>
      </div>
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
