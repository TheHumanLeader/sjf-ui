# SJF-UI Mode Spec v0.1

> 状态：Draft / 基线规范
>
> 目标：在同一套主题、尺寸和组件 API 下，允许组件拥有不同视觉/结构风格实现，并在目标风格缺失时稳定回退到 Material 3。

---

## 1. 核心定义

SJF-UI 中：

```text
Theme = 颜色体系
Size  = 尺寸等级体系
Mode  = 组件视觉与结构风格体系
```

Mode 不负责主题颜色，也不负责尺寸等级本身。

Mode 负责定义组件在同一语义与 API 下的：

- 外观语言
- 结构组织
- 边界表达
- 信息密度倾向
- 交互反馈方式
- 阴影、描边、容器感
- 办公化/现代化视觉差异

---

## 2. 默认 Mode

SJF-UI 默认模式固定为：

```ts
defaultMode = 'm3'
```

`m3` 是所有组件必须具备的基础实现，也是全局最终回退模式。

因此：

```text
m3 = required
other modes = optional
```

任何组件都不能只实现自定义 mode 而缺失 `m3`。

---

## 3. early-modern

SJF-UI 预定义第二种模式：

```text
early-modern
```

`early-modern` 定位：

- 面向传统企业、老牌企业、政企后台、内部管理系统
- 保留现代 Web UI 的清晰交互能力
- 降低 Material 3 过强的圆润、轻盈、活泼感
- 增强边界、层次、秩序、表格/表单密度与办公感
- 更接近“现代企业软件向传统桌面办公软件过渡”的视觉语言

`early-modern` 不是复古皮肤，也不是仿 Windows 旧版 UI。

它仍然是现代组件，只是更克制、更规整、更偏办公。

---

## 4. Mode 回退规则

当当前请求模式为：

```text
early-modern
```

组件如果存在 `early-modern` 实现：

```text
使用 early-modern
```

如果不存在：

```text
自动使用 m3
```

即：

```ts
resolveMode(component, requestedMode) {
  if (component.supports(requestedMode)) {
    return requestedMode
  }

  return 'm3'
}
```

这一规则必须稳定、自动、无感。

组件不得因为缺失目标 mode 而报错或消失。

---

## 5. Mode 解析优先级

推荐统一优先级：

```text
组件自身 mode
    ↓
局部 Provider / Scope mode
    ↓
全局 mode
    ↓
defaultMode = m3
```

例如：

```vue
<SjfButton mode="early-modern" />
```

应覆盖全局设置。

全局：

```ts
setMode('early-modern')
```

局部区域可以覆盖：

```vue
<SjfModeProvider mode="m3">
  ...
</SjfModeProvider>
```

---

## 6. Mode 与 Theme 必须正交

Mode 不得绑定固定颜色。

以下组合都必须合法：

```text
m3 + office-blue
m3 + enterprise-green
early-modern + office-blue
early-modern + enterprise-green
```

因此：

```text
Mode 决定“形”
Theme 决定“色”
Size 决定“尺度”
```

组件 mode 实现应继续引用 Material 3 语义色 token，而不是自行写死颜色。

---

## 7. Mode 与 Size 必须兼容

不同 Mode 不允许破坏统一 Size System。

例如同一个 Button：

```text
m3 / nm
early-modern / nm
```

两者都使用同一套 `mn < sm < nm < md < lg` 尺寸轴。

Mode 可以改变：

- 圆角相对等级
- padding 相对等级
- 描边/阴影倾向
- 内部结构布局

但必须通过 Size Recipe / Size Domain 表达，禁止重新写一套独立尺寸体系。

---

## 8. 组件 Mode 能力声明

每个组件需要声明自己支持的 Mode。

概念示例：

```ts
export const modes = ['m3', 'early-modern'] as const
```

如果只实现基础模式：

```ts
export const modes = ['m3'] as const
```

运行时通过统一 resolver 决定最终实现。

---

## 9. 组件目录建议

保持组件主目录约定不变：

```text
Button/
├─ index.vue
├─ index.ts
├─ design.md
├─ design.png
└─ cps/
```

当组件拥有多个 Mode 实现时，内部实现建议放入：

```text
Button/
├─ index.vue
├─ index.ts
├─ design.md
├─ design.png
└─ cps/
   └─ modes/
      ├─ M3.vue
      └─ EarlyModern.vue
```

其中：

```text
index.vue
```

只作为统一组件入口和 Mode Resolver，不应堆叠两套风格实现。

简单组件如果两种 Mode 仅有少量样式差异，可以共享结构；只有结构/交互差异明显时才拆独立 Mode 组件。

---

## 10. 设计稿规则

每个组件必须先完成 `m3` 设计，因为它是基础回退实现。

如果要提供 `early-modern`：

1. 先有 m3 设计
2. 再基于相同组件语义设计 early-modern
3. 两者必须保持组件 API 一致
4. Mode 差异只体现在视觉、结构和交互表现，不改变组件本质用途

`design.md` 需要记录不同 Mode 的设计规则与提示词。

`design.png` 默认代表组件当前基础设计参考（优先 m3）。

后续如需保存多 Mode 设计图，可在组件内增加：

```text
designs/
├─ m3.png
└─ early-modern.png
```

但 `design.png` 仍保留，保证每个组件都符合基础目录约定。

---

## 11. early-modern 初始设计原则

当前先定方向，不提前写死具体像素：

```text
m3
- 更圆润
- 更柔和
- 更强调容器与 tonal 层次
- 更偏现代消费级/新式产品体验

early-modern
- 更克制的圆角
- 更清晰的边界
- 更稳定的矩形秩序
- 更高的信息密度
- 表单/表格优先实用性
- 阴影更弱，描边/层级更明确
- 更适合传统企业办公系统
```

具体差异由每个组件单独设计，不建立一套粗暴的全局 CSS 覆盖来伪装不同 Mode。

---

## 12. 当前结论

```text
defaultMode = m3

requested mode
      ↓
component supports?
   ↙       ↘
 yes       no
  ↓         ↓
requested  m3
```

SJF-UI 的 Mode 是“同一组件语义下的可替换视觉/结构实现层”。

`m3` 是强制基础实现；`early-modern` 是面向传统企业办公场景的可选实现；任何缺失都必须自动回退到 `m3`。
