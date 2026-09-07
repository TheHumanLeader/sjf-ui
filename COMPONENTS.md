# SJF-UI v0.1 implementation scope

Office-focused Vue Vapor component library. All components use Material 3 roles,
Ordered Size, keyboard-friendly semantics, and the existing Form / Label and
Overlay foundations. This is the complete v0.1 scope, not a claim to cover every
specialized UI widget.

- Existing: Icon, Item, List, Input, Label, Form.
- General: Button, Badge, Avatar, Chip, Card, Divider, Space.
- Forms: Checkbox, Radio, Switch, Textarea, InputNumber, Select, Slider, DatePicker, TimePicker, Upload.
- Navigation: Tabs, Tree, Menu, Breadcrumbs, Pagination, Steps.
- Data: Table, Descriptions, Collapse, Empty, Skeleton, Progress.
- Feedback: Alert, Popover, Tooltip, Dropdown, Dialog, Drawer, Snackbar.

Delivery: typed public exports and global registration, design notes per component,
interactive documentation for every component, responsive and both-theme checks,
meaningful model/interaction tests, and a production documentation build.

Boundaries: DatePicker / TimePicker initially use native accessible date/time
controls; Upload selects and validates local files and emits them, with no automatic
network transfer. Table provides client-side sorting, selection and pagination,
not virtualization. Back-end validation, storage and uploads belong to consumers.

Status: v0.1 scope implemented and locally verified on 2026-09-05.
See docs/verification.md for the tested interactions, automated checks and explicit limits.
