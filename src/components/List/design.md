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
