<template>
  <div class="page component-page">
    <p class="page-kicker">{{ entry.group }} · SJF-UI / V0.1</p>
    <h1 class="page-title">
      {{ entry.name }} <span>{{ entry.label }}</span>
    </h1>
    <p class="page-subtitle">{{ entry.description }}</p>
    <section class="section">
      <div class="section-head">
        <h2>交互示例</h2>
        <p>这里运行的就是组件本身。调整尺寸、切换状态，也可以使用键盘体验。</p>
      </div>
      <div class="demo-toolbar">
        <div class="demo-sizes" aria-label="演示尺寸">
          <button
            v-for="value in sizes"
            :key="value"
            type="button"
            :aria-pressed="demoSize === value"
            @click="demoSize = value"
          >
            {{ value }}
          </button>
        </div>
        <label><input v-model="disabled" type="checkbox" /> 禁用表单控件</label>
      </div>
      <div class="demo-card">
        <div class="demo-titlebar">
          <strong>{{ entry.name }} / Playground</strong
          ><code>size="{{ demoSize }}"</code>
        </div>
        <div class="demo-stage showcase-stage">
          <template v-if="entry.name === 'Button'"
            ><SJFSpace
              ><SJFButton
                :size="demoSize"
                :disabled="disabled"
                icon="add"
                @click="clicks++"
                >新建项目</SJFButton
              ><SJFButton
                :size="demoSize"
                :disabled="disabled"
                variant="tonal"
                @click="clicks++"
                >保存草稿</SJFButton
              ><SJFButton
                :size="demoSize"
                :disabled="disabled"
                variant="outlined"
                @click="clicks++"
                >邀请成员</SJFButton
              ><SJFButton
                :size="demoSize"
                :disabled="disabled"
                variant="text"
                @click="clicks++"
                >了解更多</SJFButton
              ><SJFButton
                :size="demoSize"
                danger
                :disabled="disabled"
                @click="clicks++"
                >删除</SJFButton
              ><SJFButton
                :size="demoSize"
                :loading="loading"
                @click="loading = true"
                >{{ loading ? '保存中' : '保存' }}</SJFButton
              ><SJFButton variant="text" @click="loading = false"
                >重置加载</SJFButton
              ></SJFSpace
            >
            <p class="demo-result" role="status">
              已点击 {{ clicks }} 次
            </p></template
          >
          <template v-else-if="entry.name === 'Avatar'"
            ><SJFSpace
              ><SJFAvatar :size="demoSize" name="林 沐" /><SJFAvatar
                :size="demoSize"
                name="SJF"
                square /><SJFAvatar
                v-for="s in sizes"
                :key="s"
                :size="s"
                :name="s.toUpperCase()" /></SJFSpace
          ></template>
          <template v-else-if="entry.name === 'Badge'"
            ><SJFSpace
              ><SJFBadge :size="demoSize" :value="count"
                ><SJFButton variant="tonal" :size="demoSize" @click="count++"
                  >收件箱</SJFButton
                ></SJFBadge
              ><SJFBadge :value="120" /><SJFBadge dot
                ><SJFIcon name="notifications" :size="demoSize" /></SJFBadge
              ><SJFButton variant="text" @click="count = 0"
                >全部已读</SJFButton
              ></SJFSpace
            ></template
          >
          <template v-else-if="entry.name === 'Chip'"
            ><SJFSpace
              ><SJFChip
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                :size="demoSize"
                :disabled="disabled"
                selectable
                closable
                @close="tags = tags.filter((t) => t !== tag)"
              /><SJFButton
                variant="text"
                @click="tags = ['设计', '前端', '待评审']"
                >恢复标签</SJFButton
              ></SJFSpace
            ></template
          >
          <template v-else-if="entry.name === 'Card'"
            ><div class="showcase-grid">
              <SJFCard
                v-for="variant in cardVariants"
                :key="variant"
                title="协作空间"
                :subtitle="variant"
                :variant="variant"
                :size="demoSize"
                ><p>把计划、成员和交付内容放在一起。</p>
                <template #footer
                  ><SJFButton variant="text" :size="demoSize" @click="clicks++"
                    >查看详情</SJFButton
                  ></template
                ></SJFCard
              >
            </div>
            <p class="demo-result">打开详情 {{ clicks }} 次</p></template
          >
          <template v-else-if="entry.name === 'Divider'"
            ><p>项目概况</p>
            <SJFDivider :size="demoSize" label="最近动态" /><SJFSpace
              ><span>编辑</span><SJFDivider vertical /><span>复制</span
              ><SJFDivider vertical /><span>归档</span></SJFSpace
            ></template
          >
          <template v-else-if="entry.name === 'Space'"
            ><SJFSpace :size="demoSize" :vertical="checked"
              ><SJFButton
                v-for="label in ['设计', '开发', '评审']"
                :key="label"
                variant="tonal"
                >{{ label }}</SJFButton
              ></SJFSpace
            ><SJFSwitch
              v-model="checked"
              v-bind="field"
              label="排列方向"
              on-text="纵向"
              off-text="横向"
          /></template>
          <template v-else-if="entry.name === 'Textarea'"
            ><SJFTextarea
              v-model="text"
              v-bind="field"
              label="项目说明"
              placeholder="写下项目背景和预期结果…"
              :maxlength="200"
              show-count
            /><SJFTextarea
              v-bind="field"
              label="错误状态"
              :error="true"
              helper="说明至少需要 10 个字。"
            /><output class="demo-result"
              >{{ text.length }} 个字符</output
            ></template
          >
          <template v-else-if="entry.name === 'InputNumber'"
            ><SJFInputNumber
              v-model="amount"
              v-bind="field"
              label="预算（万元）"
              :min="0"
              :max="10"
              :step="0.1"
            /><output class="demo-result"
              >数值：{{ amount ?? '空' }} · 范围 0–10，步进 0.1</output
            ></template
          >
          <template v-else-if="entry.name === 'Select'"
            ><div class="showcase-grid">
              <SJFSelect
                v-model="person"
                v-bind="field"
                :options="people"
                label="负责人"
                searchable
                clearable
              /><SJFSelect
                v-model="members"
                v-bind="field"
                :options="people"
                label="协作者"
                multiple
                searchable
                clearable
              /><SJFSelect
                v-bind="field"
                :options="[]"
                label="空选项"
                searchable
              />
            </div>
            <output class="demo-result"
              >负责人：{{ person ?? '未选择' }} · 协作者：{{
                members.join(', ') || '无'
              }}</output
            >
            <p class="showcase-hint">
              方向键移动，Enter 选择，Escape 关闭；“暂不可用”不可选择。
            </p></template
          >
          <template v-else-if="entry.name === 'Checkbox'"
            ><div class="showcase-grid">
              <SJFCheckbox
                v-model="checked"
                v-bind="field"
                label="项目通知"
                text="接收进度更新"
              /><SJFCheckbox
                v-bind="field"
                label="部分选中"
                text="部分任务完成"
                indeterminate
              />
            </div>
            <output class="demo-result">选中：{{ checked }}</output></template
          >
          <template v-else-if="entry.name === 'Radio'"
            ><SJFSpace
              ><SJFRadio
                v-model="plan"
                v-bind="field"
                label="方案 A"
                name="demo-plan"
                value="personal"
                text="个人版" /><SJFRadio
                v-model="plan"
                v-bind="field"
                label="方案 B"
                name="demo-plan"
                value="team"
                text="团队版" /></SJFSpace
            ><output class="demo-result">当前方案：{{ plan }}</output></template
          >
          <template v-else-if="entry.name === 'Switch'"
            ><SJFSwitch
              v-model="checked"
              v-bind="field"
              label="自动保存"
            /><output class="demo-result"
              >自动保存：{{ checked ? '开启' : '关闭' }}</output
            ></template
          >
          <template v-else-if="entry.name === 'Slider'"
            ><SJFSlider
              v-model="volume"
              v-bind="field"
              label="界面缩放"
              :min="0"
              :max="100"
              :step="5"
              show-value /><SJFProgress
              :model-value="volume"
              :size="demoSize"
              label="预览值"
          /></template>
          <template v-else-if="entry.name === 'DatePicker'"
            ><SJFDatePicker
              v-model="date"
              v-bind="field"
              label="截止日期"
            /><output class="demo-result">日期：{{ date || '未选择' }}</output>
            <p class="showcase-hint">
              v0.1 使用浏览器原生日期选择器，返回 YYYY-MM-DD，不进行时区转换。
            </p></template
          >
          <template v-else-if="entry.name === 'TimePicker'"
            ><SJFTimePicker
              v-model="time"
              v-bind="field"
              label="提醒时间"
              :step="60"
            /><output class="demo-result">时间：{{ time || '未选择' }}</output>
            <p class="showcase-hint">
              v0.1 使用浏览器原生时间选择器，当前按分钟选择。
            </p></template
          >
          <template v-else-if="entry.name === 'Upload'"
            ><SJFUpload
              v-model="files"
              v-bind="field"
              label="附件"
              multiple
              accept=".txt,.pdf,.png,.jpg"
              :max-size="5242880"
              :limit="3"
            /><output class="demo-result"
              >已选择 {{ files.length }} 个文件 · 每个不超过 5 MB，最多 3
              个</output
            ></template
          >
          <template v-else-if="entry.name === 'Item'"
            ><SJFItem
              v-model:active="checked"
              :size="demoSize"
              title="项目通知"
              subtitle="直接使用独立 Item"
              icon="inbox"
              :disabled="disabled"
              ><template #append><SJFBadge :value="12" /></template></SJFItem
            ><output class="demo-result"
              >active：{{ checked }}</output
            ></template
          >
          <template v-else-if="entry.name === 'Menu'"
            ><div class="showcase-grid">
              <SJFMenu
                v-model="menu"
                :items="menuItems"
                :size="demoSize"
                label="工作区导航"
              />
              <div>
                <p>当前空间</p>
                <h3>{{ menu }}</h3>
                <p class="showcase-hint">
                  方向键移动焦点，Enter / Space 确认。
                </p>
              </div>
            </div>
            <SJFDivider /><SJFMenu
              v-model="menu"
              :items="menuItems"
              :size="demoSize"
              horizontal
              label="横向导航"
          /></template>
          <template v-else-if="entry.name === 'Tabs'"
            ><SJFTabs v-model="tab" :items="tabItems" :size="demoSize"
              ><template #overview
                ><SJFDescriptions :items="details" bordered /></template
              ><template #activity
                ><SJFAlert title="最近更新" tone="success"
                  >设计文件已同步，等待开发评审。</SJFAlert
                ></template
              ><template #settings
                ><SJFInput
                  v-model="projectName"
                  label="项目名称"
                  :label-option="{ mode: 'vertical' }" /></template></SJFTabs
          ></template>
          <template v-else-if="entry.name === 'Tree'"
            ><div class="showcase-grid">
              <div>
                <p class="demo-label">单选 · 工作区</p>
                <SJFTree
                  v-model="treeActive"
                  v-model:expanded="expanded"
                  :nodes="treeNodes"
                  :size="demoSize"
                  label="项目目录"
                />
              </div>
              <div>
                <p class="demo-label">多选 · 资源范围</p>
                <SJFTree
                  v-model="treeMulti"
                  v-model:expanded="multiExpanded"
                  :nodes="treeNodes"
                  :size="demoSize"
                  multiple
                  label="资源选择"
                />
              </div>
            </div>
            <output class="demo-result"
              >单选：{{ treeActive }} · 多选：{{
                treeMulti.join(', ') || '无'
              }}</output
            ></template
          >
          <template v-else-if="entry.name === 'Breadcrumbs'"
            ><SJFBreadcrumbs
              :size="demoSize"
              :items="[
                { label: '组件总览', href: '#/components' },
                { label: '导航组件', href: '#/components/menu' },
                { label: '面包屑' },
              ]"
          /></template>
          <template v-else-if="entry.name === 'Pagination'"
            ><SJFPagination
              v-model="page"
              :total="128"
              :page-size="10"
              :size="demoSize"
              :disabled="disabled"
            /><output class="demo-result">当前页：{{ page }}</output></template
          >
          <template v-else-if="entry.name === 'Steps'"
            ><SJFSteps
              v-model="step"
              :items="steps"
              :size="demoSize"
              clickable
            /><SJFSpace
              ><SJFButton
                variant="outlined"
                :disabled="step === 0"
                @click="step--"
                >上一步</SJFButton
              ><SJFButton :disabled="step === 2" @click="step++"
                >下一步</SJFButton
              ></SJFSpace
            ><output class="demo-result">{{
              steps[step].title
            }}</output></template
          >
          <template v-else-if="entry.name === 'Table'"
            ><div class="showcase-table-tools">
              <SJFInput
                v-model="filter"
                label="搜索成员"
                clearable
                :label-option="{ mode: 'vertical' }"
              /><SJFButton
                variant="outlined"
                @click="tableLoading = !tableLoading"
                >{{ tableLoading ? '加载完成' : '演示加载' }}</SJFButton
              >
            </div>
            <SJFTable
              v-model:selected="selectedRows"
              :rows="filteredRows"
              :columns="columns"
              :size="demoSize"
              row-key="id"
              selectable
              paginated
              :page-size="5"
              striped
              :loading="tableLoading"
              caption="项目成员"
              ><template #cell-status="{ value }"
                ><SJFChip :label="String(value)" /></template></SJFTable
            ><output class="demo-result"
              >已选行：{{ selectedRows.join(', ') || '无' }}</output
            ></template
          >
          <template v-else-if="entry.name === 'Descriptions'"
            ><SJFDescriptions
              :items="details"
              :size="demoSize"
              :columns="2"
              bordered
              ><template #status
                ><SJFChip
                  label="进行中"
                  :model-value="true" /></template></SJFDescriptions
          ></template>
          <template v-else-if="entry.name === 'Collapse'"
            ><SJFCollapse
              v-model="sections"
              :items="questions"
              :size="demoSize"
              :accordion="checked"
            /><SJFSwitch
              v-model="checked"
              v-bind="field"
              label="手风琴模式"
            /><output class="demo-result"
              >展开：{{ sections.join(', ') || '无' }}</output
            ></template
          >
          <template v-else-if="entry.name === 'Empty'"
            ><SJFEmpty
              :size="demoSize"
              title="还没有项目"
              description="创建第一个项目，开始整理工作。"
              ><SJFButton icon="add" @click="clicks++"
                >新建项目</SJFButton
              ></SJFEmpty
            ><output class="demo-result"
              >创建操作：{{ clicks }} 次</output
            ></template
          >
          <template v-else-if="entry.name === 'Skeleton'"
            ><SJFSkeleton
              v-if="loading"
              :size="demoSize"
              :rows="4"
              avatar
            /><SJFCard v-else title="项目已加载" :size="demoSize"
              >这里是实际内容，切换按钮可以体验加载状态。</SJFCard
            ><SJFButton variant="outlined" @click="loading = !loading">{{
              loading ? '显示内容' : '显示骨架屏'
            }}</SJFButton></template
          >
          <template v-else-if="entry.name === 'Progress'"
            ><SJFProgress
              :size="demoSize"
              :model-value="volume"
              label="文件同步"
              show-value /><SJFSlider
              v-model="volume"
              v-bind="field"
              label="调整进度" /><SJFProgress
              label="正在建立连接"
              indeterminate
          /></template>
          <template v-else-if="entry.name === 'Alert'"
            ><SJFAlert
              v-for="tone in tones"
              :key="tone"
              :tone="tone"
              :title="toneLabels[tone]"
              :size="demoSize"
              closable
              >这是状态说明，可以点击右侧关闭。</SJFAlert
            ></template
          >
          <template v-else-if="entry.name === 'Popover'"
            ><SJFSpace
              ><SJFPopover title="项目概览" label="打开浮层" :size="demoSize"
                ><p>使用统一锚点定位。移动页面时保持跟随。</p>
                <SJFInput
                  v-model="projectName"
                  label="项目名称"
                  :label-option="{ mode: 'vertical' }" /></SJFPopover
              ><SJFPopover
                title="侧边浮层"
                label="右侧定位"
                placement="right"
                :size="demoSize"
                >靠近边缘时自动调整位置。</SJFPopover
              ></SJFSpace
            ></template
          >
          <template v-else-if="entry.name === 'Tooltip'"
            ><SJFSpace
              ><SJFTooltip
                text="保存当前项目，保留所有修改。"
                label="保存说明"
                :size="demoSize"
              /><SJFTooltip text="此操作可撤销。" placement="bottom"
                ><template #default="{ attrs }"
                  ><SJFButton
                    v-bind="attrs"
                    variant="outlined"
                    :size="demoSize"
                    icon="archive"
                    >归档</SJFButton
                  ></template
                ></SJFTooltip
              ></SJFSpace
            ></template
          >
          <template v-else-if="entry.name === 'Dropdown'"
            ><SJFDropdown
              :items="actions"
              label="更多操作"
              :size="demoSize"
              @select="lastAction = String($event)"
            /><output class="demo-result"
              >最近操作：{{ lastAction || '尚未选择' }}</output
            ></template
          >
          <template v-else-if="entry.name === 'Dialog'"
            ><SJFButton :size="demoSize" @click="dialogOpen = true"
              >打开对话框</SJFButton
            ><SJFDialog
              v-model="dialogOpen"
              title="编辑项目"
              :size="demoSize"
              confirm-text="保存项目"
              @confirm="
                () => {
                  snackMessage = '项目已保存'
                  snackOpen = true
                }
              "
              ><p>修改项目名称，确认后会出现消息提示。</p>
              <SJFInput
                v-model="projectName"
                label="项目名称"
                :label-option="{ mode: 'vertical' }" /><SJFSelect
                v-model="person"
                :options="people"
                label="负责人"
                :label-option="{ mode: 'vertical' }" /></SJFDialog
            ><SJFSnackbar v-model="snackOpen" :message="snackMessage"
          /></template>
          <template v-else-if="entry.name === 'Drawer'"
            ><SJFSpace
              ><SJFButton
                :size="demoSize"
                @click="
                  () => {
                    side = 'right'
                    drawerOpen = true
                  }
                "
                >右侧详情</SJFButton
              ><SJFButton
                variant="outlined"
                :size="demoSize"
                @click="
                  () => {
                    side = 'left'
                    drawerOpen = true
                  }
                "
                >左侧详情</SJFButton
              ></SJFSpace
            ><SJFDrawer
              v-model="drawerOpen"
              title="项目详情"
              :side="side"
              :size="demoSize"
              ><SJFDescriptions
                :items="details"
                :columns="1"
              /><SJFDivider /><SJFInput
                v-model="projectName"
                label="项目名称"
                :label-option="{ mode: 'vertical' }"
              /><template #footer
                ><SJFButton @click="drawerOpen = false"
                  >完成</SJFButton
                ></template
              ></SJFDrawer
            ></template
          >
          <template v-else-if="entry.name === 'Snackbar'"
            ><SJFButton
              :size="demoSize"
              @click="
                () => {
                  snackMessage = '项目已归档'
                  snackOpen = true
                }
              "
              >显示消息条</SJFButton
            ><SJFSnackbar
              v-model="snackOpen"
              :message="snackMessage"
              action="撤销"
              :size="demoSize"
              @action="lastAction = '已撤销归档'"
            /><output class="demo-result">{{
              lastAction || '悬停或聚焦消息条可暂停自动关闭。'
            }}</output></template
          >
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <h2>最简单使用</h2>
        <p>支持按需导入，也可通过 app.use(SJFUI) 注册所有 SJF 前缀组件。</p>
      </div>
      <div class="code-card">
        <pre><code>{{ entry.code }}</code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <h2>API</h2>
        <p>
          所有几何组件支持 size；表单组件支持
          label、labelOption、disabled、required、error 和 Form 上下文。
        </p>
      </div>
      <div class="api-card">
        <table class="api-table">
          <thead>
            <tr>
              <th>属性 / 事件 / 插槽</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in entry.api" :key="row.prop">
              <td>
                <code>{{ row.prop }}</code>
              </td>
              <td>{{ row.type }}</td>
              <td>{{ row.description }}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>SjfSize</td>
              <td>继承全局或表单尺寸，支持自定义有序等级。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script setup vapor lang="ts">
import { computed, ref } from 'vue'
import {
  SJFButton,
  SJFSpace,
  SJFAvatar,
  SJFBadge,
  SJFIcon,
  SJFChip,
  SJFCard,
  SJFDivider,
  SJFSwitch,
  SJFTextarea,
  SJFInputNumber,
  SJFSelect,
  SJFCheckbox,
  SJFRadio,
  SJFSlider,
  SJFProgress,
  SJFDatePicker,
  SJFTimePicker,
  SJFUpload,
  SJFItem,
  SJFMenu,
  SJFTabs,
  SJFDescriptions,
  SJFAlert,
  SJFInput,
  SJFTree,
  SJFBreadcrumbs,
  SJFPagination,
  SJFSteps,
  SJFTable,
  SJFCollapse,
  SJFEmpty,
  SJFSkeleton,
  SJFPopover,
  SJFTooltip,
  SJFDropdown,
  SJFDialog,
  SJFDrawer,
  SJFSnackbar,
} from '@/components/registry'
import type { ComponentEntry } from '../catalog'
import type { SjfBuiltinSize } from '@/core/size'
import type { SjfTone, SjfValue } from '@/components/shared/control'
import type { SjfSelectOption } from '@/components/Select'
import type { SjfTableColumn } from '@/components/Table'
defineProps<{ entry: ComponentEntry }>()
const sizes: SjfBuiltinSize[] = ['mn', 'sm', 'nm', 'md', 'lg'],
  demoSize = ref<SjfBuiltinSize>('nm'),
  disabled = ref(false)
const field = computed(() => ({
  size: demoSize.value,
  disabled: disabled.value,
  labelOption: { mode: 'vertical' as const },
}))
const clicks = ref(0),
  loading = ref(false),
  count = ref(12),
  tags = ref(['设计', '前端', '待评审']),
  text = ref(''),
  checked = ref(false),
  amount = ref<number | null>(2.5),
  plan = ref<SjfValue>('personal'),
  volume = ref(65),
  date = ref(''),
  time = ref('09:30'),
  files = ref<File[]>([])
const person = ref<SjfValue | SjfValue[] | null>(null),
  members = ref<SjfValue[]>([])
const people: SjfSelectOption[] = [
  { label: '林沐 · 设计', value: 'lin', icon: 'palette' },
  { label: '陈一 · 开发', value: 'chen', icon: 'code' },
  { label: '周知 · 产品', value: 'zhou', icon: 'work' },
  { label: '暂不可用', value: 'disabled', disabled: true },
]
const cardVariants = ['outlined', 'filled', 'elevated'] as const
const menu = ref<SjfValue | null>('inbox'),
  menuItems = [
    { label: '收件箱', value: 'inbox', icon: 'inbox' },
    { label: '我的项目', value: 'projects', icon: 'folder' },
    { label: '团队成员', value: 'team', icon: 'group' },
    { label: '暂不可用', value: 'unavailable', disabled: true },
  ]
const tab = ref<SjfValue>('overview'),
  tabItems = [
    { label: '概览', value: 'overview', icon: 'dashboard' },
    { label: '动态', value: 'activity', icon: 'history' },
    { label: '设置', value: 'settings', icon: 'settings' },
    { label: '禁用页', value: 'disabled', disabled: true },
  ]
const projectName = ref('SJF 组件库'),
  details = [
    { label: '项目名称', value: 'SJF 组件库', key: 'name' },
    { label: '负责人', value: '林沐', key: 'owner' },
    { label: '状态', value: '进行中', key: 'status' },
    { label: '更新频率', value: '每周迭代', key: 'cycle' },
    {
      label: '说明',
      value: '统一尺寸与动效，服务实际办公场景。',
      key: 'description',
      span: 2,
    },
  ]
const treeNodes = [
  {
    value: 'workspace',
    label: '工作区',
    icon: 'folder',
    children: [
      {
        value: 'design',
        label: '设计',
        icon: 'palette',
        children: [
          { value: 'tokens', label: '设计变量', icon: 'tune' },
          { value: 'components', label: '组件规范', icon: 'widgets' },
        ],
      },
      { value: 'development', label: '开发', icon: 'code' },
      { value: 'archived', label: '已归档（禁用）', disabled: true },
    ],
  },
]
const treeActive = ref<SjfValue | SjfValue[] | null>('components'),
  treeMulti = ref<SjfValue[]>([]),
  expanded = ref<SjfValue[]>(['workspace', 'design'])
const multiExpanded = ref<SjfValue[]>(['workspace', 'design'])
const page = ref(1),
  step = ref(0),
  steps = [
    { title: '创建项目', description: '填写基本信息' },
    { title: '配置成员', description: '确定协作范围' },
    { title: '完成', description: '开始工作' },
  ]
const filter = ref(''),
  tableLoading = ref(false),
  selectedRows = ref<SjfValue[]>([])
const rows = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  name: ['林沐', '陈一', '周知', '许禾', '陆言', '宋青'][i % 6] + ' ' + (i + 1),
  role: ['设计师', '工程师', '产品经理'][i % 3],
  tasks: 18 - i,
  status: i % 4 === 0 ? '待确认' : '进行中',
}))
const filteredRows = computed(() =>
  rows.filter((r) => (r.name + ' ' + r.role).includes(filter.value)),
)
const columns: SjfTableColumn[] = [
  { key: 'name', title: '成员', sortable: true },
  { key: 'role', title: '角色', sortable: true },
  { key: 'tasks', title: '任务数', sortable: true, align: 'right' },
  { key: 'status', title: '状态' },
]
const sections = ref<SjfValue[]>(['size']),
  questions = [
    {
      value: 'size',
      title: '组件如何继承尺寸？',
      content:
        '默认跟随全局基准。在 Form 中优先继承表单尺寸，也可以通过 size 独立覆盖。',
    },
    {
      value: 'motion',
      title: '动画能否随系统设置变化？',
      content: '默认遵循系统减少动态效果；文档顶部可以单独切换动画预览模式。',
    },
    {
      value: 'disabled',
      title: '暂不可用的面板',
      content: '这里不应展开。',
      disabled: true,
    },
  ]
const tones: SjfTone[] = ['primary', 'success', 'warning', 'error', 'neutral'],
  toneLabels: Record<SjfTone, string> = {
    primary: '提示信息',
    success: '操作完成',
    warning: '请留意',
    error: '需要处理',
    neutral: '补充说明',
  }
const actions = [
  { label: '编辑项目', value: 'edit', icon: 'edit' },
  { label: '复制链接', value: 'copy', icon: 'link' },
  { label: '归档', value: 'archive', icon: 'archive' },
  { label: '不可用操作', value: 'disabled', disabled: true },
]
const lastAction = ref(''),
  dialogOpen = ref(false),
  drawerOpen = ref(false),
  side = ref<'left' | 'right'>('right'),
  snackOpen = ref(false),
  snackMessage = ref('')
</script>
<style scoped>
.component-page .page-title span {
  font-size: 0.58em;
  font-weight: 500;
  letter-spacing: 0;
}
.demo-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  font-size: 12px;
}
.demo-sizes {
  display: flex;
  gap: 6px;
}
.demo-sizes button {
  min-width: 40px;
  padding: 8px;
  border: 1px solid var(--docs-border);
  border-radius: 8px;
}
.demo-sizes button[aria-pressed='true'] {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-color: var(--md-sys-color-primary);
}
.demo-toolbar label {
  display: flex;
  gap: 8px;
  align-items: center;
}
.demo-toolbar input {
  appearance: auto;
  accent-color: var(--md-sys-color-primary);
}
.showcase-stage {
  display: grid;
  align-content: start;
  gap: 24px;
  min-height: 180px;
}
.showcase-stage :deep(> .sjf-button),
.showcase-stage :deep(> .sjf-popover-trigger) {
  justify-self: start;
}
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 24px;
  align-items: start;
}
.demo-result {
  display: block;
  overflow-wrap: anywhere;
  margin: 0;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--md-sys-color-surface-container-low);
  font:
    12px/1.7 Consolas,
    monospace;
  color: var(--md-sys-color-on-surface-variant);
}
.showcase-hint {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: 13px;
  line-height: 1.7;
}
.showcase-table-tools {
  display: flex;
  align-items: end;
  gap: 16px;
  flex-wrap: wrap;
}
.showcase-table-tools > :first-child {
  flex: 1;
  min-width: 180px;
}
.showcase-stage :deep(.sjf-popover p) {
  margin-top: 0;
}
</style>
