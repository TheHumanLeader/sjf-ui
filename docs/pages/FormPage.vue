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
        <p>下面始终是 5 列原始 Grid。切换模式时不改字段代码；Label 和内容文本还可以分别控制左右对齐。</p>
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

      <div class="align-toolbar">
        <div class="align-group">
          <strong>Label 对齐</strong>
          <button
            v-for="item in alignChoices"
            :key="`label-${item}`"
            type="button"
            class="secondary-action size-switch"
            :class="{ selected: labelAlign === item }"
            @click="labelAlign = item"
          >
            {{ item }}
          </button>
        </div>
        <div class="align-group">
          <strong>Content 对齐</strong>
          <button
            v-for="item in alignChoices"
            :key="`content-${item}`"
            type="button"
            class="secondary-action size-switch"
            :class="{ selected: contentAlign === item }"
            @click="contentAlign = item"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>5-column Raw Grid</strong>
          <code>label="{{ labelAlign }}" · content="{{ contentAlign }}"</code>
        </div>
        <div class="demo-stage">
          <SjfForm
            :columns="5"
            :label-mode="mode"
            :label-align="labelAlign"
            :content-align="contentAlign"
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
        <pre><code>&lt;SjfForm
  :columns="5"
  label-mode="horizontal-box"
  label-align="right"
  content-align="left"
&gt;
  &lt;SjfInput label="姓名" :col-span="2" /&gt;
  &lt;SjfInput
    label="工号"
    label-align="center"
    content-align="right"
    :col-span="1"
  /&gt;
&lt;/SjfForm&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Row Span · 跨行布局</h2>
        <p>Label Cell 和 Control Cell 都可以独立设置 rowSpan。左侧字段跨两行，右侧正常排两组字段。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>4-column · rowSpan=2</strong>
          <code>horizontal-box</code>
        </div>
        <div class="demo-stage">
          <SjfForm
            :columns="4"
            label-mode="horizontal-box"
            :gap="0"
            :label-option="{ colSpan: 1 }"
          >
            <SjfInput
              v-model="rowSpanForm.department"
              label="部门说明"
              :label-option="{ rowSpan: 2 }"
              :col-span="1"
              :row-span="2"
            />

            <SjfInput
              v-model="rowSpanForm.owner"
              label="负责人"
              :col-span="1"
            />

            <SjfInput
              v-model="rowSpanForm.phone"
              label="联系电话"
              :col-span="1"
            />
          </SjfForm>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SjfForm :columns="4" label-mode="horizontal-box" :gap="0"&gt;
  &lt;SjfInput
    label="部门说明"
    :label-option="{ colSpan: 1, rowSpan: 2 }"
    :col-span="1"
    :row-span="2"
  /&gt;

  &lt;SjfInput label="负责人" :col-span="1" /&gt;
  &lt;SjfInput label="联系电话" :col-span="1" /&gt;
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
          对齐同样支持 Form 默认值和字段局部覆盖。
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
            <span class="inline-code">labelOption.colSpan / rowSpan</span> 控制 Label Cell；
            <span class="inline-code">colSpan / rowSpan</span> 控制 Control Cell。
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
import type { SjfHorizontalAlign, SjfLabelMode } from '@/components/Label'

const modes: SjfLabelMode[] = ['m3', 'horizontal', 'horizontal-box']
const alignChoices: SjfHorizontalAlign[] = ['left', 'center', 'right']
const mode = ref<SjfLabelMode>('m3')
const labelAlign = ref<SjfHorizontalAlign>('left')
const contentAlign = ref<SjfHorizontalAlign>('left')

const form = reactive({
  name: '张三',
  code: 'SJF-001',
  department: '研发中心',
  address: '合肥市 · 软件园',
  phone: '13800000000',
  status: '在职',
})

const rowSpanForm = reactive({
  department: '研发中心 / 前端平台组',
  owner: '王小明',
  phone: '13900000000',
})
</script>

<style scoped>
.form-mode-actions {
  margin: 0 0 14px;
}

.align-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sjf-gap-nm);
  margin-bottom: 14px;
}

.align-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--sjf-gap-sm);
}

.align-group strong {
  font-size: 11px;
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
