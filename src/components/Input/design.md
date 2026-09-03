# SjfInput Design v0.1

## 定位

第一版 `SjfInput` 用于验证并建立所有输入类组件共同遵循的 Label 集成协议。

## Label 集成

```vue
<SjfInput
  label="姓名"
  :label-option="{
    colSpan: 1,
    rowSpan: 1,
    required: true
  }"
  :col-span="2"
/>
```

- `labelOption` 完整传递给内部 `SjfLabel`。
- `colSpan` / `rowSpan` 描述 Control Cell。
- `labelOption.colSpan` / `rowSpan` 描述 Label Cell。
- Form 提供的 labelOption 是默认值，Input 自己的 labelOption 局部覆盖。

## Mode

Input 不自行定义 Label 布局算法。

布局来自：

```text
Input.labelOption.mode
        ↓
SjfForm.labelMode / labelOption.mode
        ↓
m3
```

## Embedded

在 `m3` 与 `*-box` 中，真实 input 进入 embedded 状态：

- 不绘制自身外边框。
- 不绘制第二层 focus ring。
- 背景透明。
- 外部 SjfLabel / SjfForm 负责结构与 focus 视觉。

在普通 `horizontal` / `vertical` 模式中，Input 自己绘制标准 Control 边框。
