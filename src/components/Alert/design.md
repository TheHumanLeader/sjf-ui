# Alert

内联状态消息，有文字/图标区分不同 tone。错误使用 alert，其余使用 status。

默认 size 继承 Form / 全局 nm；共用 Control Recipe：controlHeight / fontSize / padding 为 0，gap / radius 为 -1，icon 为 0。支持自定义有序尺寸和 ±1 级迁移，边界 clamp。颜色采用 Material 3 语义配对。
