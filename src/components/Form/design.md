# SjfForm Design v0.1

## 定位

`SjfForm` 是表单视觉与布局作用域，不是 FormItem 管理器。

它负责：

- 提供 `columns` 原始二维 Grid。
- 提供 `gap`。
- 提供 `size`。
- 通过 `labelMode` / `labelOption` 向所有下属 Label 提供默认配置。
- 允许输入类组件通过自己的 `labelOption` 局部覆盖 Form 默认值。

## Grid 模型

`columns` 表示 Form 的原始 Grid 列数，不表示“一行几个字段”。

在 `horizontal` / `horizontal-box` 下，一个字段被拆成两个真实 Grid Cell：

```text
Label Cell   -> labelOption.colSpan / rowSpan
Control Cell -> component colSpan / rowSpan
```

示例：

```vue
<SjfForm :columns="5" label-mode="horizontal">
  <SjfInput
    label="姓名"
    :label-option="{ colSpan: 1 }"
    :col-span="2"
  />

  <SjfInput
    label="工号"
    :label-option="{ colSpan: 1 }"
    :col-span="1"
  />
</SjfForm>
```

第一行正好占 `1 + 2 + 1 + 1 = 5` 格。

## M3 切换

M3 中 Label 融入 Control，不单独绘制 Grid Cell。

为了让从 `m3` 切到 `horizontal` / `horizontal-box` 时整体占位尽量稳定，M3 字段默认占：

```text
labelOption.colSpan + control.colSpan
```

## Label Option 继承优先级

```text
SjfLabel 直接 props
        ↓
组件自己的 labelOption
        ↓
SjfForm.labelOption / labelMode
        ↓
SJF 默认值（m3）
```

## Box Group

当模式为 `horizontal-box` / `vertical-box` 且 `gap` 未传或为 `0` 时，Form 进入 Box Group：

- Form 自身绘制统一外边框。
- Grid gap 使用结构分割线宽度。
- Label / Control Cell 不再各画一套外边框。
- 目标是形成 descriptions 风格的连续表格结构。
