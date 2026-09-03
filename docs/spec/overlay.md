# SJF-UI Overlay / Floating Foundation

> 状态：Accepted / v0.1

## 1. 定位

Select、Popover、ContextMenu、Tooltip、DatePicker 等悬浮内容统一复用 Overlay Core，不允许每个组件独立实现坐标与滚动监听。

## 2. Anchor

Overlay 支持两类锚点：

```ts
HTMLElement
```

和鼠标 / 虚拟点：

```ts
createSjfPointAnchor(clientX, clientY)
```

所以 Select / Popover 可绑定组件，ContextMenu 可直接绑定鼠标点。

## 3. Placement

第一版支持：

```text
bottom-start / bottom / bottom-end
top-start    / top    / top-end
right-start  / right  / right-end
left-start   / left   / left-end
```

默认：

```text
placement      bottom-start
offset         6px
viewportPadding 8px
flip           true
shift          true
```

`flip` 负责主轴空间不足时切换到相反方向，`shift` 负责把悬浮层推回可视区域。

## 4. 自动更新

打开状态下统一监听：

```text
window scroll（capture）
window resize
VisualViewport scroll / resize
ResizeObserver(anchor)
ResizeObserver(panel)
```

所有变化进入共享 `requestAnimationFrame` 调度器，同一帧多次事件只刷新一次位置。

## 5. Directive

Vue / Vapor 组件可直接使用：

```vue
<div
  v-sjf-overlay-anchor="{
    enabled: open,
    panel: () => panelRef,
    options: {
      placement: 'bottom-start',
      matchWidth: true
    }
  }"
/>
```

指令负责：

```text
测量 Anchor
测量 Panel
计算 placement
flip / shift
应用 left / top / maxWidth / maxHeight
滚动与 resize 重定位
```

## 6. Mount

全局 mount 由：

```ts
SJFUI.setOverlayMount(() => '#overlay-root')
```

提供。

resolver 延迟执行；找不到目标时回退 body。自定义 mount 若为 static position，SJF 会将其补为 `position: relative` 作为 absolute overlay containing block，不改变正常文档流尺寸。

## 7. Strategy

```ts
type SjfOverlayStrategy = 'fixed' | 'absolute' | 'auto'
```

`auto` 默认规则：

```text
mount = body / documentElement -> fixed
custom mount                  -> absolute
```

自定义 mount 下会将 viewport 坐标换算为 mount-root 坐标。

## 8. Performance

- 不做持续轮询。
- 关闭 Overlay 后清理 scroll / resize / ResizeObserver。
- 不使用全局 `setInterval`。
- 不为每个 scroll event 立即同步测量；统一进入 rAF。
