# SJF-UI Theme / Color Spec v0.1

> 状态：Draft / 基线规范
>
> 目标：SJF-UI 的颜色体系不重新发明语义色，直接采用 Material Design 3 Color Roles；SJF-UI 仅定义主题注册、主题切换、组件引用和办公化使用约束。

---

## 1. 核心原则

SJF-UI 直接采用 Material Design 3 的语义色体系。

不额外创造一套与 Material 3 平行的：

- primary
- secondary
- tertiary
- surface
- outline
- error
- on-*

等颜色语义。

组件必须优先引用语义色角色，而不是直接写十六进制颜色。

错误示例：

```css
.button {
  background: #6750a4;
  color: #ffffff;
}
```

推荐：

```css
.button {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
```

---

## 2. Material 3 Color Roles

SJF-UI 默认使用 Material 3 的系统色角色，包括但不限于：

### Brand / Key colors

```text
primary
on-primary
primary-container
on-primary-container

secondary
on-secondary
secondary-container
on-secondary-container

tertiary
on-tertiary
tertiary-container
on-tertiary-container
```

### Semantic error

```text
error
on-error
error-container
on-error-container
```

### Surface / Neutral

```text
surface
on-surface
on-surface-variant
surface-dim
surface-bright
surface-container-lowest
surface-container-low
surface-container
surface-container-high
surface-container-highest
```

### Boundary / Utility

```text
outline
outline-variant
shadow
scrim
inverse-surface
inverse-on-surface
inverse-primary
```

实际 token 使用 Material 3 规范命名：

```text
--md-sys-color-*
```

---

## 3. Theme 的职责

在 SJF-UI 中，Theme 不等于“一个主色”。

Theme 应表示一套完整 Material 3 Color Scheme。

最小主题概念：

```ts
interface SjfTheme {
  name: string
  light: MaterialColorScheme
  dark: MaterialColorScheme
}
```

主题必须允许同时定义：

```text
light
dark
```

模式切换不应由组件自身负责。

---

## 4. Seed Color

SJF-UI 应允许使用一个 Seed Color 生成完整 Material 3 Color Scheme。

例如：

```ts
createTheme({
  name: 'office-blue',
  seed: '#3F6FED'
})
```

系统通过 Material Color Utilities 生成完整 light / dark scheme。

这样使用者不需要手动配置几十个颜色 token。

同时必须允许高级用户直接传入完整 Color Scheme 覆盖生成结果。

---

## 5. 主题注册

主题应支持注册多个命名主题：

```ts
registerTheme('office-blue', theme)
registerTheme('enterprise-green', theme)
registerTheme('custom-brand', theme)
```

切换：

```ts
setTheme('office-blue')
```

颜色模式单独控制：

```ts
setColorMode('light')
setColorMode('dark')
setColorMode('system')
```

即：

```text
Theme != ColorMode
```

一个 Theme 可以同时拥有 light / dark 两套 Material 3 scheme。

---

## 6. 组件引用规则

组件内部禁止以品牌色名字或具体色值绑定视觉。

组件必须根据语义选择 Material Color Role。

例如：

```text
主要操作       -> primary / on-primary
弱主要操作     -> secondary / secondary-container
强调辅助       -> tertiary / tertiary-container
页面基础背景   -> surface
卡片/面板层级  -> surface-container-*
正文           -> on-surface
次要正文       -> on-surface-variant
边框           -> outline / outline-variant
错误/危险      -> error / error-container
```

颜色角色属于语义，不属于具体组件。

Button、Input、Table 等组件只负责选择适合的角色。

---

## 7. 办公化约束

SJF-UI 以 Material 3 为基础，但默认面向办公、后台、管理系统和高信息密度界面。

因此默认主题应遵守：

1. `primary` 用于真正的主操作和核心强调，不应大面积铺满页面。
2. 大面积背景优先使用 `surface` 与 `surface-container-*`。
3. 表格、表单、列表的结构边界优先使用 `outline-variant`，避免过强分割线。
4. `secondary` / `tertiary` 不应用于无意义装饰。
5. `error` 只表示错误、危险、破坏性行为。
6. 状态色首先表达业务语义，不为“好看”而滥用高饱和色。
7. 默认主题应保持较高可读性和稳定的信息层级，避免过度 Expressive 化。

---

## 8. 组件不得私建主题色

组件不得自行定义类似：

```text
--button-blue
--table-header-gray
--input-focus-purple
```

如果颜色能由 Material 3 系统角色表达，则必须使用系统角色。

只有真正属于组件内部状态、且无法由系统角色直接表达时，才允许定义组件级 token；组件级 token 也应优先映射到 Material 系统 token。

例如：

```css
--sjf-button-container-color: var(--md-sys-color-primary);
```

而不是：

```css
--sjf-button-container-color: #3f6fed;
```

---

## 9. 当前结论

SJF-UI Theme v0.1：

```text
Material 3 Color Roles
        ↓
Material Color Scheme
        ↓
SJF Theme Registry
        ↓
light / dark / system
        ↓
组件按语义引用颜色
```

SJF-UI 不重新设计颜色理论，而是在 Material 3 的颜色体系上建立稳定、可注册、可切换、适用于办公系统的主题层。
