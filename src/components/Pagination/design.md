# Pagination

页码从 1 开始，边界自动限制；大量页码折叠为省略号，避免随 total 生成巨大 DOM。

采用统一 Size Recipe（高度/字体/内边距 0，间距/圆角 -1），默认继承 nm，支持自定义等级及边界 clamp。支持键盘与 Material 3 双主题。
