# SjfInput Design v0.1

## 定位

`SjfInput` 是 SJF-UI 的标准单行文本输入组件，也是后续 Select / DatePicker / NumberInput 等 Control Shell 的参考实现。

它不重新实现 Label 布局，而是完整复用：

```text
SjfForm
  ↓ context
SjfInput
  ↓ internal
SjfLabel
  ↓
Input Control Shell
  ↓
native input
```

## Control Shell

Input 自己的视觉边界由 `Input Control Shell` 负责，原生 `<input>` 永远不绘制浏览器边框。

```text
┌──────────────────────────────────────────┐
│ prefix   native input   suffix  actions │
└──────────────────────────────────────────┘
```

Shell 负责：

- border / radius
- focus
- error
- disabled / readonly
- prefix / suffix
- clearable
- password visibility
- count

原生 input 只负责真正的文本编辑。

## Label / Form 集成

```vue
<SjfForm
  :columns="5"
  label-mode="horizontal-box"
  label-align="right"
  content-align="left"
>
  <SjfInput
    label="姓名"
    :label-option="{ colSpan: 1 }"
    :col-span="2"
  />
</SjfForm>
```

Input 支持所有已有 Form / Label 能力：

- `labelOption`
- `labelAlign`
- `contentAlign`
- `colSpan / rowSpan`
- `size`
- Rich Label `#label` slot

## Embedded

以下模式中 Input Shell 自动进入 embedded：

```text
m3
horizontal-box
vertical-box
```

规则：

- Input Shell 不再绘制第二层 border。
- 不再绘制第二层 focus ring。
- 背景透明。
- 外层 SjfLabel / SjfForm 承担结构边界。

普通 `horizontal / vertical` 则由 Input Shell 自己绘制标准边界。

## Slots

```vue
<SjfInput>
  <template #prefix>...</template>
  <template #suffix>...</template>
  <template #label>...</template>
</SjfInput>
```

- `prefix` / `suffix` 不绑定任何图标库。
- 可以传 SVG、Vue Component、文本、单位等任意内容。
- `#label` 继续转发给内部 `SjfLabel`，可以使用 `SjfLabelContent`。

## Interaction

第一版提供：

```text
clearable
showPassword
showCount
maxlength / minlength
```

### clearable

有值、非 disabled、非 readonly 时显示清空动作。

### showPassword

仅 `type="password"` 时生效，在 `password / text` 之间切换，不改变外部 `type` prop。

### showCount

默认显示当前字符数；配置 `maxlength` 后显示：

```text
12 / 30
```

## Native passthrough

组件使用 `inheritAttrs: false`，未被 SJF 明确消费的普通属性会透传到真实 `<input>`。

因此可以继续使用：

```text
id
aria-*
data-*
inputmode
pattern
min / max / step
spellcheck
...
```

而不需要把所有 HTML input 属性重新包装一遍。

## Motion

Input 不单独写死 transition duration。

状态变化统一服从 Motion Foundation：

```text
color
background-color
border-color
box-shadow
opacity
transform
```

禁止 `transition: all`，不默认动画 width / height / padding / margin / Grid 等布局属性。

## Events / Expose

Events：

```text
update:modelValue
input
change
focus
blur
clear
```

Expose：

```ts
focus()
blur()
select()
input
```
