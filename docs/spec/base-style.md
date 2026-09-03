# SJF-UI Base Style Spec v0.1

> 状态：Draft / 基线规范

## 1. 核心原则

SJF-UI 默认接管浏览器原生控件的基础视觉。

当 SJF-UI 基础样式被加载后，以下原生样式不应直接出现在最终组件中：

- 浏览器默认 `outline`
- 浏览器默认 `focus ring`
- 默认 input / button / select / textarea 边框
- 默认 `appearance`
- 默认 box-shadow
- 不同浏览器的 number spinner / search decoration

SJF-UI 先执行统一 reset，再由具体组件按照 Material 3 + SJF Theme 绘制自己的：

```text
default
hover
focus / focus-visible
active
disabled
error
```

## 2. Focus 规则

移除浏览器原生 focus 视觉，不代表取消可访问性 focus 状态。

组件必须自行提供清晰可见的 focus / focus-visible 反馈。

例如 Input：

```text
native input focus
      ↓
Input focused state
      ↓
组件外层使用 primary / outline 等语义角色绘制 focus
```

当控件处于 `m3`、`embedded`、`merged` 等模式时，内部原生 input 不得再单独绘制第二层 focus ring。

## 3. Embedded Rule

Label 的 `horizontal-box` / `vertical-box` 会提供唯一结构边界。

内部 Input / Select 等控件必须进入 embedded 状态：

```text
border      -> none
outline     -> none
box-shadow  -> none
background  -> transparent
radius      -> 0
```

focus 由外层组件统一表达，禁止形成“双层 focus / 双层边框”。

## 4. 加载方式

`src/index.ts` 默认加载：

```ts
import './styles/base.css'
```

因此标准 SJF-UI 入口默认包含基础 reset。

文档站也直接加载同一份 `src/styles/base.css`，确保 Demo 与真实组件运行环境一致。
