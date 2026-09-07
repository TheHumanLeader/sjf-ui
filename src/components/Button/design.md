# Button

原生 button，四种视觉变体、加载与禁用状态。loading 阻止重复触发。图标按钮需提供 aria-label；支持默认插槽和原生 click/type。

默认 size 继承 Form / 全局 nm；共用 Control Recipe：controlHeight / fontSize / padding 为 0，gap / radius 为 -1，icon 为 0。支持自定义有序尺寸和 ±1 级迁移，边界 clamp。颜色采用 Material 3 语义配对。
