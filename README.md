# SJF-UI

基于 Vue 3.6 Vapor 的办公组件库。v0.1 包含 **42 个组件**，统一 Material 3 语义色、有序尺寸、Form / Label 布局和 Overlay 浮层。

## 本地运行

要求 Node >= 22.12，当前 Vue 为 3.6.0-rc.6。

```sh
npm install
npm run docs:dev -- --host 127.0.0.1
```

打开 http://127.0.0.1:5173/#/components。每个组件都有真实交互示例、尺寸切换、最简代码和核心 API。

## 使用

当前为源码工作区，尚未发布 npm 包。沿用仓库的 Vite Vapor 配置，组件使用 `<script setup vapor>`。

```ts
import { createVaporApp } from 'vue'
import App from './App.vue'
import SJFUI from './src' // 标准入口包含库样式

createVaporApp(App).use(SJFUI, {
  defaultSize: 'nm',
  theme: 'pink',         // pink | starry
  motion: 'system',      // system | full | reduced
}).mount('#app')
```

也可从标准入口按需导入 `SJFButton`、`SJFSelect` 等组件及对应 `Sjf*Props` 类型。直接导入单个组件文件时，另行导入 `src/styles/index.css`。

```vue
<script setup vapor lang="ts">
import { ref } from 'vue'
import { SJFButton, SJFSelect } from './src'
const owner = ref<string | number | null>(null)
const people = [{ label: '林沐', value: 'lin' }]
</script>

<template>
  <SJFSelect v-model="owner" :options="people" label="负责人" clearable />
  <SJFButton icon="save">保存</SJFButton>
</template>
```

## 约定

- `size`：`mn → sm → nm → md → lg`，支持插入自定义尺寸；优先使用组件值，其次 Form，最后全局。
- 输入类组件内建 Label，支持 required / disabled / error 和 labelOption，不需要 FormItem。
- 选择项和树节点使用稳定且唯一的 string / number 值；Table 显式设置业务 row-key。
- Dialog / Drawer 使用原生模态语义；嵌套 Select 保持在对话框的焦点和可访问范围内。
- 库默认跟随系统减少动态效果。文档站为了展示动画默认完整模式，可在顶部切换；不会修改系统设置。

## 验证

```sh
npm run typecheck
npm test
npm run docs:build
```

测试覆盖数值边界与精度、分页、文件类型和 List 平滑滚动。浏览器手工回归记录见 [验收记录](./docs/verification.md)。

## v0.1 范围与边界

完整名单见 [COMPONENTS.md](./COMPONENTS.md)。日期和时间选择使用浏览器原生控件；Upload 只选择/校验并返回本地文件，不自动上传；Table 提供客户端排序、选择和分页，不包含虚拟化或服务端分页协议。后端校验、持久化和网络请求由业务负责。

## 设计规范

- [Size](./docs/spec/size.md)
- [Motion](./docs/spec/motion.md)
- 各组件的 `src/components/{Name}/design.md` 记录行为和视觉约定。

组件目录包含 `index.vue`、公开类型 `index.ts` 与设计说明 `design.md`；复杂组件的内部子组件放在 `cps/`。截图/矢量设计资产按需保留，不是运行依赖。
