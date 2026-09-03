<template>
  <div class="page">
    <section class="hero">
      <p class="page-kicker">Vue 3.6 · Vapor Mode · Material 3</p>
      <h1 class="page-title">为真实办公系统而生的<br />Material 3 组件库。</h1>
      <p class="page-subtitle">
        SJF-UI 不追求堆叠组件数量。先统一尺寸、颜色与表单表达，再逐个组件设计、落图、实现和验证。
        默认遵循 Material 3，同时把信息密度、办公实用性和长期可维护性放在同等重要的位置。
      </p>
      <div class="hero-actions">
        <a class="primary-action" href="#/components/label">查看第一个组件</a>
        <a class="secondary-action" href="#/foundations">阅读设计基础</a>
      </div>
    </section>

    <div class="grid-3">
      <article class="info-card">
        <h3>Ordered Size</h3>
        <p>所有长宽高、间距、圆角、阴影与控件高度共享有序 Size 轴，组件只保存相对尺寸关系。</p>
      </article>
      <article class="info-card">
        <h3>Material Color</h3>
        <p>颜色不另造体系，直接使用 Material 3 Color Roles，并增加适合办公后台的使用约束。</p>
      </article>
      <article class="info-card">
        <h3>Vapor First</h3>
        <p>组件和文档 Demo 都使用 Vue 3.6 Vapor Mode，文档展示的就是组件真实运行结果。</p>
      </article>
    </div>

    <section class="section">
      <div class="section-head">
        <h2>当前进度</h2>
        <p>我们按组件逐个推进，不先铺一堆半成品。</p>
      </div>
      <div class="grid-2">
        <article class="spec-card">
          <p class="page-kicker">FOUNDATION</p>
          <h3>Size / Theme / Form</h3>
          <p>三套底层规范已经建立。Size 支持有序扩展；Theme 基于 M3；Form 取消 FormItem，输入组件直接内置通用 Label。</p>
        </article>
        <article class="spec-card">
          <p class="page-kicker">COMPONENT 001</p>
          <h3>Label</h3>
          <p>支持 m3、horizontal、horizontal-box、vertical、vertical-box 五种模式，是后续所有输入类组件的统一标签布局基础。</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup vapor lang="ts"></script>
