# Dropdown · v0.1

- 组合 Popover 与 Menu，不另建定位或 active 动画；选择后关闭并发出稳定 value。
- 打开聚焦首项，方向键跳过禁用项；选择或 Escape 后归还触发器焦点。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
