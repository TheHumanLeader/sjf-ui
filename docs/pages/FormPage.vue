<template>
  <div class="page page-narrow">
    <p class="page-kicker">FORM · LAYOUT SCOPE</p>
    <h1 class="page-title">Form 表单布局作用域</h1>
    <p class="page-subtitle">
      SjfForm 不需要 FormItem。它直接提供原始 Grid、gap、size 与 Label 上下文；Input 内置的 Label 和显式 SjfLabel 都读取同一套配置。
    </p>

    <section class="section">
      <div class="section-head">
        <h2>同一份结构，直接切 Label Mode</h2>
        <p>下面始终是 5 列原始 Grid。切换模式时不改字段代码。</p>
      </div>

      <div class="hero-actions form-mode-actions">
        <button
          v-for="item in modes"
          :key="item"
          type="button"
          class="secondary-action size-switch"
          :class="{ selected: mode === item }"
          @click="mode = item"
        >
          {{ item }}
        </button>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>5-column Raw Grid</strong>
          <code>labelMode="{{ mode }}"</code>
        </div>
        <div class="demo-stage">
          <SjfForm
            :columns="5"
            :label-mode="mode"
            :gap="mode === 'horizontal-box' ? 0 : 'sm'"
            :label-option="{ colSpan: 1 }"
          >
            <SjfInput
              v-model="form.name"
              label="姓名"
              :col-span="2"
              :label-option="{ required: true }"
            />

            <SjfInput
              v-model="form.code"
              label="工号"
              :col-span="1"
            />

            <SjfInput
              v-model="form.department"
              label="部门"
              :col-span="1"
            />

            <SjfInput
              v-model="form.address"
              label="详细地址"
              :col-span="2"
            />

            <SjfInput
              v-model="form.phone"
              label="联系电话"
              :col-span="2"
            />

            <SjfInput
              v-model="form.status"
              label="状态"
              :col-span="1"
            />
          </SjfForm>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SjfForm :columns="5" :label-mode="mode" gap="sm"&gt;
  &lt;SjfInput
    label="姓名"
    :label-option="{ colSpan: 1, required: true }"
    :col-span="2"
  /&gt;

  &lt;SjfInput
    label="工号"
    :label-option="{ colSpan: 1 }"
    :col-span="1"
  /&gt;
&lt;/SjfForm&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>labelOption 的继承</h2>
        <p>Form 提供默认值，某个字段只覆盖自己需要改的部分。</p>
      </div>

      <article class="spec-card">
        <div class="inherit-flow">
          <span>SjfForm.labelOption</span>
          <b>→</b>
          <span>SjfInput.labelOption</span>
          <b>→</b>
          <span>SjfLabel direct props</span>
        </div>
        <div class="callout">
          优先级：Label 直接属性 &gt; 当前组件 labelOption &gt; Form labelOption / labelMode &gt; 默认 m3。
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Grid 语义</h2>
        <p>columns 不是“一行几个字段”，而是整个 Form 的原始 Grid 列。</p>
      </div>

      <div class="grid-2">
        <article class="spec-card">
          <h3>Horizontal</h3>
          <p>
            <span class="inline-code">labelOption.colSpan</span> 控制 Label Cell；
            <span class="inline-code">colSpan</span> 控制 Control Cell。
          </p>
        </article>
        <article class="spec-card">
          <h3>M3</h3>
          <p>Label 融进 Control，但总占位继续按 Label span + Control span 计算，方便模式切换。</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup vapor lang="ts">
import { reactive, ref } from 'vue'
import SjfForm from '@/components/Form/index.vue'
import SjfInput from '@/components/Input/index.vue'
import type { SjfLabelMode } from '@/components/Label'

const modes: SjfLabelMode[] = ['m3', 'horizontal', 'horizontal-box']
const mode = ref<SjfLabelMode>('m3')

const form = reactive({
  name: '张三',
  code: 'SJF-001',
  department: '研发中心',
  address: '合肥市 · 软件园',
  phone: '13800000000',
  status: '在职',
})
</script>

<style scoped>
.form-mode-actions {
  margin: 0 0 14px;
}

.size-switch {
  border: 1px solid var(--docs-border);
  cursor: pointer;
}

.size-switch.selected {
  border-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-primary);
  background: var(--md-sys-color-primary-container);
}

.inherit-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sjf-gap-sm);
}

.inherit-flow span {
  padding: var(--sjf-pd-sm) var(--sjf-pd-nm);
  border: 1px solid var(--docs-border);
  border-radius: var(--sjf-rd-sm);
  background: var(--md-sys-color-surface-container-low);
  font-size: 12px;
  font-weight: 700;
}

.inherit-flow b {
  color: var(--md-sys-color-primary);
}
</style>
