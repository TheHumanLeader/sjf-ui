# SJF-UI Form / Label Spec v0.1

> 状态：Draft / 基线规范
>
> 目标：取消额外 FormItem 包装层。所有输入类组件统一内置 Label 能力，并通过 `mode` 支持 Material 3 与传统办公表单布局。

---

## 1. 核心原则

SJF-UI 不引入 `FormItem` 作为必需包装组件。

所有输入类组件（Input / Select / Textarea / DatePicker / NumberInput 等）应直接内置统一 Label 能力。

默认 Label 模式：

```text
m3
```

即：

```vue
<SjfInput label="用户名" />
```

默认表现为 Material 3 风格的浮动 Label。

---

## 2. Label 模式

统一类型：

```ts
type LabelMode =
  | 'm3'
  | 'horizontal'
  | 'horizontal-box'
  | 'vertical'
  | 'vertical-box'
```

### m3

Material 3 浮动 Label。

Label 位于输入控件内部，并根据以下状态变化位置与样式：

- focus
- filled / empty
- disabled
- error

Label 本身不自行探测原生输入状态，由宿主输入组件传入状态。

### horizontal

传统办公横向布局：

```text
Label   Control
```

适合高密度后台、管理系统、录入页面。

### vertical

传统上下布局：

```text
Label
Control
```

适合窄布局、移动端、复杂字段说明。

### horizontal-box

类似 Element Plus `Descriptions` 的 bordered item 表现：

```text
┌──────────┬──────────────────────┐
│ Label    │ Control / Content    │
└──────────┴──────────────────────┘
```

Label 区域与内容区域构成一个共享边界的整体。

### vertical-box

与 `horizontal-box` 相同的 box 语义，但上下排列：

```text
┌───────────────────────────────┐
│ Label                         │
├───────────────────────────────┤
│ Control / Content             │
└───────────────────────────────┘
```

---

## 3. 输入组件 API

所有输入类组件统一暴露：

```ts
interface LabelProps {
  label?: string
  labelMode?: LabelMode
}
```

默认：

```ts
labelMode = 'm3'
```

示例：

```vue
<SjfInput label="用户名" />

<SjfInput
  label="用户名"
  label-mode="horizontal"
/>

<SjfInput
  label="用户名"
  label-mode="vertical"
/>

<SjfInput
  label="用户名"
  label-mode="horizontal-box"
/>
```

不需要：

```vue
<FormItem>
  <SjfInput />
</FormItem>
```

---

## 4. 独立 Label 组件

Label 同时必须作为可独立使用的基础组件存在，以便自定义字段、第三方控件或复杂组合控件复用统一表单布局能力。

建议目录：

```text
Label/
├─ index.vue
├─ index.ts
├─ design.md
├─ design.png
└─ cps/
```

独立 Label 允许承载默认 slot，作为“Label + Content”通用壳层。

示例：

```vue
<SjfLabel
  label="自定义字段"
  mode="horizontal"
>
  <CustomControl />
</SjfLabel>
```

输入组件内部复用同一个 Label，而不是重新实现五套布局。

---

## 5. M3 状态由宿主控件驱动

`m3` 模式需要宿主输入组件将内部状态传递给 Label。

概念状态：

```ts
interface LabelState {
  focused: boolean
  filled: boolean
  disabled: boolean
  error: boolean
}
```

Label 只负责视觉表现与动画，不负责读取输入值或监听原生 DOM。

这样 Input / Select / Textarea 等可以共享同一套 M3 Label 动画。

---

## 6. Box 模式的边界规则

`horizontal-box` / `vertical-box` 的核心不是“给 Label 加一个背景色”，而是形成类似 Description Item 的共享盒结构。

因此在 box 模式中：

1. Label 区与 Content 区共享外边界。
2. Label 区可使用 `surface-container-*` 形成办公化层级。
3. Label 与 Content 之间使用 `outline-variant` 分隔。
4. 内部输入控件不应再次形成冲突性的双层外边框。
5. 输入组件应允许进入 embedded / merged 的视觉状态，由外层 Label Box 承担主要结构边界。

避免：

```text
┌────────┬──────────────────────┐
│ Label  │  ┌────────────────┐  │
│        │  │ Input          │  │
│        │  └────────────────┘  │
└────────┴──────────────────────┘
```

优先：

```text
┌────────┬──────────────────────┐
│ Label  │ Input                │
└────────┴──────────────────────┘
```

---

## 7. 与 Size System 的关系

Label 的间距、Label 宽度预设、控件高度、box padding、分隔间距等全部服从 SJF-UI Ordered Size System。

组件内部优先使用相对尺寸 Recipe，而不是写死 px。

例如：

```ts
const labelRecipe = {
  gap: -1,
  padding: 0,
  radius: -1,
}
```

切换全局基准 Size 时，Label 与 Control 应同步按等级迁移。

---

## 8. 当前结论

```text
Input / Select / Textarea / ...
        ↓ 内置
      SjfLabel
        ↓
 ┌──────┼─────────────┐
 m3  horizontal  vertical
        │             │
 horizontal-box  vertical-box
```

默认：

```text
labelMode = m3
```

SJF-UI 不要求使用 FormItem。
