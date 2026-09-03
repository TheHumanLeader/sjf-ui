# SjfLabelContent Design

Purpose: provide a compact rich label body for SJF-UI labels.

Layout:

```text
[ icon ]  Title
          Subtitle
```

Rules:
- icon is optional and rendered through a slot
- icon is vertically centered relative to the complete title/subtitle stack
- title is primary label text
- subtitle is secondary semantic text using the Label muted color and smaller Size-derived font
- no icon library dependency
- inherits parent Label text alignment and theme colors
- primarily intended for horizontal, horizontal-box, vertical and vertical-box modes
