# SJF-UI

SJF-UI 是一个基于 Vue 3 Vapor Mode 的组件库。

设计方向：

- Material Design 3 为基础设计语言
- 强调实用性、办公化与信息密度
- 组件按独立目录组织
- 所有尺寸相关设计优先遵循统一的有序 Size System

## 规范

- [Size Spec v0.1](./docs/spec/size.md)

## 组件目录约定

```text
{组件名}/
├─ index.vue        # 组件入口
├─ index.ts         # Props / Emits / 类型 / 模型
├─ design.md        # 组件设计说明与设计提示词
├─ design.png       # 组件最终设计图
└─ cps/             # 复杂组件内部子组件
   └─ **/*.vue|ts
```
