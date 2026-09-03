<template>
  <div class="sjf-label-caption" :class="classes">
    <span class="sjf-label-caption__text">
      <slot>{{ text }}</slot>
    </span>
    <span v-if="required" class="sjf-label-caption__required" aria-hidden="true">*</span>
  </div>
</template>

<script setup vapor lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  floating?: boolean
  shrunk?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  required: false,
  disabled: false,
  error: false,
  floating: false,
  shrunk: false,
})

const classes = computed(() => ({
  'is-floating': props.floating,
  'is-shrunk': props.shrunk,
  'is-disabled': props.disabled,
  'is-error': props.error,
}))
</script>

<style scoped>
.sjf-label-caption {
  display: inline-flex;
  align-items: center;
  gap: var(--sjf-label-required-gap);
  min-width: 0;
  color: var(--sjf-label-muted-color);
  line-height: 1.2;
}

.sjf-label-caption.is-error {
  color: var(--sjf-label-error-color);
}

.sjf-label-caption.is-disabled {
  opacity: 0.64;
}

.sjf-label-caption__text {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Rich label content may have Title + Subtitle. Keep the required marker next
 * to the title line instead of vertically centering it beside the whole block. */
.sjf-label-caption__required {
  align-self: flex-start;
  margin-top: 0.08em;
  color: var(--sjf-label-error-color);
  font-weight: 600;
}

.sjf-label-caption.is-floating.is-shrunk {
  font-size: var(--sjf-label-floating-font-size);
}
</style>
