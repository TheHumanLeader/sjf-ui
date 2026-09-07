# Tree · v0.1

- 递归 tree/treeitem/group 语义，选中与展开分别受控，string/number value 应全树唯一。
- 方向键在可见且可用节点间移动；左右展开/收起及父子定位，Enter/Space 选择。多选不会自动级联。
- 分支保留 DOM，以 0fr→1fr 局部布局过渡展开；收起时 inert 和 visibility 移出焦点/可访问树。横向分层导航见 List 页面。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
