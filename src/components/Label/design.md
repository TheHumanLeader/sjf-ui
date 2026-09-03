# SJF-UI Label Design

> 状态：Accepted / v0.1
>
> 设计稿：`design.svg`
>
> 组件定位：通用标签 + 内容布局壳。所有输入类组件后续默认内置 Label，默认 `mode="m3"`。

## 1. Modes

```ts
type SjfLabelMode =
  | 'm3'
  | 'horizontal'
  | 'horizontal-box'
  | 'vertical'
  | 'vertical-box'
```

- `m3`：Material 3 浮动标签；`focused || filled` 时浮起。
- `horizontal`：左 Label / 右 Content，面向传统办公表单。
- `horizontal-box`：左右盒式布局，共享外层边界，类似 bordered descriptions。
- `vertical`：上 Label / 下 Content。
- `vertical-box`：上下盒式布局，共享外层边界。

## 2. Size Rule

Label 必须遵守全局 Ordered Size System，不在组件内部维护 `mn/sm/nm/md/lg` 五套像素表。

默认 Size Core：

```text
mn < sm < nm < md < lg
```

Label 只声明相对 recipe：

```ts
fontSize        0
floatingFont   -1
helperFont     -1
controlHeight   0
gap             -1
requiredGap     -2
labelWidth       0
radius          -1
paddingX         0
paddingY        -1
captionPadding  -2
lineWidth       -1
focusLineWidth  +1
```

所以全局 base size 从 `nm` 调到 `md` 时，组件所有尺寸关系会整体上移一级，同时保持内部比例。

`design.svg` 中出现的具体尺寸数字仅用于视觉说明；实现以 `src/core/size/index.ts` 为唯一尺寸来源。

## 3. Color / Style

基于 Material 3 Color Roles：

```text
正文                 on-surface
Label / Helper       on-surface-variant
默认边界              outline-variant
聚焦                  primary
错误                  error
普通背景              surface
Box Label 背景        surface-container-high
```

视觉方向：

```text
Material 3 基础
+ 实用性
+ 办公化
+ 较高信息密度
```

避免：过度 Expressive、无意义高饱和色、过大的圆角和留白。

## 4. Box Rule

`*-box` 不是“外框里再塞一个完整 Input”。

Box 模式提供：

```css
--sjf-control-embedded: 1;
```

后续 Input / Select / DatePicker 等输入组件读取这个上下文后，应自动取消自身外边框与外圆角，让 Label Box 成为唯一结构边界，避免双层边框。

## 5. States

```text
default
focused
filled
disabled
error
required
```

M3 模式下：

```text
focused || filled -> floating label
error             -> error role
focused           -> primary role
```

Label 不自行监听 DOM 焦点；由 Input 等宿主控件将状态传入。

## 6. Error Display

错误状态与错误文案展示方式分离：

```ts
type SjfLabelErrorDisplay = 'message' | 'icon'
```

### message（默认）

- 保留 Material 3 常见的字段下方错误文案。
- 当 `mode="m3" && error=true` 时，错误文案使用相对字段的 `position: absolute` 悬浮定位。
- 错误文案不参与 Form / Grid 高度计算，因此单个字段报错不会把整行表单撑高。
- 这里刻意不使用 viewport 级 `position: fixed`，滚动页面时文案必须跟随字段。
- 非 error 的普通 helper 仍按正常文档流展示。

### icon

- 保留 error role 高亮，但不常驻展示错误文案。
- 显示一个 `!` 错误标记。
- hover 或键盘 focus `!` 时，以 tooltip 展示错误文案。
- `helper` 仍作为错误文案来源；未提供 helper 时回退为“字段内容有误”。
- Box Group 中不额外叠加第二层边框，而通过 error tint 强化错误单元格，避免再次出现双线。

Form 可以统一设置：

```vue
<SjfForm error-display="icon">
  ...
</SjfForm>
```

局部字段可以覆盖：

```vue
<SjfInput
  error
  helper="工号格式不正确"
  error-display="message"
/>
```

## 7. API

```ts
interface SjfLabelProps {
  label?: string
  mode?: SjfLabelMode
  size?: SjfSize
  required?: boolean
  disabled?: boolean
  error?: boolean
  focused?: boolean
  filled?: boolean
  helper?: string
  errorDisplay?: 'message' | 'icon'
}
```

`size` 未传时使用全局 `SJF Base Size`；初始全局值为 `nm`。

## 8. Slots

```text
default   内容区域
label     自定义 Label 内容
```

## 9. Image Generation Prompt

用于重新生成 / 演进本组件设计图的提示词：

> Create a clean high-resolution UI component specification sheet for **SJF-UI Label**, a Vue 3 Vapor Mode enterprise component library. Base the visual language on **Material Design 3**, but make it practical, compact, office-oriented and suitable for Chinese enterprise admin systems. Show exactly five Label modes: **m3**, **horizontal**, **horizontal-box**, **vertical**, **vertical-box**. For every mode show default, focused, filled and error examples. The box modes must resemble a clean bordered description/table cell structure with one shared border, never an input nested inside another border. Also show the ordered size system **mn < sm < nm < md < lg**, with **nm** as the normal center, and explain that component spacing, height, gap, radius and border thickness are relative size recipes rather than independent hard-coded sizes. Use Material 3 semantic colors: primary, on-surface, on-surface-variant, outline-variant, error and surface-container. White/light neutral canvas, restrained professional accent, crisp Chinese labels, high information density, subtle professional elevation, no decorative gradients, no excessive roundness. Include two error display modes: a Material-style message below the field that is absolutely positioned and does not consume layout height, plus a compact error-only mode with a `!` indicator whose tooltip appears on hover/focus. Include API examples and the rule that all future input controls embed this Label and default to m3 mode.
