<template>
  <article
    class="sjf-control sjf-card"
    :class="props.variant ?? 'outlined'"
    :style="style"
  >
    <header v-if="props.title || slots.header" class="sjf-card-head">
      <slot name="header"
        ><strong>{{ props.title }}</strong>
        <p v-if="props.subtitle" class="sjf-muted">
          {{ props.subtitle }}
        </p></slot
      >
    </header>
    <div class="sjf-card-body"><slot /></div>
    <footer v-if="slots.footer" class="sjf-card-foot">
      <slot name="footer" />
    </footer>
  </article>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import type { SjfCardProps } from './index'
const props = defineProps<SjfCardProps>()
const slots = defineSlots<{
  default?: () => unknown
  header?: () => unknown
  footer?: () => unknown
}>()
const { style } = useSjfControl(props)
</script>
<style scoped>
.sjf-card {
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: calc(var(--sjf-c-rd) * 2);
  background: var(--md-sys-color-surface-container-lowest);
  min-width: 0;
  overflow: hidden;
}
.sjf-card.filled {
  background: var(--md-sys-color-surface-container);
  border-color: transparent;
}
.sjf-card.elevated {
  border-color: transparent;
  box-shadow: var(--sjf-shadow-nm);
}
.sjf-card-head,
.sjf-card-body,
.sjf-card-foot {
  padding: var(--sjf-c-pd);
}
.sjf-card-head {
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
}
.sjf-card-head p {
  margin: 0.5em 0 0;
}
.sjf-card-foot {
  border-top: 1px solid var(--md-sys-color-outline-variant);
  display: flex;
  justify-content: flex-end;
  gap: var(--sjf-c-gap);
}
</style>
