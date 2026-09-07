# SJF-UI Motion Spec v0.1

> 状态：Foundation baseline
>
> 目标：SJF 组件默认具有统一、克制、低成本的状态动画，同时避免 `transition: all`、全局 `will-change` 与大范围布局动画带来的性能问题。

---

## 1. 默认规则

所有 SJF 自有元素（`sjf-*` class）默认只过渡以下低风险状态属性：

```text
color
background-color
border-color
box-shadow
opacity
transform
```

禁止把以下写成全局默认动画：

```text
width / height
margin / padding
top / left
复杂 grid 布局
filter / 大面积 blur
```

组件在交互语义明确、影响范围受限时，可以局部加入额外过渡，例如 M3 floating label 的位置与字号变化。

SJF 默认禁止：

```css
transition: all;
```

以及对大量节点长期设置：

```css
will-change: transform;
```

---

## 2. Duration Tokens

```text
instant  80ms
fast     120ms
normal   180ms
slow     260ms
enter    220ms
leave    160ms
```

默认：

```text
normal = 180ms
```

进入通常稍慢、退出稍快，使界面既有反馈又不拖沓。

CSS Variables：

```css
--sjf-motion-instant
--sjf-motion-fast
--sjf-motion-normal
--sjf-motion-slow
--sjf-motion-enter
--sjf-motion-leave
```

---

## 3. Easing

默认标准缓动：

```css
--sjf-motion-ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

进入与退出分别提供：

```css
--sjf-motion-ease-enter
--sjf-motion-ease-leave
```

---

## 4. 默认继承

标准库入口自动加载：

```text
src/styles/motion.css
```

因此一个新组件只要遵守 SJF class 命名：

```html
<div class="sjf-card">...</div>
```

就会自动拥有安全状态动画，不需要每个组件重复写一遍 `transition`。

组件可以通过 class 改变时长：

```text
sjf-motion-instant
sjf-motion-fast
sjf-motion-normal
sjf-motion-slow
sjf-motion-enter
sjf-motion-leave
sjf-motion-none
```

---

## 5. Reduced Motion

SJF 默认尊重系统：

```css
@media (prefers-reduced-motion: reduce)
```

开启减少动态效果后，SJF 组件 transition / animation 自动缩短至近乎即时，同时移除延迟。

提供显式的用户偏好覆盖：

```ts
app.use(SJFUI, { motion: 'system' }) // 默认跟随系统
SJFUI.setMotion('full')              // 用户主动要求完整动画
SJFUI.setMotion('reduced')           // 用户主动要求减少动态效果
```

偏好同时作用于 CSS 过渡和 List 的滚动插值。文档站为了演示动画默认使用 `full`，并提供顶部切换按钮；这不改变组件库的 `system` 默认策略。

单选指示器的外壳移动和内部填充动画相互独立：空→A 从中心展开，A→B 平滑移动，B→空向中心收回。分支展开仅对局部高度做过渡，不把布局动画扩散到整个页面。

---

## 6. 性能原则

默认 transition 声明本身不会持续占用动画计算；属性没有变化时不会一直运行动画。

SJF 的性能优先级：

```text
transform / opacity
    ↓ 优先
color / background / border / shadow
    ↓ 常规允许
尺寸 / 布局属性
    ↓ 仅局部、必要时使用
复杂 filter / blur
    ↓ 谨慎
```

不要为了动画提前给所有节点建立合成层。
