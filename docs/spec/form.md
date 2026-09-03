# SJF-UI Form / Label Spec v0.2

> 状态：Draft / 当前基线
>
> 目标：取消 FormItem；由 `SjfForm` 提供二维 Grid 与 Label 上下文，所有输入类组件内置 `SjfLabel`，并通过 `labelOption` 做纯粹的 Label 配置下放。

---

## 1. 核心结构

SJF-UI 不要求：

```vue
<FormItem>
  <SjfInput />
</FormItem>
```

推荐：

```vue
<SjfForm
  :columns="5"
  label-mode="horizontal"
  gap="nm"
>
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

组件关系：

```text
SjfForm
  ├─ provide Grid / Size / Label defaults
  │
  ├─ SjfInput
  │    └─ internal SjfLabel
  ├─ SjfSelect
  │    └─ internal SjfLabel
  └─ SjfLabel
       └─ custom control
```

---

## 2. SjfForm 不是 FormItem 管理器

`SjfForm` 是**表单视觉与布局作用域**。

第一阶段职责：

```text
columns
size
gap
labelMode
labelOption
```

它不要求每个字段额外套 FormItem，也不把验证系统与布局系统绑死。

推荐 API：

```ts
interface SjfFormProps {
  columns?: number
  gap?: SjfSize | 0
  size?: SjfSize
  labelMode?: SjfLabelMode
  labelOption?: SjfLabelOption
}
```

---

## 3. columns = 原始 Grid 列

`columns` **不是“一行几个字段”**。

它表示整个 Form 有多少个原始 Grid Cell。

例如：

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

第一行占位：

```text
Label(1) + Control(2) + Label(1) + Control(1) = 5
```

即：

```text
┌──────┬──────────────┬──────┬────────┐
│ 姓名 │ Input        │ 工号 │ Input  │
│  1   │ 2 columns    │  1   │ 1 col  │
└──────┴──────────────┴──────┴────────┘
```

---

## 4. labelOption

输入组件不继续堆：

```text
label-col-span
label-row-span
label-size
label-required
label-helper
...
```

而是统一：

```ts
interface SjfLabelOption {
  mode?: SjfLabelMode
  size?: SjfSize
  required?: boolean
  disabled?: boolean
  error?: boolean
  helper?: string
  colSpan?: number
  rowSpan?: number
}
```

使用：

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

这里：

```text
labelOption.colSpan / rowSpan
= Label Cell 的 Grid Span

Input.colSpan / rowSpan
= Control Cell 的 Grid Span
```

以后 Label 新增属性时，Input / Select / DatePicker 不需要重复增加一套同名 label props。

---

## 5. Label 配置继承

优先级：

```text
SjfLabel 直接 props
        ↓
当前组件 labelOption
        ↓
SjfForm.labelOption
        ↓
SjfForm.labelMode 快捷覆盖 mode
        ↓
默认 m3
```

`labelMode` 是高频语法糖：

```vue
<SjfForm label-mode="horizontal-box">
```

等价于给下属 Label 提供：

```ts
{ mode: 'horizontal-box' }
```

但某个字段仍可局部覆盖：

```vue
<SjfInput
  label="特殊字段"
  :label-option="{ mode: 'vertical' }"
/>
```

---

## 6. 五种 Label Mode

```ts
type SjfLabelMode =
  | 'm3'
  | 'horizontal'
  | 'horizontal-box'
  | 'vertical'
  | 'vertical-box'
```

### m3

Label 融入 Control，宿主控件传入：

```text
focused
filled
disabled
error
```

M3 下 Label 不单独绘制 Form Grid Cell。

为了从 M3 切换到 horizontal / horizontal-box 时保持整体 footprint，M3 字段在 Form 中默认占：

```text
labelOption.colSpan + Control.colSpan
```

### horizontal

在 SjfForm 中：

```text
Label Cell | Control Cell
```

两者直接参与 Form Grid。

### horizontal-box

与 horizontal 使用相同 Grid 语义，但使用 descriptions / bordered cell 表现。

当 `gap` 未传或为 `0` 时，SjfForm 进入连续 Box Group：

- Form 绘制统一外边框。
- Cell 间以 outline-variant 分隔。
- 内部控件进入 embedded 状态，不再产生双层边框。

### vertical / vertical-box

Label 与 Control 在字段内部上下组织；后续可继续扩展更细的跨行布局语义。

---

## 7. gap

`gap` 使用 Ordered Size：

```vue
<SjfForm gap="mn" />
<SjfForm gap="sm" />
<SjfForm gap="nm" />
<SjfForm gap="md" />
<SjfForm gap="lg" />
```

也允许：

```vue
<SjfForm :gap="0" />
```

在 `horizontal-box` / `vertical-box` 中，`gap=0` 表示连续 Box Group，而不是删除结构分割线。

---

## 8. 输入类组件共同协议

所有输入类组件统一支持：

```ts
interface SjfFormControlLayout {
  label?: string
  labelOption?: SjfLabelOption
  colSpan?: number
  rowSpan?: number
}
```

适用：

```text
SjfInput
SjfSelect
SjfTextarea
SjfDatePicker
SjfNumberInput
...
```

这些组件内部复用同一个 `SjfLabel`，不能重新实现五套 Label 布局。

---

## 9. 当前结论

```text
SjfForm = Grid + Label Context

Label Span   -> labelOption.colSpan / rowSpan
Control Span -> colSpan / rowSpan

Form defaults
      ↓
component labelOption
      ↓
SjfLabel
```

最终目标是：

```vue
<SjfForm :columns="5" :label-mode="mode">
  ...同一份字段结构...
</SjfForm>
```

只切换 `mode`，即可在 M3、高密度 horizontal 与 descriptions 风格 horizontal-box 之间切换，而不重写字段结构。
