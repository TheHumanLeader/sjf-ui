<template>
  <span class="sjf-label-content" :class="{ 'has-icon': hasIcon, 'has-subtitle': hasSubtitle }">
    <span v-if="hasIcon" class="sjf-label-content__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <span class="sjf-label-content__copy">
      <span class="sjf-label-content__title">
        <slot name="title">{{ props.title }}</slot>
      </span>

      <span v-if="hasSubtitle" class="sjf-label-content__subtitle">
        <slot name="subtitle">{{ props.subtitle }}</slot>
      </span>
    </span>
  </span>
</template>

<script setup vapor lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
}

const props = defineProps<Props>()
const slots = defineSlots<{
  icon?: () => unknown
  title?: () => unknown
  subtitle?: () => unknown
}>()

const hasIcon = computed(() => Boolean(slots.icon))
const hasSubtitle = computed(() => Boolean(props.subtitle || slots.subtitle))
</script>

<style scoped>
.sjf-label-content {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  column-gap: var(--sjf-label-gap, 8px);
  text-align: inherit;
}

.sjf-label-content__icon {
  flex: 0 0 auto;
  min-width: 1.35em;
  min-height: 1.35em;
  display: inline-grid;
  place-items: center;
  align-self: center;
  line-height: 1;
}

.sjf-label-content__copy {
  min-width: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: inherit;
  row-gap: var(--sjf-label-required-gap, 4px);
}

.sjf-label-content__title {
  min-width: 0;
  line-height: 1.25;
}

.sjf-label-content__subtitle {
  min-width: 0;
  color: var(--sjf-label-muted-color, var(--md-sys-color-on-surface-variant));
  font-size: var(--sjf-label-helper-font-size, 0.85em);
  line-height: 1.35;
}
</style>
