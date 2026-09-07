# Tooltip · v0.1

- 基于 Popover 的 hover/focus 模式，使用 tooltip 与 aria-describedby；不会抢夺触发器焦点。
- 默认触发器可键盘聚焦，支持自定义默认插槽及受控开关；提示只包含辅助说明，不能承载必要操作。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
