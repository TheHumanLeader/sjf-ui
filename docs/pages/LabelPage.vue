<template>
  <div class="page page-narrow">
    <p class="page-kicker">FORM · COMPONENT 001</p>
    <h1 class="page-title">Label 标签布局</h1>
    <p class="page-subtitle">
      Label 是 SJF-UI 的通用“标签 + 内容”布局壳。它不只是文字标签，而是 Input、Select、Textarea、DatePicker 等输入组件共同复用的布局基础。
      输入组件默认内置 Label，并默认使用 <span class="inline-code">m3</span>。
    </p>

    <div class="mode-list">
      <span v-for="mode in modes" :key="mode" class="mode-pill">{{ mode }}</span>
    </div>

    <section class="section">
      <div class="section-head">
        <h2>Usage</h2>
        <p>下面所有示例都直接运行仓库里的 <span class="inline-code">src/components/Label/index.vue</span>。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>五种布局模式</strong>
          <code>size="nm"</code>
        </div>
        <div class="demo-stage">
          <div class="demo-grid">
            <div>
              <div class="demo-label">m3 · default</div>
              <SjfLabel
                label="用户名"
                required
                :focused="m3Focused"
                :filled="Boolean(m3Value)"
                helper="Material 3 浮动标签"
              >
                <input
                  v-model="m3Value"
                  class="doc-input doc-input--m3"
                  @focus="m3Focused = true"
                  @blur="m3Focused = false"
                />
              </SjfLabel>
            </div>

            <div>
              <div class="demo-label">horizontal</div>
              <SjfLabel label="用户名" mode="horizontal">
                <input class="doc-input" value="张三" />
              </SjfLabel>
            </div>

            <div>
              <div class="demo-label">horizontal-box</div>
              <SjfLabel label="用户名" mode="horizontal-box">
                <input class="doc-input doc-input--embedded" value="张三" />
              </SjfLabel>
            </div>

            <div>
              <div class="demo-label">vertical</div>
              <SjfLabel label="用户名" mode="vertical">
                <input class="doc-input" value="张三" />
              </SjfLabel>
            </div>

            <div>
              <div class="demo-label">vertical-box</div>
              <SjfLabel label="用户名" mode="vertical-box">
                <input class="doc-input doc-input--embedded" value="张三" />
              </SjfLabel>
            </div>

            <div>
              <div class="demo-label">error</div>
              <SjfLabel label="用户名" :filled="true" error helper="用户名不能为空">
                <input class="doc-input doc-input--m3" value="" />
              </SjfLabel>
            </div>
          </div>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SjfLabel label="用户名" /&gt;
&lt;SjfLabel label="用户名" mode="horizontal" /&gt;
&lt;SjfLabel label="用户名" mode="horizontal-box" /&gt;
&lt;SjfLabel label="用户名" mode="vertical" /&gt;
&lt;SjfLabel label="用户名" mode="vertical-box" /&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Rich Label · Icon + Title + Subtitle</h2>
        <p>Label 不局限于单行文字。SjfLabelContent 提供图标、主标题、副标题三段结构，图标相对 Title + Subtitle 整体垂直居中。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>Rich Label Content</strong>
          <code>icon · title · subtitle</code>
        </div>
        <div class="demo-stage">
          <div class="demo-grid">
            <div>
              <div class="demo-label">SjfLabel · horizontal-box</div>
              <SjfLabel mode="horizontal-box" required>
                <template #label>
                  <SjfLabelContent title="账号信息" subtitle="用于登录与身份识别">
                    <template #icon>
                      <span class="rich-label-icon">人</span>
                    </template>
                  </SjfLabelContent>
                </template>
                <input class="doc-input doc-input--embedded" value="TheHumanLeader" />
              </SjfLabel>
            </div>

            <div>
              <div class="demo-label">SjfInput · forwarded label slot</div>
              <SjfInput model-value="研发中心" label-option="" label-align="left">
                <template #label>
                  <SjfLabelContent title="所属部门" subtitle="当前组织归属">
                    <template #icon>
                      <span class="rich-label-icon">部</span>
                    </template>
                  </SjfLabelContent>
                </template>
              </SjfInput>
            </div>
          </div>
        </div>
      </article>

      <div class="code-card">
        <pre><code>&lt;SjfLabel mode="horizontal-box"&gt;
  &lt;template #label&gt;
    &lt;SjfLabelContent
      title="账号信息"
      subtitle="用于登录与身份识别"
    &gt;
      &lt;template #icon&gt;
        &lt;UserIcon /&gt;
      &lt;/template&gt;
    &lt;/SjfLabelContent&gt;
  &lt;/template&gt;

  &lt;MyControl /&gt;
&lt;/SjfLabel&gt;</code></pre>
      </div>

      <div class="callout">
        M3 浮动 Label 继续保持短标题语义；Rich Label 主要用于 horizontal / horizontal-box / vertical / vertical-box。
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Size</h2>
        <p>Label 自身没有五套写死样式。它把相对 recipe 交给全局 Size Core 解析。</p>
      </div>

      <article class="demo-card">
        <div class="demo-titlebar">
          <strong>组件显式 size</strong>
          <code>mn &lt; sm &lt; nm &lt; md &lt; lg</code>
        </div>
        <div class="demo-stage">
          <div class="size-row">
            <div v-for="size in sizes" :key="size" class="size-demo">
              <div class="demo-label">{{ size }}</div>
              <SjfLabel label="姓名" mode="vertical" :size="size">
                <input class="doc-input" value="张三" />
              </SjfLabel>
            </div>
          </div>
        </div>
      </article>

      <article class="demo-card" style="margin-top: 14px">
        <div class="demo-titlebar">
          <strong>全局 Base Size</strong>
          <code>未传 size 的组件跟随全局</code>
        </div>
        <div class="demo-stage">
          <div class="hero-actions" style="margin-top: 0; margin-bottom: 22px">
            <button
              v-for="size in baseSizeChoices"
              :key="size"
              class="secondary-action size-switch"
              :class="{ selected: currentBaseSize === size }"
              type="button"
              @click="changeBaseSize(size)"
            >
              {{ size }}
            </button>
          </div>

          <SjfLabel label="全局尺寸演示" mode="horizontal" helper="切换上面的 base size，整个组件关系一起移动">
            <input class="doc-input" value="跟随全局 Size Core" />
          </SjfLabel>
        </div>
      </article>

      <div class="callout">
        Label recipe 示例：主体字号 <span class="inline-code">0</span>、浮动字号 <span class="inline-code">-1</span>、gap
        <span class="inline-code">-1</span>、radius <span class="inline-code">-1</span>、controlHeight <span class="inline-code">0</span>。
        所以 baseSize 从 nm 调到 md，不是只把 Input 变高，而是内部关系一起上移。
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Box</h2>
        <p>带 box 的模式拥有唯一外层结构边界，不允许再在里面套一层完整输入框边框。</p>
      </div>
      <article class="demo-card">
        <div class="demo-stage">
          <SjfLabel label="所属部门" mode="horizontal-box" helper="内容区处于 embedded / merged 状态">
            <input class="doc-input doc-input--embedded" value="研发中心 / 前端平台" />
          </SjfLabel>
        </div>
      </article>
      <div class="callout">
        Box 模式会向内部暴露 <span class="inline-code">--sjf-control-embedded: 1</span>。后续 SjfInput / SjfSelect 会据此自动取消自身外边框与外圆角。
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>API</h2>
        <p>第一版保持 API 小而明确。</p>
      </div>
      <div class="api-card">
        <table class="api-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td><code>label</code></td><td>string</td><td>''</td><td>标签文本</td></tr>
            <tr><td><code>mode</code></td><td>SjfLabelMode</td><td>'m3'</td><td>五种布局模式</td></tr>
            <tr><td><code>size</code></td><td>SjfSize</td><td>global</td><td>未传时读取全局 Base Size</td></tr>
            <tr><td><code>required</code></td><td>boolean</td><td>false</td><td>必填标识</td></tr>
            <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>禁用视觉状态</td></tr>
            <tr><td><code>error</code></td><td>boolean</td><td>false</td><td>错误语义状态</td></tr>
            <tr><td><code>focused</code></td><td>boolean</td><td>false</td><td>M3 浮动与 focus 视觉状态</td></tr>
            <tr><td><code>filled</code></td><td>boolean</td><td>false</td><td>M3 有值时保持浮动</td></tr>
            <tr><td><code>helper</code></td><td>string</td><td>''</td><td>辅助 / 错误说明</td></tr>
            <tr><td><code>#label</code></td><td>slot</td><td>-</td><td>自定义 Label 内容，可使用 SjfLabelContent</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Design</h2>
        <p>设计图和 design.md 与组件代码放在同一个组件目录中，设计不是散落在外部的附件。</p>
      </div>
      <article class="design-image-card">
        <img :src="designUrl" alt="SJF-UI Label 组件设计图" />
      </article>
    </section>
  </div>
</template>

<script setup vapor lang="ts">
import { ref } from 'vue'
import SjfLabel from '@/components/Label/index.vue'
import SjfInput from '@/components/Input/index.vue'
import { SjfLabelContent } from '@/components/Label'
import {
  setSjfBaseSize,
  useSjfBaseSize,
  type SjfBuiltinSize,
} from '@/core/size'
import designUrl from '@/components/Label/design.svg?url'

const modes = ['m3', 'horizontal', 'horizontal-box', 'vertical', 'vertical-box'] as const
const sizes: SjfBuiltinSize[] = ['mn', 'sm', 'nm', 'md', 'lg']
const baseSizeChoices: SjfBuiltinSize[] = ['sm', 'nm', 'md']

const m3Value = ref('')
const m3Focused = ref(false)
const currentBaseSize = useSjfBaseSize()

function changeBaseSize(size: SjfBuiltinSize): void {
  setSjfBaseSize(size)
}
</script>

<style scoped>
.size-switch {
  border: 1px solid var(--docs-border);
  cursor: pointer;
}

.size-switch.selected {
  border-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-primary);
  background: var(--md-sys-color-primary-container);
}

.rich-label-icon {
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

.design-image-card {
  overflow: hidden;
  border: 1px solid var(--docs-border);
  border-radius: 15px;
  background: white;
  box-shadow: var(--docs-shadow);
}

.design-image-card img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
