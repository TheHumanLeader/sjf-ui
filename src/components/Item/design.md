# SjfItem

`SjfItem` 是 `SjfList` 的交互行。它可以由 List 数据模式自动创建，也可以通过插槽自由组合。

## Slots

- `prepend`: 前置图标、头像或状态。
- `content`: 主内容区域；未提供时渲染 `title` 与 `subtitle`。
- `append`: 后置描述、计数或状态图标。

`value` 存在时，Item 会接入最近的 `SjfList` active 模型；直接传入 `active` 时则通过 `update:active` 支持独立控制。

`size` 默认继承最近的 `SjfList`，也可在单个 Item 上覆盖。行高、内边距、间距、文字与图标都通过同一个 Size Recipe 解析。
