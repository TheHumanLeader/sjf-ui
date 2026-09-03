# SJF-UI Foundation Spec v0.2

> 状态：Accepted

SJF-UI 默认提供四类基础能力：

1. Material 3 颜色角色
2. 自动黑 / 白前景色
3. Ordered Size 间距与尺寸工具
4. 常用布局工具

组件不应重复实现这些基础能力。

## 1. Material 3 颜色

组件优先使用 Material 3 原生语义配对：

```text
primary                  + on-primary
primary-container        + on-primary-container
secondary                + on-secondary
secondary-container      + on-secondary-container
tertiary                 + on-tertiary
tertiary-container       + on-tertiary-container
error                    + on-error
error-container          + on-error-container
surface                  + on-surface
surface-container-*      + on-surface
```

默认主题为 Pink，预设主题还有 Starry。

## 2. 自动字体颜色

当背景不是预先配好的 Material role，或需要强制使用纯黑 / 纯白字体时：

```ts
getSjfContrastText(background)
```

该函数分别计算背景与 `#000000`、`#FFFFFF` 的对比度，并选择更高者。

Theme 应用时会为每个 M3 role 生成：

```text
--sjf-auto-on-primary
--sjf-auto-on-primary-container
--sjf-auto-on-secondary
...
```

工具类：

```html
<div class="bg-primary-auto">...</div>
<div class="bg-primary-container-auto">...</div>
```

普通 M3 语义组件仍优先使用官方 `on-*`；`*-auto` 用于动态色块、标签、Badge、用户自定义背景等场景。

## 3. Ordered Size CSS Tokens

默认：

```text
mn < sm < nm < md < lg
```

提供：

```text
--sjf-pd-*
--sjf-mg-*
--sjf-gap-*
--sjf-rd-*
--sjf-shadow-*
--sjf-control-h-*
--sjf-font-*
--sjf-label-w-*
--sjf-line-*
```

与 `src/core/size` 的 domain 保持同一含义。

## 4. Spacing Utilities

内边距：

```text
pd-nm
pdx-nm
pdy-nm
```

外边距：

```text
mg-nm
mgx-nm
mgy-nm
```

间隔：

```text
gap-nm
gapx-nm
gapy-nm
```

其他：

```text
rd-nm
shadow-nm
control-h-nm
```

所有类均有 `sjf-` 前缀别名，例如：

```text
pd-nm == sjf-pd-nm
row   == sjf-row
```

## 5. Custom Size

`registerSjfSize()` 注册自定义 Size 后：

- 保持有序 Size 轴
- 写入对应 `--sjf-*-${name}` CSS Variables
- 自动生成 spacing / radius / shadow / control-height 工具类

Size 名称必须是 CSS-safe：

```text
^[A-Za-z][A-Za-z0-9_-]*$
```

## 6. Layout Utilities

Flex：

```text
row
column
inline-row
inline-column
wrap
nowrap
items-start / center / end / stretch / baseline
justify-start / center / end / between / around / evenly
self-start / center / end / stretch
grow / grow-0
shrink / shrink-0
center
```

Grid：

```text
grid
grid-2
grid-3
grid-4
grid-auto
```

尺寸辅助：

```text
full-width
full-height
min-width-0
min-height-0
```

## 7. 组件规则

组件实现时：

- 不直接写品牌色值，使用 M3 roles
- 不直接写浏览器默认 focus 样式，使用 SJF 状态视觉
- 不重复定义常见 flex/grid 布局
- 不重复定义常见 padding/margin/gap 数值
- 组件内部尺寸优先使用 Size Recipe 的相对 offset

Foundation 是组件库的底层约束，而不是可有可无的辅助 CSS。
