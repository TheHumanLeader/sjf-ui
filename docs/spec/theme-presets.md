# SJF-UI Official Theme Presets v0.1

> 状态：Accepted
>
> SJF-UI 组件继续只使用 Material 3 Color Roles；Preset 只负责把这些语义角色映射成一套具体视觉。

## Pink — 默认主题

定位：浅色、办公化、偏玫粉 / 樱粉，不做整页高饱和粉色铺底。

核心角色：

```text
primary                 #B73E6F
primary-container       #FFD9E5
surface                 #FFF8FA
surface-container-low   #FFF0F4
surface-container       #F9E9EE
on-surface              #211A1D
outline-variant         #D5C2C8
```

使用原则：

- 粉色用于主操作、选中、聚焦和关键强调。
- 页面大面积区域仍以白色和浅中性色为主。
- 不使用 Material Reference Purple 作为 SJF-UI 默认视觉。
- 默认主题名称固定为 `pink`。

## Starry — 星空主题

定位：深夜蓝、星光蓝、冷青点缀的暗色办公主题。

核心角色：

```text
primary                 #AEC6FF
primary-container       #304979
tertiary                #7DDCE7
surface                 #0B1020
surface-container-low   #101629
surface-container       #151C31
surface-container-high  #1B233A
on-surface              #E3E7F4
outline-variant         #44495D
```

使用原则：

- 深夜蓝承担大面积 surface。
- 星光蓝承担 primary。
- 冷青只作为 tertiary / 少量高光，不大面积铺色。
- 允许极轻量星点背景用于品牌页 / Hero；表格、表单、业务页仍保持克制。
- 主题名称固定为 `starry`。

## Runtime API

```ts
import { setSjfTheme } from 'sjf-ui'

setSjfTheme('pink')
setSjfTheme('starry')
```

默认：

```ts
SJF_DEFAULT_THEME = 'pink'
```

主题选择可持久化到：

```text
localStorage['sjf-ui-theme']
```

组件禁止判断：

```ts
if (theme === 'pink')
```

组件只允许引用语义角色：

```css
color: var(--md-sys-color-on-surface);
background: var(--md-sys-color-surface);
border-color: var(--md-sys-color-outline-variant);
```

这样新增第三套主题时，组件代码无需修改。
