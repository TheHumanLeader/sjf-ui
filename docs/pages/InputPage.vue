<template>
  <div class="page page-narrow">
    <p class="page-kicker">FORM · COMPONENT 002</p>
    <h1 class="page-title">Input 输入框</h1>
    <p class="page-subtitle">
      SjfInput 使用统一 Control Shell，原生 input 只负责文本编辑。它完整继承 SjfLabel、SjfForm、Size、Theme 与 Motion Foundation。
    </p>

    <section class="section">
      <div class="section-head">
        <h2>Basic · 默认 M3</h2>
        <p>不传 labelMode 时直接使用 Material 3 浮动 Label。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>v-model</strong>
          <code>label="用户名"</code>
        </div>
        <div class="demo-stage input-demo-column">
          <SjfInput
            v-model="basicValue"
            label="用户名"
            placeholder="请输入用户名"
            clearable
            helper=""
          />
          <div class="callout">当前值：<span class="inline-code">{{ basicValue || '(empty)' }}</span></div>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SjfInput
  v-model="username"
  label="用户名"
  placeholder="请输入用户名"
  clearable
/&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Prefix / Suffix / Actions</h2>
        <p>prefix 与 suffix 是任意 slot；clearable、密码可见性和计数属于 Input 自己的标准动作。</p>
      </div>

      <div class="grid-2 gap-nm">
        <article class="demo-card">
          <div class="demo-titlebar">
            <strong>Prefix + Suffix + Clear</strong>
            <code>clearable</code>
          </div>
          <div class="demo-stage">
            <SjfInput v-model="mailValue" label="企业邮箱" clearable>
              <template #prefix>
                <span class="input-adornment">@</span>
              </template>
              <template #suffix>
                <span class="input-adornment">sjf.dev</span>
              </template>
            </SjfInput>
          </div>
        </article>

        <article class="demo-card">
          <div class="demo-titlebar">
            <strong>Password</strong>
            <code>show-password</code>
          </div>
          <div class="demo-stage">
            <SjfInput
              v-model="passwordValue"
              label="密码"
              type="password"
              show-password
              clearable
            />
          </div>
        </article>

        <article class="demo-card">
          <div class="demo-titlebar">
            <strong>Character Count</strong>
            <code>maxlength="24"</code>
          </div>
          <div class="demo-stage">
            <SjfInput
              v-model="countValue"
              label="显示名称"
              :maxlength="24"
              show-count
              clearable
            />
          </div>
        </article>

        <article class="demo-card">
          <div class="demo-titlebar">
            <strong>Rich Label</strong>
            <code>#label</code>
          </div>
          <div class="demo-stage">
            <SjfInput
              v-model="departmentValue"
              :label-option="{ mode: 'horizontal' }"
              :col-span="2"
            >
              <template #label>
                <SjfLabelContent title="所属部门" subtitle="当前组织归属">
                  <template #icon>
                    <span class="input-label-icon">部</span>
                  </template>
                </SjfLabelContent>
              </template>
            </SjfInput>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>States</h2>
        <p>focus / readonly / disabled / error 都由 SJF 自己绘制，不使用浏览器默认 focus ring。</p>
      </div>

      <div class="grid-2 gap-nm">
        <article class="spec-card">
          <div class="demo-label">readonly</div>
          <SjfInput model-value="不可编辑但可读取" label="只读字段" readonly :label-option="{ mode: 'vertical' }" />
        </article>
        <article class="spec-card">
          <div class="demo-label">disabled</div>
          <SjfInput model-value="已禁用" label="禁用字段" disabled :label-option="{ mode: 'vertical' }" />
        </article>
        <article class="spec-card">
          <div class="demo-label">error</div>
          <SjfInput model-value="BAD-001" label="错误字段" error :label-option="{ mode: 'vertical', helper: '字段内容无效' }" />
        </article>
        <article class="spec-card">
          <div class="demo-label">contentAlign=right</div>
          <SjfInput model-value="12,345.00" label="金额" content-align="right" :label-option="{ mode: 'vertical' }" />
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>同一个 Input · 切 Label Mode</h2>
        <p>Input 本身不实现五套 Label 布局，切换只来自 Form / Label Context。</p>
      </div>

      <div class="hero-actions input-mode-actions">
        <button
          v-for="item in modes"
          :key="item"
          class="secondary-action input-mode-button"
          :class="{ selected: mode === item }"
          type="button"
          @click="mode = item"
        >
          {{ item }}
        </button>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>SjfForm + SjfInput</strong>
          <code>{{ mode }}</code>
        </div>
        <div class="demo-stage">
          <SjfForm
            :columns="4"
            :label-mode="mode"
            :gap="mode.includes('box') ? 0 : 'sm'"
            :label-option="{ colSpan: 1 }"
          >
            <SjfInput v-model="form.name" label="姓名" :col-span="1" />
            <SjfInput v-model="form.code" label="工号" :col-span="1" />
            <SjfInput v-model="form.phone" label="联系电话" :col-span="3" />
          </SjfForm>
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Native passthrough</h2>
        <p>没有必要把 HTML input 的所有属性重新包装。未消费属性直接透传给真实 input。</p>
      </div>
      <article class="spec-card">
        <div class="row wrap gap-sm">
          <code class="inline-code">inputmode</code>
          <code class="inline-code">pattern</code>
          <code class="inline-code">min / max / step</code>
          <code class="inline-code">aria-*</code>
          <code class="inline-code">data-*</code>
          <code class="inline-code">spellcheck</code>
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>API</h2>
        <p>v0.1 只保留高频能力，其余原生属性走 passthrough。</p>
      </div>
      <div class="api-card">
        <table class="api-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td><code>modelValue</code></td><td>string | number | null</td><td>输入值</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>内置 SjfLabel 标题</td></tr>
            <tr><td><code>labelOption</code></td><td>SjfLabelOption</td><td>Label 完整局部配置</td></tr>
            <tr><td><code>size</code></td><td>SjfSize</td><td>组件尺寸，未传时继承全局</td></tr>
            <tr><td><code>colSpan / rowSpan</code></td><td>number</td><td>Form Control Cell 跨列 / 跨行</td></tr>
            <tr><td><code>labelAlign / contentAlign</code></td><td>left | center | right</td><td>Label / 输入内容对齐</td></tr>
            <tr><td><code>clearable</code></td><td>boolean</td><td>显示清空动作</td></tr>
            <tr><td><code>showPassword</code></td><td>boolean</td><td>password / text 可见性切换</td></tr>
            <tr><td><code>showCount</code></td><td>boolean</td><td>显示字符数量</td></tr>
            <tr><td><code>maxlength / minlength</code></td><td>number</td><td>原生长度限制</td></tr>
            <tr><td><code>readonly / disabled / error</code></td><td>boolean</td><td>状态</td></tr>
            <tr><td><code>#prefix / #suffix / #label</code></td><td>slot</td><td>前后内容与 Rich Label</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup vapor lang="ts">
import { reactive, ref } from 'vue'
import SjfForm from '@/components/Form/index.vue'
import SjfInput from '@/components/Input/index.vue'
import { SjfLabelContent, type SjfLabelMode } from '@/components/Label'

const basicValue = ref('')
const mailValue = ref('human')
const passwordValue = ref('sjf-ui-2026')
const countValue = ref('SheJiFan UI')
const departmentValue = ref('研发中心')

const modes: SjfLabelMode[] = ['m3', 'horizontal', 'horizontal-box', 'vertical', 'vertical-box']
const mode = ref<SjfLabelMode>('horizontal-box')

const form = reactive({
  name: '张三',
  code: 'SJF-001',
  phone: '13800000000',
})
</script>

<style scoped>
.input-demo-column {
  display: flex;
  flex-direction: column;
  gap: var(--sjf-gap-nm);
}

.input-adornment {
  color: var(--md-sys-color-on-surface-variant);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.input-label-icon {
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
  border-radius: 9px;
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-size: 12px;
  font-weight: 800;
}

.input-mode-actions {
  margin: 0 0 14px;
}

.input-mode-button {
  border: 1px solid var(--docs-border);
  cursor: pointer;
}

.input-mode-button.selected {
  border-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-primary);
  background: var(--md-sys-color-primary-container);
}
</style>
