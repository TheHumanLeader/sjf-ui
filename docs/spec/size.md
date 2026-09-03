# SJF-UI Size Spec v0.1

> 状态：Draft / 基线规范
>
> 目标：统一 SJF-UI 中所有与长、宽、高、距离、圆角、阴影、控件高度等相关的尺寸表达，并保证组件可整体按等级放大或缩小，同时保持内部比例关系。

---

## 1. 核心原则

SJF-UI 不鼓励组件直接写死具体像素尺寸，也不把 `sm / nm / md` 当作互不相关的离散值。

所有尺寸统一建立在一条**有序 Size 轴**上：

```text
mn < sm < nm < md < lg
```

默认基准尺寸：

```text
nm = normal
```

默认语义：

```text
mn = mini
sm = small
nm = normal
md = medium
lg = large
```

Size 的本质是“等级”，不是具体像素。

---

## 2. Size 必须有序

系统内部必须维护尺寸顺序：

```ts
['mn', 'sm', 'nm', 'md', 'lg']
```

必须支持基于顺序的操作：

```ts
next('nm') // md
prev('nm') // sm
offset('nm', 1) // md
offset('nm', -1) // sm
compare('sm', 'md') // < 0
```

禁止通过名称本身判断大小。

错误示例：

```ts
if (size === 'lg') {
  // 判断“大尺寸”
}
```

推荐：

```ts
compare(size, 'nm') > 0
```

原因：用户未来可以注册任意命名的尺寸等级，真正具有大小意义的是顺序，而不是名称。

---

## 3. Size Domain：同一等级，不同尺寸域

`nm` 本身不等于某个固定 px 值。

不同用途拥有自己的 Size Domain（尺寸域）。

推荐基础尺寸域：

```text
padding
margin
gap
radius
shadow
control-height
width
height
icon
font
```

例如：

```text
                 mn    sm    nm    md    lg
padding          ...   ...   ...   ...   ...
margin           ...   ...   ...   ...   ...
gap              ...   ...   ...   ...   ...
radius           ...   ...   ...   ...   ...
shadow           ...   ...   ...   ...   ...
control-height   ...   ...   ...   ...   ...
icon             ...   ...   ...   ...   ...
font             ...   ...   ...   ...   ...
```

因此 Size 负责“等级”，Domain 负责“该等级在当前用途下解析成什么值”。

---

## 4. Token 命名建议

基础 token 统一按：

```text
--sjf-{domain}-{size}
```

例如：

```css
--sjf-pd-mn
--sjf-pd-sm
--sjf-pd-nm
--sjf-pd-md
--sjf-pd-lg

--sjf-gap-mn
--sjf-gap-sm
--sjf-gap-nm
--sjf-gap-md
--sjf-gap-lg

--sjf-radius-mn
--sjf-radius-sm
--sjf-radius-nm
--sjf-radius-md
--sjf-radius-lg

--sjf-shadow-mn
--sjf-shadow-sm
--sjf-shadow-nm
--sjf-shadow-md
--sjf-shadow-lg

--sjf-control-height-mn
--sjf-control-height-sm
--sjf-control-height-nm
--sjf-control-height-md
--sjf-control-height-lg
```

业务层与组件层不应依赖某个 token 的像素实现，只依赖等级关系。

---

## 5. 组件内部优先使用相对尺寸

组件不应主要描述：

```ts
{
  height: 'nm',
  paddingX: 'nm',
  gap: 'sm',
  radius: 'sm'
}
```

更推荐描述“相对于组件当前 size 的等级偏移”：

```ts
{
  height: 0,
  paddingX: 0,
  paddingY: -1,
  gap: -1,
  radius: -1,
  shadow: -2,
  icon: 0
}
```

约定：

```text
 0 = 当前尺寸
+1 = 大一级
+2 = 大两级
-1 = 小一级
-2 = 小两级
```

组件保存的是内部比例关系，而不是某一套固定尺寸。

---

## 6. 示例：Input 尺寸配方

假设 Input 的默认 size：

```text
nm
```

组件配方：

```ts
const inputSizeRecipe = {
  height: 0,
  paddingX: 0,
  paddingY: -1,
  gap: -1,
  radius: -1,
  shadow: -2,
  icon: 0,
}
```

当组件基准为 `nm` 时：

```text
height      nm
paddingX    nm
paddingY    sm
gap         sm
radius      sm
shadow      mn
icon        nm
```

当整体基准上调到 `md` 时：

```text
height      md
paddingX    md
paddingY    nm
gap         nm
radius      nm
shadow      sm
icon        md
```

内部关系保持不变，只发生整体等级迁移。

---

## 7. 全局 Density / Scale

SJF-UI 可通过改变全局基准 size 实现整体密度切换。

建议：

```text
compact      -> sm
normal       -> nm
comfortable  -> md
```

这不是三套独立 CSS，而是同一套组件配方在不同基准等级上的解析结果。

这样办公系统可以实现全局紧凑 / 标准 / 宽松模式，而无需为每个组件维护重复样式。

---

## 8. 组件 size

所有有明显几何尺寸的基础组件，优先支持统一的 `size` 属性：

```vue
<SjfButton size="sm" />
<SjfButton size="nm" />
<SjfButton size="md" />
```

默认：

```text
size = nm
```

组件内部不为每个 size 重复维护完整样式，而是使用同一份 Size Recipe 进行解析。

---

## 9. ±1 级无损迁移原则

默认尺寸为 `nm` 的标准组件，核心结构原则上优先使用：

```text
sm / nm / md
```

即相对偏移：

```text
-1 / 0 / +1
```

目的：保证组件整体至少支持上下各迁移一级而不越界。

正常状态：

```text
sm <- nm -> md
```

整体放大一级：

```text
sm -> nm
nm -> md
md -> lg
```

整体缩小一级：

```text
md -> nm
nm -> sm
sm -> mn
```

`mn / lg` 优先作为系统边界与扩展空间，而不是普通 `nm` 组件内部频繁直接使用的核心等级。

---

## 10. 边界处理

当 offset 超过当前尺寸轴边界时，默认建议使用 clamp：

```text
mn - 1 -> mn
lg + 1 -> lg
```

系统实现时应明确支持：

```ts
offset(size, delta, { strategy: 'clamp' })
```

未来如有必要，可以扩展：

```text
throw
clamp
fallback
```

默认策略优先 `clamp`，保证 UI 不因主题或用户扩展配置产生尺寸解析异常。

---

## 11. 自定义尺寸注册

必须允许用户扩展尺寸轴。

示例：

```ts
registerSize('xl', {
  after: 'lg',
})
```

得到：

```text
mn < sm < nm < md < lg < xl
```

也可以插入中间等级：

```ts
registerSize('smd', {
  after: 'sm',
  before: 'nm',
})
```

得到：

```text
mn < sm < smd < nm < md < lg
```

注册后的尺寸必须自动参与：

```text
next
prev
offset
compare
```

组件不得假设系统永远只有五个固定等级。

---

## 12. Size Recipe

推荐每个组件拥有自己的尺寸配方。

例如 Button：

```ts
interface ButtonSizeRecipe {
  height: SizeOffset
  paddingX: SizeOffset
  paddingY: SizeOffset
  gap: SizeOffset
  radius: SizeOffset
  icon: SizeOffset
}
```

推荐：

```ts
const buttonSizeRecipe = {
  height: 0,
  paddingX: 0,
  paddingY: -1,
  gap: -1,
  radius: -1,
  icon: -1,
}
```

不推荐为每个尺寸重复维护：

```text
smHeight
smPadding
smRadius
mdHeight
mdPadding
mdRadius
lgHeight
lgPadding
lgRadius
```

SJF-UI 的目标是描述“组件内部尺寸关系”，而不是复制多套固定规格。

---

## 13. CSS / Vue 实现约束

组件实现阶段遵循：

1. 尽量不直接写死几何 px。
2. 优先通过 Size Resolver 获取最终 token。
3. `size` 是基准等级。
4. 组件内部元素通过 offset 描述相对等级。
5. 不通过 `size === 'lg'` 等字符串分支判断几何大小。
6. 所有标准组件默认基准为 `nm`，特殊组件需在设计文档说明原因。
7. 复杂组件的内部子组件也必须继承同一 Size Context，避免各自独立缩放导致比例破坏。

---

## 14. 与组件目录规范的关系

每个组件目录：

```text
{组件名}/
├─ index.vue
├─ index.ts
├─ design.md
├─ design.png
└─ cps/
   └─ **/*.vue|ts
```

其中 `design.md` 必须记录：

```text
- 默认 size
- Size Recipe
- 使用到的 Size Domain
- 是否满足 ±1 级无损迁移
- 特殊边界行为
```

设计图与代码必须遵循同一套尺寸关系。

---

## 15. 当前规范结论

SJF-UI 的尺寸体系由三层组成：

```text
Layer 1: Size Order
mn < sm < nm < md < lg

Layer 2: Size Domain
padding / margin / gap / radius / shadow / control-height / icon / ...

Layer 3: Component Size Recipe
组件内部通过相对 offset 描述比例关系
```

最终解析流程：

```text
Component size
      ↓
Size Recipe
      ↓
Ordered Size Resolver
      ↓
Domain Token
      ↓
CSS
```

核心目标：

> 改变一个组件或整个系统的基准 size 时，组件内部所有相关尺寸能够同步按等级迁移，并保持原有视觉比例与办公化信息密度。
