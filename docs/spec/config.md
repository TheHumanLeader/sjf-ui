# SJF-UI Unified Configuration

> 状态：Accepted / v0.1

## 1. Public Entry

所有全局配置默认通过 `SJFUI` 暴露，不要求用户记住多个底层 setter。

```ts
import SJFUI from 'sjf-ui'

SJFUI.setDefaultSize('nm')
SJFUI.setTheme('pink')
SJFUI.setOverlayMount(() => '#sjf-overlay-root')
```

也支持一次性配置：

```ts
app.use(SJFUI, {
  defaultSize: 'nm',
  theme: 'pink',
  overlay: {
    mount: () => '#sjf-overlay-root',
    placement: 'bottom-start',
    offset: 6,
    viewportPadding: 8,
    flip: true,
    shift: true,
  },
})
```

## 2. Principle

- `SJFUI` 是面向使用者的统一配置入口。
- `setSjfBaseSize` / `setSjfTheme` / `setSjfOverlayMount` 等底层函数仍可导出，供内部实现、测试和高级用户使用。
- 后续新增全局配置时优先扩展 `SJFUI`，避免产生平行入口。
- 组件局部 prop 永远可以覆盖全局默认值。

## 3. Overlay Mount Resolver

Overlay mount 必须注册 resolver，而不是缓存一次 DOM 查询结果：

```ts
SJFUI.setOverlayMount(() =>
  document.querySelector('#overlay-root')
)
```

也允许 resolver 返回 selector：

```ts
SJFUI.setOverlayMount(() => '#overlay-root')
```

resolver 在真正需要悬浮层时执行；返回 null 或 selector 未找到时回退 `document.body`。
