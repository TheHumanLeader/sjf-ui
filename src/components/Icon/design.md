# SjfIcon

`SjfIcon` 是 SJF-UI 的统一图标入口。首个 provider 为自托管的 Material Symbols，组件不依赖运行时外网字体。

## Usage

```vue
<SJFIcon name="10k" type="material-symbols" />
```

## API

- `name`: Material Symbols ligature 名称。
- `type`: 当前支持 `material-symbols`，显式保留 provider 入口以便扩展。
- `variant`: `outlined`、`rounded` 或 `sharp`，默认 `outlined`。
- `filled`: 切换 Material Symbols 的 `FILL` 轴。
- `size`: 使用 SJF Ordered Size System，默认继承全局尺寸。
- `label`: 可访问名称；未提供时图标按装饰内容隐藏于辅助技术。

图标颜色始终继承当前文本色，方便在 Button、Input、Menu 与 Overlay 中复用。

所有 provider 必须服从同一个正方形图标盒：`inline-size === block-size === resolved icon size`。具体 glyph 可以有不同轮廓，但布局占位、视觉中心与相邻文字起点必须稳定。
