# Drawer · v0.1

- 复用 ModalShell 的焦点管理、遮罩与 Escape 行为；左右入场方向与 side 一致。
- 宽度不超过可视窗口，内容内部滚动，默认 420px/90vw；footer 容纳业务动作。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
