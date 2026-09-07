# Select · v0.1

- 使用 combobox + listbox，输入保留焦点，通过 aria-activedescendant 指向当前选项。
- 支持搜索、多选、清空、禁用项和方向键；单选确认关闭，多选确认保留。值用稳定 string/number，不用 label 作标识。
- 复用 Overlay 自动翻转、边缘修正、跟随和宽度匹配；对话框内面板挂到 modal 内并进入 top layer。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
