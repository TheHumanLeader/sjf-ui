# Label cps

`LabelContent.vue` is the rich label content primitive used inside `#label` slots.

Structure:

```text
[ icon ]  Title
          Subtitle
```

The icon is vertically centered against the complete Title + Subtitle text stack. The component does not depend on any icon library; consumers may pass SVG, Vue components, images, or text through the `icon` slot.
