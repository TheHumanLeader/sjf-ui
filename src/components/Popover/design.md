# Popover · v0.1

- 触发方式为 click、hover 或 manual；受控和非受控均支持，trigger 插槽透传 attrs/open/toggle。
- 定位复用 Overlay。点击型打开后聚焦内部首个控件，关闭时从面板归还焦点；Escape 只影响顶层浮层。
- 悬停型给予短暂离开宽限，允许鼠标从触发器移入面板。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
