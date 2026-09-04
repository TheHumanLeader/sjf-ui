# SjfList

`SjfList` 是 Menu、Tree 与横向 Tabs 共用的列表选择基础。首版只负责排列、数据映射、active 状态与语义类型；异步节点等 Tree 专属能力属于上层组件。

## Data driven

```vue
<SJFList
  v-model="active"
  :list="items"
  item-title="title"
  item-subtitle="subtitle"
  item-icon="icon"
  item-value="id"
  active-color="#b73e6f"
  size="nm"
  :horizontal="false"
/>
```

- `horizontal` 默认 `false`。
- `horizontal` 与 `type="tree"` 组合时，根节点和子节点组沿横向展开，并输出 `aria-orientation="horizontal"`。
- `height` 接受数字（按 px）或 CSS 长度。设置后 List 不超出该高度，并显示分页滚动按钮：竖向为上 / 下，横向为左 / 右。
- 分页按钮每次平滑移动一个当前可视区域；到达首尾时对应按钮自动禁用。
- 翻页和滚轮使用同一逐帧缓动控制器：重复输入累加目标、反向输入立即转向，触摸 / 指针 / 键盘操作可打断。横向 List 也支持用纵向滚轮翻动。
- 普通模式翻页 320ms、滚轮 160ms；减少动态效果时保留更短的 180ms / 120ms 纯滚动过渡，不添加位移或缩放效果。
- `size` 使用 SJF Ordered Size，并传递给内部 `SjfItem`。
- 单选时 `v-model` 为一个值；`multiple` 时为值数组。
- 字段映射接受 key、点路径或 resolver function。
- `type` 支持 `list`、`menu`、`tree`、`tabs`，并自动生成正确的 ARIA role。

## Active Motion

单选与 Multiple Active 保持各自的状态模型，但共享同一种“出现 / 消失”动效语言。

### Single select

单选时 List 内部只有一个共享的 active indicator：

```text
0 active
   ↓ center-out enter
Item A [ active ]
       ↓
       ↓  indicator slide
       ↓
Item B [ active ]
   ↓ center-in leave
0 active
```

- `0 → 1`：共享 indicator 在目标 Item 原地从中心向外扩充满。
- `A → B`：indicator 保持完整高亮块，在旧 Item 与新 Item 之间平滑滑动。
- `1 → 0`：indicator 在最后位置向中心收回。
- active 背景属于 List，不属于单个 Item。
- 滑动时同时插值宽、高和圆角，用于 title / subtitle 高度不同的 Item。
- 竖向 List 与横向 Tabs 使用同一套滑动逻辑。
- indicator 位于滚动内容内部，因此列表滚动时自然跟随内容，不需要逐帧重新测量。

### Multiple Active

Multiple Active 保持原来的 Item 级独立填充逻辑，不由 active 数量选择器或共享 indicator 接管。

每个 Item 被选中时，从中心向外填充：

```text
       ·
      ╱ ╲
     ╱   ╲
┌────────────┐
│   active   │
└────────────┘
```

- `transform-origin: center`。
- 选中：中心小块向四周扩展到完整 Item。
- 取消：反向向中心收回。
- 进入使用 Motion `enter`，退出使用 Motion `leave`。
- 每个 active Item 独立运行，不使用单选的共享 indicator。
- 文本 / icon 始终位于填充层上方。

系统启用 `prefers-reduced-motion: reduce` 时，两类 active 动画都会自动缩短到近乎即时。

## Composition

```vue
<SJFList>
  <SJFItem :active="active">
    <template #prepend>...</template>
    <template #content>...</template>
    <template #append>...</template>
  </SJFItem>
</SJFList>
```
