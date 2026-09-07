# Dialog · v0.1

- 原生 dialog.showModal 提供焦点限制与背景 inert；关闭动画完成后归还打开前的焦点。
- Escape、遮罩和关闭按钮遵循 persistent/loading；确认可用 closeOnConfirm=false 交由业务完成异步校验。
- 默认提供取消/确认按钮，footer 插槽可完全替换；内容及所有操作必须可键盘访问。

## 视觉与集成

沿用 Material 3 语义色，不固化主题颜色。所有尺寸从 Ordered Size 解析，并跟随全局或 Form 的尺寸上下文；表单控件通过 Label 统一布局和状态。

动效使用统一 duration/easing；库默认遵循系统减少动态效果，文档可以显式切换完整预览。交互示例与最简 API 见文档站对应组件页。
