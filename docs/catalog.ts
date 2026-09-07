export interface ComponentEntry {
  name: string
  label: string
  group: string
  description: string
  code: string
  path: string
  api: { prop: string; type: string; description: string }[]
}
export const componentCatalog: ComponentEntry[] = [
  {
    name: 'Button',
    label: '按钮',
    group: '通用组件',
    description: '四种按钮层级、图标、加载与禁用状态。',
    code: '<SJFButton icon="add" @click="create">新建项目</SJFButton>',
    path: '/components/button',
    api: [
      {
        prop: 'variant',
        type: 'filled / tonal / outlined / text',
        description: '视觉层级',
      },
      {
        prop: 'loading',
        type: 'boolean',
        description: '加载时阻止重复点击',
      },
      {
        prop: 'icon',
        type: 'string',
        description: 'Material Symbols 名称',
      },
    ],
  },
  {
    name: 'Icon',
    label: '图标',
    group: '通用组件',
    description: 'Material Symbols 图标与严格方形尺寸。',
    code: '<SJFIcon name="10k" type="material-symbols" />',
    path: '/components/icon',
    api: [
      {
        prop: 'name',
        type: 'string',
        description: '图标名称',
      },
    ],
  },
  {
    name: 'Avatar',
    label: '头像',
    group: '通用组件',
    description: '图片头像、名称缩写与加载失败回退。',
    code: '<SJFAvatar name="林 沐" size="md" />',
    path: '/components/avatar',
    api: [
      {
        prop: 'src',
        type: 'string',
        description: '图片地址',
      },
      {
        prop: 'name',
        type: 'string',
        description: '回退名称',
      },
      {
        prop: 'square',
        type: 'boolean',
        description: '方形头像',
      },
    ],
  },
  {
    name: 'Badge',
    label: '徽标',
    group: '通用组件',
    description: '数量、封顶计数与小圆点提示。',
    code: '<SJFBadge :value="12"><SJFButton>收件箱</SJFButton></SJFBadge>',
    path: '/components/badge',
    api: [
      {
        prop: 'value',
        type: 'string / number',
        description: '计数',
      },
      {
        prop: 'max',
        type: 'number',
        description: '显示上限，默认 99',
      },
      {
        prop: 'dot',
        type: 'boolean',
        description: '显示圆点',
      },
    ],
  },
  {
    name: 'Chip',
    label: '标签',
    group: '通用组件',
    description: '可切换、可移除的信息标签。',
    code: '<SJFChip v-model="active" selectable closable label="设计" />',
    path: '/components/chip',
    api: [
      {
        prop: 'modelValue',
        type: 'boolean',
        description: '选中状态',
      },
      {
        prop: 'selectable',
        type: 'boolean',
        description: '允许切换',
      },
      {
        prop: 'close',
        type: 'event',
        description: '请求移除',
      },
    ],
  },
  {
    name: 'Card',
    label: '卡片',
    group: '通用组件',
    description: '组合标题、内容和操作区的内容容器。',
    code: '<SJFCard title="项目概况" variant="outlined">内容</SJFCard>',
    path: '/components/card',
    api: [
      {
        prop: 'title',
        type: 'string',
        description: '标题',
      },
      {
        prop: 'variant',
        type: 'outlined / filled / elevated',
        description: '层级',
      },
      {
        prop: 'header / footer',
        type: 'slots',
        description: '自定义头尾',
      },
    ],
  },
  {
    name: 'Divider',
    label: '分隔线',
    group: '通用组件',
    description: '水平、垂直以及带文字的内容分隔。',
    code: '<SJFDivider label="更多内容" />',
    path: '/components/divider',
    api: [
      {
        prop: 'label',
        type: 'string',
        description: '分隔文本',
      },
      {
        prop: 'vertical',
        type: 'boolean',
        description: '垂直方向',
      },
    ],
  },
  {
    name: 'Space',
    label: '间距',
    group: '通用组件',
    description: '跟随尺寸体系的横向、纵向布局。',
    code: '<SJFSpace wrap><SJFButton>保存</SJFButton></SJFSpace>',
    path: '/components/space',
    api: [
      {
        prop: 'vertical',
        type: 'boolean',
        description: '纵向布局',
      },
      {
        prop: 'wrap',
        type: 'boolean',
        description: '自动换行，默认 true',
      },
      {
        prop: 'align',
        type: 'start / center / end / stretch',
        description: '交叉轴对齐',
      },
    ],
  },
  {
    name: 'Form',
    label: '表单布局',
    group: '表单组件',
    description: '统一字段布局、尺寸和 Label 默认值。',
    code: '<SJFForm :columns="2"><SJFInput label="姓名" /></SJFForm>',
    path: '/components/form',
    api: [
      {
        prop: 'columns',
        type: 'number',
        description: 'Grid 原始列数',
      },
    ],
  },
  {
    name: 'Label',
    label: '标签布局',
    group: '表单组件',
    description: '五种字段布局，内置辅助信息和错误展示。',
    code: '<SJFLabel label="名称">内容</SJFLabel>',
    path: '/components/label',
    api: [
      {
        prop: 'mode',
        type: 'string',
        description: '标签模式',
      },
    ],
  },
  {
    name: 'Input',
    label: '输入框',
    group: '表单组件',
    description: '文本、密码、清空与计数。',
    code: '<SJFInput v-model="text" label="姓名" clearable />',
    path: '/components/input',
    api: [
      {
        prop: 'modelValue',
        type: 'string',
        description: '输入值',
      },
    ],
  },
  {
    name: 'Textarea',
    label: '多行输入',
    group: '表单组件',
    description: '支持字数统计和垂直拉伸的多行文本。',
    code: '<SJFTextarea v-model="text" label="备注" :maxlength="200" show-count />',
    path: '/components/textarea',
    api: [
      {
        prop: 'rows',
        type: 'number',
        description: '行数，默认 4',
      },
      {
        prop: 'maxlength',
        type: 'number',
        description: '最大长度',
      },
      {
        prop: 'showCount',
        type: 'boolean',
        description: '字数统计',
      },
    ],
  },
  {
    name: 'InputNumber',
    label: '数字输入',
    group: '表单组件',
    description: '支持精确步进、范围限制和空值。',
    code: '<SJFInputNumber v-model="count" label="数量" :min="0" :max="100" :step="0.1" />',
    path: '/components/input-number',
    api: [
      {
        prop: 'modelValue',
        type: 'number / null',
        description: '数值',
      },
      {
        prop: 'min / max',
        type: 'number',
        description: '范围',
      },
      {
        prop: 'step',
        type: 'number',
        description: '正步长',
      },
    ],
  },
  {
    name: 'Select',
    label: '选择器',
    group: '表单组件',
    description: '搜索、单选多选及完整键盘选择。',
    code: '<SJFSelect v-model="value" :options="options" label="负责人" searchable clearable />',
    path: '/components/select',
    api: [
      {
        prop: 'options',
        type: 'SjfSelectOption[]',
        description: 'label/value/disabled/icon',
      },
      {
        prop: 'multiple',
        type: 'boolean',
        description: '多选时值为数组',
      },
      {
        prop: 'searchable',
        type: 'boolean',
        description: '文字过滤',
      },
      {
        prop: 'clearable',
        type: 'boolean',
        description: '清空选择',
      },
    ],
  },
  {
    name: 'Checkbox',
    label: '复选框',
    group: '表单组件',
    description: '布尔选中和部分选中状态。',
    code: '<SJFCheckbox v-model="checked" label="订阅" text="接收项目更新" />',
    path: '/components/checkbox',
    api: [
      {
        prop: 'modelValue',
        type: 'boolean',
        description: '选中状态',
      },
      {
        prop: 'indeterminate',
        type: 'boolean',
        description: '部分选中',
      },
      {
        prop: 'text',
        type: 'string',
        description: '选项文本',
      },
    ],
  },
  {
    name: 'Radio',
    label: '单选框',
    group: '表单组件',
    description: '共享 name 与 v-model 组成原生单选组。',
    code: '<SJFRadio v-model="plan" name="plan" value="team" text="团队版" />',
    path: '/components/radio',
    api: [
      {
        prop: 'modelValue',
        type: 'string / number',
        description: '选中值',
      },
      {
        prop: 'value',
        type: 'string / number',
        description: '本项值',
      },
      {
        prop: 'name',
        type: 'string',
        description: '同组名称',
      },
    ],
  },
  {
    name: 'Switch',
    label: '开关',
    group: '表单组件',
    description: '即时布尔状态，支持滑动反馈与键盘操作。',
    code: '<SJFSwitch v-model="enabled" label="自动保存" />',
    path: '/components/switch',
    api: [
      {
        prop: 'modelValue',
        type: 'boolean',
        description: '开关状态',
      },
      {
        prop: 'onText / offText',
        type: 'string',
        description: '状态文字',
      },
    ],
  },
  {
    name: 'Slider',
    label: '滑块',
    group: '表单组件',
    description: '连续数值调节，支持方向键和范围限制。',
    code: '<SJFSlider v-model="volume" label="音量" :max="100" show-value />',
    path: '/components/slider',
    api: [
      {
        prop: 'modelValue',
        type: 'number',
        description: '数值',
      },
      {
        prop: 'min / max / step',
        type: 'number',
        description: '原生滑块范围',
      },
      {
        prop: 'showValue',
        type: 'boolean',
        description: '显示数值',
      },
    ],
  },
  {
    name: 'DatePicker',
    label: '日期选择',
    group: '表单组件',
    description: '使用原生日期控件，保留浏览器的键盘和本地化能力。',
    code: '<SJFDatePicker v-model="date" label="截止日期" />',
    path: '/components/date-picker',
    api: [
      {
        prop: 'modelValue',
        type: 'string',
        description: 'YYYY-MM-DD',
      },
      {
        prop: 'min / max',
        type: 'string',
        description: '日期边界',
      },
      {
        prop: 'step',
        type: 'number',
        description: '日期间隔（天）',
      },
    ],
  },
  {
    name: 'TimePicker',
    label: '时间选择',
    group: '表单组件',
    description: '原生时间选择，支持分钟或秒级步长。',
    code: '<SJFTimePicker v-model="time" label="提醒时间" :step="60" />',
    path: '/components/time-picker',
    api: [
      {
        prop: 'modelValue',
        type: 'string',
        description: 'HH:mm 或 HH:mm:ss',
      },
      {
        prop: 'min / max',
        type: 'string',
        description: '时间边界',
      },
      {
        prop: 'step',
        type: 'number',
        description: '间隔（秒）',
      },
    ],
  },
  {
    name: 'Upload',
    label: '文件选择',
    group: '表单组件',
    description: '拖放、多文件及类型/大小校验；不自动上传。',
    code: '<SJFUpload v-model="files" label="附件" multiple accept=".pdf,.png" :max-size="5242880" />',
    path: '/components/upload',
    api: [
      {
        prop: 'modelValue',
        type: 'File[]',
        description: '选中的本地文件',
      },
      {
        prop: 'accept',
        type: 'string',
        description: '扩展名或 MIME',
      },
      {
        prop: 'maxSize',
        type: 'number',
        description: '每个文件最大字节数',
      },
      {
        prop: 'reject',
        type: 'event',
        description: '包含文件与原因的拒绝列表',
      },
    ],
  },
  {
    name: 'List',
    label: '列表',
    group: '导航组件',
    description: '菜单、Tree、Tabs 的基础排列与 active 动画。',
    code: '<SJFList :list="items" v-model="active" />',
    path: '/components/list',
    api: [
      {
        prop: 'list',
        type: 'unknown[]',
        description: '列表数据',
      },
    ],
  },
  {
    name: 'Item',
    label: '列表项',
    group: '导航组件',
    description: '独立选中项及 prepend/content/append 插槽。',
    code: '<SJFItem v-model:active="active" title="收件箱" icon="inbox" />',
    path: '/components/item',
    api: [
      {
        prop: 'active',
        type: 'boolean',
        description: '选中状态',
      },
      {
        prop: 'title / subtitle / icon',
        type: 'string',
        description: '内容',
      },
      {
        prop: 'prepend / content / append',
        type: 'slots',
        description: '自定义布局',
      },
    ],
  },
  {
    name: 'Menu',
    label: '菜单',
    group: '导航组件',
    description: '单选高亮和横向/纵向键盘导航。',
    code: '<SJFMenu v-model="value" :items="items" label="工作区" />',
    path: '/components/menu',
    api: [
      {
        prop: 'items',
        type: 'SjfMenuItem[]',
        description: 'value/label/icon/disabled',
      },
      {
        prop: 'horizontal',
        type: 'boolean',
        description: '横向',
      },
      {
        prop: 'select',
        type: 'event',
        description: '选择的 value',
      },
    ],
  },
  {
    name: 'Tabs',
    label: '标签页',
    group: '导航组件',
    description: '滑动高亮、键盘导航与持续挂载的内容面板。',
    code: '<SJFTabs v-model="tab" :items="tabs"><template #overview>概览内容</template></SJFTabs>',
    path: '/components/tabs',
    api: [
      {
        prop: 'items',
        type: 'SjfTab[]',
        description: 'value/label/icon/disabled',
      },
      {
        prop: 'modelValue',
        type: 'string / number',
        description: '激活页',
      },
      {
        prop: '[value]',
        type: 'slot',
        description: '对应内容',
      },
    ],
  },
  {
    name: 'Tree',
    label: '树形列表',
    group: '导航组件',
    description: '多级展开、单选多选与方向键操作。',
    code: '<SJFTree v-model="active" v-model:expanded="expanded" :nodes="nodes" />',
    path: '/components/tree',
    api: [
      {
        prop: 'nodes',
        type: 'SjfTreeNode[]',
        description: '嵌套 children 数据',
      },
      {
        prop: 'expanded',
        type: 'value[]',
        description: '已展开节点',
      },
      {
        prop: 'multiple',
        type: 'boolean',
        description: '多选',
      },
    ],
  },
  {
    name: 'Breadcrumbs',
    label: '面包屑',
    group: '导航组件',
    description: '当前位置与上级页面导航。',
    code: "<SJFBreadcrumbs :items=\"[{label:'首页',href:'#/'},{label:'项目'}]\" />",
    path: '/components/breadcrumbs',
    api: [
      {
        prop: 'items',
        type: 'SjfBreadcrumb[]',
        description: 'label 与可选 href',
      },
    ],
  },
  {
    name: 'Pagination',
    label: '分页',
    group: '导航组件',
    description: '折叠页码、首尾限制和原生按钮导航。',
    code: '<SJFPagination v-model="page" :total="128" :page-size="10" />',
    path: '/components/pagination',
    api: [
      {
        prop: 'modelValue',
        type: 'number',
        description: '当前页，从 1 开始',
      },
      {
        prop: 'total',
        type: 'number',
        description: '总条数',
      },
      {
        prop: 'pageSize',
        type: 'number',
        description: '每页条数',
      },
    ],
  },
  {
    name: 'Steps',
    label: '步骤条',
    group: '导航组件',
    description: '水平或纵向的流程进度。',
    code: '<SJFSteps v-model="step" :items="steps" clickable />',
    path: '/components/steps',
    api: [
      {
        prop: 'modelValue',
        type: 'number',
        description: '当前索引，从 0 开始',
      },
      {
        prop: 'items',
        type: 'SjfStep[]',
        description: '步骤标题和描述',
      },
      {
        prop: 'clickable',
        type: 'boolean',
        description: '启用导航',
      },
    ],
  },
  {
    name: 'Table',
    label: '表格',
    group: '数据展示',
    description: '客户端排序、跨页选择、分页及自定义单元格。',
    code: '<SJFTable :rows="rows" :columns="columns" row-key="id" selectable paginated />',
    path: '/components/table',
    api: [
      {
        prop: 'rows',
        type: 'Record[]',
        description: '数据',
      },
      {
        prop: 'columns',
        type: 'SjfTableColumn[]',
        description: '列定义',
      },
      {
        prop: 'selected',
        type: 'value[]',
        description: '已选行键',
      },
      {
        prop: 'page',
        type: 'number',
        description: '当前页',
      },
      {
        prop: 'cell-[key]',
        type: 'slot',
        description: '自定义单元格',
      },
    ],
  },
  {
    name: 'Descriptions',
    label: '描述列表',
    group: '数据展示',
    description: '多列字段展示，支持边框与跨列。',
    code: '<SJFDescriptions :items="details" :columns="2" bordered />',
    path: '/components/descriptions',
    api: [
      {
        prop: 'items',
        type: 'SjfDescriptionItem[]',
        description: 'label/value/key/span',
      },
      {
        prop: 'columns',
        type: 'number',
        description: '列数 1–6',
      },
      {
        prop: '[key]',
        type: 'slot',
        description: '自定义值',
      },
    ],
  },
  {
    name: 'Collapse',
    label: '折叠面板',
    group: '数据展示',
    description: '平滑展开、手风琴与可访问的内容分组。',
    code: '<SJFCollapse v-model="open" :items="sections" accordion />',
    path: '/components/collapse',
    api: [
      {
        prop: 'modelValue',
        type: 'value[]',
        description: '展开项',
      },
      {
        prop: 'accordion',
        type: 'boolean',
        description: '最多一项',
      },
      {
        prop: '[value]',
        type: 'slot',
        description: '自定义内容',
      },
    ],
  },
  {
    name: 'Empty',
    label: '空状态',
    group: '数据展示',
    description: '数据为空时的说明与恢复操作。',
    code: '<SJFEmpty title="暂无项目" description="创建第一个项目开始协作。" />',
    path: '/components/empty',
    api: [
      {
        prop: 'title / description',
        type: 'string',
        description: '文案',
      },
      {
        prop: 'icon',
        type: 'string',
        description: '图标',
      },
      {
        prop: 'default',
        type: 'slot',
        description: '恢复操作',
      },
    ],
  },
  {
    name: 'Skeleton',
    label: '骨架屏',
    group: '数据展示',
    description: '保留内容空间的加载占位。',
    code: '<SJFSkeleton :rows="3" avatar />',
    path: '/components/skeleton',
    api: [
      {
        prop: 'rows',
        type: 'number',
        description: '占位行数，1–20',
      },
      {
        prop: 'avatar',
        type: 'boolean',
        description: '头像占位',
      },
      {
        prop: 'animated',
        type: 'boolean',
        description: '脉冲，默认 true',
      },
    ],
  },
  {
    name: 'Progress',
    label: '进度条',
    group: '数据展示',
    description: '确定进度和不确定进度。',
    code: '<SJFProgress :model-value="65" label="同步进度" show-value />',
    path: '/components/progress',
    api: [
      {
        prop: 'modelValue',
        type: 'number',
        description: '当前值',
      },
      {
        prop: 'max',
        type: 'number',
        description: '最大值，默认 100',
      },
      {
        prop: 'indeterminate',
        type: 'boolean',
        description: '不确定进度',
      },
    ],
  },
  {
    name: 'Alert',
    label: '提示',
    group: '反馈组件',
    description: '内联状态、错误和可关闭提示。',
    code: '<SJFAlert title="保存成功" tone="success" closable>所有更改已保存在本地。</SJFAlert>',
    path: '/components/alert',
    api: [
      {
        prop: 'tone',
        type: 'primary / neutral / success / warning / error',
        description: '状态',
      },
      {
        prop: 'title',
        type: 'string',
        description: '标题',
      },
      {
        prop: 'close',
        type: 'event',
        description: '关闭通知',
      },
    ],
  },
  {
    name: 'Popover',
    label: '浮层',
    group: '反馈组件',
    description: '锚点定位、自动避让与点击外部/Escape 关闭。',
    code: '<SJFPopover title="项目设置" label="打开设置">浮层内容</SJFPopover>',
    path: '/components/popover',
    api: [
      {
        prop: 'modelValue',
        type: 'boolean',
        description: '显隐',
      },
      {
        prop: 'placement',
        type: 'string',
        description: '12 种定位',
      },
      {
        prop: 'trigger',
        type: 'click / hover / manual',
        description: '触发',
      },
      {
        prop: 'trigger',
        type: 'slot',
        description: '提供 attrs/open/toggle',
      },
    ],
  },
  {
    name: 'Tooltip',
    label: '文字提示',
    group: '反馈组件',
    description: '悬停和键盘焦点触发的简短说明。',
    code: '<SJFTooltip text="保存当前项目" label="查看提示" />',
    path: '/components/tooltip',
    api: [
      {
        prop: 'text',
        type: 'string',
        description: '提示内容',
      },
      {
        prop: 'placement',
        type: 'string',
        description: '默认 top',
      },
      {
        prop: 'default',
        type: 'slot',
        description: '触发元素，绑定 attrs',
      },
    ],
  },
  {
    name: 'Dropdown',
    label: '下拉菜单',
    group: '反馈组件',
    description: '复用 Popover 与 Menu 的操作菜单。',
    code: '<SJFDropdown label="更多操作" :items="actions" @select="handleAction" />',
    path: '/components/dropdown',
    api: [
      {
        prop: 'items',
        type: 'SjfMenuItem[]',
        description: '操作列表',
      },
      {
        prop: 'select',
        type: 'event',
        description: '被选的 value',
      },
      {
        prop: 'trigger',
        type: 'slot',
        description: '触发元素',
      },
    ],
  },
  {
    name: 'Dialog',
    label: '对话框',
    group: '反馈组件',
    description: '模态对话、焦点隔离和确认/取消流程。',
    code: '<SJFDialog v-model="open" title="确认归档" @confirm="archive">归档后仍可恢复。</SJFDialog>',
    path: '/components/dialog',
    api: [
      {
        prop: 'modelValue',
        type: 'boolean',
        description: '显隐',
      },
      {
        prop: 'persistent',
        type: 'boolean',
        description: '阻止 Escape/背景/关闭按钮',
      },
      {
        prop: 'closeOnConfirm',
        type: 'boolean',
        description: '确认后关闭，默认 true',
      },
      {
        prop: 'footer',
        type: 'slot',
        description: '自定义操作',
      },
    ],
  },
  {
    name: 'Drawer',
    label: '抽屉',
    group: '反馈组件',
    description: '侧边模态内容，支持左右方向。',
    code: '<SJFDrawer v-model="open" title="项目详情" side="right">详情内容</SJFDrawer>',
    path: '/components/drawer',
    api: [
      {
        prop: 'modelValue',
        type: 'boolean',
        description: '显隐',
      },
      {
        prop: 'side',
        type: 'left / right',
        description: '方向',
      },
      {
        prop: 'width',
        type: 'string / number',
        description: '宽度',
      },
      {
        prop: 'footer',
        type: 'slot',
        description: '操作区',
      },
    ],
  },
  {
    name: 'Snackbar',
    label: '消息条',
    group: '反馈组件',
    description: '短暂反馈、操作按钮与悬停/焦点暂停计时。',
    code: '<SJFSnackbar v-model="visible" message="项目已保存" action="撤销" @action="undo" />',
    path: '/components/snackbar',
    api: [
      {
        prop: 'modelValue',
        type: 'boolean',
        description: '显隐',
      },
      {
        prop: 'duration',
        type: 'number',
        description: '毫秒，0 不自动关闭',
      },
      {
        prop: 'action',
        type: 'string',
        description: '操作文字',
      },
      {
        prop: 'action',
        type: 'event',
        description: '点击操作',
      },
    ],
  },
]
export const componentGroups = Array.from(
  new Set(componentCatalog.map((c) => c.group)),
).map((title) => ({
  title,
  items: componentCatalog
    .filter((c) => c.group === title)
    .map((c) => ({ label: c.name + ' ' + c.label, path: c.path })),
}))
