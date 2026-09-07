# Collapse · v0.1

- 独立 header button 控制对应 region；aria-expanded/controls 关联，禁用项不响应。
- 内容保留 DOM，采用局部 grid 行高过渡；关闭区域 inert。accordion 模式每次新打开最多一个面板。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
